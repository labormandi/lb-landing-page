const ENQUIRY_URL = 'https://dev.api.labormandi.com/core/landing/enquiry';
const SUBSCRIBE_URL = 'https://dev.api.labormandi.com/core/landing/subscribe';

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 20,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 14, 46, 0.97)';
            nav.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(10, 14, 46, 0.90)';
            nav.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)';
        }
    });

    const carousel = document.getElementById('mockup-carousel');
    if (carousel) {
        const dots = document.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        const totalSlides = 3;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.remove('bg-white/40', 'w-1.5');
                    dot.classList.add('bg-white', 'w-5');
                } else {
                    dot.classList.remove('bg-white', 'w-5');
                    dot.classList.add('bg-white/40', 'w-1.5');
                }
            });
        }, 3000);
    }

    // Subscribe — hero form
    const subscribeHeroForm = document.getElementById('subscribeHeroForm');
    const subscribeHeroBtn = document.getElementById('subscribeHeroBtn');
    const subscribeHeroMsg = document.getElementById('subscribeHeroMsg');

    if (subscribeHeroForm) {
        subscribeHeroForm.addEventListener('submit', async e => {
            e.preventDefault();
            const email = subscribeHeroForm.email.value.trim();
            subscribeHeroBtn.disabled = true;
            subscribeHeroBtn.textContent = 'Subscribing...';
            try {
                const res = await fetch(SUBSCRIBE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
                if (!res.ok) throw new Error();
                subscribeHeroMsg.textContent = '✓ You\'re on the list!';
                subscribeHeroMsg.classList.remove('hidden', 'text-red-400');
                subscribeHeroMsg.classList.add('text-emerald-400');
                subscribeHeroForm.reset();
            } catch {
                subscribeHeroMsg.textContent = '✗ Something went wrong. Please try again.';
                subscribeHeroMsg.classList.remove('hidden', 'text-emerald-400');
                subscribeHeroMsg.classList.add('text-red-400');
            } finally {
                subscribeHeroBtn.disabled = false;
                subscribeHeroBtn.textContent = 'Subscribe';
                setTimeout(() => subscribeHeroMsg.classList.add('hidden'), 5000);
            }
        });
    }

    // Subscribe — priority access form
    const subscribePriorityForm = document.getElementById('subscribePriorityForm');
    const subscribePriorityBtn = document.getElementById('subscribePriorityBtn');
    const subscribePriorityMsg = document.getElementById('subscribePriorityMsg');

    if (subscribePriorityForm) {
        subscribePriorityForm.addEventListener('submit', async e => {
            e.preventDefault();
            const email = subscribePriorityForm.email.value.trim();
            subscribePriorityBtn.disabled = true;
            subscribePriorityBtn.textContent = 'Securing spot...';
            try {
                const res = await fetch(SUBSCRIBE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
                if (!res.ok) throw new Error();
                subscribePriorityMsg.textContent = '✓ Spot secured!';
                subscribePriorityMsg.classList.remove('hidden', 'text-red-400');
                subscribePriorityMsg.classList.add('text-emerald-400');
                subscribePriorityForm.reset();
            } catch {
                subscribePriorityMsg.textContent = '✗ Something went wrong. Please try again.';
                subscribePriorityMsg.classList.remove('hidden', 'text-emerald-400');
                subscribePriorityMsg.classList.add('text-red-400');
            } finally {
                subscribePriorityBtn.disabled = false;
                subscribePriorityBtn.textContent = 'Claim Waitlist Spot';
                setTimeout(() => subscribePriorityMsg.classList.add('hidden'), 5000);
            }
        });
    }

    // Enquiry — contact form
    const cForm = document.getElementById('contactForm');
    const cBtn = document.getElementById('contactSubmitBtn');
    const cMsg = document.getElementById('contactMsg');

    if (cForm) {
        cForm.addEventListener('submit', async e => {
            e.preventDefault();
            cBtn.disabled = true;
            cBtn.textContent = 'Sending...';
            const data = {
                fullName: cForm.fullName.value.trim(),
                email: cForm.email.value.trim(),
                message: cForm.message.value.trim(),
            };
            const recaptchaToken = grecaptcha.getResponse();
            if (!recaptchaToken) {
                cMsg.textContent = '✗ Please complete the reCAPTCHA.';
                cMsg.classList.remove('hidden', 'text-emerald-400');
                cMsg.classList.add('text-red-400');
                cBtn.disabled = false;
                cBtn.innerHTML = `<span class="flex items-center justify-center gap-3">Dispatch Message<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>`;
                return;
            }
            try {
                const res = await fetch(ENQUIRY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...data, recaptchaToken }),
                });
                if (!res.ok) throw new Error();
                cMsg.textContent = '✓ Message dispatched! We\'ll get back to you shortly.';
                cMsg.classList.remove('hidden', 'text-red-400');
                cMsg.classList.add('text-emerald-400');
                cForm.reset();
                grecaptcha.reset();
            } catch {
                cMsg.textContent = '✗ Something went wrong. Please try again.';
                cMsg.classList.remove('hidden', 'text-emerald-400');
                cMsg.classList.add('text-red-400');
                grecaptcha.reset();
            } finally {
                cBtn.disabled = false;
                cBtn.innerHTML = `<span class="flex items-center justify-center gap-3">Dispatch Message<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>`;
                setTimeout(() => cMsg.classList.add('hidden'), 5000);
            }
        });
    }
});
