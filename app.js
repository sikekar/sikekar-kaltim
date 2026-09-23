const data=[["PT Contoh Energi","Samarinda"],["PT Kaltim Power","Balikpapan"],["PLN Area Contoh","Berau"],["Badan Usaha Demo","Kutai Kartanegara"]];
document.getElementById("mUsaha").textContent="128";
document.getElementById("mInspeksi").textContent="486";
document.getElementById("mTemuan").textContent="73";
document.getElementById("mLokasi").textContent="612";
const search=document.getElementById("search"), results=document.getElementById("results");
search?.addEventListener("input",()=>{const q=search.value.toLowerCase();const x=data.filter(r=>r.join(" ").toLowerCase().includes(q));results.innerHTML=q?(x.length?x.map(r=>`<div>⚡ <b>${r[0]}</b> — ${r[1]}</div>`).join(""):"Tidak ada data demo yang cocok."):"Ketik untuk mencari data contoh."});
document.getElementById("complaint")?.addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMsg").textContent=" Laporan demo tersimpan di browser. Hubungkan Supabase untuk penyimpanan online.";e.target.reset();});
if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(()=>{});
