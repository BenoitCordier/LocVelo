// Timer

class Timer {
    constructor(duration, display) {
        this.display = display;
        this.duration = duration;
        this.count = null;

        this.btnValider = document.querySelector('.btnValider');
        this.btnClearReservation = document.querySelector('#btnClearReservation');

        this.info = document.querySelector('#info');
        this.countdownDiv = document.querySelector('#countdownDiv');

        this.countStorage = sessionStorage.getItem('countStorage');

        this.btnValider.addEventListener('click', (e) => {
            clearInterval(this.count);
            this.duration = duration;
            localStorage.removeItem('yes');
            this.countdownDiv.style.display = 'block';
            this.startTimer();
        });

        this.btnClearReservation.addEventListener('click', () => {
            if (confirm("\u00cates-vous s\u00fbr(e) de vouloir annuler votre r\u00e9servation ?")) {
                clearInterval(this.count);
                this.duration = duration;
                this.info.style.display = 'none';
                sessionStorage.removeItem("minutes");
                sessionStorage.removeItem("seconds");

                alert('Votre r\u00e9servation a \u00e9t\u00e9 annul\u00e9e !');
            };
        });

        window.onload = this.restoreStorage;
    };

    startTimer() {

        this.count = setInterval(() => {

            this.minutes = parseInt(this.duration / 60, 10);
            this.seconds = parseInt(this.duration % 60, 10);

            this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
            this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;

            this.display.innerHTML = ' ' + this.minutes + " : " + this.seconds;

            sessionStorage.setItem("minutes", this.minutes);
            sessionStorage.setItem("seconds", this.seconds);

            this.duration--;

            if (this.duration < 0) {
                this.info.style.display = 'none';
                this.duration = 0;

                var alerted = localStorage.getItem('alerted') || '';

                if (alerted != 'yes') {
                    alert("Votre r\u00e9servation a expir\u00e9 !\n\u00c0 bient\u00f4t");
                    localStorage.setItem('alerted', 'yes');
                };
            };
        }, 1000);
    };

    restoreStorage() {
        this.minutes_data = this.sessionStorage.getItem("minutes");
        this.seconds_data = this.sessionStorage.getItem("seconds");

        if (!this.minutes_data || !this.seconds_data) {

        } else {
            this.duration = parseInt(this.minutes_data * 60) + parseInt(this.seconds_data);
            this.display = document.querySelector('#time');
            document.getElementById('firstNameReservation').innerHTML = sessionStorage.getItem('firstNameReservation');
            document.getElementById('lastNameReservation').innerHTML = sessionStorage.getItem('lastNameReservation');
            document.getElementById('stationNameReservation').innerHTML = sessionStorage.getItem('stationNameReservation');
            document.getElementById('stationAddressReservation').innerHTML = sessionStorage.getItem('stationAddressReservation');
            this.info.style.display = 'block';
            this.startTimer();
        };

        console.log(minutes_data);
        console.log(seconds_data);
    };

};