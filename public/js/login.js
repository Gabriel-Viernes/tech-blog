async function loginFormHandler(event) {
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