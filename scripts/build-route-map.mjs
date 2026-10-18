// Draws the map of the route from the parking lot to the airport (src/data/routeMap.ts).
//
//   node scripts/build-route-map.mjs
//
// Streets, buildings and the airport come from OpenStreetMap (© OpenStreetMap contributors, ODbL), the route itself from
// the OSRM demo server: the real road from the lot to the airport entrance. Both are fetched once and turned into a few
// SVG paths, so the site loads no map library, no tiles and makes no request to any map service. Run it again only to
// change the section of the map or to refresh the data; the result is committed.
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');

// The lot (see SITE.geo) and the main entrance of the airport (the address point of Sarajevo airport, Kurta Schorka 36)
const PARKING = [43.828498, 18.328639];
const AIRPORT = [43.8273787, 18.3330851];

// The section shown: 600 x 520 units, one unit being 1.63 m
const [W, H] = [600, 520];
const CENTER = [43.8278, 18.3322];
const METERS_PER_UNIT = 1.63;

const M_PER_DEG_LAT = 110574;
const M_PER_DEG_LON = 111320 * Math.cos((CENTER[0] * Math.PI) / 180);
const project = ([lat, lon]) => [
  W / 2 + ((lon - CENTER[1]) * M_PER_DEG_LON) / METERS_PER_UNIT,
  H / 2 - ((lat - CENTER[0]) * M_PER_DEG_LAT) / METERS_PER_UNIT,
];

const south = CENTER[0] - ((H / 2) * METERS_PER_UNIT) / M_PER_DEG_LAT;
const north = CENTER[0] + ((H / 2) * METERS_PER_UNIT) / M_PER_DEG_LAT;
const west = CENTER[1] - ((W / 2) * METERS_PER_UNIT) / M_PER_DEG_LON;
const east = CENTER[1] + ((W / 2) * METERS_PER_UNIT) / M_PER_DEG_LON;
const pad = 0.0008;
const bbox = `${south - pad},${west - pad},${north + pad},${east + pad}`;

const query = `[out:json][timeout:60];
(
  way["highway"](${bbox});
  way["aeroway"](${bbox});
  way["building"](${bbox});
  relation["aeroway"="terminal"](${bbox});
);
out geom;`;

async function overpass() {
  const servers = [
    'https://overpass.private.coffee/api/interpreter',
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
  ];
  for (let attempt = 0; attempt < 3; attempt += 1) {
    for (const server of servers) {
      const response = await fetch(server, {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'user-agent': 'sky-parking-site-build/1.0' },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (response.ok) return response.json();
      console.warn(server, response.status);
    }
    await new Promise((resolve) => setTimeout(resolve, 8000));
  }
  throw new Error('no Overpass server answered');
}

const osm = await overpass();
if (process.env.DEBUG_OSM) await writeFile(process.env.DEBUG_OSM, JSON.stringify(osm));
const routing = await (
  await fetch(
    `https://router.project-osrm.org/route/v1/driving/${PARKING[1]},${PARKING[0]};${AIRPORT[1]},${AIRPORT[0]}?overview=full&geometries=geojson`,
  )
).json();
const route = routing.routes[0];

// --- geometry helpers ---------------------------------------------------------------------------------------------

/** Douglas-Peucker: drops points that lie within `epsilon` units of the line between their neighbours. */
function simplify(points, epsilon) {
  if (points.length < 3) return points;
  const [a, b] = [points[0], points.at(-1)];
  let [index, farthest] = [0, 0];
  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i];
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
    const length = Math.hypot(dx, dy) || 1;
    const distance = Math.abs(dy * px - dx * py + b[0] * a[1] - b[1] * a[0]) / length;
    if (distance > farthest) [index, farthest] = [i, distance];
  }
  if (farthest <= epsilon) return [a, b];
  return [...simplify(points.slice(0, index + 1), epsilon).slice(0, -1), ...simplify(points.slice(index), epsilon)];
}

/** A closed outline (first point = last point): simplified in two halves, so that it is not collapsed to a line. */
function simplifyRing(points, epsilon) {
  const open = points.slice(0, -1);
  const mid = Math.floor(open.length / 2);
  return [
    ...simplify(open.slice(0, mid + 1), epsilon).slice(0, -1),
    ...simplify([...open.slice(mid), open[0]], epsilon),
  ];
}

const round = (value) => Math.round(value * 10) / 10;
const inView = (points, margin = 30) => {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  return (
    Math.max(...xs) > -margin &&
    Math.min(...xs) < W + margin &&
    Math.max(...ys) > -margin &&
    Math.min(...ys) < H + margin
  );
};
const toPoints = (geometry) => geometry.map((g) => project([g.lat, g.lon]));
const line = (points) => `M${points.map((p) => `${round(p[0])} ${round(p[1])}`).join('L')}`;
const area = (points) => `${line(points.slice(0, -1))}Z`;
const polygonArea = (points) =>
  Math.abs(
    points.reduce(
      (sum, p, i) => sum + p[0] * points[(i + 1) % points.length][1] - points[(i + 1) % points.length][0] * p[1],
      0,
    ),
  ) / 2;

// --- sort the map data into layers -------------------------------------------------------------------------------

const layers = { major: [], minor: [], runway: [], taxiways: [], apron: [], buildings: [], terminal: [] };
const MAJOR = new Set(['primary', 'primary_link', 'secondary', 'secondary_link', 'tertiary', 'tertiary_link', 'trunk']);
const MINOR = new Set(['residential', 'unclassified', 'service', 'living_street', 'track']);

for (const element of osm.elements) {
  const tags = element.tags ?? {};
  if (element.type === 'relation') {
    for (const member of element.members ?? []) {
      if (member.role === 'outer' && member.geometry) {
        const points = simplifyRing(toPoints(member.geometry), 0.5);
        if (inView(points)) layers.terminal.push(area(points));
      }
    }
    continue;
  }
  if (!element.geometry) continue;
  const points = toPoints(element.geometry);
  if (!inView(points)) continue;
  const closed = element.geometry.length > 3 && element.geometry[0].lat === element.geometry.at(-1).lat;

  if (tags.aeroway === 'runway') layers.runway.push(line(points));
  else if (tags.aeroway === 'taxiway') layers.taxiways.push(line(simplify(points, 0.5)));
  else if (tags.aeroway === 'apron' && closed) layers.apron.push(area(simplifyRing(points, 0.5)));
  else if (tags.building && closed) {
    const simple = simplifyRing(points, 0.5);
    if (simple.length >= 4 && polygonArea(simple) >= 14 && !tags.aeroway) layers.buildings.push(area(simple));
  } else if (MAJOR.has(tags.highway)) layers.major.push(line(simplify(points, 0.5)));
  else if (MINOR.has(tags.highway)) layers.minor.push(line(simplify(points, 0.5)));
}

// --- the route -----------------------------------------------------------------------------------------------------

const parking = project(PARKING);
const airport = project(AIRPORT);
const routePoints = simplify(
  [parking, ...route.geometry.coordinates.map(([lon, lat]) => project([lat, lon])), airport],
  0.4,
);

// --- write the module ----------------------------------------------------------------------------------------------

const join = (paths) => paths.join('');
const source = `/**
 * The map of the route from the lot to the airport: streets, buildings and the airport from OpenStreetMap
 * (© OpenStreetMap contributors, ODbL), the route from OSRM. Drawn by \`scripts/build-route-map.mjs\`; do not edit by hand.
 * North is up, one unit is ${METERS_PER_UNIT} m.
 */
export const ROUTE_MAP = {
  width: ${W},
  height: ${H},
  /** Length of the road from the lot to the airport entrance, in metres */
  routeMeters: ${Math.round(route.distance)},
  parking: [${round(parking[0])}, ${round(parking[1])}],
  airport: [${round(airport[0])}, ${round(airport[1])}],
  route: ${JSON.stringify(routePoints.map((p) => [round(p[0]), round(p[1])]))} as [number, number][],
  roads: {
    major: '${join(layers.major)}',
    minor: '${join(layers.minor)}',
  },
  runway: '${join(layers.runway)}',
  taxiways: '${join(layers.taxiways)}',
  apron: '${join(layers.apron)}',
  buildings: '${join(layers.buildings)}',
  terminal: '${join(layers.terminal)}',
} as const;
`;

const target = path.join(root, 'src/data/routeMap.ts');
await writeFile(target, source);
console.log(
  `routeMap.ts ${(source.length / 1024).toFixed(1)} kB; route ${Math.round(route.distance)} m, ${routePoints.length} points;`,
  Object.fromEntries(Object.entries(layers).map(([name, items]) => [name, items.length])),
);
