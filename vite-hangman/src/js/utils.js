export const darkModeHandle = () => {
    const darkModeSwitcher = document.getElementById('toggleDarkMode')
    const htmlElement = document.querySelector('html')

    if (localStorage.getItem('mode') === 'dark') {
        htmlElement.classList.add('dark');
        darkModeSwitcher.checked = true;
    }

    darkModeSwitcher.addEventListener('click', () => {
        const htmlElement = document.querySelector('html')
        htmlElement.classList.toggle('dark');

        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('mode', 'dark');
        } else {
            localStorage.setItem('mode', 'light');
        }
    })
}