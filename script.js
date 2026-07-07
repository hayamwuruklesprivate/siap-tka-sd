/* ==========================================================================
   VANILLA JAVASCRIPT ARCHITECTURE - UPDATE TKA SD & DYNAMIC LOADING TEXT
   ========================================================================== */

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

    // CONFIG DATA UTAMA TEMA (Disesuaikan Narasi untuk Anak SD)
    const themeConfig = {
        galaxy: {
            summary: '"Jelajahi luasnya galaksi dan temukan bahwa setiap rumus adalah bintang yang akan menerangi masa depanmu."',
            narration: (name) => `Halo, Sahabat Hebat ${name}! Selamat datang di Galaksi Pengetahuan HW Les Private. Di sini, kita akan seru-seruan latihan soal TKA SD biar kamu semakin jago dan siap berprestasi. Yuk, kita mulai petualangan luar angkasanya!`
        },
        autumn: {
            summary: '"Seperti daun yang terus menari mengikuti angin, setiap langkah belajarmu akan membawamu semakin dekat menuju impian."',
            narration: (name) => `Halo, Sahabat Hebat ${name}! Selamat datang di Langit Musim Gugur Ceria. Belajar TKA SD bareng HW Les Private itu seru dan santai kok. Kita pahami materinya pelan-pelan sambil menikmati suasana yang asyik ini, ya!`
        },
        ocean: {
            summary: '"Selami kedalaman ilmu sebagaimana lautan menyimpan jutaan keajaiban yang menunggu untuk ditemukan."',
            narration: (name) => `Halo, Sahabat Hebat ${name}! Selamat datang di Samudra Prestasi. Lautan itu luas, sama seperti ilmu pengetahuan TKA SD yang siap kamu selami. Bareng HW Les Private, mari kumpulkan mutiara ilmu sebanyak-banyaknya!`
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
       EFFECT TEXT BERGANTI-GANTI PADA LOADING SCREEN
       ========================================================================== */
    const loadingPhrases = [
        "Mencari tentor hw",
        "hampir siap",
        "Selamat datang di dunia ilmu"
    ];
    let phraseIndex = 0;

    // Teks berganti setiap 800ms agar pas dengan total loading 3 detik
    const loadingTextInterval = setInterval(() => {
        if (phraseIndex < loadingPhrases.length) {
            if(loadingDynamicText) {
                loadingDynamicText.style.opacity = 0; // Efek fade out
                setTimeout(() => {
                    loadingDynamicText.innerText = loadingPhrases[phraseIndex];
                    loadingDynamicText.style.opacity = 1; // Efek fade in
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
            const target = btn.getAttribute("data-target");
            navigateTo(target);
        });
    });

    /* ==========================================================================
       POPUP MODAL DIALOG
       ========================================================================== */
    function showPopup(message, isWarning = false) {
        popupIcon.innerText = isWarning ? "⚠️" : "🚀";
        popupMessage.innerText = message;
        modalPopup.classList.add("active");
    }

    document.getElementById("btn-popup-close").addEventListener("click", () => {
        modalPopup.classList.remove("active");
    });
    document.querySelectorAll(".modal-close").forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            modalSettings.classList.remove("active");
        });
    });
    window.addEventListener("click", (e) => {
        if (e.target === modalSettings) modalSettings.classList.remove("active");
        if (e.target === modalPopup) modalPopup.classList.remove("active");
    });

    document.getElementById("btn-open-settings").addEventListener("click", () => {
        modalSettings.classList.add("active");
    });

    /* ==========================================================================
       PARTIKEL ENGINE LATAR BELAKANG
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
            for (let i = 0; i < 60; i++) {
                const star = document.createElement("div");
                star.className = "star";
                star.style.width = `${Math.random() * 3 + 1}px`;
                star.style.height = star.style.width;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.background = "#ffffff";
                star.style.borderRadius = "50%";
                star.style.opacity = Math.random();
                star.style.boxShadow = "0 0 6px #ffffff";
                
                if (Math.random() > 0.4) {
                    const blinkId = setInterval(() => {
                        star.style.opacity = Math.random();
                    }, 1000 + Math.random() * 2000);
                    animationIntervals.push(blinkId);
                }
                bgEffectsContainer.appendChild(star);
            }
            const nebula = document.createElement("div");
            nebula.style.position = "absolute";
            nebula.style.top = "50%";
            nebula.style.left = "50%";
            nebula.style.width = "400px";
            nebula.style.height = "400px";
            nebula.style.background = "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)";
            nebula.style.transform = "translate(-50%, -50%)";
            bgEffectsContainer.appendChild(nebula);

        } else if (state.currentTheme === "autumn") {
            for (let i = 0; i < 15; i++) {
                createAutumnLeaf();
            }
            const spawnId = setInterval(() => {
                if (bgEffectsContainer.children.length < 25) createAutumnLeaf();
            }, 3000);
            animationIntervals.push(spawnId);

        } else if (state.currentTheme === "ocean") {
            for (let i = 0; i < 20; i++) {
                createOceanBubble(true);
            }
            const spawnId = setInterval(() => {
                if (bgEffectsContainer.children.length < 30) createOceanBubble(false);
            }, 1500);
            animationIntervals.push(spawnId);
        }
    }

    function createAutumnLeaf() {
        const leaf = document.createElement("div");
        leaf.className = "leaf";
        leaf.innerHTML = "🍁";
        leaf.style.fontSize = `${Math.random() * 15 + 15}px`;
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.top = `-40px`;
        leaf.style.opacity = Math.random() * 0.7 + 0.3;
        
        let posY = -40;
        let posX = parseFloat(leaf.style.left);
        let speedY = Math.random() * 1 + 0.5;
        let swingSpeed = Math.random() * 0.02 + 0.01;
        let swingRadius = Math.random() * 30 + 10;
        let angle = Math.random() * 360;
        let spinSpeed = Math.random() * 2 - 1;
        let time = 0;

        const fallId = setInterval(() => {
            if (!state.animationsEnabled) {
                clearInterval(fallId);
                return;
            }
            time += swingSpeed;
            posY += speedY;
            angle += spinSpeed;
            
            leaf.style.transform = `translate(${Math.sin(time) * swingRadius}px, ${posY}px) rotate(${angle}deg)`;
            
            if (posY > window.innerHeight + 40) {
                clearInterval(fallId);
                leaf.remove();
            }
        }, 16);
        
        bgEffectsContainer.appendChild(leaf);
    }

    function createOceanBubble(randomInitialY = false) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const size = Math.random() * 12 + 6;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.border = "1px solid rgba(255,255,255,0.4)";
        bubble.style.background = "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 80%)";
        bubble.style.borderRadius = "50%";
        bubble.style.left = `${Math.random() * 100}%`;
        
        let posY = randomInitialY ? Math.random() * window.innerHeight : window.innerHeight + 20;
        bubble.style.transform = `translateY(${posY}px)`;
        
        let speedY = Math.random() * 1.2 + 0.6;
        let swingSpeed = Math.random() * 0.04 + 0.01;
        let swingWidth = Math.random() * 15;
        let time = 0;

        const riseId = setInterval(() => {
            if (!state.animationsEnabled) {
                clearInterval(riseId);
                return;
            }
            time += swingSpeed;
            posY -= speedY;
            
            bubble.style.transform = `translate(${Math.sin(time) * swingWidth}px, ${posY}px)`;
            
            if (posY < -20) {
                clearInterval(riseId);
                bubble.remove();
            }
        }, 16);
        
        bgEffectsContainer.appendChild(bubble);
    }

    /* ==========================================================================
       RENDERING VECTOR AVATAR DINAMIS
       ========================================================================== */
    function renderDynamicAvatar() {
        const target = document.getElementById("dynamic-avatar");
        if (!target) return;

        let svgContent = "";

        if (state.currentTheme === "galaxy") {
            svgContent = `
            <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                    <linearGradient id="helmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#06b6d4" />
                        <stop offset="100%" stop-color="#8b5cf6" />
                    </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="75" fill="none" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.6"/>
                <path d="M50 160 C 50 130, 150 130, 150 160" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
                <path d="M70 140 L 100 160 L 130 140" fill="none" stroke="#06b6d4" stroke-width="2"/>
                <circle cx="100" cy="95" r="45" fill="#0f172a" stroke="#8b5cf6" stroke-width="3"/>
                <path d="M65 95 C 65 70, 135 70, 135 95 C 135 120, 65 120, 65 95 Z" fill="url(#helmGrad)"/>
                <path d="M75 85 Q 100 75, 125 85" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
                <line x1="100" y1="50" x2="100" y2="35" stroke="#06b6d4" stroke-width="3"/>
                <circle cx="100" cy="32" r="5" fill="#06b6d4"/>
            </svg>`;
        } else if (state.currentTheme === "autumn") {
            svgContent = `
            <svg viewBox="0 0 200 200" width="100%" height="100%">
                <path d="M100 25 L 115 50 L 100 60 L 85 50 Z" fill="#e76f51"/>
                <path d="M65 45 L 90 60 L 85 70 L 60 55 Z" fill="#f4a261"/>
                <path d="M135 45 L 140 55 L 115 70 L 110 60 Z" fill="#f4a261"/>
                <path d="M55 160 C 65 125, 135 125, 145 160" fill="#603813" stroke="#ffd166" stroke-width="2"/>
                <circle cx="100" cy="100" r="40" fill="#ffe5b4"/>
                <circle cx="85" cy="95" r="4" fill="#2e1a05"/>
                <circle cx="115" cy="95" r="4" fill="#2e1a05"/>
                <path d="M92 112 Q 100 120, 108 112" fill="none" stroke="#2e1a05" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="77" cy="104" r="5" fill="#f4a261" opacity="0.6"/>
                <circle cx="123" cy="104" r="5" fill="#f4a261" opacity="0.6"/>
                <path d="M60 100 C 60 70, 140 70, 140 100 C 125 80, 75 80, 60 100 Z" fill="#df7a28"/>
            </svg>`;
        } else if (state.currentTheme === "ocean") {
            svgContent = `
            <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#0ea5e9" />
                        <stop offset="100%" stop-color="#1d4ed8" />
                    </linearGradient>
                </defs>
                <circle cx="100" cy="95" r="55" fill="none" stroke="#0ea5e9" stroke-width="2" opacity="0.4" stroke-dasharray="10, 5"/>
                <path d="M50 160 C 60 130, 140 130, 150 160" fill="#082f49" stroke="#0ea5e9" stroke-width="2"/>
                <circle cx="100" cy="95" r="38" fill="#e0f2fe" stroke="#2563eb" stroke-width="1"/>
                <path d="M80 95 Q 87 101, 93 95" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M107 95 Q 114 101, 121 95" fill="none" stroke="#1d4ed8" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M94 110 Q 100 115, 106 110" fill="none" stroke="#1d4ed8" stroke-linecap="round"/>
                <path d="M80 62 L 100 40 L 120 62 L 108 58 L 100 65 L 92 58 Z" fill="url(#waterGrad)"/>
            </svg>`;
        }

        target.innerHTML = svgContent;
    }

    /* ==========================================================================
       MANAJER TEMA & DOM HANDLER
       ========================================================================== */
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
       AUDIO CONTROLLER
       ========================================================================= */
    function initMusic() {
        if (state.musicInitialized) return;
        
        bgMusic.volume = state.audioVolume;
        if (state.audioEnabled) {
            bgMusic.play().then(() => {
                state.musicInitialized = true;
            }).catch(() => {
                console.log("Autoplay ditangguhkan browser.");
            });
        }
    }

    const btnMusicToggle = document.getElementById("setting-music-toggle");
    const sliderVolume = document.getElementById("setting-volume");
    const btnAnimToggle = document.getElementById("setting-anim-toggle");

    btnMusicToggle.addEventListener("click", () => {
        state.audioEnabled = !state.audioEnabled;
        if (state.audioEnabled) {
            btnMusicToggle.classList.add("active");
            btnMusicToggle.innerText = "ON";
            bgMusic.play().catch(() => {});
        } else {
            btnMusicToggle.classList.remove("active");
            btnMusicToggle.innerText = "OFF";
            bgMusic.pause();
        }
    });

    sliderVolume.addEventListener("input", (e) => {
        state.audioVolume = parseFloat(e.target.value);
        bgMusic.volume = state.audioVolume;
    });

    btnAnimToggle.addEventListener("click", () => {
        state.animationsEnabled = !state.animationsEnabled;
        if (state.animationsEnabled) {
            btnAnimToggle.classList.add("active");
            btnAnimToggle.innerText = "ON";
        } else {
            btnAnimToggle.classList.remove("active");
            btnAnimToggle.innerText = "OFF";
        }
        initBackgroundEffects();
    });

    /* ==========================================================================
       WORKFLOW SISTEM JALAN UTAMA
       ========================================================================== */
    
    // Transisi otomatis dari Loading Screen ke Welcome Screen (3 Detik)
    setTimeout(() => {
        clearInterval(loadingTextInterval); // Stop interval text loading
        const loadScreen = document.getElementById("loading-screen");
        loadScreen.style.opacity = "0";
        loadScreen.style.transform = "scale(1.03)";
        setTimeout(() => {
            loadScreen.classList.remove("active");
            navigateTo("welcome-screen");
            initBackgroundEffects();
        }, 500);
    }, 3000);

    // Verifikasi Input Nama
    document.getElementById("btn-start").addEventListener("click", () => {
        const val = inputName.value.trim();
        if (val === "") {
            showPopup("⚠️ Silakan isi namamu terlebih dahulu sebelum memulai belajar.", true);
            return;
        }
        
        state.studentName = val;
        initMusic();
        if (state.audioEnabled && bgMusic.paused) {
            bgMusic.play().catch(()=>{});
        }

        updateThemeDOM();
        navigateTo("theme-screen");
    });

    document.getElementById("btn-to-menu").addEventListener("click", () => {
        navigateTo("menu-screen");
    });

    document.getElementById("card-matematika").addEventListener("click", () => {
        navigateTo("math-submenu-screen");
    });

    document.getElementById("card-bahasa").addEventListener("click", () => {
        showPopup("Modul Bahasa Indonesia SD sedang disiapkan. Nantikan update seru berikutnya dari HW Les Private!", false);
    });

    document.querySelectorAll(".sub-item.coming-soon-subject").forEach(card => {
        card.addEventListener("click", () => {
            showPopup("Latihan materi Matematika SD ini sedang dalam tahap pengembangan. Tunggu ya!", false);
        });
    });

    window.addEventListener("resize", () => {
        if (document.getElementById("theme-screen").classList.contains("active") || 
            document.getElementById("welcome-screen").classList.contains("active")) {
            initBackgroundEffects();
        }
    });

});
