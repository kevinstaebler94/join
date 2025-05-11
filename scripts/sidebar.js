function highlightActiveSidebarLink() {
    console.log('funktion wurde aufgrufen');
    if (window.innerWidth > 1023) return;

    let pathname = window.location.pathname.split("/").pop();
    let navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pathname) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}