// Moves footnotes into the right margin on wide screens, each one level with
// its reference. Without this script they stay as a list at the end of the post.
(() => {
  const main = document.querySelector("main");
  const notes = [...document.querySelectorAll(".footnotes li[id]")];
  if (!main || !notes.length) return;

  const wide = matchMedia("screen and (min-width: 75rem)");
  const gap = 12;

  function layout() {
    main.style.minHeight = "";
    if (!wide.matches) return;

    const mainTop = main.getBoundingClientRect().top;
    let next = 0;
    for (const note of notes) {
      const ref = document.querySelector(`a[href="#${CSS.escape(note.id)}"]`);
      if (!ref) continue;
      const top = Math.max(ref.getBoundingClientRect().top - mainTop, next);
      note.style.setProperty("--note-top", `${top}px`);
      next = top + note.offsetHeight + gap;
    }
    main.style.minHeight = `${next}px`;
  }

  main.classList.add("margin-notes");
  layout();

  // KaTeX, fonts and images all shift the text after the first layout.
  new ResizeObserver(layout).observe(main);
  wide.addEventListener("change", layout);
  addEventListener("load", layout);
  document.fonts.ready.then(layout);
})();
