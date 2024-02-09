import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export function MarkdownReact({ value }) {
  return (
    <Markdown
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={dracula}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },

      }}
      remarkPlugins={[remarkGfm, remarkMath,]}
      rehypePlugins={[rehypeKatex]}
    >
      {value}
    </Markdown>
  );
}
