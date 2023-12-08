const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const folder = 'data';
const dataPath = path.join(__dirname, folder);

const server = http.createServer((request, response) => {
    if(request.url == '/jokes' && request.method == 'GET') {
        getAllJokes(request, response);
    }
    if(request.url == '/jokes' && request.method == 'POST') {
        addJoke(request, response);
    }
    if(request.url.startsWith('/like')) {
        likeJoke(request, response);
    }
});
server.listen(3000);


function getAllJokes(request, response) {
    let dir = fs.readdirSync(dataPath);
    let allJokes = [];

    for(let i = 0; i < dir.length; i++) {
        let file = fs.readFileSync(path.join(dataPath, i+ '.json'));
        let jokeJson = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJson);
        joke.id = i;

        allJokes.push(joke);
    }
    response.end(JSON.stringify(allJokes));
}

function addJoke(request, response) {
    let data = '';
    request.on('data', function(chunk) {
        data += chunk;
    });
    request.on('end', function() {
        let joke = JSON.parse(data);
        joke.likes = 0;
        joke.dislikes = 0;

        let dir = fs.readdirSync(dataPath);
        let fileName = dir.length+ '.json';
        let filePath = path.join(dataPath, fileName);
        fs.writeFileSync(filePath, JSON.stringify(joke));

        response.end();
    })
}

function likeJoke(request, response) {
    const url = require('url');
    const params = url.parse(request.url, true).query;
    let id = params.id;
    console.log(id);
}