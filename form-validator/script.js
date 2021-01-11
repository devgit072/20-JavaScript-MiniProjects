const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_pass = document.getElementById('confirm_pass');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (userName.value === '') {
        alert('Username is empty')
    }
});