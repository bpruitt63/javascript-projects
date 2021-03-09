async function search(q) {
    const resp = await axios.get(`https://api.giphy.com/v1/gifs/search`, { params: {q, api_key: 'EmwaDirLmQN3nXxw5z7uDkqqHTwd3RZE'}});
    const i = Math.floor(Math.random() * 50);
    const url = resp.data.data[i].url;
    post(url);
}

const sub = document.querySelector("#search");
sub.addEventListener('submit', function(e){
    e.preventDefault();
    const val = document.querySelector('#gif').value;
    document.querySelector('#gif').value = '';
    search(val);
})

function post(img) {
    const newim = document.createElement('img');
    newim.src = img;
    document.querySelector('#pics').append(newim);
}

document.querySelector("#remove").addEventListener('click', function(){
    document.querySelector("#pics").innerHTML = '';
})