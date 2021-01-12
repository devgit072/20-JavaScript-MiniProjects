const MINIMUM_PASSWORD_LENGTH = 7;

const form = document.getElementById('form');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_pass = document.getElementById('confirm_pass');

function showError(input, message) {
    const ele = input.parentElement;
    ele.className = 'input-field error';
    const smallEle = ele.querySelector('small');
    smallEle.innerText = message;
}

function makeTextInputSuccess(input) {
    const ele = input.parentElement;
    ele.className = 'input-field success';
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (userName.value === '') {
        showError(userName, "Username is mandatory");
    } else if (!checkLength(userName.value, 5, 15)) {
        showError(userName, "Username need to have minimum 5 characters and maximum 15 characters.")
    } else {
        makeTextInputSuccess(userName);
    }
    if (email.value === '') {
        showError(email, "Email-Id is mandatory");
    } else if (isValidEmail(email.value) === false) {
        showError(email, "Enter a valid email address");
    } else {
        makeTextInputSuccess(email);
    }
    if (password.value === '') {
        showError(password, "Please enter your password.");
    } else {
        const values = checkPasswordStrength(password.value)
        if (!values[0]) {
            showError(password, values[1])
        } else {
            makeTextInputSuccess(password);
        }
    }
    if (password.value != '' && confirm_pass.value === '') {
        showError(confirm_pass, "Please re-enter your password");
    } else {
        if (confirm_pass.value != password.value) {
            showError(confirm_pass, "Re entered password doesn't match with original password")
        } else {
            makeTextInputSuccess(confirm_pass);
        }
    }
});

function isValidEmail(emailAddr) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddr).toLowerCase());
}

function checkLength(inputValue, minLength, maxLength) {
    if (inputValue.length < minLength || inputValue.length > maxLength) {
        return false
    }
    return true
}

function checkPasswordStrength(passwordValue) {
    if (passwordValue.length < MINIMUM_PASSWORD_LENGTH) {
        return [false, "Password need to have minimum 7 characters"]
    }
    const passReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (passReg.test(passwordValue) === false) {
        return [false, "Password need to have atleast one number and one special character"]
    }
    
    return [true, ""];
}