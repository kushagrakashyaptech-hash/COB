/* ===================================================
   CREATORMATCH AI - main.js
   Fashion • Creativity • Modernisation
=================================================== */

'use strict';

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 6 + 'px';
        cursor.style.top  = e.clientY - 6 + 'px';
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 18 + 'px';
            cursorFollower.style.top  = e.clientY - 18 + 'px';
        }, 80);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform        = 'scale(2.5)';
        cursorFollower.style.transform = 'scale(0.4)';
        cursorFollower.style.background = 'rgba(236,72,153,0.15)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform        = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.background = 'transparent';
    });

    const interactives = document.querySelectorAll(
        'a, button, .btn, .plan-option, .feature-card,' +
        '.step-card, .campaign-card, .join-card, .pricing-card,' +
        '.sidebar-link, .filter-btn, .tab-btn'
    );

    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform        = 'scale(1.8)';
            cursorFollower.style.transform = 'scale(1.6)';
            cursorFollower.style.borderColor = 'rgba(236,72,153,0.7)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform        = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.borderColor = 'rgba(168,85,247,0.5)';
        });
    });
}

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* ===== MOBILE MENU ===== */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        animateHamburger(true);
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
}

function closeMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        animateHamburger(false);
    }
}

function animateHamburger(open) {
    if (!hamburger) return;
    const spans = hamburger.querySelectorAll('span');
    if (open) {
        spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
    }
}

/* ===== TOAST NOTIFICATIONS ===== */
function showToast(type, title, message, duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
        success : 'fas fa-check-circle',
        error   : 'fas fa-times-circle',
        warning : 'fas fa-exclamation-triangle',
        info    : 'fas fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-body">
            <div class="toast-title">${title}</div>
            <div class="toast-msg">${message}</div>
        </div>
        <button class="toast-close"
            onclick="removeToast(this.parentElement)">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);
    setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
    if (!toast) return;
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateX(110%)';
    setTimeout(() => toast.remove(), 300);
}

/* ===== LOADING OVERLAY ===== */
function showLoading(text = 'Processing...', sub = 'Please wait') {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    const textEl = overlay.querySelector('.loading-text');
    const subEl  = overlay.querySelector('.loading-sub');
    if (textEl) textEl.textContent = text;
    if (subEl)  subEl.textContent  = sub;
    overlay.classList.add('active');
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('active');
}

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el, target, duration = 2200) {
    let start = 0;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
        start += step;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        if (target >= 10000) {
            el.textContent = (start / 1000).toFixed(1) + 'K+';
        } else if (target >= 1000) {
            el.textContent = (start / 1000).toFixed(1) + 'K';
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}

/* Observe stat numbers */
const statNums = document.querySelectorAll('.stat-num[data-count]');
if (statNums.length) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const target = parseInt(el.dataset.count);
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => counterObserver.observe(el));
}

/* ===== SCROLL REVEAL ANIMATIONS ===== */
const revealEls = document.querySelectorAll(
    '.step-card, .feature-card, .join-card,' +
    '.stat-card, .campaign-card, .pricing-card,' +
    '.chart-card, .table-card, .rec-header-card'
);

if (revealEls.length) {
    revealEls.forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(32px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));
}

/* ===== SCORE RING ANIMATION ===== */
function animateScoreRing(elementId, score, maxScore = 100) {
    const ring = document.getElementById(elementId);
    if (!ring) return;
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (score / maxScore) * circumference;
    setTimeout(() => {
        ring.style.strokeDasharray  = circumference;
        ring.style.strokeDashoffset = circumference;
        ring.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)';
        setTimeout(() => {
            ring.style.strokeDashoffset = offset;
        }, 100);
    }, 600);
}

/* ===== PROGRESS BARS ANIMATION ===== */
function animateProgressBars() {
    const bars = document.querySelectorAll('.progress-bar-fill, .score-bar-fill');
    bars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
            bar.style.width = width;
        }, 400);
    });
}

/* ===== PAGE LOAD INIT ===== */
window.addEventListener('load', () => {
    /* Score ring */
    animateScoreRing('scoreRingFill', 87);

    /* Progress bars */
    setTimeout(animateProgressBars, 300);

    /* Particle background on hero */
    initParticles();

    /* Typing effect on hero */
    initTypingEffect();

    /* Show welcome toast on dashboard pages */
    const isDashboard = document.querySelector('.dashboard-layout');
    if (isDashboard) {
        setTimeout(() => {
            showToast(
                'success',
                'AI Engine Ready',
                'Your ML recommendation engine is active and running.'
            );
        }, 1500);
    }
});

/* ===== PARTICLE BACKGROUND ===== */
function initParticles() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position:absolute;
        inset:0;
        pointer-events:none;
        z-index:0;
        opacity:0.4;
    `;
    hero.appendChild(canvas);

    const ctx    = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
        W = canvas.width  = hero.offsetWidth;
        H = canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x    = Math.random() * W;
            this.y    = Math.random() * H;
            this.size = Math.random() * 2 + 0.5;
            this.vx   = (Math.random() - 0.5) * 0.4;
            this.vy   = (Math.random() - 0.5) * 0.4;
            this.life = Math.random();
            this.maxLife = Math.random() * 0.02 + 0.005;
            this.color = Math.random() > 0.5
                ? '124,58,237'
                : '236,72,153';
        }
        update() {
            this.x    += this.vx;
            this.y    += this.vy;
            this.life += this.maxLife;
            if (this.life > 1 ||
                this.x < 0 || this.x > W ||
                this.y < 0 || this.y > H) {
                this.reset();
            }
        }
        draw() {
            const alpha = Math.sin(this.life * Math.PI) * 0.6;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle =
                        `rgba(124,58,237,${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);
        drawConnections();
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    animate();
}

/* ===== TYPING EFFECT ===== */
function initTypingEffect() {
    const tag = document.querySelector('.hero-tag');
    if (!tag) return;

    const texts = [
        'AI-Powered Matching Engine • Live',
        'Fashion Meets Technology • Now',
        'Creators + Brands = Perfect Match',
        'ML Scoring Engine • Active'
    ];

    let textIndex = 0;
    let charIndex  = 0;
    let isDeleting = false;
    const textSpan = tag.querySelector('span:last-child') ||
                     tag.childNodes[tag.childNodes.length - 1];

    if (!textSpan) return;

    function type() {
        const current = texts[textIndex];
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        if (typeof textSpan.textContent !== 'undefined') {
            textSpan.textContent = current.substring(0, charIndex);
        }

        let speed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
            speed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex  = (textIndex + 1) % texts.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 2000);
}

/* ===== PRICING TOGGLE ===== */
function togglePricing() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const toggleThumb  = document.getElementById('toggleThumb');
        const creatorPlans  = document.getElementById('creatorPlans');
    const brandPlans    = document.getElementById('brandPlans');
    const creatorToggle = document.getElementById('creatorToggle');
    const brandToggle   = document.getElementById('brandToggle');

    if (!toggleSwitch) return;

    const isActive = toggleSwitch.classList.toggle('active');

    if (toggleThumb) toggleThumb.classList.toggle('moved', isActive);

    if (creatorPlans && brandPlans) {
        if (isActive) {
            creatorPlans.classList.add('hidden');
            brandPlans.classList.remove('hidden');
            if (creatorToggle) creatorToggle.classList.remove('active');
            if (brandToggle)   brandToggle.classList.add('active');
        } else {
            brandPlans.classList.add('hidden');
            creatorPlans.classList.remove('hidden');
            if (creatorToggle) creatorToggle.classList.add('active');
            if (brandToggle)   brandToggle.classList.remove('active');
        }
    }
}

/* ===== MULTI STEP FORM ===== */
let currentStep = 1;
const totalSteps = 3;

function nextStep(step) {
    if (!validateStep(step)) return;

    const currentPanel = document.getElementById(`panel-${step}`);
    const nextPanel    = document.getElementById(`panel-${step + 1}`);
    const currentInd   = document.getElementById(`step-ind-${step}`);
    const nextInd      = document.getElementById(`step-ind-${step + 1}`);
    const connector    = document.getElementById(`conn-${step}`);

    if (!nextPanel) return;

    /* Animate out current panel */
    if (currentPanel) {
        currentPanel.style.animation = 'fadeSlideOut 0.3s ease forwards';
        setTimeout(() => {
            currentPanel.classList.remove('active');
            currentPanel.style.animation = '';

            /* Animate in next panel */
            nextPanel.classList.add('active');
            nextPanel.style.animation = 'fadeSlideIn 0.4s ease forwards';
        }, 280);
    }

    /* Update step indicators */
    if (currentInd) {
        currentInd.classList.remove('active');
        currentInd.classList.add('done');
        currentInd.querySelector('.step-circle').innerHTML =
            '<i class="fas fa-check"></i>';
    }

    if (nextInd) nextInd.classList.add('active');
    if (connector) connector.classList.add('done');

    currentStep = step + 1;

    /* Scroll to top of form */
    const formCard = document.querySelector('.form-card, .campaign-form-card');
    if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function prevStep(step) {
    const currentPanel = document.getElementById(`panel-${step}`);
    const prevPanel    = document.getElementById(`panel-${step - 1}`);
    const currentInd   = document.getElementById(`step-ind-${step}`);
    const prevInd      = document.getElementById(`step-ind-${step - 1}`);
    const connector    = document.getElementById(`conn-${step - 1}`);

    if (!prevPanel) return;

    if (currentPanel) {
        currentPanel.style.animation = 'fadeSlideOut 0.3s ease forwards';
        setTimeout(() => {
            currentPanel.classList.remove('active');
            currentPanel.style.animation = '';
            prevPanel.classList.add('active');
            prevPanel.style.animation = 'fadeSlideIn 0.4s ease forwards';
        }, 280);
    }

    if (currentInd) currentInd.classList.remove('active');

    if (prevInd) {
        prevInd.classList.remove('done');
        prevInd.classList.add('active');
        prevInd.querySelector('.step-circle').textContent = step - 1;
    }

    if (connector) connector.classList.remove('done');

    currentStep = step - 1;
}

/* ===== STEP VALIDATION ===== */
function validateStep(step) {
    const panel = document.getElementById(`panel-${step}`);
    if (!panel) return true;

    const required = panel.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
        removeFieldError(field);
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            valid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            valid = false;
        } else if (field.type === 'url' && !isValidUrl(field.value)) {
            showFieldError(field, 'Please enter a valid URL');
            valid = false;
        }
    });

    /* Password match check on step 1 */
    if (step === 1) {
        const pass    = document.getElementById('password');
        const confirm = document.getElementById('confirmPassword');
        if (pass && confirm && pass.value && confirm.value) {
            if (pass.value !== confirm.value) {
                showFieldError(confirm, 'Passwords do not match');
                valid = false;
            }
        }
    }

    if (!valid) {
        showToast('error', 'Validation Error',
            'Please fill in all required fields correctly.');
        /* Shake the form */
        const formCard = document.querySelector(
            '.form-card, .campaign-form-card'
        );
        if (formCard) {
            formCard.style.animation = 'shake 0.4s ease';
            setTimeout(() => formCard.style.animation = '', 400);
        }
    }

    return valid;
}

function showFieldError(field, message) {
    field.style.borderColor = 'var(--danger)';
    field.style.boxShadow   = '0 0 0 4px rgba(239,68,68,0.1)';

    const existing = field.parentElement.parentElement
        .querySelector('.field-error');
    if (existing) existing.remove();

    const error = document.createElement('div');
    error.className = 'field-error';
    error.style.cssText = `
        color: var(--danger);
        font-size: 0.78rem;
        font-weight: 600;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 4px;
    `;
    error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    field.parentElement.parentElement.appendChild(error);
}

function removeFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow   = '';
    const error = field.parentElement.parentElement
        .querySelector('.field-error');
    if (error) error.remove();
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/* ===== PASSWORD STRENGTH ===== */
function checkPasswordStrength(value) {
    const strengthWrap = document.getElementById('passStrength');
    const strengthText = document.getElementById('passStrengthText');
    const bars = [
        document.getElementById('bar1'),
        document.getElementById('bar2'),
        document.getElementById('bar3'),
        document.getElementById('bar4')
    ];

    if (!strengthWrap || !bars[0]) return;

    if (value.length === 0) {
        strengthWrap.style.display = 'none';
        return;
    }

    strengthWrap.style.display = 'block';

    let score = 0;
    if (value.length >= 8)              score++;
    if (/[A-Z]/.test(value))            score++;
    if (/[0-9]/.test(value))            score++;
    if (/[^A-Za-z0-9]/.test(value))     score++;

    /* Reset bars */
    bars.forEach(bar => {
        bar.className = 'pass-bar';
    });

    const levels = ['weak', 'weak', 'medium', 'strong'];
    const labels = ['Too Weak', 'Weak', 'Medium', 'Strong 💪'];
    const colors = ['weak', 'weak', 'medium', 'strong'];

    for (let i = 0; i < score; i++) {
        if (bars[i]) bars[i].classList.add(colors[score - 1]);
    }

    if (strengthText) {
        strengthText.textContent  = labels[score - 1] || 'Too Weak';
        strengthText.className    = `pass-strength-text ${colors[score - 1] || 'weak'}`;
    }
}

/* ===== TOGGLE PASSWORD VISIBILITY ===== */
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input || !btn) return;

    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    } else {
        input.type = 'password';
        if (icon) {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

/* ===== PLAN SELECTOR ===== */
function selectPlan(el, planName) {
    const allOptions = el.parentElement.querySelectorAll('.plan-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');

    const radio = el.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;

    showToast('info', 'Plan Selected',
        `You selected the ${planName.charAt(0).toUpperCase() +
        planName.slice(1)} plan.`);
}

/* ===== TIER SELECTOR (campaign) ===== */
function selectTier(el, tierName) {
    const allOptions = el.parentElement.querySelectorAll('.plan-option');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');

    const radio = el.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
}

/* ===== LOGIN TYPE SWITCH ===== */
function switchLoginType(type) {
    const creatorTab  = document.getElementById('creatorTab');
    const brandTab    = document.getElementById('brandTab');
    const loginText   = document.getElementById('loginTypeText');
    const signupLink  = document.getElementById('signupLink');

    if (type === 'creator') {
        if (creatorTab) creatorTab.classList.add('active');
        if (brandTab)   brandTab.classList.remove('active');
        if (loginText)  loginText.textContent = 'Creator';
        if (signupLink) {
            signupLink.textContent = 'Sign up as Creator';
            signupLink.href = 'creator-signup.html';
        }
    } else {
        if (brandTab)   brandTab.classList.add('active');
        if (creatorTab) creatorTab.classList.remove('active');
        if (loginText)  loginText.textContent = 'Brand';
        if (signupLink) {
            signupLink.textContent = 'Sign up as Brand';
            signupLink.href = 'brand-signup.html';
        }
    }
}

/* ===== FORM SUBMISSIONS ===== */

/* Creator Signup */
const creatorForm = document.getElementById('creatorSignupForm');
if (creatorForm) {
    creatorForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const terms = document.getElementById('terms');
        if (!terms || !terms.checked) {
            showToast('error', 'Terms Required',
                'Please accept the Terms of Service to continue.');
            return;
        }

        showLoading(
            'Creating your creator account...',
            'AI is setting up your profile and analyzing preferences'
        );

        await simulateDelay(2500);
        hideLoading();

        showToast('success', 'Account Created! 🎉',
            'Welcome to CreatorMatch! Redirecting to your dashboard...');

        setTimeout(() => {
            window.location.href = 'creator-dashboard.html';
        }, 2000);
    });
}

/* Brand Signup */
const brandForm = document.getElementById('brandSignupForm');
if (brandForm) {
    brandForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const terms = document.getElementById('terms');
        if (!terms || !terms.checked) {
            showToast('error', 'Terms Required',
                'Please accept the Terms of Service to continue.');
            return;
        }

        showLoading(
            'Creating your brand account...',
            'Setting up your ML dashboard and campaign tools'
        );

        await simulateDelay(2500);
        hideLoading();

        showToast('success', 'Brand Account Created! 🚀',
            'Welcome to CreatorMatch! Redirecting to your dashboard...');

        setTimeout(() => {
            window.location.href = 'brand-dashboard.html';
        }, 2000);
    });
}

/* Login Form */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email    = document.getElementById('loginEmail');
        const password = document.getElementById('loginPassword');
        const loginBtn = document.getElementById('loginBtn');

        if (!email || !password) return;

        if (!email.value.trim()) {
            showFieldError(email, 'Email is required');
            return;
        }

        if (!isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email');
            return;
        }

        if (!password.value.trim()) {
            showFieldError(password, 'Password is required');
            return;
        }

        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Signing in...';
        }

        showLoading('Signing you in...', 'Verifying credentials');

        await simulateDelay(2000);
        hideLoading();

        /* Determine redirect based on login type */
        const loginTypeText = document.getElementById('loginTypeText');
        const isCreator = loginTypeText &&
            loginTypeText.textContent === 'Creator';

        showToast('success', 'Welcome Back! 👋',
            `Signed in successfully. Redirecting to dashboard...`);

        setTimeout(() => {
            window.location.href = isCreator
                ? 'creator-dashboard.html'
                : 'brand-dashboard.html';
        }, 1800);
    });
}

/* Campaign Form */
const campaignForm = document.getElementById('campaignForm');
if (campaignForm) {
    campaignForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        showLoading(
            'AI is validating your campaign...',
            'Running budget validation and ML classification engine'
        );

        await simulateDelay(3000);
        hideLoading();

        showToast('success', 'Campaign Launched! 🚀',
            'AI is now finding the best creators for your campaign.');

        setTimeout(() => {
            window.location.href = 'recommendations.html';
        }, 2000);
    });
}

/* ===== BUDGET VALIDATION ===== */
async function validateBudget() {
    const budgetInput = document.getElementById('marketingBudget');
    const stockInput  = document.getElementById('stockAmount');

    if (!budgetInput || !budgetInput.value) {
        showFieldError(budgetInput, 'Please enter your marketing budget');
        showToast('error', 'Budget Required',
            'Please enter your marketing budget to continue.');
        return;
    }

    if (!stockInput || !stockInput.value) {
        showFieldError(stockInput, 'Please enter your stock amount');
        showToast('error', 'Stock Required',
            'Please enter your product stock to continue.');
        return;
    }

    const budget = parseFloat(budgetInput.value);
    const stock  = parseInt(stockInput.value);

    showLoading(
        'AI is validating your budget...',
        'Checking investment cap based on company age and revenue'
    );

    await simulateDelay(2200);
    hideLoading();

    /* Simulate investment cap check */
    const foundedYear   = document.getElementById('foundedYear');
    const companyAge    = foundedYear
        ? new Date().getFullYear() - parseInt(foundedYear.value || 2020)
        : 4;

    /* Investment cap formula:
       - Company < 2 years  : max 10% of estimated revenue
       - Company 2-5 years  : max 20% of estimated revenue
       - Company > 5 years  : max 30% of estimated revenue
       Simulated cap based on age */
    let capMultiplier = 0.1;
    if (companyAge >= 2 && companyAge <= 5) capMultiplier = 0.2;
    if (companyAge > 5)                     capMultiplier = 0.3;

    const estimatedRevenue = 50000 * companyAge;
    const investmentCap    = estimatedRevenue * capMultiplier;

    /* Update scale display */
    updateScaleDisplay(stock);

    if (budget <= investmentCap) {
        /* Budget approved */
        showToast('success', 'Budget Approved ✅',
            `Your budget of $${budget.toLocaleString()} is within ` +
            `your investment cap of $${investmentCap.toLocaleString()}.`);

        /* Go to step 3 directly (skip verification) */
        const panel2 = document.getElementById('panel-2');
        const panel3 = document.getElementById('panel-3');

        if (panel2 && panel3) {
            /* Show approved alert in panel 3 */
            const verifyAlert = panel3.querySelector('.verify-alert');
            if (verifyAlert) {
                verifyAlert.style.background = 'rgba(16,185,129,0.08)';
                verifyAlert.style.borderColor = 'rgba(16,185,129,0.25)';
                verifyAlert.querySelector('i').style.color = 'var(--success)';
                verifyAlert.querySelector('i').className =
                    'fas fa-check-circle';
                verifyAlert.querySelector('h5').style.color = 'var(--success)';
                verifyAlert.querySelector('h5').textContent =
                    'Budget Approved by AI';
                verifyAlert.querySelector('p').textContent =
                    `Your budget of $${budget.toLocaleString()} is within ` +
                    `your investment cap. You can launch your campaign now.`;
            }

            /* Hide verification fields */
            const verifyFields = panel3.querySelectorAll(
                '.form-row, .form-group:not(:last-child)'
            );
            verifyFields.forEach(f => {
                if (!f.querySelector('.verify-alert')) {
                    f.style.display = 'none';
                }
            });
        }

        nextStep(2);

    } else {
        /* Budget exceeds cap - need verification */
        showToast('warning', 'Verification Required ⚠️',
            `Budget exceeds standard cap. Please provide sales data.`);
        nextStep(2);
    }
}

/* ===== SCALE DISPLAY ===== */
function updateScaleDisplay(stock) {
    const preview   = document.getElementById('scalePreview');
    const scaleText = document.getElementById('scaleText');
    if (!preview || !scaleText) return;

    const qty = parseInt(stock);
    if (!qty || qty <= 0) {
        preview.style.display = 'none';
        return;
    }

    let scale = 'Small';
    let color = 'var(--success)';

    if (qty >= 100 && qty < 1000) {
        scale = 'Medium';
        color = 'var(--warning)';
    } else if (qty >= 1000) {
        scale = 'Large';
        color = 'var(--secondary)';
    }

    scaleText.textContent  = scale;
    scaleText.style.color  = color;
    preview.style.display  = 'block';
}

/* ===== BUDGET DISPLAY ===== */
function updateBudgetDisplay(value) {
    const budget = parseFloat(value);
    if (!budget || budget <= 0) return;

    /* Show formatted budget hint */
    const hint = document.querySelector('#marketingBudget')
        ?.parentElement?.parentElement?.querySelector('.form-hint');
    if (hint) {
        hint.innerHTML = `
            <i class="fas fa-shield-alt"></i>
            Budget: <strong style="color:white">
                $${budget.toLocaleString()}
            </strong> — Will be validated against your investment cap
        `;
    }
}

/* ===== TABLE FILTERS ===== */
function filterCreators(tier, btn) {
    /* Update active button */
    const allBtns = btn.parentElement.querySelectorAll('.filter-btn');
    allBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    /* Filter rows */
    const rows = document.querySelectorAll(
        '#creatorsTableBody tr, #recTableBody tr'
    );

    rows.forEach(row => {
        if (tier === 'all') {
            row.style.display = '';
        } else {
            row.style.display =
                row.dataset.tier === tier ? '' : 'none';
        }
    });

    /* Count visible */
    const visible = [...rows].filter(r => r.style.display !== 'none').length;
    showToast('info', 'Filter Applied',
        `Showing ${visible} ${tier === 'all' ? '' : tier + ' tier'} creators`);
}

function filterRec(tier, btn) {
    filterCreators(tier, btn);
}

/* ===== SEARCH CREATORS ===== */
function searchCreators(query) {
    const rows = document.querySelectorAll(
        '#creatorsTableBody tr, #recTableBody tr'
    );
    const q = query.toLowerCase().trim();

    rows.forEach(row => {
        const name   = row.querySelector('.creator-cell-name')
            ?.textContent.toLowerCase() || '';
        const handle = row.querySelector('.creator-cell-handle')
            ?.textContent.toLowerCase() || '';
        const niche  = row.cells[row.cells.length - 3]
            ?.textContent.toLowerCase() || '';

        row.style.display =
            (name.includes(q) || handle.includes(q) || niche.includes(q))
                ? '' : 'none';
    });
}

function searchRec(query) {
    searchCreators(query);
}

/* ===== SORT RECOMMENDATIONS ===== */
function sortRec(sortBy) {
    const tbody = document.getElementById('recTableBody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        if (sortBy === 'score') {
            return (parseInt(b.dataset.score) || 0) -
                   (parseInt(a.dataset.score) || 0);
        }
        if (sortBy === 'engagement') {
            const engA = parseFloat(
                a.querySelector('.score-bar-num')?.textContent || '0'
            );
            const engB = parseFloat(
                b.querySelector('.score-bar-num')?.textContent || '0'
            );
            return engB - engA;
        }
        if (sortBy === 'followers') {
            const getFollowers = (row) => {
                const text = row.cells[3]?.textContent || '0';
                return parseFloat(text.replace('K', '')) *
                    (text.includes('K') ? 1000 : 1);
            };
            return getFollowers(b) - getFollowers(a);
        }
        return 0;
    });

    rows.forEach(row => tbody.appendChild(row));

    showToast('info', 'Sorted',
        `Creators sorted by ${sortBy.charAt(0).toUpperCase() +
        sortBy.slice(1)}`);
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top +
                window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            closeMobileMenu();
        }
    });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ===== SIDEBAR TOGGLE (mobile) ===== */
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar       = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

/* Close sidebar on outside click (mobile) */
document.addEventListener('click', (e) => {
    if (sidebar && window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) &&
            !e.target.closest('#sidebarToggle')) {
            sidebar.classList.remove('open');
        }
    }
});

/* ===== FORM INPUT ANIMATIONS ===== */
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
        const wrap = input.closest('.input-wrap');
        if (wrap) {
            wrap.style.transform = 'scale(1.01)';
        }
        removeFieldError(input);
    });

    input.addEventListener('blur', () => {
        const wrap = input.closest('.input-wrap');
        if (wrap) {
            wrap.style.transform = 'scale(1)';
        }
    });
});

/* ===== RIPPLE EFFECT ON BUTTONS ===== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect   = this.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height);
        const x      = e.clientX - rect.left - size / 2;
        const y      = e.clientY - rect.top  - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.15);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleAnim 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

/* Add ripple keyframe */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleAnim {
        to { transform: scale(2.5); opacity: 0; }
    }
    @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%      { transform: translateX(-8px); }
        40%      { transform: translateX(8px); }
        60%      { transform: translateX(-4px); }
        80%      { transform: translateX(4px); }
    }
    @keyframes fadeSlideOut {
        from { opacity: 1; transform: translateX(0); }
        to   { opacity: 0; transform: translateX(-20px); }
    }
`;
document.head.appendChild(rippleStyle);

/* ===== SIMULATE API DELAY ===== */
function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ===== CHART HOVER EFFECTS ===== */
document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('mouseenter', () => {
        bar.style.filter = 'brightness(1.3)';
        bar.style.transform = 'scaleX(1.05)';
    });
    bar.addEventListener('mouseleave', () => {
        bar.style.filter = '';
        bar.style.transform = '';
    });
});

/* ===== FEATURE CARDS TILT EFFECT ===== */
document.querySelectorAll('.feature-card, .step-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) *  6;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) ` +
            `rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
    });
});

/* ===== CAMPAIGN CARD CLICK ===== */
document.querySelectorAll('.campaign-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('.btn')) return;
        card.style.transform = 'scale(0.98)';
        setTimeout(() => card.style.transform = '', 150);
    });
});

/* ===== PRICING CARD HOVER ===== */
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-8px)';
        }
    });
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = '';
        }
    });
});

/* ===== PLAN OPTION HOVER ===== */
document.querySelectorAll('.plan-option').forEach(option => {
    option.addEventListener('mouseenter', () => {
        if (!option.classList.contains('selected')) {
            option.style.borderColor = 'rgba(124,58,237,0.4)';
            option.style.background  = 'rgba(124,58,237,0.06)';
        }
    });
    option.addEventListener('mouseleave', () => {
        if (!option.classList.contains('selected')) {
            option.style.borderColor = '';
            option.style.background  = '';
        }
    });
});

/* ===== SIDEBAR LINK ACTIVE STATE ===== */
const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

/* ===== TOPBAR ICON BUTTONS ===== */
document.querySelectorAll('.topbar-icon-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.85)';
        setTimeout(() => this.style.transform = '', 150);

        const icon = this.querySelector('i');
        if (!icon) return;

        if (icon.classList.contains('fa-bell')) {
            showToast('info', 'Notifications',
                'You have 3 new notifications.');
        } else if (icon.classList.contains('fa-search')) {
            showToast('info', 'Search',
                'Search functionality coming soon!');
        } else if (icon.classList.contains('fa-sync-alt')) {
            showToast('info', 'Refreshing',
                'AI is re-running the recommendation engine...');
            setTimeout(() => {
                showToast('success', 'Updated',
                    'Creator rankings have been refreshed!');
            }, 2500);
        }
    });
});

/* ===== CONTACT CREATOR BUTTONS ===== */
document.querySelectorAll('.data-table .btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const row         = this.closest('tr');
        const creatorName = row?.querySelector('.creator-cell-name')
            ?.textContent || 'Creator';

        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            this.disabled = false;
            this.innerHTML = 'Contacted ✓';
            this.classList.remove('btn-primary');
            this.style.background = 'rgba(16,185,129,0.15)';
            this.style.color      = 'var(--success)';
            this.style.border     = '1px solid rgba(16,185,129,0.3)';

            showToast('success', 'Outreach Sent! 📧',
                `Contact request sent to ${creatorName} successfully.`);
        }, 1500);
    });
});

/* ===== EXPORT CSV ===== */
document.querySelectorAll('.btn-ghost').forEach(btn => {
    if (btn.textContent.includes('Export')) {
        btn.addEventListener('click', () => {
            showToast('success', 'Exporting CSV',
                'Creator list is being downloaded...');

            const csvData = generateCSV();
            const blob    = new Blob([csvData], { type: 'text/csv' });
            const url     = URL.createObjectURL(blob);
            const a       = document.createElement('a');
            a.href        = url;
            a.download    = 'creator-matches.csv';
            a.click();
            URL.revokeObjectURL(url);
        });
    }
});

function generateCSV() {
    const headers = [
        'Rank', 'Name', 'Handle', 'Tier',
        'Followers', 'Engagement', 'Niche', 'Match Score'
    ];

    const rows = [
        [1, 'Aryan Kumar',  '@aryantech',    'Mid',   '124.5K', '8.4%', 'Technology', '94%'],
        [2, 'Priya Sharma', '@priyatech',    'Large', '892K',   '7.2%', 'Technology', '89%'],
        [3, 'Rahul Verma',  '@rahulreviews', 'Micro', '28.3K',  '9.6%', 'Technology', '81%'],
        [4, 'Neha Kapoor',  '@nehatech',     'Mid',   '210K',   '6.8%', 'Technology', '78%'],
        [5, 'Siddharth M',  '@sidtech',      'Micro', '42.1K',  '8.8%', 'Technology', '71%']
    ];

    return [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
}

/* ===== SCROLL TO TOP BUTTON ===== */
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 32px;
    width: 44px;
    height: 44px;
    background: var(--gradient);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    z-index: 999;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(124,58,237,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.style.opacity   = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollTopBtn.style.opacity   = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== KEYBOARD SHORTCUTS ===== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
        hideLoading();
    }
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.focus();
            showToast('info', 'Search Active',
                'Type to search creators...');
        }
    }
});

/* ===== FORM AUTO SAVE ===== */
function autoSaveForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    /* Restore saved data */
    const saved = localStorage.getItem(`form_${formId}`);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`#${key}`);
                if (field && field.type !== 'password') {
                    field.value = data[key];
                }
            });
        } catch(e) {
            console.warn('Could not restore form data');
        }
    }

    /* Save on input */
    form.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const formData = {};
            form.querySelectorAll('input, select, textarea').forEach(f => {
                if (f.type !== 'password' && f.id) {
                    formData[f.id] = f.value;
                }
            });
            localStorage.setItem(
                `form_${formId}`,
                JSON.stringify(formData)
            );
        });
    });
}

/* Init auto save on signup forms */
autoSaveForm('creatorSignupForm');
autoSaveForm('brandSignupForm');
autoSaveForm('campaignForm');

/* ===== CLEAR FORM SAVE ON SUBMIT ===== */
['creatorSignupForm', 'brandSignupForm', 'campaignForm'].forEach(id => {
    const form = document.getElementById(id);
    if (form) {
        form.addEventListener('submit', () => {
            localStorage.removeItem(`form_${id}`);
        });
    }
});

/* ===== RIPPLE EFFECT ON BUTTONS ===== */
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple  = document.createElement('span');
        const rect    = this.getBoundingClientRect();
        const size    = Math.max(rect.width, rect.height);
        const x       = e.clientX - rect.left - size / 2;
        const y       = e.clientY - rect.top  - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.15);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleAnim 0.6s ease-out forwards;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

/* ===== INJECT KEYFRAMES ===== */
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    @keyframes rippleAnim {
        to { transform: scale(2.5); opacity: 0; }
    }
    @keyframes shake {
        0%,100% { transform: translateX(0); }
        20%      { transform: translateX(-8px); }
        40%      { transform: translateX(8px); }
        60%      { transform: translateX(-4px); }
        80%      { transform: translateX(4px); }
    }
    @keyframes fadeSlideOut {
        from { opacity: 1; transform: translateX(0); }
        to   { opacity: 0; transform: translateX(-20px); }
    }
    .sidebar-link.active {
        background: rgba(124,58,237,0.12) !important;
        color: var(--primary-light) !important;
        border-color: rgba(124,58,237,0.3) !important;
    }
    .nav-links a.active {
        color: var(--primary-light) !important;
    }
    .btn-success {
        background: rgba(16,185,129,0.15);
        color: var(--success);
        border: 1px solid rgba(16,185,129,0.3);
    }
`;
document.head.appendChild(extraStyles);

/* ===== FEATURE CARDS TILT EFFECT ===== */
document.querySelectorAll('.feature-card, .step-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect    = card.getBoundingClientRect();
        const x       = e.clientX - rect.left;
        const y       = e.clientY - rect.top;
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) *  6;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) ` +
            `rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.5s ease';
    });
});

/* ===== LAZY LOAD IMAGES ===== */
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src   = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/* ===== THEME DETECTION ===== */
document.documentElement.setAttribute('data-theme', 'dark');

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href   = anchor.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top    = target.getBoundingClientRect().top +
                window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            closeMobileMenu();
        }
    });
});

/* ===== ACTIVE NAV ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ===== SIDEBAR MOBILE TOGGLE ===== */
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar       = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
}

document.addEventListener('click', (e) => {
    if (sidebar && window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) &&
            !e.target.closest('#sidebarToggle')) {
            sidebar.classList.remove('open');
        }
    }
});

/* ===== FORM INPUT FOCUS ANIMATIONS ===== */
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
        const wrap = input.closest('.input-wrap');
        if (wrap) {
            wrap.style.transform  = 'scale(1.01)';
            wrap.style.transition = 'transform 0.2s ease';
        }
        removeFieldError(input);
    });

    input.addEventListener('blur', () => {
        const wrap = input.closest('.input-wrap');
        if (wrap) {
            wrap.style.transform = 'scale(1)';
        }
    });

    /* Real time validation */
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.style.borderColor = '';
            input.style.boxShadow   = '';
            const error = input.parentElement?.parentElement
                ?.querySelector('.field-error');
            if (error) error.remove();
        }
    });
});

/* ===== SIMULATE API DELAY ===== */
function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ===== CHART BAR HOVER ===== */
document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('mouseenter', () => {
        bar.style.filter    = 'brightness(1.3)';
        bar.style.transform = 'scaleX(1.05)';
        bar.style.transition = 'all 0.2s ease';

        /* Show tooltip */
        const tooltip = bar.querySelector('.bar-tooltip');
        if (tooltip) {
            tooltip.style.opacity   = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-4px)';
        }
    });

    bar.addEventListener('mouseleave', () => {
        bar.style.filter    = '';
        bar.style.transform = '';

        const tooltip = bar.querySelector('.bar-tooltip');
        if (tooltip) {
            tooltip.style.opacity   = '';
            tooltip.style.transform = '';
        }
    });
});

/* ===== SCORE BREAKDOWN TOOLTIP ===== */
document.querySelectorAll('.score-breakdown').forEach(wrap => {
    const tooltip = wrap.querySelector('.score-breakdown-tooltip');
    if (!tooltip) return;

    wrap.addEventListener('mouseenter', () => {
        tooltip.style.opacity        = '1';
        tooltip.style.pointerEvents  = 'all';
        tooltip.style.transform      = 'translateY(0)';
    });

    wrap.addEventListener('mouseleave', () => {
        tooltip.style.opacity        = '0';
        tooltip.style.pointerEvents  = 'none';
        tooltip.style.transform      = 'translateY(8px)';
    });
});

/* ===== DONUT CHART ANIMATION ===== */
function animateDonut() {
    const donuts = document.querySelectorAll(
        '#donut1, #donut2, #donut3'
    );

    donuts.forEach(donut => {
        const finalDashOffset = donut.style.strokeDashoffset ||
            donut.getAttribute('stroke-dashoffset');
        donut.style.strokeDashoffset = '339.3';
        donut.style.transition =
            'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';

        setTimeout(() => {
            donut.style.strokeDashoffset = finalDashOffset;
        }, 300);
    });
}

/* Observe donut charts */
const donutCharts = document.querySelectorAll('.donut-chart');
if (donutCharts.length) {
    const donutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateDonut();
                donutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    donutCharts.forEach(d => donutObserver.observe(d));
}

/* ===== BAR CHART ANIMATION ===== */
function animateBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, i) => {
        const finalHeight = bar.style.height;
        bar.style.height     = '0%';
        bar.style.transition = `height 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`;

        setTimeout(() => {
            bar.style.height = finalHeight;
        }, 100);
    });
}

/* Observe bar charts */
const barCharts = document.querySelectorAll('.bar-chart');
if (barCharts.length) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBars();
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    barCharts.forEach(b => barObserver.observe(b));
}

/* ===== HERO FLOATING CARDS ANIMATION ===== */
function initFloatingCards() {
    const cards = document.querySelectorAll('.hero-card-float');
    cards.forEach((card, i) => {
        card.style.animation =
            `floatCard ${3 + i * 0.5}s ease-in-out infinite`;
        card.style.animationDelay = `${i * 0.4}s`;
    });
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatCard {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33%       { transform: translateY(-8px) rotate(1deg); }
        66%       { transform: translateY(-4px) rotate(-1deg); }
    }
`;
document.head.appendChild(floatStyle);
initFloatingCards();

/* ===== HERO VISUAL RINGS ===== */
function initRings() {
    const rings = document.querySelectorAll('.ring');
    rings.forEach((ring, i) => {
        ring.style.animation =
            `ringPulse ${2 + i}s ease-in-out infinite`;
        ring.style.animationDelay = `${i * 0.5}s`;
    });
}

const ringStyle = document.createElement('style');
ringStyle.textContent = `
    @keyframes ringPulse {
        0%, 100% { transform: scale(1);   opacity: 0.3; }
        50%       { transform: scale(1.1); opacity: 0.6; }
    }
`;
document.head.appendChild(ringStyle);
initRings();

/* ===== CAMPAIGN CARD HOVER ===== */
document.querySelectorAll('.campaign-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform  = 'translateY(-6px)';
        card.style.boxShadow  =
            '0 20px 60px rgba(124,58,237,0.2),' +
            '0 0 0 1px rgba(124,58,237,0.2)';
        card.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

/* ===== JOIN CARD HOVER ===== */
document.querySelectorAll('.join-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform  = 'translateY(-8px)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ===== STAT CARD HOVER ===== */
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.stat-card-icon');
        if (icon) {
            icon.style.transform  = 'scale(1.15) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.stat-card-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

/* ===== FEATURE CARD ICON HOVER ===== */
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform  = 'scale(1.1) rotate(-5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

/* ===== STEP CARD HOVER ===== */
document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const num = card.querySelector('.step-num');
        if (num) {
            num.style.transform  = 'scale(1.2)';
            num.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', () => {
        const num = card.querySelector('.step-num');
        if (num) num.style.transform = '';
    });
});

/* ===== SOCIAL BUTTONS ===== */
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.transform  = 'scale(0.85) rotate(10deg)';
        btn.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
        showToast('info', 'Social Link',
            'Social media link coming soon!');
    });
});

/* ===== FOOTER LINKS ===== */
document.querySelectorAll('.footer-col a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            showToast('info', 'Coming Soon',
                'This page is under construction!');
        }
    });
});

/* ===== WINDOW RESIZE HANDLER ===== */
window.addEventListener('resize', () => {
    /* Close mobile menu on resize to desktop */
    if (window.innerWidth > 768) {
        closeMobileMenu();
        if (sidebar) sidebar.classList.remove('open');
    }
});

/* ===== PAGE VISIBILITY ===== */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back! - CreatorMatch AI';
    } else {
        document.title = document.querySelector('title')
            ?.dataset.original || 'CreatorMatch AI';
    }
});

/* Save original title */
const titleEl = document.querySelector('title');
if (titleEl) titleEl.dataset.original = titleEl.textContent;

/* ===== INIT ALL ON DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {

    /* Animate score ring */
    animateScoreRing('scoreRingFill', 87);

    /* Animate progress bars */
    setTimeout(animateProgressBars, 400);

    /* Init particles on hero */
    initParticles();

    /* Init typing effect */
    initTypingEffect();

    /* Show dashboard welcome toast */
    const isDashboard = document.querySelector('.dashboard-layout');
    if (isDashboard) {
        setTimeout(() => {
            showToast(
                'success',
                'AI Engine Ready ⚡',
                'Your ML recommendation engine is active and running.'
            );
        }, 1500);
    }

    /* Show form page hint */
    const isFormPage = document.querySelector('.form-page');
    if (isFormPage) {
        setTimeout(() => {
            showToast(
                'info',
                'Quick Tip 💡',
                'Fill in all fields accurately for better AI matching.'
            );
        }, 2000);
    }

    /* Animate bars on load */
    setTimeout(animateBars, 500);

    /* Animate donuts on load */
    setTimeout(animateDonut, 600);

    console.log('%c⚡ CreatorMatch AI Loaded',
        'color:#a78bfa;font-size:16px;font-weight:900;' +
        'background:#0a0a0f;padding:8px 16px;border-radius:8px;' +
        'border:1px solid #7c3aed');

    console.log('%cML Engine • Active | Version 1.0.0',
        'color:#6b7280;font-size:12px;padding:4px 16px');
});

/* ===== PROGRESS BARS ANIMATION FUNCTION ===== */
function animateProgressBars() {
    const bars = document.querySelectorAll(
        '.progress-bar-fill, .score-bar-fill, .breakdown-bar-fill'
    );

    bars.forEach((bar, i) => {
        const targetWidth = bar.style.width;
        bar.style.width      = '0%';
        bar.style.transition =
            `width 1s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`;

        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 200);
    });
}

/* ===== FINAL CONSOLE MESSAGE ===== */
console.log('%c🤖 AI Matching Engine',
    'color:#ec4899;font-size:14px;font-weight:700;' +
    'background:#0a0a0f;padding:6px 12px;border-radius:6px');

console.log('%cScore Formula: Engagement(40%) + Niche(30%) + Audience(20%) + Followers(10%)',
    'color:#6b7280;font-size:11px;padding:2px 12px');