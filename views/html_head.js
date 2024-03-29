// head.js

const { meta } = require('../config/app.json');
const html_head = n=>{
return `<!-- html_head.js --><meta charset="utf-8">
<title>${n.title ? n.title : "Simple title"}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
 <link rel="canonical" href="${meta.url}" />
      <link rel="alternate" hreflang="x-default" href="${meta.url}" />
      <link rel="alternate" hreflang="en" href="${meta.url}" />
      <link rel="alternate" hreflang="ru" href="${meta.url}/ru" />
      <link rel="alternate" hreflang="de" href="${meta.url}/de" />
      <link rel="alternate" hreflang="es" href="${meta.url}/es" />
      <link rel="alternate" hreflang="fr" href="${meta.url}/fr" />
      <link rel="alternate" hreflang="zh" href="${meta.url}/zh" />
${n.meta ? n.meta : ''}
<script type="application/ld+json"> { "@context": "https://schema.org", "@type": "Organization", "url": "${meta.url}", "logo": "${meta.icon}" } </script>
<link rel="shortcut icon" type="image/ico" href="${process.env.DEVELOPMENT=='yes'?'/images/w4.png':`${meta.url}/images/w4.png`}"> 
${n.csslink ? `<link href="${n.csslink}" rel="stylesheet">` :''}
${n.csslink2 ? `<link href="${n.csslink2}" rel="stylesheet">` : ''}
${n.cssl ? get_cssl(n) : ''}
${n.csshelper ? `<style>${ n.csshelper }</style>`:''}

<script>
var flexsupport=false;
var html=document.getElementsByTagName("html")[0],dtct=document.createElement('div');
dtct.style.display='flex';if(dtct.style.display === 'flex'){
html.className='flex';flexsupport=true;
}else{
window.onload = function(){
var oldbrowser = document.getElementById("oldBrowser");
if(oldbrowser){oldbrowser.style.display = "block";}
}}

</script>  
<script src="/js/globalik.js"></script>`;
}
module.exports = { html_head };

function get_cssl(n){
let s = '';
n.cssl.forEach((el,i)=>{
s+=`<link href="${el}" rel="stylesheet">`;
})
return s;
}
