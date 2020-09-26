/* BURGUER MENU */
    const $navbarMenu = document.getElementById("navbar");
    const $btnMenu = document.getElementById("btnMenu");

const showMenu = () => {
    $navbarMenu.classList.toggle('navbar_menu_open');

    if ($navbarMenu.classList.contains("navbar_menu_open")) {
        $btnMenu.src = "assets/close.svg"
    } else{
        $btnMenu.src = "assets/burger.svg"
    }
}

/** NAVBAR ICONS EVENTS **/

const $btnCrear = document.getElementById('btnCrear');

$btnCrear.addEventListener('mouseover', () => {
    $btnCrear.src = "assets/CTA-crear-gifo-hover.svg";
}  )

$btnCrear.addEventListener('click', () => {
    $btnCrear.src = "assets/CTA-crear-gifo-active.svg"
})