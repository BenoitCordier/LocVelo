//Constructor

class Diaporama {
    constructor(imgElem, images, txt) {
        this.imgElem = imgElem;
        this.images = images;
        this.txt = txt;

        this.circle = document.querySelectorAll(".circle");
        this.position = 0;
        this.interval = 0;

        this.pause = document.querySelector('#pause');
        this.play = document.querySelector('#play');
            
        this.start();
    }

    //Fonctionnalités

    slideLeft() {
        if (this.position <= 0) {
            this.position = this.images.length - 1;
        } else {
            this.position--;
        }
        this.imgElem.src = this.images[this.position];
        this.circle[this.position].style.backgroundColor = "#94C01F";
        if (this.position == this.images.length - 1) {
            this.circle[0].style.backgroundColor = "grey";
        } else {
            this.circle[this.position + 1].style.backgroundColor = "grey";
        }
        document.getElementById('txt').innerHTML = this.txt[this.position];
    }

    slideRight() {
        if (this.position >= this.images.length - 1) {
            this.position = 0;
        } else {
            this.position++;
        }
        this.imgElem.src = this.images[this.position];
        this.circle[this.position].style.backgroundColor = "#94C01F";
        if (this.position == 0) {
            this.circle[this.images.length - 1].style.backgroundColor = "grey";
        } else {
            this.circle[this.position - 1].style.backgroundColor = "grey";
        }
        document.getElementById('txt').innerHTML = this.txt[this.position];
    }

    start() {
        this.imgElem.src = this.images[this.position];
        this.circle[this.position].style.backgroundColor = "#94C01F";
        document.getElementById('txt').innerHTML = this.txt[this.position];
    }       
}