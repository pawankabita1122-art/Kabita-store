import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Tapai ko Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC_UL-D3ij_eRmbsDwu40QIKKorR7nRfIQ",
  authDomain: "kabita-beauty-and-clothing.firebaseapp.com",
  projectId: "kabita-beauty-and-clothing",
  storageBucket: "kabita-beauty-and-clothing.firebasestorage.app",
  messagingSenderId: "153365876858",
  appId: "1:153365876858:web:de37c2705e4e544b552bc3",
  measurementId: "G-DMTTNESEYW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let allProducts = [];

// Product load garne
async function loadProducts() {
  const grid = document.getElementById('productGrid');
  try {
    const snap = await getDocs(collection(db, 'products'));
    allProducts = [];
    snap.forEach(doc => {
      allProducts.push({ id: doc.id, ...doc.data() });
    });

    if (allProducts.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1; text-align:center;">Ahile samma kunai product chaina. Admin panel bata add garnus.</p>';
      return;
    }
    renderProducts(allProducts);
  } catch (err) {
    console.error(err);
    grid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:red;">Product load garna sakiena. Firebase config check garnus.</p>';
  }
}

// Product render garne
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = list.map(p => `
    <div class="product" data-cat="${p.category}">
      <div class="img-box">${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">` : (p.category === 'cosmetics' ? '💄' : '👗')}</div>
      <h3>${p.name}</h3>
      <p class="price">Rs. ${p.price}</p>
      <a href="https://wa.me/9779800000000?text=${encodeURIComponent('I want ' + p.name)}" class="btn-small" target="_blank">Order</a>
    </div>
  `).join('');
}

// Category filter
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    const filtered = cat === 'all' ? allProducts : allProducts.filter(p => p.category === cat);
    if (filtered.length === 0) {
      document.getElementById('productGrid').innerHTML = '<p style="grid-column:1/-1; text-align:center;">Yo category ma product chaina.</p>';
    } else {
      renderProducts(filtered);
    }
  });
});

// Contact form
window.sendMsg = function(e) {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input, textarea');
  const text = `Namaste! Ma ${inputs[0].value} (${inputs[1].value}) bata.\n\n${inputs[2].value}`;
  window.open(`https://wa.me/9779800000000?text=${encodeURIComponent(text)}`, '_blank');
  alert('Dhanyabad! Message WhatsApp ma pathai raheko cha.');
  e.target.reset();
};

loadProducts();
