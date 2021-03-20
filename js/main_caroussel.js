// Main Caroussel

var images = ['assets/img/img1.jpg', 'assets/img/img2.jpg', 'assets/img/img3.jpg', 'assets/img/img4.jpg'];

var imgElem = window.document.getElementById('caroussel').querySelector('img');

var txt = ['Texte 1', 'Texte 2', 'Texte 3', 'Texte 4'];

var caroussel = new Diaporama(imgElem, images, txt);

caroussel.start();
clearInterval(caroussel.interval);
caroussel.interval = setInterval(() => { caroussel.slideRight() }, 5000);

function init() {
    window.document.addEventListener('click', ev => {
        const target = ev.target;
        if (target.id === 'play') {
            interval = setInterval(() => { caroussel.slideRight() }, 5000);
            caroussel.play.style.display = 'none';
            caroussel.pause.style.display = 'block';
        } else if (target.id === 'pause') {
            clearInterval(caroussel.interval);
            caroussel.pause.style.display = 'none';
            caroussel.play.style.display = 'block';
        } else if (target.id === 'btnLeft') {
            caroussel.slideLeft();
        } else if (target.id === 'btnRight') {
            caroussel.slideRight();
        }
        console.log(caroussel.interval);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') {
            caroussel.slideRight();
        }
        if (e.key === 'ArrowLeft') {
            caroussel.slideLeft();
        }
    });
}

init();
