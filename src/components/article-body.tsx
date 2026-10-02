import type { ReactNode } from 'react';

/**
 * Renders the transcribed article bodies from src/content/posts.ts.
 *
 * The bodies are stored as a small markdown subset (## headings, - bullets,
 * **bold**, *italic*, blank-line-separated paragraphs). Only that subset is
 * interpreted, and nothing is fetched or executed.
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    const key = `${keyPrefix}-${i++}`;
    if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function ArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className="prose-intac">
      {blocks.map((block, bi) => {
        const key = `b${bi}`;

        if (block.startsWith('## ')) {
          return <h2 key={key}>{renderInline(block.slice(3), key)}</h2>;
        }
        if (block.startsWith('### ')) {
          return <h3 key={key}>{renderInline(block.slice(4), key)}</h3>;
        }
        if (block.startsWith('> ')) {
          return (
            <blockquote key={key}>{renderInline(block.replace(/^>\s?/gm, ''), key)}</blockquote>
          );
        }
        if (/^[-*] /m.test(block)) {
          const items = block
            .split('\n')
            .map((l) => l.replace(/^[-*]\s+/, '').trim())
            .filter(Boolean);
          return (
            <ul key={key}>
              {items.map((it, ii) => (
                <li key={`${key}-${ii}`}>{renderInline(it, `${key}-${ii}`)}</li>
              ))}
            </ul>
          );
        }
        if (/^\d+\.\s/m.test(block)) {
          const items = block
            .split('\n')
            .map((l) => l.replace(/^\d+\.\s+/, '').trim())
            .filter(Boolean);
          return (
            <ol key={key}>
              {items.map((it, ii) => (
                <li key={`${key}-${ii}`}>{renderInline(it, `${key}-${ii}`)}</li>
              ))}
            </ol>
          );
        }

        // Paragraph, possibly with single newlines inside it.
        const lines = block.split('\n');
        if (lines.length > 1) {
          return (
            <p key={key}>
              {lines.map((l, li) => (
                <span key={`${key}-${li}`}>
                  {li > 0 ? <br /> : null}
                  {renderInline(l, `${key}-${li}`)}
                </span>
              ))}
            </p>
          );
        }
        return <p key={key}>{renderInline(block, key)}</p>;
      })}
    </div>
  );
}