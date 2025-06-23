/**
 * Highlights the active sidebar link based on the current page.
 * Only applies the highlighting on mobile and tablet viewports (width <= 1023px).
 *
 * @function highlightActiveSidebarLink
 */
function highlightActiveSidebarLink() {
    if (window.innerWidth > 1023) return;
    let currentPage = window.location.pathname.split("/").pop();
    let pageIds = ['summary', 'add_task', 'board', 'contacts'];
    pageIds.forEach(page => {
        let link = document.getElementById(`${page}_icon`);
        if (!link) return;
        let hoverBox = link.closest('.hoverContainer');
        if (currentPage === `${page}.html`) {
            hoverBox.classList.add('active');
        } else {
            hoverBox.classList.remove('active');
        }
    });
}