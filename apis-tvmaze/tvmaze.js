/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const res = await axios.get('http://api.tvmaze.com/search/shows', { params: {q: query}});
  const data = res.data;
  for (i = 0; i < data.length; i++){
    data[i] = data[i].show;
  }
  const newDat = [];
  for (i = 0; i < data.length; i++){
    const {id, name, summary, image} = data[i];
    newDat.push({id, name, summary, image});
    for (obj of newDat){
      if (obj.image === undefined) {
        obj.image = "http://tinyurl.com/missing-tv"
      }
    }
  }
  return newDat;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
              <img class="card-img-top" src=${show.image.medium} />
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <button class="episodes" data-show-id="${show.id}">Episodes</button>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const eps = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const epsArr = eps.data;
  populateEpisodes(epsArr);
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}

function populateEpisodes(episodes){
  $('#episodes-area').show();
  for (let i = 0; i < episodes.length; i++){
    let cont = episodes[i].name;
    let newLi = document.createElement('li');
    newLi.innerText = cont;
    document.querySelector('#episodes-list').append(newLi);
  }
}

$('#shows-list').on('click', '.episodes', function(e){
  const ID = $(e.target).closest('.Show').data('show-id');
  getEpisodes(ID);
});