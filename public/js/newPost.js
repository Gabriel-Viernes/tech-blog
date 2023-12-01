async function newPostFormHandler(event) {
    event.preventDefault()
    var title = document.querySelector('#new-post-title').value
    var text = document.querySelector('#new-post-text').value

    if(title && text) {
        const response = await fetch('/newPost', {
            method: 'POST',
            body: JSON.stringify({title,text}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(response.ok) {
            alert('Post submitted')
        } else{
            alert('Something went wrong')
        }
    } else {
        alert('Fields cannot be blank')
    }
}

document.querySelector('#new-post-submit').addEventListener('click', newPostFormHandler)