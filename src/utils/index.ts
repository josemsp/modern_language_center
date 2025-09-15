
export const updateSelectValue = (select: Element, value: string) => {
  const option = Array.from(
    select.querySelectorAll<HTMLLIElement>("li")
  ).find((li: HTMLLIElement) => li.getAttribute("data-value") === value);

  if (option) {
    const label = select.querySelector<HTMLElement>("#current-label");
    const icon = select.querySelector<HTMLImageElement>("#current-icon");
    const newLabel = option.textContent?.trim();
    const newIcon = option.querySelector<HTMLImageElement>("img")?.src;

    if (label && icon && newLabel && newIcon) {
      label.textContent = newLabel;
      if (icon instanceof HTMLImageElement) {
        icon.src = newIcon;
      }
    }
  }
};

export const addEventToSelect = (select: Element, callback: (value: string) => void) => {
  select.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const newLang = item.getAttribute("data-value");
      if (!newLang) return;

      // Close the dropdown
      select.querySelector("details")?.removeAttribute("open");

      callback(newLang);
      // $lang.set(newLang);
      // window.location.href = `/${newLang}/`;
    });
  });
};