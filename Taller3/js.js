
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



document.addEventListener('DOMContentLoaded', function () {
  const sliders = document.querySelectorAll('.productos1');

  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollStart;
    let scrollEndTimeout;

    slider.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      scrollStart = slider.scrollLeft;
      slider.classList.add('dragging');
      e.preventDefault();
      if (slider.setPointerCapture) {
        slider.setPointerCapture(e.pointerId);
      }
    });

    slider.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      const x = e.clientX;
      const walk = startX - x;
      slider.scrollLeft = scrollStart + walk;
    });

    function endDrag(e) {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('dragging');
      try {
        if (e.pointerId) slider.releasePointerCapture(e.pointerId);
      } catch (err) {}
      snapToNearest(slider);
    }

    slider.addEventListener('pointerup', endDrag);
    slider.addEventListener('pointercancel', endDrag);
    slider.addEventListener('pointerleave', endDrag);

    slider.addEventListener('scroll', () => {
      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => snapToNearest(slider), 120);
    });

    function snapToNearest(el) {
      const items = el.querySelectorAll('.media-container');
      if (!items.length) return;

      const currentScroll = el.scrollLeft;
      let closest = currentScroll;
      let minDiff = Infinity;

      items.forEach(item => {
        const itemOffset = item.offsetLeft;
        const diff = Math.abs(itemOffset - currentScroll);
        if (diff < minDiff) {
          minDiff = diff;
          closest = itemOffset;
        }
      });

      el.scrollTo({
        left: Math.max(0, Math.round(closest)),
        behavior: 'smooth'
      });
    }
  });
});
