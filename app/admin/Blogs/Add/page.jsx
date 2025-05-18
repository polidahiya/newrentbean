"use client";
import React, { useState } from "react";
import "./blog.css";

const syntaxGuide = `
# Heading 1
## Heading 2
### Heading 3

**Bold Text**  
*Italic Text*  
~~Strikethrough~~  
\`Inline Code\`  

\`\`\`
Code Block
\`\`\`

> Blockquote

1. First item  
2. Second item  

- Bullet point  
* Another bullet  

[Link Text](https://example.com)  
![Alt Text](https://via.placeholder.com/100)

---
`;

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const parseMarkdown = (text) => {
    let html = text;
    html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
    html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");
    html = html.replace(/^###### (.*$)/gim, "<h6>$1</h6>");
    html = html.replace(/^##### (.*$)/gim, "<h5>$1</h5>");
    html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
    html = html.replace(/^---$/gim, "<hr />");
    html = html.replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>");
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    html = html.replace(/~~(.*?)~~/gim, "<del>$1</del>");
    html = html.replace(
      /!\[(.*?)\]\((.*?)\)/gim,
      '<img alt="$1" src="$2" style="max-width:100%;" />'
    );
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/gim,
      '<a href="$2" target="_blank">$1</a>'
    );
    html = html.replace(/^\d+\.\s+(.*$)/gim, "<ol><li>$1</li></ol>");
    html = html.replace(/<\/ol>\s*<ol>/gim, "");
    html = html.replace(/^[-*]\s+(.*$)/gim, "<ul><li>$1</li></ul>");
    html = html.replace(/<\/ul>\s*<ul>/gim, "");
    html = html.replace(/\n{2,}/g, "<br /><br />");
    html = html.replace(/\n/g, "<br />");

    return html.trim();
  };

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto relative">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        ✍️ Live Markdown Editor & Preview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Markdown Editor */}
        <div className="flex flex-col bg-white rounded-xl shadow-md p-5 border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            Markdown Input
          </h3>
          <textarea
            className="w-full flex-1 min-h-[250px] p-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 max-h-96 overflow-y-scroll "
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write Markdown here..."
          />
          <button
            onClick={() => setShowPreview(true)}
            className="mt-4 self-end bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Final Preview
          </button>
        </div>

        {/* Markdown Preview */}
        <div className=" flex flex-col bg-white rounded-xl shadow-md p-5 border border-gray-200">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Preview</h3>
          <div
            className="blog prose max-w-none text-sm prose-headings:font-semibold prose-a:text-blue-600 max-h-96 overflow-y-scroll"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>

      {/* Markdown Syntax Guide */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          🧾 Markdown Syntax Guide
        </h3>
        <pre className="bg-gray-800 text-gray-100 p-6 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap shadow-md">
          {syntaxGuide}
        </pre>
      </div>

      {/* Final Fullscreen Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
          <div className="flex flex-col bg-white max-w-4xl w-full h-[90vh]  p-6 rounded-lg shadow-xl relative">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">📄 Final Preview</h2>
            <div
              className="blog prose w-full flex-1 overflow-y-scroll"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownPreviewer;
