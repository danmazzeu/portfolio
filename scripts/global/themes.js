const themes = [
    '#c8ff00', // Lime
    '#ff002f', // Light Orange
    '#00ffff', // Light Blue
];
  
  let previousTheme = null;
  
function setRandomTheme() {
    let randomIndex;
    
    do {
        randomIndex = Math.floor(Math.random() * themes.length);
    } while (randomIndex === previousTheme);
  
    const randomTheme = themes[randomIndex];
    document.documentElement.style.setProperty('--theme', randomTheme);
    previousTheme = randomIndex;
}
  
window.onload = setRandomTheme;
  
setInterval(setRandomTheme, 3000);