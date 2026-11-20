function convertMarkdown() {
  
  const input = document.getElementById("markdown-input").value;
  const lines = input.split("\n");
  let result = [];

  for (let line of lines) {
    let html = line;

    if (/^\s*### /.test(html)) {
      html = html.replace(/^\s*### (.*)$/, "<h3>$1</h3>");
    } else if (/^\s*## /.test(html)) {
      html = html.replace(/^\s*## (.*)$/, "<h2>$1</h2>");
    } else if (/^\s*# /.test(html)) {
      html = html.replace(/^\s*# (.*)$/, "<h1>$1</h1>");
    }

    else if (/^\s*> /.test(html)) {
      html = html.replace(/^\s*> (.*)$/, "<blockquote>$1</blockquote>");
    }

    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img alt="$1" src="$2">'
    );

    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>'
    );

    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    html = html.replace(
      /<(h[1-3]|blockquote)>(.*?)<\/\1>/g,
      function (match, tag, content) {
        content = content.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        content = content.replace(/__(.+?)__/g, "<strong>$1</strong>");
        content = content.replace(/\*(.+?)\*/g, "<em>$1</em>");
        content = content.replace(/_(.+?)_/g, "<em>$1</em>");
        return "<" + tag + ">" + content + "</" + tag + ">";
      }
    );

    result.push(html);
  }

  return result.join("");
}

const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

markdownInput.addEventListener("input", function () {
  const html = convertMarkdown();
  htmlOutput.textContent = html;
  preview.innerHTML = html;
});