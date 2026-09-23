// ==========================================
// SIKEKAR KALTIM - APPLICATION
// Supabase Authentication + Dashboard
// ==========================================

// ---------- SUPABASE CONFIG ----------

const SUPABASE_URL =
    "https://xtsswagzmilocpzjmrxa.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_wsec_CUeinzgkyH5huOfwA_epZzjC8o";


// ---------- SUPABASE CLIENT ----------

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


// ==========================================
// DATA DEMO PUBLIK
// ==========================================

const data = [
    ["PT Contoh Energi", "Samarinda"],
    ["PT Kaltim Power", "Balikpapan"],
    ["PLN Area Contoh", "Berau"],
    ["Badan Usaha Demo", "Kutai Kartanegara"]
];


// ==========================================
// DASHBOARD PUBLIK
// ==========================================

const mUsaha =
    document.getElementById("mUsaha");

const mInspeksi =
    document.getElementById("mInspeksi");

const mTemuan =
    document.getElementById("mTemuan");

const mLokasi =
    document.getElementById("mLokasi");

if (mUsaha) mUsaha.textContent = "128";
if (mInspeksi) mInspeksi.textContent = "486";
if (mTemuan) mTemuan.textContent = "73";
if (mLokasi) mLokasi.textContent = "612";


// ==========================================
// QUICK SEARCH
// ==========================================

const search =
    document.getElementById("search");

const results =
    document.getElementById("results");

search?.addEventListener("input", () => {

    const q =
        search.value.toLowerCase();

    const x =
        data.filter(r =>
            r.join(" ")
                .toLowerCase()
                .includes(q)
        );

    if (!q) {

        if (results) {
            results.innerHTML =
                "Ketik untuk mencari data contoh.";
        }

        return;
    }

    if (x.length) {

        if (results) {
            results.innerHTML =
                x.map(r =>
                    `<div>⚡ <b>${r[0]}</b> — ${r[1]}</div>`
                ).join("");
        }

    } else {

        if (results) {
            results.innerHTML =
                "Tidak ada data demo yang cocok.";
        }
    }
});


// ==========================================
// FORM PENGADUAN DEMO
// ==========================================

document
    .getElementById("complaint")
    ?.addEventListener("submit", e => {

        e.preventDefault();

        const formMsg =
            document.getElementById("formMsg");

        if (formMsg) {

            formMsg.textContent =
                "Laporan demo tersimpan di browser.";
        }

        e.target.reset();
    });


// ==========================================
// LOGIN SIKEKAR
// ==========================================

async function loginSIKEKAR() {

    alert("Fungsi LOGIN SIKEKAR berjalan");
    
    const emailElement =
        document.getElementById("loginEmail");

    const passwordElement =
        document.getElementById("loginPassword");

    const message =
        document.getElementById("loginMessage");


    const email =
        emailElement?.value.trim();

    const password =
        passwordElement?.value;


    if (!email || !password) {

        if (message) {

            message.textContent =
                "Email dan password wajib diisi.";
        }

        return;
    }


    if (message) {

        message.textContent =
            "Memproses login...";
    }


    try {

        console.log("SIKEKAR: mulai login");
        console.log("Email:", email);


        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email: email,
                password: password
            });


        if (error) {

            console.error(
                "SUPABASE LOGIN ERROR:",
                error
            );


            if (message) {

                message.textContent =
                    "LOGIN GAGAL: " +
                    error.message;
            }

            return;
        }


        console.log(
            "LOGIN BERHASIL:",
            data.user
        );


        if (message) {

            message.textContent =
                "Login berhasil. Membaca profil...";
        }


        await loadUserProfile();

    } catch (err) {

        console.error(
            "SIKEKAR ERROR:",
            err
        );


        if (message) {

            message.textContent =
                "ERROR: " +
                err.message;
        }
    }
}


// ==========================================
// MEMBACA PROFIL USER
// ==========================================

async function loadUserProfile() {

    const {
        data: {
            user
        },
        error: authError
    } =
        await supabaseClient.auth.getUser();


    const message =
        document.getElementById("loginMessage");


    if (authError || !user) {

        if (message) {

            message.textContent =
                "Sesi login tidak ditemukan.";
        }

        return;
    }


    console.log(
        "USER ID:",
        user.id
    );


    // Ambil profil pengguna

    const {
        data: profile,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(`
                id,
                full_name,
                email,
                position,
                institution_name,
                is_active,
                role_id,
                roles (
                    role_code,
                    role_name
                )
            `)
            .eq("id", user.id)
            .single();


    if (error) {

        console.error(
            "PROFILE ERROR:",
            error
        );


        if (message) {

            message.textContent =
                "Profil SIKEKAR tidak ditemukan: " +
                error.message;
        }

        return;
    }


    console.log(
        "PROFILE SIKEKAR:",
        profile
    );


    // Pastikan akun aktif

    if (!profile.is_active) {

        await supabaseClient.auth.signOut();


        if (message) {

            message.textContent =
                "Akun Anda tidak aktif.";
        }

        return;
    }


    // Ambil kode role

    const role =
        profile.roles?.role_code;


    console.log(
        "ROLE SIKEKAR:",
        role
    );


    // Arahkan ke dashboard

    bukaDashboard(
        profile,
        role
    );
}


// ==========================================
// ARAHKAN KE DASHBOARD
// ==========================================

function bukaDashboard(
    profile,
    role
) {

    console.log(
        "Login sebagai:",
        profile.full_name
    );


    console.log(
        "Role:",
        role
    );


    switch (role) {

        case "koordinator_ik":

            window.location.href =
                "dashboard-koordinator.html";

            break;


        case "inspektur_ketenagalistrikan":

            window.location.href =
                "dashboard-inspektur.html";

            break;


        case "pelaku_usaha_pembangkitan":

            window.location.href =
                "dashboard-pelaku-usaha.html";

            break;


        case "pelaku_usaha_jasa_penunjang":

            window.location.href =
                "dashboard-jasa-penunjang.html";

            break;


        case "konsultan_ketenagalistrikan":

            window.location.href =
                "dashboard-konsultan.html";

            break;


        case "pemerintah_kabupaten":

            window.location.href =
                "dashboard-pemkab.html";

            break;


        case "pemerintah_kota":

            window.location.href =
                "dashboard-pemkot.html";

            break;


        case "kelurahan":

            window.location.href =
                "dashboard-kelurahan.html";

            break;


        case "desa":

            window.location.href =
                "dashboard-desa.html";

            break;


        case "pln":

            window.location.href =
                "dashboard-pln.html";

            break;


        case "masyarakat":

            window.location.href =
                "dashboard-masyarakat.html";

            break;


        case "super_admin":

            window.location.href =
                "dashboard-super-admin.html";

            break;


        default:

            if (message) {

                message.textContent =
                    "Role akun belum dikonfigurasi: " +
                    role;
            }
    }
}


// ==========================================
// LOGOUT
// ==========================================

async function logoutSIKEKAR() {

    const {
        error
    } =
        await supabaseClient.auth.signOut();


    if (error) {

        console.error(
            "LOGOUT ERROR:",
            error
        );

        return;
    }


    window.location.href =
        "index.html";
}


// ==========================================
// SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    navigator.serviceWorker
        .register("sw.js")
        .catch(error => {

            console.warn(
                "Service Worker:",
                error
            );
        });
}
