const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat");
const movieNode = document.getElementById("movie");
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
    const totalSeats = selectedSeats.length;
    const totalPrice = totalSeats * moviePrice;
    console.log("Total seats selected: ", selectedSeats.length);
    count.innerText = totalSeats;
    price.innerText = totalPrice; 
}

movieNode.addEventListener("change", e => {
    console.log("Movie selection changed.");
    const m = document.getElementById("movie-selected");
    m.innerText = movieNode.options[movieNode.selectedIndex].text;
    updateCount();
});