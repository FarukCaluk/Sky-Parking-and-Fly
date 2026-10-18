import { LOGO } from '@/components/layout/logoPaths';
import type { Confirmation, Row } from './confirmation';

/**
 * The confirmation as a PDF that is made on the visitor's own device, so it can be saved on a phone, where the browser's
 * print dialog is often missing: the page is drawn on a canvas (every language and every letter works, it is the device's
 * own font) and the picture is wrapped in a one-page PDF. No library, nothing leaves the device.
 */

const WIDTH = 1240; // A4 at 150 dpi
const A4_HEIGHT = 1754;
const MARGIN = 96;
const INNER = WIDTH - 2 * MARGIN;
const BODY = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const DISPLAY = "'Barlow Condensed', 'Arial Narrow', " + BODY;
const [INK, MUTED, FAINT, LINE, ACCENT] = ['#0b1220', '#3f4a5c', '#6b7587', '#d5dbe6', '#b4440a'];

type Context = CanvasRenderingContext2D;

function wrap(ctx: Context, text: string, width: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > width) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

/** Draws the whole page; returns where the content ends. */
function draw(ctx: Context, c: Confirmation): number {
  let y = MARGIN;
  ctx.textBaseline = 'alphabetic';

  const paragraph = (text: string, font: string, color: string, size: number, gap = 1.4) => {
    ctx.font = font;
    ctx.fillStyle = color;
    for (const line of wrap(ctx, text, INNER)) {
      y += size * gap;
      ctx.fillText(line, MARGIN, y);
    }
  };

  const heading = (text: string) => {
    y += 56;
    ctx.font = `800 34px ${DISPLAY}`;
    ctx.fillStyle = ACCENT;
    ctx.fillText(text.toUpperCase(), MARGIN, y);
    ctx.fillStyle = LINE;
    ctx.fillRect(MARGIN, y + 12, INNER, 2);
  };

  const rows = (list: Row[], strong: boolean) => {
    for (const row of list) {
      ctx.font = `400 28px ${BODY}`;
      const labelWidth = ctx.measureText(row.label).width;
      ctx.font = `${strong ? 600 : 500} 28px ${BODY}`;
      const valueLines = wrap(ctx, row.value, INNER - labelWidth - 40);
      y += 46;
      ctx.fillStyle = MUTED;
      ctx.font = `400 28px ${BODY}`;
      ctx.fillText(row.label, MARGIN, y);
      ctx.fillStyle = INK;
      ctx.font = `${strong ? 600 : 500} 28px ${BODY}`;
      ctx.textAlign = 'right';
      valueLines.forEach((line, index) => {
        if (index > 0) y += 38;
        ctx.fillText(line, WIDTH - MARGIN, y);
      });
      ctx.textAlign = 'left';
      y += 16;
      ctx.fillStyle = LINE;
      ctx.fillRect(MARGIN, y, INNER, 1.5);
    }
  };

  // logo and the business
  const scale = 150 / LOGO.height;
  ctx.save();
  ctx.translate(MARGIN, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = '#000';
  ctx.fill(new Path2D(LOGO.sky), 'evenodd');
  ctx.fillStyle = LOGO.teal;
  ctx.fill(new Path2D(LOGO.parking), 'evenodd');
  ctx.fillStyle = LOGO.orange;
  ctx.fill(new Path2D(LOGO.sarajevo), 'evenodd');
  ctx.restore();
  y += 150 + 20;

  // title and period
  y += 54;
  ctx.font = `800 76px ${DISPLAY}`;
  ctx.fillStyle = INK;
  ctx.fillText(c.title.toUpperCase(), MARGIN, y);
  y += 12;
  paragraph(c.period, `600 34px ${BODY}`, INK, 34, 1.5);

  // the code, in a dashed frame
  y += 40;
  const boxTop = y;
  const boxHeight = 230;
  ctx.setLineDash([14, 10]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = LOGO.orange;
  ctx.strokeRect(MARGIN, boxTop, INNER, boxHeight);
  ctx.setLineDash([]);
  ctx.textAlign = 'center';
  ctx.fillStyle = MUTED;
  ctx.font = `700 28px ${DISPLAY}`;
  ctx.fillText(c.codeLabel.toUpperCase(), WIDTH / 2, boxTop + 62);
  ctx.fillStyle = INK;
  ctx.font = `800 104px ${DISPLAY}`;
  ctx.fillText(c.code, WIDTH / 2, boxTop + 160);
  ctx.fillStyle = FAINT;
  ctx.font = `400 24px ${BODY}`;
  ctx.fillText(c.keepCode, WIDTH / 2, boxTop + 204);
  ctx.textAlign = 'left';
  y = boxTop + boxHeight + 24;

  paragraph(c.greeting, `600 32px ${BODY}`, INK, 32, 1.6);
  paragraph(c.intro, `400 28px ${BODY}`, MUTED, 28, 1.5);

  heading(c.detailsTitle);
  rows(c.details, true);

  heading(c.priceTitle);
  rows(c.priceLines, false);
  y += 62;
  ctx.font = `700 30px ${DISPLAY}`;
  ctx.fillStyle = FAINT;
  ctx.fillText(c.totalLabel.toUpperCase(), MARGIN, y);
  ctx.font = `800 72px ${DISPLAY}`;
  ctx.fillStyle = ACCENT;
  ctx.textAlign = 'right';
  ctx.fillText(c.total, WIDTH - MARGIN, y + 6);
  ctx.textAlign = 'left';
  y += 10;
  paragraph(c.pricePayment, `400 24px ${BODY}`, FAINT, 24, 1.6);

  heading(c.rulesTitle);
  for (const rule of c.rules) {
    ctx.font = `400 26px ${BODY}`;
    const lines = wrap(ctx, rule, INNER - 44);
    y += 16;
    ctx.fillStyle = LOGO.orange;
    ctx.beginPath();
    ctx.arc(MARGIN + 9, y + 24, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = MUTED;
    for (const line of lines) {
      y += 38;
      ctx.fillText(line, MARGIN + 44, y);
    }
  }

  heading(c.contactTitle);
  paragraph(c.contactText, `400 26px ${BODY}`, MUTED, 26, 1.6);
  rows(c.contact, true);
  paragraph(c.hours, `400 24px ${BODY}`, FAINT, 24, 1.8);

  return y + MARGIN;
}

/** A one-page PDF holding the JPEG: the smallest PDF there is, built by hand. */
function pdfWithImage(jpeg: Uint8Array, pixelsWide: number, pixelsHigh: number): Blob {
  const width = 595.28; // A4 width in points
  const height = (width * pixelsHigh) / pixelsWide;
  const encoder = new TextEncoder();
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let length = 0;
  const push = (data: string | Uint8Array) => {
    const bytes = typeof data === 'string' ? encoder.encode(data) : data;
    parts.push(bytes);
    length += bytes.length;
  };
  const object = (id: number, body: string, stream?: Uint8Array) => {
    offsets[id] = length;
    push(`${id} 0 obj\n${body}`);
    if (stream) {
      push('\nstream\n');
      push(stream);
      push('\nendstream');
    }
    push('\nendobj\n');
  };

  push('%PDF-1.4\n');
  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(
    3,
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width.toFixed(2)} ${height.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`,
  );
  object(
    4,
    `<< /Type /XObject /Subtype /Image /Width ${pixelsWide} /Height ${pixelsHigh} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>`,
    jpeg,
  );
  const content = encoder.encode(`q ${width.toFixed(2)} 0 0 ${height.toFixed(2)} 0 0 cm /Im0 Do Q`);
  object(5, `<< /Length ${content.length} >>`, content);

  const xref = length;
  push(
    `xref\n0 6\n0000000000 65535 f \n${offsets
      .slice(1)
      .map((o) => `${String(o).padStart(10, '0')} 00000 n \n`)
      .join('')}`,
  );
  push(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts as BlobPart[], { type: 'application/pdf' });
}

/** The PDF of a confirmation, ready to be saved. */
export async function confirmationPdf(c: Confirmation): Promise<Blob> {
  // The headline face is embedded in the page; make sure it is decoded before it is used on the canvas
  await document.fonts?.load(`800 40px "Barlow Condensed"`).catch(() => undefined);

  const tall = document.createElement('canvas');
  tall.width = WIDTH;
  tall.height = 4000;
  const tallContext = tall.getContext('2d');
  if (!tallContext) throw new Error('canvas not available');
  tallContext.fillStyle = '#fff';
  tallContext.fillRect(0, 0, WIDTH, tall.height);
  const end = Math.min(tall.height, draw(tallContext, c));

  const height = Math.max(A4_HEIGHT, Math.ceil(end));
  const page = document.createElement('canvas');
  page.width = WIDTH;
  page.height = height;
  const pageContext = page.getContext('2d');
  if (!pageContext) throw new Error('canvas not available');
  pageContext.fillStyle = '#fff';
  pageContext.fillRect(0, 0, WIDTH, height);
  pageContext.drawImage(tall, 0, 0, WIDTH, Math.min(height, tall.height), 0, 0, WIDTH, Math.min(height, tall.height));

  const jpeg = await new Promise<Blob | null>((resolve) => page.toBlob(resolve, 'image/jpeg', 0.92));
  if (!jpeg) throw new Error('could not make the picture');
  return pdfWithImage(new Uint8Array(await jpeg.arrayBuffer()), WIDTH, height);
}
