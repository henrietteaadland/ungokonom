/*On click script*/
document.querySelectorAll(".bare-header").forEach((button) => {
    button.addEventListener("click", () => {
        const item = button.parentElement;
        item.classList.toggle("open")
    });
});
/*On click script*/