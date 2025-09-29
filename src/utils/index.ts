/**
 * Updates the value of the select dropdown.
 * 
 * @param selector - The CSS selector for the select dropdown.
 * @param value - The value to be selected.
 * 
 * @example
 * updateSelectValue("#lang-select", "en");
 */
export const updateSelectValue = (selector: string, value: string) => {
  const select = document.querySelector(selector);
  if (!select) return;

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

/**
 * Adds event listeners to the select dropdown.
 * 
 * @param selector - The CSS selector for the select dropdown.
 * @param callback - The callback function to be called when a value is selected.
 * 
 * @example
 * addEventToSelect("#lang-select", (value) => {
 *   console.log(value);
 * });
 */
export const addEventToSelect = (selector: string, callback: (value: string) => void) => {
  const select = document.querySelector(selector);

  select?.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const newLang = item.getAttribute("data-value");
      if (!newLang) return;

      // Close the dropdown
      select.querySelector("details")?.removeAttribute("open");

      callback(newLang);
    });
  });
};