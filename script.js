/* --- SCROLL REVEAL ANIMATION --- */
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

/* --- TIMELINE SCROLL GLOW LINE --- */
const timelines = document.querySelectorAll('.timeline');

function updateTimelines() {
    timelines.forEach((timeline) => {
        const glowLine = timeline.querySelector('.timeline-line-glow');
        if (!glowLine) return;

        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startOffset = windowHeight * 0.65;
        const totalDistance = rect.height;

        if (rect.top >= startOffset) {
            glowLine.style.height = '0%';
        } else {
            const traveled = Math.min(Math.max(startOffset - rect.top, 0), totalDistance);
            const percentage = (traveled / totalDistance) * 100;
            glowLine.style.height = `${percentage}%`;
        }
    });
}

window.addEventListener('scroll', updateTimelines, { passive: true });
window.addEventListener('resize', updateTimelines, { passive: true });
window.addEventListener('load', updateTimelines);

/* --- HORIZONTAL SCROLL TRACK (IF PRESENT ON DESKTOP) --- */
const scrollWrappers = document.querySelectorAll('.horizontal-scroll-wrapper');

function updateHorizontalTracks() {
    if (window.innerWidth <= 900) {
        scrollWrappers.forEach((wrapper) => {
            const track = wrapper.querySelector('.horizontal-track');
            if (track) track.style.transform = 'none';
        });
        return;
    }

    scrollWrappers.forEach((wrapper) => {
        const track = wrapper.querySelector('.horizontal-track');
        if (!track) return;

        const wrapperTop = wrapper.offsetTop;
        const wrapperHeight = wrapper.offsetHeight;
        const viewportHeight = window.innerHeight;
        const maxScroll = Math.max(wrapperHeight - viewportHeight, 1);
        const progress = Math.min(Math.max((window.scrollY - wrapperTop) / maxScroll, 0), 1);

        const maxTranslate = Math.max(track.scrollWidth - window.innerWidth, 0);
        track.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
    });
}

window.addEventListener('scroll', updateHorizontalTracks, { passive: true });
window.addEventListener('resize', updateHorizontalTracks, { passive: true });

/* --- PROJECT MODAL CONTROLS --- */
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');

function openModal(cardElement) {
    if (!modal || !modalContent || !cardElement) return;
    modalContent.innerHTML = cardElement.innerHTML;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});
