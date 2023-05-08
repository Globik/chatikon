
const html_footer = n=>{let a = new Date();
return `<!-- html_footer.js -->
<section id="social">
<a href="https://vk.com/public201149312"><img alt="VK" src="/images/vk.png" width="50" height="50"></a>
<a href="https://t.me/chatslider"><img alt="Telegram" src="/images/telega.png" width="50" height="50"></a>
</section>
<section><span>&#9400; 2023 - </span><span>${a.getFullYear()}</span></section>

<!-- html_footer.js -->
`;
}
module.exports = { html_footer };
