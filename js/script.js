// ===========================
// ナビゲーション
// ===========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// スクロール時のナビゲーションスタイル変更
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ハンバーガーメニュー
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ナビゲーションリンククリック時
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // モバイルメニューを閉じる
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // スムーズスクロール
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // アクティブクラスの切り替え
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===========================
// パララックス効果
// ===========================
const parallaxSections = document.querySelectorAll('.parallax-section');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrolled;
        const sectionHeight = section.offsetHeight;
        
        // セクションが画面内にある場合
        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const parallaxSpeed = 0.5;
            const yPos = -(scrolled - sectionTop) * parallaxSpeed;
            section.style.backgroundPosition = `center ${yPos}px`;
        }
    });
});

// ===========================
// スクロールアニメーション
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// フェードインアニメーション要素を監視
const fadeInElements = document.querySelectorAll('.fade-in-up');
fadeInElements.forEach(element => {
    observer.observe(element);
});

// ===========================
// スムーズスクロール（全体）
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetId = href;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// フォーム送信
// ===========================
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // フォームデータの取得
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // バリデーション
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
        alert('すべての項目を入力してください。');
        return;
    }
    
    // メールアドレスの簡易バリデーション
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
        alert('正しいメールアドレスを入力してください。');
        return;
    }
    
    // 電話番号の簡易バリデーション
    const phonePattern = /^[\d-]+$/;
    if (!phonePattern.test(formData.phone)) {
        alert('正しい電話番号を入力してください。');
        return;
    }
    
    // フォーム送信成功のシミュレーション
    console.log('フォーム送信データ:', formData);
    
    // ユーザーへのフィードバック
    alert('ご予約を承りました。\n確認のメールをお送りいたしますので、しばらくお待ちください。\nありがとうございます！');
    
    // フォームのリセット
    reservationForm.reset();
});

// ===========================
// ギャラリーアイテムのホバー効果強化
// ===========================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===========================
// スクロール進捗インジケーター（オプション）
// ===========================
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// スクロール進捗バーを有効化
createScrollProgress();

// ===========================
// ページ読み込み時のアニメーション
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// アクティブセクションの検出
// ===========================
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===========================
// パフォーマンス最適化：デバウンス関数
// ===========================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// デバウンスされたスクロールイベント
const debouncedScroll = debounce(() => {
    setActiveNav();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===========================
// 料金カードのアニメーション強化
// ===========================
const priceCards = document.querySelectorAll('.price-card');

priceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ===========================
// CTAボタンのクリック追跡（アナリティクス用）
// ===========================
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('CTA ボタンがクリックされました');
        // ここにGoogle Analyticsなどのトラッキングコードを追加できます
    });
});

// ===========================
// 初期化
// ===========================
console.log('Nail Salon Website Initialized');
console.log('パララックス効果、スクロールアニメーション、フォーム送信機能が有効です');
