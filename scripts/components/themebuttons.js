const themeButtons = document.querySelectorAll('.theme-button');
const borderSelected = "1px solid #666";

function setThemeFromStorage() {
    const storedTheme = localStorage.getItem('themeColor');
    if (storedTheme) {
        document.documentElement.style.setProperty('--theme', storedTheme);
        
        themeButtons.forEach(button => {
            if (button.dataset.color == storedTheme) {
                button.style.border = borderSelected;
            }
        });
    } else {
        const root = document.documentElement;
        const theme = getComputedStyle(root).getPropertyValue('--theme');
        document.documentElement.style.setProperty('--theme', theme);

        themeButtons.forEach(button => {
            if (button.dataset.color == theme) {
                button.style.border = borderSelected;
            }
        });
    }
}

themeButtons.forEach(button => {
    const color = button.dataset.color;
    button.style.color = color;
    button.addEventListener('click', () => {
        themeButtons.forEach(btn => btn.style.border = "");
        button.style.border = borderSelected;
        document.documentElement.style.setProperty('--theme', color);
        localStorage.setItem('themeColor', color);
    });
});

setThemeFromStorage();