// ==========================================
// SIKEKAR KALTIM - APPLICATION
// Supabase Authentication + Dashboard
// ==========================================

// ---------- SUPABASE CONFIG ----------
// GANTI 2 NILAI DI BAWAH INI
const SUPABASE_URL = "https://xtsswagzmilocpzjmrxa.supabase.co/rest/v1/";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_wsec_CUeinzgkyH5huOfwA_epZzjC8o";

// Membuat koneksi Supabase
const supabaseClient = window.supabase.createClient(
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

document.getElementById("mUsaha").textContent = "128";
document.getElementById("mInspeksi").textContent = "486";
document.getElementById("mTemuan").textContent = "73";
document.getElementById("mLokasi").textContent = "612";


// ==========================================
// QUICK SEARCH
// ==========================================

const search = document.getElementById("search");
const results = document.getElementById("results");

search?.addEventListener("input", () => {

    const q = search.value.toLowerCase();

    const x = data.filter(r =>
        r.join(" ").toLowerCase().includes(q)
    );

    if (!q) {

        results.innerHTML =
            "Ketik untuk mencari data contoh.";

        return;
    }

    if (x.length) {

        results.innerHTML = x.map(r =>
            `<div>⚡ <b>${r[0]}</b> — ${r[1]}</div>`
        ).join("");

    } else {

        results.innerHTML =
            "Tidak ada data demo yang cocok.";
    }
});


// ==========================================
// FORM PENGADUAN DEMO
// ==========================================

document.getElementById("complaint")?.addEventListener(
    "submit",
    e => {

        e.preventDefault();

        document.getElementById("formMsg").textContent =
            " Laporan demo tersimpan di browser. " +
            "Penyimpanan online akan menggunakan Supabase.";

        e.target.reset();
    }
);


// ==========================================
// LOGIN SIKEKAR
// ==========================================

async function loginSIKEKAR() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const message =
        document.getElementById("loginMessage");

    if (!email || !password) {

        message.textContent =
            "Email dan password wajib diisi.";

        return;
    }

    message.textContent =
        "Memproses login...";

    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {

        console.error("LOGIN ERROR:", error);

        message.textContent =
            "Login gagal. Periksa email dan password.";

        return;
    }

    console.log(
        "AUTH BERHASIL:",
        data.user
    );

    await loadUserProfile();
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
    } = await supabaseClient.auth.getUser();


    if (authError || !user) {

        document.getElementById("loginMessage").textContent =
            "Sesi login tidak ditemukan.";

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
    } = await supabaseClient
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

        document.getElementById("loginMessage").textContent =
            "Profil SIKEKAR tidak ditemukan.";

        return;
    }


    console.log(
        "PROFILE SIKEKAR:",
        profile
    );


    // Pastikan akun aktif
    if (!profile.is_active) {

        await supabaseClient.auth.signOut();

        document.getElementById("loginMessage").textContent =
            "Akun Anda tidak aktif.";

        return;
    }


    // Ambil kode role
    const role =
        profile.roles?.role_code;


    console.log(
        "ROLE SIKEKAR:",
        role
    );


    // Arahkan sesuai role
    bukaDashboard(
        profile,
        role
    );
}


// ==========================================
// ARAHKAN KE DASHBOARD
// ==========================================

function bukaDashboard(profile, role) {

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

            document.getElementById(
                "loginMessage"
            ).textContent =
                "Role akun belum dikonfigurasi: " +
                role;
    }
}


// ==========================================
// LOGOUT
// ==========================================

async function logoutSIKEKAR() {

    const {
        error
    } = await supabaseClient.auth.signOut();

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
        .catch(() => {});

}
