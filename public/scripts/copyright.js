const date = new Date();
const year = date.getFullYear();

const copyright = document.getElementById("copyright");

copyright.innerHTML = "&copy" + year + "  Atrady . All rights reserved.";
