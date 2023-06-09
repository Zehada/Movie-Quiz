/**********
 * LOADER *
 **********/

// code pour afficher et enlever le loader

if (window.location.pathname == '/movie-quiz.html') {
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
}

/**********
 * SWIPER *
 **********/

var swiper = new Swiper(".myswiper", {
    slidesPerView: 'auto',
    spaceBetween: 30,
    freeMode: true,

});


/********************
 * PAGE PROPOSITION *
 ********************/


contentQuiz = document.getElementById("content-quiz");
const buttons = document.querySelectorAll(".swiper-slide img");
const buttonPressed = e => {
    localStorage.setItem('lien', e.target.attributes['src'].value);
}

for (let button of buttons) {
    button.addEventListener("click", buttonPressed);
}


let lien = localStorage.getItem('lien');
if (window.location.pathname == '/quiz.html') {

    contentQuiz.style.backgroundImage = "url('" + lien + "')";
}


/********
 * JSON *
 ********/

// fetch('/data.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));



// var obj;

// fetch('data.json')
//     .then(res => res.json())
//     .then(data => {
//         obj = data;
//     })
//     .then(() => {
//         console.log(obj.movies.movie[0]);
//     });

fetch('data.json')
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (data) => {
    if (window.location.pathname == '/quiz.html') {
        document.getElementById("soumettre").addEventListener("click", function () {
            for (i = 0; i < Object.keys(data.movies.movie).length; i++) {
                if ((document.querySelector("input").value === data.movies.movie[i].title) && (lien === data.movies.movie[i].picture)) {
                    contentQuiz.innerHTML = "bien joué";
                }
            }
        });


    }
    console.log("url('" + data.movies.movie[0].picture + "')")
}