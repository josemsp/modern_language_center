// export function initPopovers() {
//   document.querySelectorAll("[data-popover]").forEach((popover) => {
//     const btn = popover.querySelector(`[data-trigger]`) as HTMLElement;
//     const panel = popover.querySelector(`[data-popover-panel]`) as HTMLElement;

//     if (!btn || !panel) return;

//     // State
//     let open = false;

//     // UI functions
//     function openPopover() {
//       open = true;
//       btn.setAttribute("aria-expanded", "true");
//       panel.hidden = false;
//       requestAnimationFrame(() => {
//         panel?.classList.remove("opacity-0", "scale-95");
//         panel?.classList.add("opacity-100", "scale-100");
//       });
//     }

//     function closePopover(returnFocus = true) {
//       open = false;
//       btn.setAttribute("aria-expanded", "false");
//       panel.classList.remove("opacity-100", "scale-100");
//       panel.classList.add("opacity-0", "scale-95");
//       setTimeout(() => {
//         if (!open) panel.hidden = true;
//       }, 150);
//       if (returnFocus) btn.focus();
//     }

//     // Toggle
//     btn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       open ? closePopover() : openPopover();
//     });

//     // Click outside -> close
//     document.addEventListener("click", (e) => {
//       if (!popover.contains(e.target as Node)) closePopover(false);
//     });

//     // Escape -> close
//     document.addEventListener("keydown", (e) => {
//       if (e.key === "Escape" && open) {
//         closePopover();
//       }
//     });

//     // Prevent closing when clicking inside the panel
//     panel.addEventListener("click", (e) => {
//       console.log("e.target", e.target);
//       e.stopPropagation();
//     });
//   });
// }



export function initPopovers() {
  // Track all open popovers with a Map for better performance
  const openPopovers = new Map<string, { 
    element: HTMLElement; 
    closeFn: (returnFocus?: boolean) => void;
    btn: HTMLElement;
    panel: HTMLElement;
  }>();

  document.querySelectorAll("[data-popover]").forEach((popover) => {
    const btn = popover.querySelector(`[data-trigger]`) as HTMLElement;
    const panel = popover.querySelector(`[data-popover-panel]`) as HTMLElement;

    if (!btn || !panel) return;

    // Get the popover ID from the panel data attribute
    const popoverId = panel.getAttribute('data-popover-panel');
    if (!popoverId) return;

    // State
    let open = false;

    // UI functions
    function openPopover() {
      // Close all other open popovers first
      closeAllPopovers();
      
      open = true;
      if (!popoverId) return;
      // Add this popover to the open map
      openPopovers.set(popoverId, {
        element: popover as HTMLElement,
        closeFn: closePopover,
        btn,
        panel
      });
      
      btn.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      requestAnimationFrame(() => {
        panel?.classList.remove("opacity-0", "scale-95");
        panel?.classList.add("opacity-100", "scale-100");
      });
    }

    function closePopover(returnFocus = true) {
      open = false;
      if (!popoverId) return;
      // Remove this popover from the open map
      openPopovers.delete(popoverId);
      
      btn.setAttribute("aria-expanded", "false");
      panel.classList.remove("opacity-100", "scale-100");
      panel.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        if (!open) panel.hidden = true;
      }, 150);
      if (returnFocus) btn.focus();
    }

    // Function to close all open popovers
    function closeAllPopovers() {
      // Create a copy of the values to avoid modification during iteration
      const popoversToClose = Array.from(openPopovers.values());
      popoversToClose.forEach(item => {
        // Call the individual close function to update the internal state
        item.closeFn(false);
      });
      // The map will be cleared by the individual closePopover calls
    }

    // Toggle
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      open ? closePopover() : openPopover();
    });

    // Click outside -> close
    document.addEventListener("click", (e) => {
      if (!popover.contains(e.target as Node)) closePopover(false);
    });

    // Escape -> close all popovers
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllPopovers();
      }
    });

    // Prevent closing when clicking inside the panel
    panel.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
}