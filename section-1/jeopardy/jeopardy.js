// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
async function getCategoryData(ids) {
    for (let i = 0; i < 6; i++){
        let cat = await axios.get('http://jservice.io/api/category', {params: {id: ids[i]}});
        categories.push(cat.data);
    }
    randomizeClues(categories);
}

function randomizeClues(categories){
    for (let category of categories){
        const idx = new Set();
        for (let i = 0; idx.size < 5; i++){
            val = Math.floor(Math.random() * category.clues.length);
            idx.add(val);
        }
        const c = [];
        for (let val of idx){
            c.push(category.clues[val]);
        }
        category.clues = c;
    }
    getCategory();
}

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds(inds, res) {
    const ids = [];
    for (let val of inds){
        ids.push(res.data[val]['id']);
    }
    getCategoryData(ids);
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

   //doesn't actually get category, just destructures the clues array
function getCategory() {
    for (let category of categories){
        for (let i = 0; i < 5; i++){
            category.clues[i] = {id: category.clues[i].id, question: category.clues[i].question, answer: category.clues[i].answer, showing: null};
        }
    }
    fillTable();
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

function fillTable() {
    let table = document.createElement('table');
    table.id = 'table'
    document.body.prepend(table)
    let tabletop = document.createElement('tr');
    let table1 = document.createElement('tr');
    let table2 = document.createElement('tr');
    let table3 = document.createElement('tr');
    let table4 = document.createElement('tr');
    let table5 = document.createElement('tr');
    tabletop.id = 'top';
    table1.id = '1';
    table2.id = '2';
    table3.id = '3';
    table4.id = '4';
    table5.id = '5';
    document.querySelector('#table').append(tabletop);
    document.querySelector('#table').append(table1);
    document.querySelector('#table').append(table2);
    document.querySelector('#table').append(table3);
    document.querySelector('#table').append(table4);
    document.querySelector('#table').append(table5);
    tabletop = document.querySelector('#top');
    table1 = document.getElementById('1');
    table2 = document.getElementById('2');
    table3 = document.getElementById('3');
    table4 = document.getElementById('4');
    table5 = document.getElementById('5');
    for (category of categories){
        let title = document.createElement('th');
        title.innerHTML = category.title.toUpperCase();
        tabletop.append(title);
        let one = document.createElement('td');
        one.className = category.id;
        one.id = category.clues[0].id;
        one.innerText = '?';
        table1.append(one);
        let two = document.createElement('td');
        two.className = category.id;
        two.id = category.clues[1].id;
        two.innerText = '?';
        table2.append(two);
        let three = document.createElement('td');
        three.className = category.id;
        three.id = category.clues[2].id;
        three.innerText = '?';
        table3.append(three);
        let four = document.createElement('td');
        four.className = category.id;
        four.id = category.clues[3].id;
        four.innerText = '?';
        table4.append(four);
        let five = document.createElement('td');
        five.className = category.id;
        five.id = category.clues[4].id;
        five.innerText = '?';
        table5.append(five);
    }
    hideLoadingView();
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(catId, qId) {
    let cat = 0;
    for (category of categories){
        if (category.id == catId){
            cat = category.clues;
        }
    }
    let ques = 0;
    for (clue of cat){
        if (clue.id == qId){
            ques = clue;
        }
    }
    let td = document.getElementById(ques.id);
    if (ques.showing === null){
        ques.showing = 'question';
        td.innerHTML = ques.question;
    } else if (ques.showing === 'question'){
        ques.showing = 'answer';
        td.innerHTML = ques.answer;
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    let ring = document.createElement('div');
    ring.className = "lds-dual-ring";
    document.body.prepend(ring);
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    b = document.querySelector('button');
    b.innerText = "Start Over";
    load = document.querySelector('.lds-dual-ring');
    load.remove();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    categories = [];
    const res = await axios.get('http://jservice.io/api/categories', {params: {count: 100}});
    const inds = new Set();
    for (let i = 0; inds.size < 6; i++){
        val = Math.floor(Math.random() * 100);
        inds.add(val);
    }
    getCategoryIds(inds, res);
}

/** On click of start / restart button, set up game. */


/** On page load, add event handler for clicking clues */
document.addEventListener('load', start());

function start(){
    let button = document.createElement('button');
    button.id = 'start';
    button.innerText = "Start Game";
    document.body.prepend(button);
}

document.body.addEventListener('click', function(e){
    if (e.target.id === 'start'){
        e.target.innerText = "Loading";
        showLoadingView();
        let table = document.querySelector('#table');
        if(table){
            table.remove();
        }
        setupAndStart();
    }
    if (e.target.matches('td')){
        let catId = e.target.className;
        let qId = e.target.id;
        handleClick(catId, qId);
    }
})

