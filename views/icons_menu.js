const icons_menu = n=>{
	return `<!-- icons_menu.js -->
	<nav id="svgIconsNav">
<div class="flex-items-svgicons${n.current == 'main' ? ' active' : ''}"><a class="svg-nav-a" href="/">
<div class="items-container">
<div class="icons-box">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background=" 1000 1000" xml:space="preserve">
<g><g><path d="M916,426c0-229.4-186.6-416-416-416c-38.6,0-75.8,5.7-111.3,15.6l-0.8-0.6c-0.2,0.3-0.3,0.6-0.5,0.9C212.6,75.2,84,235.7,84,426c0,83.8,25.1,161.8,67.9,227.2h-48.4V990h792.9V653.1h-48.3C891,587.9,916,509.8,916,426z M874.6,405.9H724.7c-1.5-44.7-6.5-88.6-15.5-131.3h134.3C861.4,315,872.2,359.4,874.6,405.9z M822.4,234.1H699.2C684.2,178.7,663,125.7,635.4,76C714,106.6,779.6,162.6,822.4,234.1z M520.2,51.4c19.6,1.1,38.8,3.2,57.5,7.2c34.9,54.1,61.7,113.1,79.8,175.5H520.2V51.4L520.2,51.4z M520.2,274.6H668c9.5,42.6,14.8,86.5,16.4,131.3H520.3L520.2,274.6L520.2,274.6z M520.2,446.2h164.5c-0.8,44.7-5.5,88.7-14.3,131.3H520.2V446.2z M520.2,617.9h140.4c-3.3,11.9-7,23.6-10.9,35.3H520.2L520.2,617.9L520.2,617.9z M413.6,60.8c21.5-5,43.6-8.2,66.3-9.4v182.7H339.4C356,172.8,380.9,114.5,413.6,60.8z M315.3,405.9c0.8-44.7,5.5-88.6,14.3-131.3h150.2v131.3H315.3z M479.8,446.2v131.3H332.1c-9.5-42.6-14.8-86.6-16.4-131.3H479.8z M356.9,78.9c-25.6,49-45.3,101-59.1,155.2H177.6C219,165,281.7,110,356.9,78.9z M156.5,274.6h132.1c-8.4,42.8-12.9,86.7-13.8,131.3H125.4C127.9,359.4,138.6,315,156.5,274.6z M125.4,446.2h149.9c1.5,44.7,6.5,88.7,15.5,131.3H156.6C138.6,537,127.9,492.8,125.4,446.2z M300.8,617.9c3.3,11.9,6.9,23.6,10.7,35.3H201.9c-8.6-11.3-16.9-23-24.3-35.3H300.8z M347.4,911.9v19.6H192.2V711.7h22.9h23v180.7h109.3V911.9z M342.5,617.9h137.3v35.3H354.1C350,641.5,345.9,629.9,342.5,617.9z M412.2,931.5h-22.9h-23V711.7h22.9h23V931.5z M546.6,931.5h-21.8h-21.8l-74.5-219.8h24.4h24.4l48.3,167.7l48.1-167.7h23.6h23.8L546.6,931.5z M807.8,911.9v19.6H641V711.7h161.7V731v19.7H686.9v46.6h107.5v18.8v19H686.9v57.3h121L807.8,911.9L807.8,911.9L807.8,911.9z M798.1,653.2H692.2c3.5-11.7,7-23.4,10-35.3h120.2C815,630.2,806.8,641.9,798.1,653.2z M711.4,577.5c8.3-42.7,12.9-86.7,13.8-131.3h149.5c-2.4,46.5-13.2,90.8-31.1,131.3H711.4z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
</svg>
</div>
<div class="svg-icons-nav-divspan"><span>${n.ln == 'ru' ? 'Рулетка' : 'Chat-roulette'}</span></div>
</div>
</a>
</div>


<!-- JSON.stringify(n.user)-->
${!n.user ? `<div class="flex-items-svgicons">
	<div class="items-container"><a class="svg-nav-a" href="/login">
<div class="icons-box">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">

<g><g><path d="M346.9,500H40.6V377.5h306.2V255l183.7,183.8L346.9,622.5V500z M959.4,10v796.3L591.9,990V806.3H224.4v-245h61.3V745h306.3V193.8l245-122.5H285.6v245h-61.3V10H959.4z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g>
</svg>
</div><div class="svg-icons-nav-divspan"><span>${n.ln == 'ru' ? 'Войти':'Log in'}</span></div></div></a>
</div>` : `<div class="flex-items-svgicons">
<div class="items-container"><a class="svg-nav-a" href="/logout">
<div class="icons-box">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><path d="M10,55.2L10,55.2L10,55.2z"/><path d="M606.7,863.5H161.2V254.3h445.5v171.5h80.5V274.4c0-55.5-45.4-100.9-101.1-100.9H182.5c-55.5,0-100.9,45.4-100.9,100.9v569.4c0,55.5,45.4,100.9,100.9,100.9h403.6c55.5,0,101.1-45.3,101.1-100.9V742.9h-80.5V863.5z M990,585.2L789.1,388.3v136.1H334.9v122.3h454.2V782L990,585.2z"/></g>
</svg>
</div>
<div class="svg-icons-nav-divspan"><span>${n.ln == 'ru' ? 'Выйти':'Log out'}</span></div>
</div></a>
</div>`}

${n.user ? '' : `<div class="flex-items-svgicons">
	<div class="items-container"><a class="svg-nav-a" href="/signup">
<div class="icons-box">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
<g><path d="M499.2,45.9l-83.7-30.5c-9.8-3.6-20-5.3-30.1-5.3c-36.5,0-71.3,22.9-84.6,59.9L57.3,738.5c-2.9,7.8-3.6,16-2,24.1l39,209.1c2,11.4,11.8,18.3,21.8,18.3c4.9,0,9.8-1.6,14-5.1l164.4-135.2c6.2-5.1,11.1-12,14-19.6L552,161.5C568.9,114.5,545.3,62.8,499.2,45.9z M510.1,146.1L266.7,814.7c0,0.2-0.2,0.4-0.4,0.4l-135,111.1L99.2,754.4c0-0.2,0-0.4,0-0.7L342.6,85.3c6.7-18.3,23.8-30.5,42.8-30.5c5.1,0,10,0.9,14.9,2.7L484,88c11.1,4,19.8,12.2,24.9,23.2C513.9,122,514.3,134.5,510.1,146.1z"/><path d="M633.7,344.1h289.5c12.2,0,22.3-10,22.3-22.3s-10-22.3-22.3-22.3H633.7c-12.3,0-22.3,10-22.3,22.3S621.5,344.1,633.7,344.1z"/><path d="M923.3,477.7H544.6c-12.3,0-22.3,10-22.3,22.3s10,22.3,22.3,22.3h378.6c12.2,0,22.3-10,22.3-22.3S935.5,477.7,923.3,477.7z"/><path d="M923.3,655.9H455.5c-12.3,0-22.3,10-22.3,22.3s10,22.3,22.3,22.3h467.7c12.2,0,22.3-10,22.3-22.3S935.5,655.9,923.3,655.9z"/></g>
</svg>
</div><div class="svg-icons-nav-divspan"><span>${n.ln == 'ru' ? 'Регистрация':'Sign up'}</span></div></div></a>
</div>`}
</nav>`;
	}
	module.exports = { icons_menu }
