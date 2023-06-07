/**********
 * LOADER *
 **********/

// code pour afficher et enlever le loader
const loading = document.getElementById("loader");
const content = document.getElementById("content");

document.onload = setTimeout(showContent, 3500);

function showContent() {
    loading.style.display = "none";
    content.style.display = "block";
}


let titreLoader = document.getElementById("titre-loader");
let spans = document.querySelectorAll("h1 span");
let title = titreLoader.innerText;

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z']
const titre = ["M", "O", "V", "I", "E", " ", "Q", "U", "I", "Z"];


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const defilement = async () => {
    let index = 0;
    for (lettre of spans) { /* pour chaque lettre du titre */
        for (const item of alphabet) { /* pour chaque lettre de l'alphabet */
            await sleep(6) /* attend entre chaque lettre de l'alphabet */
            lettre.innerHTML = item;
        }
        lettre.innerHTML = titre[index];
        index++
    }
}

defilement()


/**********
 * SWIPER *
 **********/

var swiper = new Swiper(".myswiper", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    freeMode: true,

});