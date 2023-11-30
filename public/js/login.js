console.log('login.js loaded')
async function loginFormHandler(event) {
    event.preventDefault()
    var username = document.querySelector('#login-user').value.trim()
    var password = document.querySelector('#login-pass').value.trim()

    if(username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        })
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
    }
}

async function signupFormHandler(event) {
    event.preventDefault()
    
    var username = document.querySelector('#signup-user').value.trim()
    var password = document.querySelector('#signup-pass').value.trim()

    if(username && password) {
        const response = await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json'}
        })

        if (!response.ok) {
            alert(response.statusText)
        }
    }
}

document.querySelector('#login-btn').addEventListener('click', loginFormHandler)
document.querySelector('#sign-up-btn').addEventListener('click', signupFormHandler)