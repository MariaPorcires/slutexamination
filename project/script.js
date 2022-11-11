const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
let planetData;

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data = await response.json();
}

async function getPlanets() {
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': 'solaris-vKkkQHqQboi7c6JF'
        }
    });
    const data = await response.json();
    return data;
    console.log(data);
}


async function start(){
    getKey();
    planetData = await getPlanets(); //sparar info om planeter i variabel
    createEvents(); //skapa events för planeterna
}

function createEvents() { //själva funktionen för events
    const elementMain = document.querySelector(`main`); // hämta main
    const buttons = elementMain.querySelectorAll(`button`); // hämta alla knappar
    buttons.forEach(function(button){ //funktion för varje klick, ska loopa igenom alla
        button.addEventListener(`click`, buttonClick);
    });
}

function buttonClick(event) { //för att hämta rätt info till rätt planet
    const button = event.currentTarget;
    const planetId = button.id;
console.log(planetId);
console.log(planetData);
}

start();




