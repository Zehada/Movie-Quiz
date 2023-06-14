/**********
 * LOADER *
 **********/

// code pour afficher et enlever le loader
const loading = document.getElementById("loader");
const content = document.getElementById("content");

if ((window.location.pathname == '/movie-quiz.html') && (!sessionStorage.viewed)) {
    sessionStorage.viewed = 1;


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
} else if (window.location.pathname == '/movie-quiz.html') {
    loading.style.display = "none";
    content.style.display = "block";
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
const buttons = document.querySelectorAll(".atrouver img");
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



fetch('data.json')
    .then(jsonData => jsonData.json())
    .then(data => printIt(data))

let printIt = (data) => {
    if (window.location.pathname == '/quiz.html') {
        sessionStorage.viewed = 1;
        var input = document.getElementById("fname");
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("soumettre").click();
            }
        });
        document.getElementById("soumettre").addEventListener("click", function () {
            for (i = 0; i < Object.keys(data.movies.movie).length; i++) {
                if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === data.movies.movie[i].title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lien === data.movies.movie[i].picture)) {
                    localStorage.setItem(("trouvé" + i), data.movies.movie[i].found)
                    document.getElementById("bonne-reponse").style.display = "block";
                    document.getElementById("mauvaise-reponse").style.display = "none";
                    setTimeout(function () { window.location.replace("movie-quiz.html") }, 3000);

                } else if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") != data.movies.movie[i].title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lien === data.movies.movie[i].picture)) {
                    document.querySelector("input").value = "";
                    document.getElementById("mauvaise-reponse").style.display = "block";
                }
            }
            for (i = 0; i < Object.keys(data.movies.serie).length; i++) {
                if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === data.movies.serie[i].title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lien === data.movies.serie[i].picture)) {
                    localStorage.setItem(("trouvée" + i), data.movies.serie[i].found)
                    document.getElementById("bonne-reponse").style.display = "block";
                    document.getElementById("mauvaise-reponse").style.display = "none";
                    setTimeout(function () { window.location.replace("movie-quiz.html") }, 3000);

                } else if ((document.querySelector("input").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") != data.movies.serie[i].title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) && (lien === data.movies.serie[i].picture)) {
                    document.querySelector("input").value = "";
                    document.getElementById("mauvaise-reponse").style.display = "block";
                }
            }



        });


    }
    if (window.location.pathname == '/movie-quiz.html') {
        let filmATrouver = document.querySelectorAll(".filmatrouver");
        for (i = 0; i < data.movies.movie.length; i++) {
            if (localStorage.getItem("trouvé" + i)) {
                document.getElementById("filmstrouves").innerHTML += "<div class='swiper-slide trouve'><a href='quiz2.html' target='_blank'><img class='" + data.movies.movie[i].id + "' src='" + localStorage.getItem("trouvé" + i) + "'></a></div>";
                for (div of filmATrouver) {
                    if (div.querySelector("img").attributes['src'].value === data.movies.movie[i].picture) {
                        div.remove();

                    }

                }
            }

        }

        let serieATrouver = document.querySelectorAll(".serieatrouver");
        for (i = 0; i < data.movies.serie.length; i++) {
            if (localStorage.getItem("trouvée" + i)) {
                document.getElementById("seriestrouvees").innerHTML += "<div class='swiper-slide trouve'><a href='quiz2.html' target='_blank'><img class='" + data.movies.serie[i].id + "' src='" + localStorage.getItem("trouvée" + i) + "'></a></div>";
                for (divs of serieATrouver) {
                    if (divs.querySelector("img").attributes['src'].value === data.movies.serie[i].picture) {
                        divs.remove();

                    }

                }
            }

        }
    }


    const contentQuizDeux = document.getElementById("content-quiz2");
    const imageTrouvee = document.querySelectorAll(".trouve img");

    const ImagePressed = e => {
        localStorage.setItem('ImageTrouvee', e.target.attributes['src'].value);
        localStorage.setItem('idtrouve', e.target.className);
    }

    for (let image of imageTrouvee) {
        image.addEventListener("click", ImagePressed);
        console.log(image)
    }


    let TrouveeImage = localStorage.getItem('ImageTrouvee');
    if (window.location.pathname == '/quiz2.html') {
        // contentQuizDeux.style.backgroundImage = "url('" + TrouveeImage + "')";
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTJjNzZiNGY4MTI0MGE1ZDliNmVhNDI1YjI1ZTYzZiIsInN1YiI6IjY0ODZmYmM4OTkyNTljMDBhY2NkY2Q1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yM3TXK2nsVecbZFkVPLjsLuS3loYN_zw1q92CQXVT8M'
            }
        };

        fetch('https://api.themoviedb.org/3/movie/' + localStorage.getItem("idtrouve") + '?language=fr-FR', options)
            .then(response => response.json())
            .then(data => printu(data))

            .catch(err => console.error(err));

        let printu = (data) => {
            document.getElementById("movietitle").innerHTML = data.title;
            document.getElementById("synopsis").innerHTML = data.overview;
        }

        fetch('https://api.themoviedb.org/3/movie/' + localStorage.getItem("idtrouve") + '/images', options)
            .then(response => response.json())
            .then(data => printimage(data))

            .catch(err => console.error(err));

        let printimage = (data) => {
            contentQuizDeux.style.backgroundImage = "url('https://image.tmdb.org/t/p/original" + data.backdrops[0].file_path + "')";
        }


        fetch('https://api.themoviedb.org/3/movie/' + localStorage.getItem("idtrouve") + '/credits?language=fr-FR', options)
            .then(response => response.json())
            .then(data => printActor(data))

            .catch(err => console.error(err));

        let printActor = (data) => {
            for (actor of data.cast)
                if (actor.profile_path) {
                    document.querySelector(".acteurs").innerHTML += "<div class='swiper-slide'><img src='https://image.tmdb.org/t/p/original" + actor.profile_path + "' alt='" + actor.name + "'><h4 class='mt-4'>" + actor.name + "</h4><h5>" + actor.character + "</h5></div>"
                }

        }

    }



}






