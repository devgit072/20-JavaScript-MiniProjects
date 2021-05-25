const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat");
const seatsNotOccupied = document.querySelectorAll('.seat:not(.occupied)');
const movieNode = document.getElementById("movie");
const checkoutButton = document.querySelector(".checkout button");

let currentMovieSelected = 'None';
let seatsIndexToBeSaved;
updateCount();
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains("occupied")) {
        /*
        .toggle(<className>) means add class in class list.
        Now the class name will be (seat selected) with click toggle feature available.
        */
        e.target.classList.toggle("selected");
        console.log(e.target);
        updateCount();
    }
});

function updateCount() {
    const selectedMovie = movieNode.options[movieNode.selectedIndex];
    const selectedMovieName = selectedMovie.text;
    const moviePrice = movieNode.value;
    console.log("Selected movie:", selectedMovieName);
    const count = document.getElementById("count");
    const price = document.getElementById("price");
    console.log("price: ", moviePrice);
    if (selectedMovieName === "None") {
        count.innerText = "0";
        price.innerText = "0";
        return
    }
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsIndex = [...selectedSeats].map(s => {
        return [...seatsNotOccupied].indexOf(s);
    });
    console.log("Selected seat index: ", selectedSeatsIndex);
    const totalSeats = selectedSeats.length;
    const totalPrice = totalSeats * moviePrice;
    console.log("Total seats selected: ", selectedSeats.length);
    count.innerText = totalSeats;
    price.innerText = totalPrice;
    currentMovieSelected = selectedMovieName;
    seatsIndexToBeSaved = [...selectedSeatsIndex];
    console.log("Seats to be saved", seatsIndexToBeSaved);
}

movieNode.addEventListener("change", e => {
    console.log("Movie selection changed.");
    const m = document.getElementById("movie-selected");
    const mov = movieNode.options[movieNode.selectedIndex].text;
    m.innerText = mov;
    currentMovieSelected = mov;
    populateSeats();
    updateCount();
});

checkoutButton.addEventListener("click", () => {
    console.log("Movie booked successfully");

    saveSeatsInLocalStorage();
});

function saveSeatsInLocalStorage() {
    if (currentMovieSelected === 'None') {
        return
    }
    const occupiedSeats = JSON.parse(localStorage.getItem(currentMovieSelected));
    let newArr;
    if (occupiedSeats !== null && occupiedSeats.length !== 0) {
        newArr = seatsIndexToBeSaved.concat(occupiedSeats);
        newArr = newArr.filter(onlyUnique);
    } else {
        newArr = [...seatsIndexToBeSaved];
    }
    localStorage.setItem(currentMovieSelected, JSON.stringify(newArr));
}

function populateSeats() {
    if (currentMovieSelected === 'None') {
        return
    }
    const selectedSeats = JSON.parse(localStorage.getItem(currentMovieSelected));
    if (selectedSeats === null || selectedSeats.length === 0) {
        return
    }
    console.log("Current movie:", currentMovieSelected);
    console.log("Already selected seats:", selectedSeats);
    console.log("Total seats: ", seats.length);
    console.log("Total already selected seats: ", selectedSeats.length);
    for (i=0;i<seats.length;i++) {
        for (j=0;j<selectedSeats.length;j++) {
            if (selectedSeats[j] === i+1) {
                const s = seats[selectedSeats[j]];
                console.log("Changing class name to occupied.");
                s.className = "occupied";
            }
        }
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}