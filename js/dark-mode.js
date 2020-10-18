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
        $darkModeBtn.innerHTML = "MODO DIURNO"
        $logo.src = '/assets/Logo-modo-noc.svg';
        $camera.src = '/assets/camara-modo-noc.svg';
        $cameraRoll.src = '/assets/pelicula-modo-noc.svg';
        $btnCrear.src = '/assets/CTA-crar-gifo-modo-noc.svg';
        $btnArrowPrevious.src = '/assets/button-slider-left-md-noct.svg';
        $btnArrowNext.src = '/assets/button-slider-right-md-noct.svg';

    } else {
        document.body.classList.remove('dark');
        $darkModeBtn.innerHTML = "MODO NOCTURNO"
        $logo.src = '/assets/logo-desktop.svg';
        $camera.src = '/assets/camara.svg';
        $cameraRoll.src = '/assets/pelicula.svg';
        $btnCrear.src = '/assets/button-crear-gifo.svg';
        $btnArrowPrevious.src = 'assets/button-slider-left.svg';
        $btnArrowNext.src = 'assets/Button-Slider-right.svg';

    }
};
setThemeLocalStorage();

function trendingArrowsTheme() {
    if (localStorage.getItem('darkTheme') == 'true') {
		$btnArrowPrevious.src = 'assets/button-slider-left-md-noct.svg';
		$btnArrowNext.src = 'assets/button-slider-right-md-noct.svg';
	} else {
		$btnArrowPrevious.src = 'assets/button-slider-left.svg';
		$btnArrowNext.src = 'assets/Button-Slider-right.svg';
	}
};

$btnArrowPrevious.addEventListener('mouseover', () => {
	$btnArrowPrevious.src = 'assets/button-slider-left-hover.svg';
});

$btnArrowNext.addEventListener('mouseover', () => {
	$btnArrowNext.src = 'assets/Button-Slider-right-hover.svg';
});

$btnArrowPrevious.addEventListener('mouseout', trendingArrowsTheme);
$btnArrowNext.addEventListener('mouseout', trendingArrowsTheme);

$btnCrear.addEventListener('mouseout', () => {
    if (localStorage.getItem('darkTheme') == 'true') {
        $btnCrear.src = '/assets/CTA-crar-gifo-modo-noc.svg';
    } else {
        $btnCrear.src = '/assets/button-crear-gifo.svg';
    }
});