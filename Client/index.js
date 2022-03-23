// Get information for form to post to server
const newPostForm = document.getElementById("newPost")

newPostForm.addEventListener('submit', submitForm)

async function submitForm (e) {
    e.preventDefault()

    let getDate = `-0${(dayjs().get('month')+1)}-${(dayjs().get('year'))}`
    console.log(getDate)

    const postData = {
        title: e.target.children[0].innerText,
        name: e.target.children[1].innerText,
        content: e.target.children[2].innerText,
        url: e.target.children[0].innerText + getDate
    }

    console.log(postData)

    try {
    const options = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            "Content-Type" : "application/json"
        }
    };

    console.log(options.body)

    const response = await fetch('http://localhost:3000/posts', options);
    const { url, err } = await response.json();
    if (err) {
        throw Error(err)
    } else {
        window.location = `htttp://localhost:8080/${url}`
    }
    } catch (err) {
        console.warn(err);
    }

}

// Get content to load on url based on DB

// onload event listener
document.addEventListener("DOMContentLoaded", fill)

function getData() {
    try {
        fetch('http://localhost:3000/posts')
            .then((response) => {
                return response.json()
            })
    } catch (err) {
        console.log(err)
    }
}

// if url === Homepage load HTML else hide form and display the data from DB based on the url

async function getItem(url) {
    try {
        const response = await fetch(`http://localhost:3000/${url}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}
