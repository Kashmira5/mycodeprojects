document.addEventListener('DOMContentLoaded', () => {
    const TARGET_REDIRECT_URL = 'Demo webpage/index.html';

    const wrapper = document.querySelector(".wrapper");
    const signupHeader = document.querySelector(".signup header");
    const loginHeader = document.querySelector(".login header");

    const signupForm = document.querySelector(".form.signup form");
    const loginForm = document.querySelector(".form.login form");

    const signupEmailInput = signupForm.querySelectorAll('input[type="text"]')[1];
    const signupPasswordInput = signupForm.querySelector('input[type="password"]');

    const loginEmailInput = loginForm.querySelector('input[type="text"]');
    const loginPasswordInput = loginForm.querySelector('input[type="password"]');

    const showMessage = (form, message, isError = true) => {
        let msgElement = form.querySelector('.validation-message');
        
        if (!msgElement) {
            msgElement = document.createElement('p');
            msgElement.classList.add('validation-message');
            const submitButton = form.querySelector('input[type="submit"]');
            form.insertBefore(msgElement, submitButton);
        }

        msgElement.textContent = message;
        msgElement.style.marginTop = '10px';
        msgElement.style.padding = '8px';
        msgElement.style.borderRadius = '5px';
        msgElement.style.textAlign = 'center';
        msgElement.style.fontSize = '14px';
        
        if (isError) {
            msgElement.style.backgroundColor = '#ffc0cb';
            msgElement.style.color = '#CC0000';
            msgElement.style.border = '1px solid #CC0000';
        } else {
            msgElement.style.backgroundColor = '#b0ffb0';
            msgElement.style.color = '#006400';
            msgElement.style.border = '1px solid #006400';
        }

        if (isError) {
            setTimeout(() => {
                if (msgElement.parentNode === form) {
                     form.removeChild(msgElement);
                }
            }, 4000);
        }
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const isStrongPassword = (password) => {
        return password.length >= 6;
    };


    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = signupEmailInput.value.trim();
        const password = signupPasswordInput.value;

        if (!isValidEmail(email)) {
            showMessage(signupForm, 'Signup Error: Please enter a valid email address.', true);
            signupEmailInput.focus();
            return;
        }

        if (!isStrongPassword(password)) {
            showMessage(signupForm, 'Signup Error: Password must be at least 6 characters long.', true);
            signupPasswordInput.focus();
            return;
        }

        
        showMessage(signupForm, 'Signup successful! Redirecting to login...', false);
        signupForm.reset();
        
        setTimeout(() => {
            wrapper.classList.add("active");
            const existingMsg = wrapper.querySelector('.validation-message');
            if (existingMsg) existingMsg.remove();
        }, 1500); 
    });

    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value;

        if (!isValidEmail(email)) {
            showMessage(loginForm, 'Login Error: Please enter a valid email address.', true);
            loginEmailInput.focus();
            return;
        }

        if (!isStrongPassword(password)) {
            showMessage(loginForm, 'Login Error: Invalid email or password.', true);
            loginPasswordInput.focus();
            return;
        }

        
        showMessage(loginForm, 'Login successful! Redirecting...', false);
        loginForm.reset();
        
        
        setTimeout(() => {
            window.location.href = TARGET_REDIRECT_URL;
        }, 1500);
    });

    
    loginHeader.addEventListener("click", () => {
        wrapper.classList.add("active");
        const existingMsg = wrapper.querySelector('.validation-message');
        if (existingMsg) existingMsg.remove();
    });
    
    signupHeader.addEventListener("click", () => {
        wrapper.classList.remove("active");
        const existingMsg = wrapper.querySelector('.validation-message');
        if (existingMsg) existingMsg.remove();
    });
});