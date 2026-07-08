document.addEventListener("DOMContentLoaded", () => {
    
    // STATE MANAGEMENT
    const state = {
        studentName: "",
        currentTheme: "galaxy",
        audioEnabled: true,
        audioVolume: 0.5,
        animationsEnabled: true,
        musicInitialized: false
    };

    // CONFIG TEMA UTAMA (Narasi Khusus TKA SD Kelas 6)
    const themeConfig = {
        galaxy: {
            summary: '"Jelajahi luasnya galaksi dan temukan bahwa setiap rumus adalah bintang yang akan menerangi masa depanmu."',
            narration: (name) => `Halo, Sahabat Hebat ${name}! Selamat datang di Galaksi Pengetahuan HW Les Private. Di sini, kita akan seru-seruan latihan soal TKA SD Kelas 6 biar kamu semakin jago dan siap masuk sekolah impian. Yuk, kita mulai petualangan luar angkasanya!`
        },
        autumn: {
            summary: '"Seperti langit senja yang selalu menenangkan, setiap usaha belajarmu hari ini adalah jembatan menuju cita-citamu."',
            narration: (name) => `Halo, Sahabat Hebat ${name}! Selamat datang di indahnya Langit Belajar. Menguasai materi TKA SD itu proses yang menyenangkan kok. Bersama HW Les Private, kita bedah materi kelas 6 secara santai dan pasti paham, ya!`
        },
        ocean: {
            summary: '"Selami kedalaman ilmu sebagaimana lautan menyimpan jutaan keajaiban yang menunggu untuk ditemukan."',
            narration: (name) => `Halo, Sahabat Hebat ${name}! Selamat datang di Samudra Prestasi. Lautan ilmu TKA SD sangat luas dan asyik untuk dijelajahi. Bersama HW Les Private, mari selami soal-soal matematika dan raih nilai tertinggi!`
        }
    };

    // SELEKTOR DOM ELEMEN
    const screens = document.querySelectorAll(".screen");
    const bgEffectsContainer = document.getElementById("bg-effects-container");
    const bgMusic = document.getElementById("bg-music");
    const inputName = document.getElementById("student-name");
    
    const modalSettings = document.getElementById("modal-settings");
    const modalPopup = document.getElementById("modal-popup");
    const popupIcon = document.getElementById("popup-icon");
    const popupMessage = document.getElementById("popup-message");
    const loadingDynamicText = document.getElementById("loading-dynamic-text");

    /* ==========================================================================
       TEKS LOADING BERGANTI SEARAH REQ USER
       ========================================================================== */
    const loadingPhrases = [
        "Mencari tentor hw",
        "hampir siap",
        "Selamat datang di dunia ilmu"
    ];
    let phraseIndex = 0;

    const loadingTextInterval = setInterval(() => {
        if (phraseIndex < loadingPhrases.length) {
            if(loadingDynamicText) {
                loadingDynamicText.style.opacity = 0;
                setTimeout(() => {
                    loadingDynamicText.innerText = loadingPhrases[phraseIndex];
                    loadingDynamicText.style.opacity = 1;
                    phraseIndex++;
                }, 150);
            }
        } else {
            clearInterval(loadingTextInterval);
        }
    }, 800);

    /* ==========================================================================
       ROUTER NAVIGASI HALAMAN
       ========================================================================== */
    function navigateTo(screenId) {
        screens.forEach(screen => {
            screen.classList.remove("active");
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add("active");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    document.querySelectorAll(".btn-back").forEach(btn => {
        btn.addEventListener("click", () => {
            navigateTo(btn.getAttribute("data-target"));
        });
    });

    function showPopup(message, isWarning = false) {
        popupIcon.innerText = isWarning ? "⚠️" : "🚀";
        popupMessage.innerText = message;
        modalPopup.classList.add("active");
    }

    document.getElementById("btn-popup-close").addEventListener("click", () => modalPopup.classList.remove("active"));
    document.querySelectorAll(".modal-close").forEach(cb => cb.addEventListener("click", () => modalSettings.classList.remove("active")));

    document.getElementById("btn-open-settings").addEventListener("click", () => modalSettings.classList.add("active"));

    /* ==========================================================================
       PARTIKEL ENGINE (BINTANG, IKAN, GELEMBUNG LEBIH BANYAK)
       ========================================================================== */
    let animationIntervals = [];

    function clearBackgroundEffects() {
        animationIntervals.forEach(id => clearInterval(id));
        animationIntervals = [];
        bgEffectsContainer.innerHTML = "";
    }

    function initBackgroundEffects() {
        clearBackgroundEffects();
        if (!state.animationsEnabled) return;

        if (state.currentTheme === "galaxy") {
            // Jumlah Bintang Dilipatgandakan (90 Bintang) + Efek Bergerak
            for (let i = 0; i < 90; i++) {
                const star = document.createElement("div");
                star.className = "star";
                star.style.width = `${Math.random() * 3 + 1}px`;
                star.style.height = star.style.width;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.background = "#ffffff";
                star.style.borderRadius = "50%";
                star.style.opacity = Math.random();
                
                // Menggerakkan sebagian besar bintang secara dinamis
                if (Math.random() > 0.3) {
                    let posX = parseFloat(star.style.left);
                    let speed = Math.random() * 0.05 + 0.02;
                    const moveId = setInterval(() => {
                        posX += speed;
                        if (posX > 100) posX = 0;
                        star.style.left = `${posX}%`;
                    }, 30);
                    animationIntervals.push(moveId);
                }
                bgEffectsContainer.appendChild(star);
            }
        } else if (state.currentTheme === "ocean") {
            // Maksimal 50 Gelembung & Ikan Berenang Dinamis
            for (let i = 0; i < 40; i++) {
                createOceanBubble();
            }
            for (let i = 0; i < 8; i++) {
                createFishSwim();
            }
            const spawnId = setInterval(() => {
                if (bgEffectsContainer.children.length < 50) createOceanBubble();
            }, 1000);
            animationIntervals.push(spawnId);
        }
    }

    function createOceanBubble() {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const size = Math.random() * 10 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.border = "1px solid rgba(255,255,255,0.4)";
        bubble.style.background = "rgba(255,255,255,0.1)";
        bubble.style.borderRadius = "50%";
        bubble.style.left = `${Math.random() * 100}%`;
        
        let posY = window.innerHeight + 20;
        bubble.style.transform = `translateY(${posY}px)`;
        let speedY = Math.random() * 1.5 + 0.8;

        const riseId = setInterval(() => {
            posY -= speedY;
            bubble.style.transform = `translateY(${posY}px)`;
            if (posY < -20) {
                clearInterval(riseId);
                bubble.remove();
            }
        }, 20);
        animationIntervals.push(riseId);
        bgEffectsContainer.appendChild(bubble);
    }

    function createFishSwim() {
        const fish = document.createElement("div");
        fish.className = "fish-swim";
        fish.innerHTML = "🐟";
        fish.style.fontSize = `${Math.random() * 10 + 15}px`;
        fish.style.top = `${Math.random() * 80 + 10}%`;
        
        let posX = 105;
        fish.style.left = `${posX}%`;
        let speedX = Math.random() * 0.3 + 0.1;

        const swimId = setInterval(() => {
            posX -= speedX;
            fish.style.left = `${posX}%`;
            if (posX < -10) {
                clearInterval(swimId);
                fish.remove();
                createFishSwim();
            }
        }, 20);
        animationIntervals.push(swimId);
        bgEffectsContainer.appendChild(fish);
    }

    /* ==========================================================================
       AVATAR SVG
       ========================================================================== */
    function renderDynamicAvatar() {
        const target = document.getElementById("dynamic-avatar");
        if (!target) return;
        let svgContent = "";

        if (state.currentTheme === "galaxy") {
            svgContent = `<svg viewBox="0 0 200 200"><circle cx="100" cy="95" r="45" fill="#0f172a" stroke="#8b5cf6" stroke-width="3"/><path d="M65 95 C 65 70, 135 70, 135 95 Z" fill="#06b6d4"/></svg>`;
        } else if (state.currentTheme === "autumn") {
            svgContent = `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="40" fill="#ffe5b4"/><path d="M60 100 C 60 70, 140 70, 140 100 Z" fill="#df7a28"/></svg>`;
        } else if (state.currentTheme === "ocean") {
            svgContent = `<svg viewBox="0 0 200 200"><circle cx="100" cy="95" r="38" fill="#e0f2fe" stroke="#2563eb" stroke-width="2"/></svg>`;
        }
        target.innerHTML = svgContent;
    }

    function updateThemeDOM() {
        document.body.classList.remove("theme-galaxy", "theme-autumn", "theme-ocean");
        document.body.classList.add(`theme-${state.currentTheme}`);

        document.getElementById("theme-summary").innerText = themeConfig[state.currentTheme].summary;
        document.getElementById("narration-text").innerText = themeConfig[state.currentTheme].narration(state.studentName || "Siswa");

        initBackgroundEffects();
        renderDynamicAvatar();
    }

    document.querySelectorAll(".btn-theme-select").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".btn-theme-select").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            state.currentTheme = btn.getAttribute("data-theme");
            updateThemeDOM();
        });
    });

    /* ==========================================================================
       AUDIO SYSTEM
       ========================================================================== */
    function initMusic() {
        if (state.musicInitialized) return;
        bgMusic.volume = state.audioVolume;
        if (state.audioEnabled) {
            bgMusic.play().then(() => state.musicInitialized = true).catch(() => {});
        }
    }

    document.getElementById("setting-music-toggle").addEventListener("click", (e) => {
        state.audioEnabled = !state.audioEnabled;
        if (state.audioEnabled) {
            e.target.classList.add("active"); e.target.innerText = "ON"; bgMusic.play().catch(() => {});
        } else {
            e.target.classList.remove("active"); e.target.innerText = "OFF"; bgMusic.pause();
        }
    });

    document.getElementById("setting-volume").addEventListener("input", (e) => {
        state.audioVolume = parseFloat(e.target.value);
        bgMusic.volume = state.audioVolume;
    });

    document.getElementById("setting-anim-toggle").addEventListener("click", (e) => {
        state.animationsEnabled = !state.animationsEnabled;
        e.target.classList.toggle("active");
        e.target.innerText = state.animationsEnabled ? "ON" : "OFF";
        initBackgroundEffects();
    });

    /* ==========================================================================
       WORKFLOW JALAN UTAMA
       ========================================================================== */
    setTimeout(() => {
        clearInterval(loadingTextInterval);
        const loadScreen = document.getElementById("loading-screen");
        loadScreen.style.opacity = "0";
        setTimeout(() => {
            loadScreen.classList.remove("active");
            navigateTo("welcome-screen");
            initBackgroundEffects();
        }, 500);
    }, 3000);

    document.getElementById("btn-start").addEventListener("click", () => {
        const val = inputName.value.trim();
        if (val === "") {
            showPopup("⚠️ Silakan isi namamu terlebih dahulu sebelum memulai belajar.", true);
            return;
        }
        state.studentName = val;
        initMusic();
        updateThemeDOM();
        navigateTo("theme-screen");
    });

    document.getElementById("btn-to-menu").addEventListener("click", () => navigateTo("menu-screen"));
    document.getElementById("card-matematika").addEventListener("click", () => navigateTo("math-submenu-screen"));

    document.getElementById("card-bahasa").addEventListener("click", () => {
        showPopup("Modul Bahasa Indonesia SD sedang disiapkan. Nantikan update seru berikutnya!", false);
    });

    document.querySelectorAll(".sub-item.coming-soon-subject").forEach(card => {
        card.addEventListener("click", () => showPopup("Latihan materi TKA SD Kelas 6 ini segera hadir ya!", false));
    });
});
