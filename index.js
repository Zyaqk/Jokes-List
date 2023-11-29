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