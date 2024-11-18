
// Redirigir a la página de login (producto.html)
function redirectToLogin() {
    window.location.href = 'product.html';  // Redirige a producto.html
}

function redirectToLoginA() {
    window.location.href = 'index.html';  // Redirige a index.html
}




// Agregar esta nueva función para el menú móvil
function toggleMenu() {
    const navbarButtons = document.getElementById('navbarButtons');
    navbarButtons.classList.toggle('active');
}

// Modificar la función updateUIState para incluir el botón de reset
function updateUIState() {
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (isLoggedIn) {
        loginSection.classList.add('hidden');
        adminSection.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        resetBtn.classList.remove('hidden');
    } else {
        loginSection.classList.remove('hidden');
        adminSection.classList.add('hidden');
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        resetBtn.classList.add('hidden');
    }
    renderProducts();
}




// Estado de la aplicación
let isLoggedIn = false;
let products = [];

// Cargar productos guardados al iniciar
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    checkLoginStatus();
});

// Manejo del login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        updateUIState();
         window.location.href = 'product.html'; 

    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

document.getElementById('productForm').addEventListener('submit', function(e) {
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




function renderProducts() {
    const productsContainer = document.getElementById('productsContainer');
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




function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        products = products.filter(p => p.id !== productId);
        renderProducts();
        saveProducts();
    }
}


function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProducts() {
    products = JSON.parse(localStorage.getItem('products')) || [];
    renderProducts();
}




function checkLoginStatus() {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateUIState();
}

function showLoginForm() {
    document.getElementById('loginSection').classList.remove('hidden');
}

function logout() {
    isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    updateUIState();
   
}


function resetProducts() {
if (confirm('¿Estás seguro de que deseas eliminar TODOS los productos? Esta acción no se puede deshacer.')) {
    products = []; 
    localStorage.removeItem('products');  
    renderProducts();  
    alert('Todos los productos han sido eliminados');
}
}
