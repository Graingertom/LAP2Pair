// Get information for form to post to server
const newPostForm = document.getElementById("newPost")

newPostForm.addEventListener('submit', submitForm)

async function submitForm (e) {
    e.preventDefault()

    let getDate = `-0${(dayjs().get('month')+1)}-${(dayjs().get('year'))}`
    console.log(getDate)

    const postData = {
        title: e.target.children[0].innerText,
        pseudonym: e.target.children[1].innerText,
        content: e.target.children[2].innerText,
        url: (e.target.children[0].innerText + getDate).split(" ").join("-").replace(/['"]+/g, '').toLowerCase()
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

    } catch (err) {
        reject(err);
    }

}

// Get content to load on url based on DB

// onload event listener
// document.addEventListener("DOMContentLoaded", getItem)
// document.addEventListener("DOMContentLoaded", fill)
let data

async function getItem() {
    let fullUrl = window.location.href
    let splitUrl =  fullUrl.split('/')
    let shortUrl = splitUrl[3]
    if (window.location.href !== 'http://localhost:8080/') { try {
        const response = await fetch(`http://localhost:3000/${shortUrl}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    } }
}

function fill(data) {
    if (window.location.href !== 'http://localhost:8080/') {
        // newPostForm.classList.add("hide");
        const title = document.createElement("h1")
        const pseudonym = document.createElement("p")
        const content = document.createElement("p")

        const titleText = document.createTextNode(`${data.title}`)
        const pseudonymText = document.createTextNode(`${data.pseudonym}`)
        const contentText = document.createTextNode(`${data.content}`)

        document.body.appendChild(title)
        document.body.appendChild(pseudonym)
        document.body.appendChild(content)
        title.appendChild(titleText)
        pseudonym.appendChild(pseudonymText)
        content.appendChild(contentText)
    } else {
        newPostForm.classList.remove("hide")
    }
}

// if url === Homepage load HTML else hide form and display the data from DB based on the url

