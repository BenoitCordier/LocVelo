// Formulaire

class Reservation {
	constructor() {
		this.firstName = document.getElementById('firstName');
		this.lastName = document.getElementById('lastName');
		this.storedFirstName = localStorage.getItem('firstName');
		this.storedLastName = localStorage.getItem('lastName');

		this.canvas = document.querySelector('#my-canvas');
		this.ctx = this.canvas.getContext('2d');
		
		this.btnReservation = document.querySelector('.btnReservation');
		this.btnClearCanvas = document.querySelector('.btnClearCanvas');
		this.btnValider = document.querySelector('.btnValider');

		this.formCanvas = document.querySelector('#formCanvas');
		this.dataStations = document.querySelector('#dataStations');
		this.info = document.querySelector('#info');

		// Boutons

		this.btnClearCanvas.addEventListener('click', (e) => {
			this.clear(e);
		});

		this.btnReservation.addEventListener('click', (e) => {
			this.reservation(e);
		});

		this.btnValider.addEventListener('click', (e) => {
			this.validation(e);
		});

		// Souris

		this.canvas.addEventListener('mousedown', (e) => {
			this.mouseDown(e);
		});

		this.canvas.addEventListener('mousemove', (e) => {
			this.mouseMove(e);
		});

		this.canvas.addEventListener('mouseleave', (e) => {
			this.mouseLeave(e);
		});

		this.canvas.addEventListener('mouseup', (e) => {
			this.mouseUp(e);
		});

		// Tactile

		this.canvas.addEventListener('touchstart', (e) => {
			this.touchStart(e);
		});

		this.canvas.addEventListener('touchmove', (e) => {
			this.touchMove(e);
		});

		this.canvas.addEventListener('touchleave', (e) => {
			this.touchLeave(e);
		});

		this.canvas.addEventListener('touchend', (e) => {
			this.touchEnd(e);
		});

		// Storage

		window.onload = this.restoreLocalStorage();
	}

	// Canvas - Init

	getMousePosition(e) {
		let rectangle = this.canvas.getBoundingClientRect(e);
		return {
			x: (e.clientX - rectangle.left) * (this.canvas.width / rectangle.width),
			y: (e.clientY - rectangle.top) * (this.canvas.height / rectangle.height)
		};
	};

	getTouchPosition(e) {
		let rect = this.canvas.getBoundingClientRect(e);
		return {
			x: (e.touches['0'].clientX - rect.left) * (this.canvas.width / rect.width),
			y: (e.touches['0'].clientY - rect.top) * (this.canvas.height / rect.height)
		};
	};

	// Canvas - Souris

	mouseDown(e) {
		let mousePosition = this.getMousePosition(e);
		this.draw = true;
		this.ctx.lineWidth = 2.5;
		this.ctx.moveTo(mousePosition.x, mousePosition.y);
		this.ctx.beginPath();
	};

	mouseMove(e) {
		if (this.draw === true) {
			this.ctx.lineTo(e.offsetX, e.offsetY);
			this.ctx.stroke();
		};
	};

	mouseLeave(e) {
		this.draw = false;
	};

	mouseUp(e) {
		this.draw = false;
	};
	
	// Canavas - Tactile

	touchStart(e) {
		e.preventDefault();
		let touchesPosition = this.getTouchPosition(e);
		this.draw = true;
		this.ctx.lineWidth = 2.5;
		this.ctx.moveTo(touchesPosition.x, touchesPosition.y);
		this.ctx.beginPath();
	};

	touchMove(e) {
		e.preventDefault();
		if (this.draw === true) {
			let touchesPosition = this.getTouchPosition(e);
			this.ctx.lineTo(touchesPosition.x, touchesPosition.y);
			this.ctx.stroke();
		};
	};

	touchLeave(e) {
		this.draw = false;
	};

	touchEnd(e) {
		this.draw = false;
	};

	// Fonctionnalités

	clear(e) {
		e.preventDefault();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};
	
	reservation(e) {
		e.preventDefault();
		var firstNameValue = document.forms['formReservation']['firstName'].value;
		var lastNameValue = document.forms['formReservation']['lastName'].value;

		if (firstNameValue == '' || lastNameValue == '') {
			alert('Veuillez remplir vos noms et pr\u00e9noms pour continuer !');
		} else {
			this.formCanvas.style.display = 'block';
			localStorage.clear();
			localStorage.setItem('firstName', this.firstName.value);
			localStorage.setItem('lastName', this.lastName.value);
		};
	};
	
	validation(e) {
		e.preventDefault();

		if (this.canvas.toDataURL() == document.getElementById('emptyCanvas').toDataURL()) {
			alert('Veuillez signer avant de poursuivre !')
		} else {
			this.dataStations.style.display = 'none';
			this.formCanvas.style.display = 'none';
			this.clear(e);

			this.info.style.display = 'block';

			sessionStorage.setItem('firstNameReservation', this.firstName.value);
			sessionStorage.setItem('lastNameReservation', this.lastName.value);

			document.getElementById('firstNameReservation').innerHTML = sessionStorage.getItem('firstNameReservation');
			document.getElementById('lastNameReservation').innerHTML = sessionStorage.getItem('lastNameReservation');
			document.getElementById('stationNameReservation').innerHTML = sessionStorage.getItem('stationNameReservation');
			document.getElementById('stationAddressReservation').innerHTML = sessionStorage.getItem('stationAddressReservation');
		}
	};

	restoreLocalStorage() {
		if (this.storedFirstName) {
			this.firstName.value = this.storedFirstName;
		};

		if (this.storedLastName) {
			this.lastName.value = this.storedLastName;
		};
	};
};