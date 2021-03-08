
const stor = [];
const locStor = JSON.parse(localStorage.getItem("more"));
for (let r = 0; r < locStor.length; r++){
    stor.push(locStor[r]);
}

for (let i = 0; i <locStor.length; i++){
    const ul = document.querySelector("#list");
    const newli = document.createElement('li');
    const newB = document.createElement('button');
    newli.innerText = locStor[i];
    newB.innerText = "Remove Todo";
    ul.append(newli);
    newli.append(newB);
}

document.querySelector('#submit').addEventListener('click', function(e){
    e.preventDefault();
    const ul = document.querySelector("#list");
    const newli = document.createElement('li');
    const newB = document.createElement('button');
    let newTo = document.querySelector('#newTodo').value + "  ";
    newli.innerText = newTo;
    newB.innerText = "Remove Todo";
    ul.append(newli);
    newli.append(newB);
    stor.push(newTo);
    localStorage.setItem("more", JSON.stringify(stor));
});

list.addEventListener('click', function(e){
    const ul = document.querySelector("#list");
    if (e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
    } else if (e.target.tagName === 'LI'){
        e.target.classList.add("strike");
    }
})

