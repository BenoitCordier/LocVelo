//Constructeur Map

class Map {
    constructor() {
        this.map = L.map('mapid').setView([49.037249981922535, 2.0803674763281967], 13);
        this.url = 'https://api.jcdecaux.com/vls/v1/stations?contract=cergy-pontoise&apiKey=c9476705e00e6b060a25ee633b7cd5876b9dc1b4';
        this.stationStatus = document.querySelector('#stationStatus');
        this.dataStations = document.querySelector('#dataStations');
        this.btnResa = document.querySelector('.btnResa');
        this.formResa = document.querySelector('#formResa');
        this.btnReturn = document.querySelector('.btnReturn');
        this.infos = document.querySelector('#infos');
        this.LeafIcon = L.Icon.extend({
            options: {
                iconSize: [35, 45],
                shadowSize: [41, 41],
                iconAnchor: [13, 41],
                shadowAnchor: [0, 41],
                popupAnchor: [0, -40]
            }
        });

        this.greenIcon = new this.LeafIcon({
            iconUrl: 'assets/assetsMarkers/iconGreen.png'
        });

        this.redIcon = new this.LeafIcon({
            iconUrl: 'assets/assetsMarkers/iconRed.png'
        });

        this.createMap();

        this.getStationData();

        this.btnReturn.addEventListener('click', (e) => {
            this.closeStationForm(e);
        });
    }

//Création de la carte

    createMap() {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicGFub28iLCJhIjoiY2tpdTRpdXluMTBveTJwc2NkZTR4b2FicSJ9.X_mxINf9CIu_CtKd-txwpw'
        }).addTo(this.map);
    }

//Récupération des données de l'API & interaction avec les marqueurs

    getStationData() {
        const getStationDataJson = async () => {
            this.response = await fetch(this.url);
            this.stationTab = await this.response.json();

            this.stationTab.forEach(station => {
                this.stationName = station.name;
                this.positionStation = station.position;
                this.stationAddress = station.address;

                if (station.available_bikes > 0) {
                    this.marker = new L.marker(this.positionStation, {
                        icon: this.greenIcon
                    }).addTo(this.map);

                    this.marker.addEventListener('click', () => {
                        this.dataStations.style.display = 'block';
                        document.getElementById('stationName').innerHTML = "<span id='stationNameId' class='stationNameClass'>" + station.name + "</span>";
                        document.getElementById('stationAddress').innerHTML = "<span id='stationAddressId' class='stationAddressClass'>Adresse :  " + station.address + "</br></span>";
                        document.getElementById('nbVeloStation').innerHTML = "<span class='green'>" + station.bike_stands + "</span>" + " Place" + (station.bike_stands > 1 ? "s" : "");
                        document.getElementById('nbVelo').innerHTML = "<span class='green'>" + station.available_bikes + "</span>" + " V\u00e9lo" + (station.available_bikes > 1 ? "s" : "") + " disponible" + (station.available_bikes > 1 ? "s" : "");
                        this.stationStatus.innerHTML = (station.status === 'OPEN' ? "<span class='green'>Station ouverte</span>" : "<span class='red'>Station ferm\u00e9e</span>");

                        sessionStorage.setItem('stationNameReservation', station.name);
                        sessionStorage.setItem('stationAddressReservation', station.address);
                    })

                } else {
                    this.marker = new L.marker(this.positionStation, {
                        icon: this.redIcon
                    }).addTo(this.map);

                    this.marker.addEventListener('click', () => {
                        this.dataStations.style.display = 'block';
                        this.formResa.style.display = 'none';
                        document.getElementById('stationName').innerHTML = station.name;
                        document.getElementById('stationAddress').innerHTML = station.address;
                        document.getElementById('nbVeloStation').innerHTML = station.bike_stands;
                        document.getElementById('nbVeloDisponible').innerHTML = station.available_bikes;
                        stationStatus.innerHTML = "<span class='red'>Station ferm\u00e9e</span>";
                    });
                }
            });
        }
        getStationDataJson();
    }

    closeStationForm(e) {
        e.preventDefault();
        this.dataStations.style.display = 'none';
    }
}