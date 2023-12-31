async function logout() {
    const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'}
    })

    if (response.ok) {
        document.location.replace('/')
    } else {
        alert('Failed to logout')
    }
}

document.querySelector('#logoutBtn').addEventListener('click', logout)