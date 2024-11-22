<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda Online</title>
    <link rel="stylesheet" type="text/css" href="Css/stilo.css" />
    <link rel="icon" type="image/x-icon" href="imag-icono.png">
    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>



</head>
<body>

    <nav class="navbar">
        <a href="#" class="navbar-brand">Tienda Online</a>
        <button class="menu-toggle" onclick="toggleMenu()">☰</button>
        <div class="navbar-buttons" id="navbarButtons">
            <button id="loginBtn" class="nav-button primary"  onclick="redirectToLogin()">Usuario</button>
        
        </div>
    </nav>

    <section class="store-description">
        <div class="store-description">
            <h2>🛍️ Descubre la Comodidad de Comprar sin Salir de Casa</h2>
            
            <p>Bienvenido a tu tienda online de confianza, donde la calidad y la comodidad se encuentran. Transforma tu experiencia de compra con un servicio pensado para ti:</p>
            
            <ul>
                <li>
                    <span class="icon">🚚</span>
                    <strong>Entrega Rápida y Segura</strong>
                    <br>
                    Retiro en nuestro local.
                </li>
                
                <li>
                    <span class="icon">💳</span>
                    <strong>Métodos de Pago Flexibles</strong>
                    <br>
                    Transferencia bancaria sin complicaciones, con Mercado Pago. Opciones pensadas para tu comodidad.
                </li>
                
                <li>
                    <span class="icon">🌟</span>
                    <strong>Calidad Garantizada</strong>
                    <br>
                    Productos seleccionados con los más altos estándares. Precios competitivos sin sacrificar la excelencia.
                </li>
                
                <li>
                    <span class="icon">🤝</span>
                    <strong>Compra Inteligente, Compra Segura</strong>
                    <br>
                    Sin intermediarios. Atención personalizada. Asesoramiento en cada paso de tu compra.
                </li>
            </ul>
            
            <p><em>¿Listo para una experiencia de compra revolucionaria?</em></p>
            
            <a href="https://wa.me/5493435517052" class="cta-button" target="_blank">
                Contáctanos por WhatsApp
            </a>
        </div>
    </section>
  

    <div id="productsContainer" class="products-grid">
        <!-- Aquí se mostrarán los productos -->
    </div>

    <!-- Botón de WhatsApp -->
<a href="https://wa.me/5493435517052" target="_blank" id="whatsappBtn">
    <img src="icono logo whatsapp.png" alt="WhatsApp" />
</a>



<script type="module" src="js/demos.js"></script>







</body>
</html>
