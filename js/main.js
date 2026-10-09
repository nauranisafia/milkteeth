// Nitsayra Craft - data & cart logic
const PRODUCTS = [
  {id:'p1', name:'Gelang Manik Daisy Pastel', cat:'Gelang', price:35000, old:45000, rating:'4.9 (212)', tag:'Best Seller', img:'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80&auto=format&fit=crop', desc:'Gelang manik bunga daisy handmade, tali elastis kuat.'},
  {id:'p2', name:'Kalung Mutiara Korean Style', cat:'Kalung', price:55000, old:75000, rating:'4.8 (168)', tag:'Best Seller', img:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&auto=format&fit=crop', desc:'Kalung mutiara sintetis + rantai gold anti karat.'},
  {id:'p3', name:'Anting Clay Bunga Matahari', cat:'Anting', price:28000, old:null, rating:'4.9 (95)', tag:'Baru', img:'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80&auto=format&fit=crop', desc:'Anting polymer clay ringan, motif bunga matahari.'},
  {id:'p4', name:'Scrunchie Satin Set Isi 3', cat:'Aksesoris Rambut', price:32000, old:40000, rating:'4.7 (340)', tag:'Hemat', img:'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop', desc:'Scrunchie satin lembut, 3 warna earth tone.'},
  {id:'p5', name:'Gelang Charm Kupu-Kupu', cat:'Gelang', price:42000, old:null, rating:'4.8 (121)', tag:'Baru', img:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&auto=format&fit=crop', desc:'Gelang rantai dengan charm kupu-kupu gold.'},
  {id:'p6', name:'Kalung Inisial Huruf Custom', cat:'Kalung', price:65000, old:null, rating:'5.0 (87)', tag:'Custom', img:'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&q=80&auto=format&fit=crop', desc:'Bisa custom 1-2 huruf, കgrafir laser rapi.'},
  {id:'p7', name:'Bucket Hat Rajut Cream', cat:'Rajut', price:85000, old:99000, rating:'4.9 (76)', tag:'Handmade', img:'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80&auto=format&fit=crop', desc:'Topi rajut benang milk cotton, adem & lembut.'},
  {id:'p8', name:'Gantungan Kunci Boneka Rajut', cat:'Rajut', price:25000, old:null, rating:'4.7 (203)', tag:'Lucu', img:'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&q=80&auto=format&fit=crop', desc:'Ganci amigurumi karakter, bisa pilih warna.'},
  {id:'p9', name:'Cincin Beads Set Isi 5', cat:'Cincin', price:30000, old:null, rating:'4.8 (154)', tag:'Set', img:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80&auto=format&fit=crop', desc:'Satu set 5 cincin manik warna-warni.'},
  {id:'p10', name:'Jepit Rambut Mutiara Set 4', cat:'Aksesoris Rambut', price:27000, old:35000, rating:'4.6 (189)', tag:'Hemat', img:'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80&auto=format&fit=crop', desc:'Jepit mutiara aesthetic ala Korea.'},
  {id:'p11', name:'Tas Rajut Mini Granny Square', cat:'Rajut', price:120000, old:145000, rating:'5.0 (64)', tag:'Premium', img:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80&auto=format&fit=crop', desc:'Tas rajut motif granny, furing + resleting.'},
  {id:'p12', name:'Phone Strap Beads Pastel', cat:'Gelang', price:22000, old:null, rating:'4.8 (277)', tag:'Viral', img:'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80&auto=format&fit=crop', desc:'Tali HP manik + bunga, anti putus.'},
];

const rupiah = n => 'Rp' + n.toLocaleString('id-ID');
const getCart = () => JSON.parse(localStorage.getItem('nitsayra_cart')||'[]');
const saveCart = c => localStorage.setItem('nitsayra_cart', JSON.stringify(c));
function cartCount(){ return getCart().reduce((a,b)=>a+b.qty,0); }
function updateBadge(){
  document.querySelectorAll('.cart-count').forEach(el=> el.textContent = cartCount());
}
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){ t=document.createElement('div'); t.id='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),2200);
}
function addToCart(id, qty=1){
  const c = getCart();
  const f = c.find(i=>i.id===id);
  if(f) f.qty += qty; else c.push({id, qty});
  saveCart(c); updateBadge();
  const p = PRODUCTS.find(p=>p.id===id);
  toast(`✓ ${p?p.name:'Produk'} masuk keranjang`);
}
function productCard(p){
  return `<article class="card">
    <div class="card-img">
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/${p.id}/600/600'">
      <span class="card-tag ${p.tag==='Best Seller'?'best':''}">${p.tag}</span>
    </div>
    <div class="card-body">
      <span class="card-cat">${p.cat}</span>
      <h3>${p.name}</h3>
      <div class="rating">⭐ ${p.rating}</div>
      <div class="card-price"><span class="price">${rupiah(p.price)}</span>${p.old?`<span class="price-old">${rupiah(p.old)}</span>`:''}</div>
      <div class="card-actions">
        <button class="btn btn-primary btn-small" onclick="addToCart('${p.id}')">+ Keranjang</button>
        <button class="icon-btn" title="Detail" onclick="location.href='katalog.html#${p.id}'">👁️</button>
      </div>
    </div>
  </article>`;
}
function renderGrid(elId, list){
  const el = document.getElementById(elId);
  if(el) el.innerHTML = list.map(productCard).join('');
}
function setupFilter(){
  const chips = document.querySelectorAll('.chip');
  if(!chips.length) return;
  chips.forEach(ch=>{
    ch.addEventListener('click', ()=>{
      chips.forEach(c=>c.classList.remove('active'));
      ch.classList.add('active');
      const f = ch.dataset.filter;
      const q = (document.getElementById('searchInput')?.value||'').toLowerCase();
      let list = f==='Semua' ? PRODUCTS : PRODUCTS.filter(p=>p.cat===f);
      if(q) list = list.filter(p=>(p.name+p.cat+p.desc).toLowerCase().includes(q));
      renderGrid('katalogGrid', list);
      document.getElementById('resultCount').textContent = list.length + ' produk ditemukan';
    });
  });
  document.getElementById('searchInput')?.addEventListener('input', e=>{
    const active = document.querySelector('.chip.active')?.dataset.filter||'Semua';
    const q = e.target.value.toLowerCase();
    let list = active==='Semua' ? PRODUCTS : PRODUCTS.filter(p=>p.cat===active);
    if(q) list = list.filter(p=>(p.name+p.cat+p.desc).toLowerCase().includes(q));
    renderGrid('katalogGrid', list);
    document.getElementById('resultCount').textContent = list.length + ' produk ditemukan';
  });
}
// Cart page
function renderCart(){
  const wrap = document.getElementById('cartItems');
  if(!wrap) return;
  const c = getCart();
  if(!c.length){
    wrap.innerHTML = `<div class="empty"><div style="font-size:3rem">🛒</div><h3>Keranjang masih kosong</h3><p style="color:#8A7368">Yuk pilih aksesori handmade favoritmu!</p><br><a class="btn btn-terra" href="katalog.html">Lihat Katalog</a></div>`;
    document.getElementById('cartSummary').style.display='none';
    return;
  }
  wrap.innerHTML = c.map(item=>{
    const p = PRODUCTS.find(x=>x.id===item.id);
    if(!p) return '';
    return `<div class="cart-item">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='https://picsum.photos/seed/${p.id}/200/200'">
      <div style="flex:1"><b>${p.name}</b><div style="font-size:.85rem;color:#8A7368">${p.cat}</div>
      <div style="font-weight:800;margin-top:.3rem">${rupiah(p.price)}</div></div>
      <div style="display:flex;flex-direction:column;gap:.5rem;align-items:end">
        <div class="qty"><button onclick="changeQty('${p.id}',-1)">−</button><b>${item.qty}</b><button onclick="changeQty('${p.id}',1)">+</button></div>
        <b>${rupiah(p.price*item.qty)}</b>
        <button onclick="removeItem('${p.id}')" style="border:0;background:none;color:#B44;cursor:pointer;font-size:.85rem">🗑 Hapus</button>
      </div>
    </div>`;
  }).join('');
  updateSummary();
}
function changeQty(id,d){
  let c = getCart();
  const f = c.find(i=>i.id===id);
  if(!f) return;
  f.qty += d;
  if(f.qty<=0) c = c.filter(i=>i.id!==id);
  saveCart(c); updateBadge(); renderCart();
}
function removeItem(id){
  saveCart(getCart().filter(i=>i.id!==id));
  updateBadge(); renderCart(); toast('Produk dihapus');
}
function updateSummary(){
  const c = getCart();
  const sub = c.reduce((a,i)=>{ const p=PRODUCTS.find(x=>x.id===i.id); return a+(p?p.price*i.qty:0); },0);
  const ongkir = c.length ? (sub>=100000?0:12000) : 0;
  const total = sub+ongkir;
  const el = document.getElementById('summaryBody');
  if(el) el.innerHTML = `
    <div class="summary-row"><span>Subtotal (${cartCount()} item)</span><b>${rupiah(sub)}</b></div>
    <div class="summary-row"><span>Ongkir</span><b>${ongkir===0?'GRATIS':rupiah(ongkir)}</b></div>
    <div class="summary-row" style="font-size:.82rem;color:#8A7368"><span>🎉 Gratis ongkir min. belanja Rp100.000</span></div>
    <div style="margin:.8rem 0"><label>Kode voucher</label><div style="display:flex;gap:.5rem"><input id="voucher" placeholder="cth: NITSAYRA10"><button class="btn btn-outline btn-small" style="flex:0 0 auto" onclick="toast('Voucher belum tersedia')">Pakai</button></div></div>
    <div class="summary-total"><span>Total</span><span>${rupiah(total)}</span></div>
    <button class="btn btn-terra" style="width:100%;margin-top:1rem" onclick="checkoutWA()">Checkout via WhatsApp 💬</button>
    <button class="btn btn-outline" style="width:100%;margin-top:.5rem" onclick="clearCart()">Kosongkan</button>`;
}
function clearCart(){ saveCart([]); updateBadge(); renderCart(); }
function checkoutWA(){
  const c = getCart();
  if(!c.length) return toast('Keranjang kosong');
  const nama = document.getElementById('namaPenerima')?.value||'-';
  const alamat = document.getElementById('alamatPenerima')?.value||'-';
  let pesan = `Halo Nitsayra Craft! Saya mau order:%0A%0A`;
  c.forEach((i,n)=>{ const p=PRODUCTS.find(x=>x.id===i.id); pesan += `${n+1}. ${p.name} x${i.qty} - ${rupiah(p.price*i.qty)}%0A`; });
  const sub = c.reduce((a,i)=>a+PRODUCTS.find(x=>x.id===i.id).price*i.qty,0);
  pesan += `%0ATotal: ${rupiah(sub)}%0ANama: ${nama}%0AAlamat: ${alamat}`;
  window.open(`https://wa.me/6281234567890?text=${pesan}`,'_blank');
}
// Mobile nav + init
document.addEventListener('DOMContentLoaded', ()=>{
  updateBadge();
  setupFilter();
  renderCart();
  document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
  document.getElementById('hamburger')?.addEventListener('click', ()=> document.getElementById('navLinks')?.classList.toggle('open'));
  // contact form dummy
  document.getElementById('contactForm')?.addEventListener('submit', e=>{
    e.preventDefault(); toast('✓ Pesan terkirim! Kami bales max 1x24 jam 💌'); e.target.reset();
  });
  document.getElementById('newsletterForm')?.addEventListener('submit', e=>{
    e.preventDefault(); toast('✓ Makasih udah join! Cek email ya 🎁'); e.target.reset();
  });
});
