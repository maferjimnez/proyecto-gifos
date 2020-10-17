function themeSwitcher() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkTheme', true);
    } else {
        localStorage.setItem('darkTheme', false);
    }
};

$darkModeBtn.addEventListener('click', themeSwitcher);

function setThemeLocalStorage() {
    if (localStorage.getItem('darkTheme') == 'true') {
        document.body.classList.add('dark');
        $logo.src = '/assets/Logo-modo-noc.svg';
        $camera.src = '/assets/camara-modo-noc.svg';
        $cameraRoll.src = '/assets/pelicula-modo-noc.svg';
        $btnCrear.src = '/assets/CTA-crar-gifo-modo-noc.svg';
        $btnArrowPrevious.src = '/assets/button-slider-left-md-noct.svg';
        $btnArrowNext.src = '/assets/button-slider-right-md-noct.svg';

    } else {
        document.body.classList.remove('dark');
        $logo.src = '/assets/logo-desktop.svg';
        $camera.src = '/assets/camara.svg';
        $cameraRoll.src = '/assets/pelicula.svg';
        $btnCrear.src = '/assets/button-crear-gifo.svg';
        $btnArrowPrevious.src = 'assets/button-slider-left.svg';
        $btnArrowNext.src = 'assets/Button-Slider-right.svg';

    }
};
setThemeLocalStorage();