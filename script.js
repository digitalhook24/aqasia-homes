// Header scroll effect
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navUl = document.querySelector('nav ul');

mobileMenu.addEventListener('click', () => {
    if (navUl.style.display === 'flex') {
        navUl.style.display = 'none';
    } else {
        navUl.style.display = 'flex';
        navUl.style.flexDirection = 'column';
        navUl.style.position = 'absolute';
        navUl.style.top = '100%';
        navUl.style.left = '0';
        navUl.style.right = '0';
        navUl.style.background = '#fff';
        navUl.style.padding = '20px';
        navUl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        navUl.style.gap = '15px';
        navUl.querySelectorAll('a').forEach(a => a.style.color = '#2b2a29');
    }
});

// Modal functions
function openModal(e, type) {
    if (e) e.preventDefault();
    const modal = document.getElementById('modal');
    const title = document.getElementById('modal-title');
    const titles = { 
        enquire: 'Enquire Now',
        floorplan: 'Contact Us'
    };
    title.textContent = titles[type] || 'Contact Us';
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.classList.remove('active');
    }
}

// Smooth scroll for section links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Skip plain # links (handled by onclick)
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile menu after clicking
        if (window.innerWidth <= 968) {
            navUl.style.display = 'none';
        }
    });
});






(function () {
  // ===== AMENITIES CAROUSEL =====
  var track = document.getElementById('galleryTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dotsC = document.getElementById('navDots');
  var cards = track.querySelectorAll('.gallery-card');
  var gap = 20;
  var page = 0;

  function vis1() {
    return window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function pages1() {
    return Math.max(1, cards.length - vis1() + 1);
  }

  function buildDots() {
    dotsC.innerHTML = '';
    for (var i = 0; i < pages1(); i++) {
      var d = document.createElement('button');
      d.className = 'nav-dot' + (i === page ? ' active' : '');
      d.addEventListener(
        'click',
        (function (idx) {
          return function () {
            go1(idx);
          };
        })(i)
      );
      dotsC.appendChild(d);
    }
  }

  function go1(p) {
    page = Math.max(0, Math.min(p, pages1() - 1));
    track.style.transform =
      'translateX(-' + page * (cards[0].offsetWidth + gap) + 'px)';
    dotsC.querySelectorAll('.nav-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === page);
    });
  }

  prevBtn.addEventListener('click', function () {
    go1(page - 1);
  });
  nextBtn.addEventListener('click', function () {
    go1(page + 1);
  });

  // Touch support
  var sx1 = 0;
  track.addEventListener(
    'touchstart',
    function (e) {
      sx1 = e.touches[0].clientX;
    },
    { passive: true }
  );
  track.addEventListener('touchend', function (e) {
    var d = sx1 - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) go1(page + (d > 0 ? 1 : -1));
  });

  function init1() {
    page = 0;
    buildDots();
    go1(0);
  }

  // Auto-slide every 1 second
  var a1 = setInterval(function () {
    page < pages1() - 1 ? go1(page + 1) : go1(0);
  }, 1000);

  track.addEventListener('mouseenter', function () {
    clearInterval(a1);
  });
  track.addEventListener('mouseleave', function () {
    a1 = setInterval(function () {
      page < pages1() - 1 ? go1(page + 1) : go1(0);
    }, 1000);
  });

  window.addEventListener('resize', init1);
  init1();

  // ===== GALLERY 2 CAROUSEL =====
  var t2 = document.getElementById('gallery2Track');
  var p2Btn = document.getElementById('prev2Btn');
  var n2Btn = document.getElementById('next2Btn');
  var c2 = t2.querySelectorAll('.gallery2-card');
  var g2 = 24;
  var pg2 = 0;

  function vis2() {
    return window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
  }

  function pages2() {
    return Math.max(1, c2.length - vis2() + 1);
  }

  function go2(p) {
    pg2 = Math.max(0, Math.min(p, pages2() - 1));
    var cardW = c2[0].getBoundingClientRect().width;
    t2.style.transform =
      'translateX(-' + (pg2 * (cardW + g2)) + 'px)';
    c2.forEach(function (c, i) {
      var v = vis2();
      c.classList.toggle(
        'center-card',
        i === pg2 + Math.floor(v / 2) && v >= 3
      );
    });
  }

  p2Btn.addEventListener('click', function () {
    go2(pg2 - 1);
  });
  n2Btn.addEventListener('click', function () {
    go2(pg2 + 1);
  });

  // Touch support
  var sx2 = 0;
  t2.addEventListener(
    'touchstart',
    function (e) {
      sx2 = e.touches[0].clientX;
    },
    { passive: true }
  );
  t2.addEventListener('touchend', function (e) {
    var d = sx2 - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) go2(pg2 + (d > 0 ? 1 : -1));
  });

  // Auto-slide every 4 seconds (slower)
  var a2 = setInterval(function () {
    pg2 < pages2() - 1 ? go2(pg2 + 1) : go2(0);
  }, 4000);

  t2.addEventListener('mouseenter', function () {
    clearInterval(a2);
  });
  t2.addEventListener('mouseleave', function () {
    a2 = setInterval(function () {
      pg2 < pages2() - 1 ? go2(pg2 + 1) : go2(0);
    }, 4000);
  });

  window.addEventListener('resize', function () {
    go2(pg2);
  });
  go2(0);

  // ===== LIGHTBOX =====
  var lb = document.getElementById('galleryLightbox');
  var lbC = document.getElementById('lbContent');
  var lbIdx = 0;

  function lbOpen(i) {
    lbIdx = i;
    lbShow();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function lbCloseF() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
  }

  function lbShow() {
    var img = c2[lbIdx].querySelector('img');
    if (img) {
      lbC.innerHTML =
        '<img src="' + img.src + '" alt="' + img.alt + '">';
    }
  }

  function lbGo(dir) {
    lbIdx = (lbIdx + dir + c2.length) % c2.length;
    lbShow();
  }

  // Click to open
  c2.forEach(function (card, i) {
    card.addEventListener('click', function () {
      lbOpen(i);
    });
  });

  // Close button
  document.getElementById('lbClose').addEventListener('click', function (e) {
    e.stopPropagation();
    lbCloseF();
  });

  // Nav buttons
  document.getElementById('lbPrev').addEventListener('click', function (e) {
    e.stopPropagation();
    lbGo(-1);
  });
  document.getElementById('lbNext').addEventListener('click', function (e) {
    e.stopPropagation();
    lbGo(1);
  });

  // Click backdrop to close
  lb.addEventListener('click', function (e) {
    if (e.target === lb) lbCloseF();
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') lbCloseF();
    if (e.key === 'ArrowLeft') lbGo(-1);
    if (e.key === 'ArrowRight') lbGo(1);
  });
})();
