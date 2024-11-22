// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC-zHeQEzKvp_JmAzDg4EOdzvLg1NgYJUA",
    authDomain: "tienda-online-d76f5.firebaseapp.com",
    projectId: "tienda-online-d76f5",
    storageBucket: "tienda-online-d76f5.firebasestorage.com",
    messagingSenderId: "610175643337",
    appId: "1:610175643337:web:bebe6750ac119d394f2718"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Estado de inicio de sesión
let isLoggedIn = false;

// Función para manejar la redirección a la página de login
function redirectToLogin() {
    window.location.href = 'product.html';
}

// Función para manejar la redirección a la página de inicio
function redirectToLoginA() {
    window.location.href = 'index.html';
}

// Función para alternar el menú móvil
function toggleMenu() {
    const navbarButtons = document.getElementById('navbarButtons');
    if (navbarButtons) {
        navbarButtons.classList.toggle('active');
    }
}

// Función para actualizar el estado de la interfaz de usuario
function updateUIState(user) {
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    const logoutBtn = document.getElementById('logoutBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (loginSection && adminSection && logoutBtn && resetBtn) {
        if (user) {
            isLoggedIn = true;
            loginSection.classList.add('hidden');
            adminSection.classList.remove('hidden');
            logoutBtn.classList.remove('hidden');
            resetBtn.classList.remove('hidden');
        } else {
            isLoggedIn = false;
            loginSection.classList.remove('hidden');
            adminSection.classList.add('hidden');
            logoutBtn.classList.add('hidden');
            resetBtn.classList.add('hidden');
        }
        renderProducts();
    }
}

// Renderizar productos
function renderProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        productsContainer.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            const adminControls = isLoggedIn ? `
                <div class="admin-controls">
                    <button class="delete-btn" onclick="deleteProduct('${product.id}')">Eliminar</button>
                </div>
            ` : '';
            
            productCard.innerHTML = `
                ${adminControls}
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="price">$${parseFloat(product.price).toFixed(2)}</p>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
    }
}

// Eliminar producto
function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        products = products.filter(p => p.id !== productId);
        renderProducts();
        saveProducts();
    }
}

// Guardar productos en localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Inicializar productos
let products = [];

// Cargar productos
function loadProducts() {
    const storedProducts = localStorage.getItem('products');
    products = storedProducts ? JSON.parse(storedProducts) : [];
    renderProducts();
}

// Manejo del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const resetBtn = document.getElementById('resetBtn');
    const productForm = document.getElementById('productForm');

    // Evento de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("Inicio de sesión exitoso:", userCredential.user);
                    window.location.href = "product.html";
                })
                .catch((error) => {
                    console.error("Error al iniciar sesión:", error.message);
                    alert("Usuario o contraseña incorrectos");
                });
        });
    }

    // Evento de cierre de sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            signOut(auth)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Error al cerrar sesión:", error);
                });
        });
    }

    // Evento de reinicio de productos
    if (resetBtn) {
        resetBtn.addEventListener('click', resetProducts);
    }

    // Evento de agregar producto
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const productName = document.getElementById('productName').value;
            const productPrice = document.getElementById('productPrice').value;
            const productDescription = document.getElementById('productDescription').value;
            const productImage = document.getElementById('productImage').files[0];

            if (!productImage) {
                alert('Por favor selecciona una imagen');
                return;
            }

            const formData = new FormData();
            formData.append('file', productImage);
            formData.append('upload_preset', 'productos_unsigned');
            formData.append('folder', 'products/'); 

            // Cargar la imagen a Cloudinary
            fetch('https://api.cloudinary.com/v1_1/dmqktwloi/image/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                if (result.secure_url) {
                    // La imagen se cargó correctamente
                    const product = {
                        id: Date.now().toString(),
                        imageUrl: result.secure_url, 
                        name: productName,
                        price: productPrice,
                        description: productDescription
                    };

                    products.push(product);
                    localStorage.setItem('products', JSON.stringify(products));

                    alert('Producto agregado exitosamente');
                    window.location.href = 'index.html';
                } else {
                    alert('Error al cargar la imagen. Intenta nuevamente.');
                }
            })
            .catch(error => {
                console.error('Error al subir la imagen:', error);
                alert('Hubo un problema al subir la imagen. Verifica tu configuración.');
            });
        });
    }

    // Observador de estado de autenticación
    onAuthStateChanged(auth, (user) => {
        updateUIState(user);
        if (user) {
            console.log('Usuario autenticado:', user);
            loadProducts();
        } else {
            console.log('No hay usuario autenticado');
            // Asegurarse de que los productos se carguen incluso si no hay usuario
            loadProducts();
        }
    });
});

// Función para reiniciar productos
function resetProducts() {
    if (confirm('¿Estás seguro de que deseas eliminar TODOS los productos? Esta acción no se puede deshacer.')) {
        products = []; 
        localStorage.removeItem('products');  
        renderProducts();  
        alert('Todos los productos han sido eliminados');
    }
}

// Exportar funciones globales para uso en línea
window.redirectToLogin = redirectToLogin;
window.redirectToLoginA = redirectToLoginA;
window.toggleMenu = toggleMenu;
window.deleteProduct = deleteProduct;
