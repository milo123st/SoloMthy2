document.addEventListener("DOMContentLoaded", () => {
    // أنميشن اللوجو
    const logo = document.getElementById("mainLogo");
    if (logo) {
        logo.addEventListener("animationend", () => {
            logo.style.animation = "none";
            logo.offsetHeight;
            logo.style.animation = "logoPop 0.6s ease-out";
        });
    }

    // التنقل بين الصفحات عبر الشريط السفلي
    const navItems = document.querySelectorAll('.nav-item');
    const pages = {
        home: document.getElementById('page-home'),
        skills: document.getElementById('page-skills'),
        work: document.getElementById('page-work'),
        only: document.getElementById('page-only'),
        contact: document.getElementById('page-contact')
    };
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            this.style.animation = 'none';
            this.offsetHeight;
            this.style.animation = 'clickPop 0.3s ease';
            
            Object.values(pages).forEach(page => {
                page.classList.remove('active-page');
                page.style.display = 'none';
            });
            
            const target = this.dataset.target;
            if (pages[target]) {
                pages[target].style.display = 'block';
                setTimeout(() => {
                    pages[target].classList.add('active-page');
                }, 10);
            }
        });
    });

    // زر "Wish and Believe I will Achieve" → يذهب لصفحة التواصل
    const wishBtn = document.getElementById('contactBtn');
    wishBtn.addEventListener('click', function() {
        Object.values(pages).forEach(page => {
            page.classList.remove('active-page');
            page.style.display = 'none';
        });
        
        const contactPage = document.getElementById('page-contact');
        contactPage.style.display = 'block';
        setTimeout(() => {
            contactPage.classList.add('active-page');
        }, 10);
        
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[data-target="contact"]').classList.add('active');
    });

    // ===== تشغيل الفيديوهات تلقائياً عند ظهورها =====
    const videos = document.querySelectorAll(".work-item video");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => {});
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.5 });

    videos.forEach(video => {
        observer.observe(video);
        // عند تحميل الفيديو
        video.addEventListener('loadeddata', function() {
            this.play().catch(e => {});
        });
    });

    // ===== صفحة Only SoloMyth =====
    const onlyPage = document.getElementById('page-only');
    const passwordInput = document.getElementById('passwordInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const errorMessage = document.getElementById('errorMessage');
    const onlyContent = document.getElementById('onlyContent');
    const logoutBtn = document.getElementById('logoutBtn');

    // كلمة المرور الصحيحة
    const CORRECT_PASSWORD = "Dhmz#122";

    // عند الضغط على زر Unlock
    unlockBtn.addEventListener('click', function() {
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === CORRECT_PASSWORD) {
            // كلمة المرور صحيحة
            errorMessage.style.display = 'none';
            passwordInput.style.display = 'none';
            unlockBtn.style.display = 'none';
            onlyContent.style.display = 'block';
        } else {
            // كلمة المرور خاطئة
            errorMessage.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
            // اهتزاز بسيط
            passwordInput.style.animation = 'shake 0.3s ease';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 300);
        }
    });

    // عند الضغط على Enter في حقل الباسورد
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            unlockBtn.click();
        }
    });

    // زر Logout
    logoutBtn.addEventListener('click', function() {
        onlyContent.style.display = 'none';
        passwordInput.style.display = 'block';
        unlockBtn.style.display = 'block';
        passwordInput.value = '';
        errorMessage.style.display = 'none';
        
        // الرجوع للصفحة الرئيسية
        Object.values(pages).forEach(page => {
            page.classList.remove('active-page');
            page.style.display = 'none';
        });
        pages.home.style.display = 'block';
        setTimeout(() => {
            pages.home.classList.add('active-page');
        }, 10);
        navItems.forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[data-target="home"]').classList.add('active');
    });

    // ===== عداد المشاهدات =====
    const viewsElement = document.getElementById('viewsCount');
    const viewsSection = document.querySelector('.views-section');

    function animateCounter() {
        let current = 0;
        const target = 90; // 90 مليون
        const duration = 800; // 0.8 ثانية
        const steps = 60;
        const increment = target / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            current += increment;
            if (step >= steps) {
                current = target;
                clearInterval(timer);
            }
            viewsElement.textContent = Math.floor(current);
        }, duration / steps);
    }

    // عمل Observer عشان العداد يشتغل لما القسم يظهر عند التمرير
    const viewsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                viewsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (viewsSection) {
        viewsObserver.observe(viewsSection);
    }

    // ===== عداد زوار الموقع (يعمل عند تحميل أي صفحة) =====
    fetch('https://api.countapi.xyz/hit/solomyth/website-visitors')
        .then(response => response.json())
        .then(data => {
            document.getElementById('siteVisitors').textContent = data.value;
        })
        .catch(() => {
            document.getElementById('siteVisitors').textContent = '--';
        });

    // ===== نظام الترجمة =====
    const translations = {
        en: {
            home: "Home",
            skills: "Skills",
            work: "My Work",
            only: "Only SoloMyth",
            contact: "Contact",
            hi: "Hi Im, SoloMyth",
            role: "VFX Artist, Video Editor, Animator",
            wish: "Wish and Believe I will Achieve",
            clientsLabel: "Clients & Collaborators",
            description: "Mastering the art of the 'unbelievable.' I create immersive visual worlds where advanced VFX and rhythmic storytelling collide, making even the most impossible imagination feel undeniably real.",
            viewsLabel: "Total Views",
            onlyTitle: "Only SoloMyth",
            onlyPass: "Enter password to access exclusive content",
            unlock: "Unlock",
            wrongPass: "Wrong password!",
            logout: "Logout",
            specialMsg: "🌟 Special Message",
            thanks1: "First, I want to thank <strong>SoloMyth</strong> for trusting me to build this website.",
            thanks2: "Secondly, thank you for liking the site.",
            upcoming: "You will need some things later:",
            update: "Lifetime free updates",
            version: "Current version: 0.2 (first update)",
            info: "Dangerous info will be created here later (visits count, users, etc.)",
            gifts: "Gifts for you and your collaborators will be added later",
            final: "That's all, every thing 🫡",
            contactTitle: "All ways to contact <span class='highlight'>SoloMyth</span>",
            contactSub: "Contact me through the following channels",
            copyright: "made by milo"
        },
        ar: {
            home: "الرئيسية",
            skills: "المهارات",
            work: "أعمالي",
            only: "فقط SoloMyth",
            contact: "التواصل",
            hi: "أهلاً، أنا SoloMyth",
            role: "فنان مؤثرات بصرية، محرر فيديو، أنيميشن",
            wish: "تمنى وصدق سأحقق",
            clientsLabel: "العملاء والمتعاونون",
            description: "أتقن فن 'اللامعقول'. أصنع عوالم بصرية غامرة حيث تتصادم المؤثرات البصرية المتقدمة والسرد الإيقاعي، مما يجعل حتى الخيال المستحيل يبدو حقيقياً بشكل لا يقبل الجدل.",
            viewsLabel: "إجمالي المشاهدات",
            onlyTitle: "فقط SoloMyth",
            onlyPass: "أدخل كلمة المرور للوصول للمحتوى الحصري",
            unlock: "فتح",
            wrongPass: "كلمة مرور خاطئة!",
            logout: "خروج",
            specialMsg: "🌟 رسالة خاصة",
            thanks1: "أولاً، حابب أشكر <strong>SoloMyth</strong> إنه وثق فيي إني أعمل له الموقع.",
            thanks2: "ثانياً، شكراً لأن الموقع عجبك.",
            upcoming: "عندك بعض الحاجات اللي هتحتاجها فيما بعد:",
            update: "تحديث مدى الحياة مجاني",
            version: "الإصدار الحالي: 0.2 (التحديث الأول)",
            info: "معلومات خطيرة هتتم إنشاؤها في الصفحة دي بعدين (عدد الزيارات وعدد المستخدمين)",
            gifts: "هدايا لك وللمتعاونين معك هتضاف فيما بعد",
            final: "وبس، دي كل حاجة 🫡",
            contactTitle: "كل وسائل التواصل مع <span class='highlight'>SoloMyth</span>",
            contactSub: "تواصل معي عبر القنوات التالية",
            copyright: "صنع بواسطة ميلو"
        }
    };

    let currentLang = 'en';

    function applyLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        // تحديث النصوص حسب الـ ID
        document.getElementById('langText').textContent = lang === 'en' ? 'English' : 'العربية';
        
        // الشريط السفلي
        document.querySelectorAll('.nav-item span').forEach(el => {
            const key = el.parentElement.dataset.target;
            if (t[key]) el.textContent = t[key];
        });
        
        // الصفحة الرئيسية - عناصر data-i18n
        document.querySelectorAll('#page-home [data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) {
                if (el.tagName === 'BUTTON') {
                    el.textContent = t[key];
                } else {
                    el.innerHTML = t[key];
                }
            }
        });
        
        // صفحة المهارات (العنوان فقط)
        const skillsTitle = document.querySelector('#page-skills .glitch-text .highlight');
        if (skillsTitle) skillsTitle.textContent = t.skills;
        
        // صفحة الأعمال (العنوان فقط)
        const workTitle = document.querySelector('#page-work .glitch-text .highlight');
        if (workTitle) workTitle.textContent = t.work;
        
        // صفحة Only SoloMyth
        const onlyTitle = document.querySelector('#page-only .glitch-text .highlight');
        if (onlyTitle) onlyTitle.textContent = t.onlyTitle;
        const onlyPassEl = document.querySelector('#page-only .role');
        if (onlyPassEl) onlyPassEl.textContent = t.onlyPass;
        const unlockBtn = document.querySelector('#unlockBtn');
        if (unlockBtn) unlockBtn.textContent = t.unlock;
        const logoutBtn = document.querySelector('#logoutBtn');
        if (logoutBtn) logoutBtn.textContent = t.logout;
        const errorMsg = document.getElementById('errorMessage');
        if (errorMsg) errorMsg.textContent = t.wrongPass;
        
        // المحتوى الحصري - عناصر data-i18n
        document.querySelectorAll('#onlyContent [data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) {
                if (el.tagName === 'H2') {
                    el.textContent = t[key];
                } else {
                    el.innerHTML = t[key];
                }
            }
        });
        
        // صفحة التواصل
        const contactTitle = document.querySelector('#page-contact .glitch-text');
        if (contactTitle) contactTitle.innerHTML = t.contactTitle;
        const contactSub = document.querySelector('#page-contact .role');
        if (contactSub) contactSub.textContent = t.contactSub;
        
        // حقوق النشر
        const copyright = document.querySelector('.copyright a');
        if (copyright) copyright.textContent = t.copyright;
        
        // تحديث اتجاه الصفحة للعربي
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    }

    // زر الترجمة
    const langBtn = document.getElementById('langBtn');
    langBtn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        applyLanguage(newLang);
    });
});