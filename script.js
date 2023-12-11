// const { get } = require("express/lib/response");
const xhr = new XMLHttpRequest();
const jokesContainer = document.getElementById('listJoke')

xhr.open('GET', 'http://localhost:3000/jokes');
xhr.onload = () => {
    console.log(xhr.response);
    const jokes = xhr.response;
    if(jokes.length) {
        jokesContainer.innerHTML = '';
        jokes.forEach(joke => {
            jokesContainer.innerHTML += getJokeHTML(joke);
        })
    }
};

xhr.send();

function getJokeHTML(joke) {
    return `
        <div class="oneId">
            <h4>${joke.content}</h4>
            <div class="likes">
                <span><i class="fa-solid fa-thumbs-up"></i> ${joke.likes}</span>
                <span><i class="fa-solid fa-thumbs-down"></i> ${joke.dislikes}</span>
            </div>
        </div>

    `;
}
