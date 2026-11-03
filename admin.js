import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Login function
window.login = async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    document.getElementById('errorMsg').innerText = "Login failed: " + error.message;
  }
};

// Logout function
window.logout = function() {
  signOut(auth);
};

// Login state check garne
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
  } else {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminSection').style.display = 'none';
  }
});

// Product add garne function
window.addProduct = async function() {
  const name = document.getElementById('pName').value;
  const price = Number(document.getElementById('pPrice').value);
  const category = document.getElementById('pCategory').value;
  const image = document.getElementById('pImage').value;
  const msg = document.getElementById('adminMsg');

  if(!name || !price) {
    msg.style.color = "red";
    msg.innerText = "Name ra Price haliyeko hunu parcha!";
    return;
  }

  try {
    await addDoc(collection(db, "products"), {
      name: name,
      price: price,
      category: category,
      image: image
    });
    msg.style.color = "green";
    msg.innerText = "Product successfully added!";
    document.getElementById('pName').value = '';
    document.getElementById('pPrice').value = '';
    document.getElementById('pImage').value = '';
  } catch (error) {
    msg.style.color = "red";
    msg.innerText = "Error: " + error.message;
  }
};
