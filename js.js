
document.addEventListener("DOMContentLoaded", function () {
    // Abrir modal
    document.querySelectorAll(".media-img").forEach(function (img) {
        img.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "block";
        });
    });

    // Cerrar modal al hacer clic en la X
    document.querySelectorAll(".modal .close").forEach(function (btn) {
        btn.addEventListener("click", function () {
            this.parentElement.style.display = "none";
        });
    });

    // Cerrar modal al hacer clic fuera de la imagen
    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
        }
    });
});


