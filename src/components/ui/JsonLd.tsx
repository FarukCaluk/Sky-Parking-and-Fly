/** Structured data for search engines. It sits in the page itself, so it is also in the prerendered HTML. */
export function JsonLd({ data }: { data: object }) {
  // `<` is escaped so that a text can never close the script tag
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  );
}
