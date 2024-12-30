document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a").forEach((link) => {
        if (link.textContent.includes("↗")) {
            link.innerHTML = link.innerHTML.replace(
                "↗",
                '<span class="arrow">↗</span>'
            );
        }
    });
});