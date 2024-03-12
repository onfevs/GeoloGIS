// Obtener elementos del DOM
const items = document.querySelectorAll('.slider-items .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const thumbnails = document.querySelectorAll('.thumbnail figure');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menuToggle = document.querySelector('nav .menu > li:last-child > a');
const dropdown = document.querySelector('.dropdown');

// Configurar parámetros
let countItem = items.length;
let itemActive = 0;

// Función para centrar el thumbnail seleccionado
function centerThumbnail() {
    const activeThumb = document.querySelector('.thumbnail figure.active');
    activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center' });
}

// Función para mostrar el slider
function showSlider() {
    // Remover la clase "active" del elemento anterior
    document.querySelector('.slider-items .item.active').classList.remove('active');
    document.querySelector('.thumbnail figure.active').classList.remove('active');

    // Agregar la clase "active" al nuevo elemento
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // Centrar el thumbnail seleccionado
    centerThumbnail();
}

// Evento para el botón "Siguiente"
next.onclick = function() {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
}

// Evento para el botón "Anterior"
prev.onclick = function() {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
}

// Autoplay del slider
let refreshInterval = setInterval(next.onclick, 30000);

// Evento click en las miniaturas
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

// Agregar evento de clic al menú hamburguesa
hamburgerMenu.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    menu.style.display = window.innerWidth <= 768 ? (menu.style.display === 'none' ? 'flex' : 'none') : 'flex';
});

// Asegúrate de que el menú se muestre cuando se redimensiona la pantalla
window.addEventListener('resize', () => {
    const menu = document.querySelector('.menu');
    menu.style.display = window.innerWidth > 768 ? 'flex' : 'none';
});

// Agregar el controlador de eventos de clic al elemento "Info"
menuToggle.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
});

// Añadir alt attribute a las imágenes del slider para mejorar SEO
items.forEach((item, index) => {
    item.querySelector('img').setAttribute('alt', `Slider Image ${index + 1}`);
});

// Añadir alt attribute a las imágenes de las miniaturas para mejorar SEO
thumbnails.forEach((thumbnail, index) => {
    thumbnail.querySelector('img').setAttribute('alt', `Thumbnail ${index + 1}`);
});

// Agregar un event listener al documento para ocultar el dropdown cuando se hace clic en cualquier lugar fuera de él
document.addEventListener('click', function(event) {
    // Verificar si el clic no ocurrió dentro del dropdown ni en el botón de menú
    if (!dropdown.contains(event.target) && event.target !== menuToggle) {
        dropdown.style.display = 'none'; // Ocultar el dropdown
    }
});