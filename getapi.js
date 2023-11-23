const apiUrlFilms = "https://swapi.dev/api/films/";
let filmsData = [];

async function getFilms(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Error fetching films:", error);
  }
}

// Call for getFilms async function
getFilms(apiUrlFilms)
  .then((fetchedFilms) => {
    filmsData = fetchedFilms.map((film) => ({
      title: film.title,
      director: film.director,
      producer: film.producer,
      opening: film.opening_crawl,
    }));
  })
  .catch((error) => {
    console.log("Error fetching films:", error);
  });
