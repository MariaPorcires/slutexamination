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

//array med alla planetid från html


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
    planets.forEach(function(button){ //funktion för varje klick
        button.addEventListener(`click`, buttonClick);
        const backButton = document.getElementById(`back`);
        backButton.addEventListener(`click`, backClick);
    });
}

function buttonClick(event) { //för att klicka på rätt planet - hämtar från HTMl med event target
    const button = event.currentTarget;
    const planetId = button.id;
   

console.log(planetId);
console.log(planetData);



const id = planetMatch.indexOf(planetId); // ta reda på vilket index har planetId i planetMatch  
const planetRow = planetData.bodies.find(function(planetRow){  // söka igenom bodies, vilken planet har det id
    return planetRow.id===id;}) 

hidePage(document.getElementById(`pagePlanets`));
showPage(document.getElementById(`pageInfo`));
showPlanetData(planetRow);

}


function hidePage(page){
    page.style.display = `none`;
}

function showPage(page){ 
    page.style.display=`flex`;
 } 

 function backClick(){
     showPage(document.getElementById(`pagePlanets`)); 
     hidePage(document.getElementById(`pageInfo`));
     } 

function showPlanetData(planetRow){ 
    const planetName = document.getElementById(`planetName`); 
    planetName.innerText = planetRow.name; //namnet från arrayen i API
    const planetLatin = document.getElementById(`planetLatin`); 
    planetLatin.innerText = planetRow.latinName; 
    const planetDesc = document.getElementById(`planetDesc`);
    planetDesc.innerText = planetRow.desc;
    const planetCircum = document.getElementById(`planetCircum`);
    planetCircum.innerText = planetRow.circumference;
    const planetDistance = document.getElementById(`planetDistance`);
    planetDistance.innerText = planetRow.distance;
    const planetMaxTemp = document.getElementById(`planetMaxTemp`);
    planetMaxTemp.innerText = planetRow.temp.day;
    const planetMinTemp = document.getElementById(`planetMinTemp`);
    planetMinTemp.innerText = planetRow.temp.night;
    const planetMoons = document.getElementById(`planetMoons`);
    planetMoons.innerText = planetRow.moons.join(`, `);
    
}
    

start();






