const xhr = new XMLHttpRequest();
const jokesContainer = document.getElementById('listJoke')

xhr.open('GET', 'http://localhost:3000/jokes');
xhr.send();
xhr.responseType = 'json';
xhr.onload = () => {
    console.log(xhr.response);
    const jokes = xhr.response;
    if(jokes.length) {
        jokesContainer.innerHTML = '';
        jokes.forEach(joke => {
            jokesContainer.innerHTML += getJokeHTML(joke);
        })
    }
}

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

// const input = document.getElementById('input');
// const btn = document.getElementById('button');

// if(btn.click && input.value ) {
//     let i = 0;
//     i++;
//     var jsonData = {
//         "content": `${input.value}`,
//         "likes": 0,
//         "dislikes": 0
//     }

//     new File = `${i}.json`;

    
// }

const jokeForm = document.getElementById('jokeForm');
var content = document.getElementById('input');
let currentLength = 0;

jokeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    content = content.value;
    const joke = {content, likes: 0, dislikes: 0, id: currentLength}
    const addJokeXhr = new XMLHttpRequest();

    addJokeXhr.open('POST', 'http://localhost:3000/jokes');
    addJokeXhr.send(JSON.stringify(joke));
    addJokeXhr.onload = () => {
        jokesContainer.innerHTML += getJokeHTML(joke);
        currentLength++;
    }
})
