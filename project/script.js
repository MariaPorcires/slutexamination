const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
let key;
let planetData;
let planetMatch = [
    `sun`,
    `mercury`,
    `venus`,
    `earth`,
    `mars`,
    `jupiter`,
    `saturnouter`,
    `uranus`,
    `neptune`
]



async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data = await response.json();
    return data.key;
}

async function getPlanets() {
    const response = await fetch(`${BASE_URL}/bodies`, {
        method: `GET`,
        headers: {
            'x-zocom': key
        }
    });
    const data = await response.json();
    return data;
    console.log(data);
}


async function start(){
    key = await getKey();
    planetData = await getPlanets(); //sparar info om planeter i variabel
    createEvents(); //skapa events för planeterna
}

function createEvents() { //själva funktionen för events
    const elementMain = document.querySelector(`main`); // hämta main
    const planets = elementMain.querySelectorAll(`button`); // hämta alla knappar
    planets.forEach(function(button){ //funktion för varje klick, ska loopa igenom alla
        button.addEventListener(`click`, buttonClick);
        const backButton = document.getElementById(`back`);
        backButton.addEventListener(`click`, backClick);
    });
}

function buttonClick(event) { //för att hämta rätt info till rätt planet
    const button = event.currentTarget;
    const planetId = button.id;
   

console.log(planetId);
console.log(planetData);

const id = planetMatch.indexOf(planetId);
const planetRow = planetData.bodies.find(function(row){ 
    return row.id===id;})

hidePage(document.getElementById(`pagePlanets`));
showPage(document.getElementById(`pageInfo`));
showPlanetData(planetRow);

}


function hidePage(page){
    page.style.display = `none`;
}

function showPage(page){ 
    page.style.display=`block`;
 } 

 function backClick(){
     showPage(document.getElementById("pagePlanets")); 
     hidePage(document.getElementById("pageInfo"));
     } 

function showPlanetData(row){ 
    const planetName=document.getElementById("planetName"); 
    planetName.innerText = row.name; 
    const planetLatin = document.getElementById("planetLatin"); 
    planetLatin.innerText=row.latinName; 
    console.log(planetLatin)
}
    

start();




