export function initAccordions() {
  document.querySelectorAll(".js-accordion").forEach((accordion) => {
    const toggle = accordion.querySelector(".js-toggle") as HTMLButtonElement;
    const content = accordion.querySelector(".js-content") as HTMLElement;
    const icon = accordion.querySelector(".js-icon") as HTMLElement;

    toggle?.addEventListener("click", () => {
      const isOpen = content?.style.height && content?.style.height !== "0px";

      if (isOpen) {
        content.style.height = "0px";
        icon.style.transform = "rotate(0deg)";
      } else {
        content.style.height = "auto";
        const height = content.scrollHeight + "px";
        content.style.height = "0px";

        requestAnimationFrame(() => {
          content.style.height = height;
        });
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
}
