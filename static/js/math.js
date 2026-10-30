// Fades the sides of a wide equation that still have more to scroll to.
const fadeWidth = 32;

function fade(equation) {
  const left = equation.scrollLeft;
  const right = equation.scrollWidth - equation.clientWidth - left;
  equation.style.setProperty("--fade-left", `${Math.min(left, fadeWidth)}px`);
  equation.style.setProperty("--fade-right", `${Math.min(right, fadeWidth)}px`);
}

const equations = [...document.querySelectorAll(".katex-display")];
const fadeAll = () => equations.forEach(fade);
const resizes = new ResizeObserver(fadeAll);

for (const equation of equations) {
  equation.addEventListener("scroll", () => fade(equation), { passive: true });
  resizes.observe(equation);
}

// KaTeX's fonts change how wide each equation is.
document.fonts.ready.then(fadeAll);
