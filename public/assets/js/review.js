    document.addEventListener('DOMContentLoaded', () => {
        const track = document.querySelector('.review-track');
        const items = Array.from(track.children);
        const cloneItems = items.map(item => item.cloneNode(true));

        cloneItems.forEach(clone => {
            track.appendChild(clone);
        });
    });

