// The highlighter leaves function calls as plain names, so mark them here.
for (const name of document.querySelectorAll(".chroma .n")) {
  const next = name.nextSibling;
  if (next?.classList?.contains("p") && next.textContent.startsWith("(")) {
    name.classList.add("call");
  }
}
