function themeSwitcher() {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkTheme', true);
    } else {
        localStorage.setItem('darkTheme', false);
    }
};

$darkModeBtn.addEventListener('click', themeSwitcher);

function setThemeOnLocalStorage() {
    if (localStorage.getItem('darkTheme') == 'true') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
};
setThemeOnLocalStorage()