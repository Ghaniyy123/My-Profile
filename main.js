var body = document.body;
var tombol = document.getElementById("tombol-nav");
var linkNav = document.querySelectorAll("nav.kiri a[href^='#']");
var sections = document.querySelectorAll("div.konten section[id]");
var mobile = window.matchMedia("(max-width: 577px)");
var tablet = window.matchMedia("(min-width: 578px) and (max-width: 992px)");

function perbaruiAria() {
    var terbuka = mobile.matches
        ? body.classList.contains("nav-buka")
        : !body.classList.contains("nav-ciut");
    tombol.setAttribute("aria-expanded", String(terbuka));
}

// Kondisi awal sesuai ukuran layar
function atur() {
    body.classList.remove("nav-buka");
    body.classList.toggle("nav-ciut", tablet.matches);
    perbaruiAria();
}
atur();
mobile.addEventListener("change", atur);
tablet.addEventListener("change", atur);

// Hamburger: mobile = buka/tutup menu, selain itu = lebar/ciut
tombol.addEventListener("click", function () {
    if (mobile.matches) {
        body.classList.toggle("nav-buka");
    } else {
        body.classList.toggle("nav-ciut");
    }
    perbaruiAria();
});

// Di mobile, menu menutup setelah memilih tujuan
linkNav.forEach(function (a) {
    a.addEventListener("click", function () {
        if (mobile.matches) {
            body.classList.remove("nav-buka");
            perbaruiAria();
        }
    });
});

// Tandai menu aktif sesuai bagian yang sedang dibaca
function tandaiAktif() {
    var batas = window.innerHeight * 0.35;
    var aktif = sections[0];
    sections.forEach(function (s) {
        if (s.getBoundingClientRect().top <= batas) aktif = s;
    });
    var dasar = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (dasar) aktif = sections[sections.length - 1];

    linkNav.forEach(function (a) {
        if (a.getAttribute("href") === "#" + aktif.id) {
            a.setAttribute("aria-current", "page");
        } else {
            a.removeAttribute("aria-current");
        }
    });
}

var menunggu = false;
window.addEventListener("scroll", function () {
    if (menunggu) return;
    menunggu = true;
    requestAnimationFrame(function () {
        tandaiAktif();
        menunggu = false;
    });
}, { passive: true });
tandaiAktif();
