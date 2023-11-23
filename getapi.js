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

/*-----------------search-function--------------------*/
function searchTitle() {
  const input = document.getElementById("input").value.toLowerCase().trim();
  const errorElement = document.getElementById("error");
  errorElement.innerHTML = "";

  // Only show results if input has 3 characters or more
  if (input === "") {
    const filmListContainer = document.getElementById("filmList");
    filmListContainer.innerHTML = "";
    errorElement.style.display = "block";
    errorElement.innerHTML = "Please insert text";
  } else if (input.length < 3) {
    errorElement.style.display = "block";
    errorElement.innerHTML = "Min 3 characters";
  } else {
    // Variable to store results in if match is found
    const searchResult = filmsData.filter((film) =>
      film.title.toLowerCase().includes(input)
    );

    // Show results if there is any
    if (searchResult.length > 0) {
      console.log(searchResult);

      // Hide search when showing results
      const searchBar = document.querySelector(".input-group");
      searchBar.style.display = "none";

      //Display refresh button when showing results
      const refreshBtn = document.querySelector(".btn-refresh");
      refreshBtn.style.display = "block";

      // Display search results in vp
      searchResult.forEach((film) => {
        const filmListContainer = document.getElementById("filmList");

        const filmTitleElement = document.createElement("h2");
        filmTitleElement.classList.add("filmTitle");
        filmTitleElement.textContent = film.title;
        filmListContainer.appendChild(filmTitleElement);

        const filmDirectorElement = document.createElement("p");
        filmDirectorElement.classList.add("filmDirector");
        filmDirectorElement.textContent = `Directed by \r\n`;
        filmDirectorElement.textContent += film.director;
        filmListContainer.appendChild(filmDirectorElement);

        const filmProducerElement = document.createElement("p");
        filmProducerElement.classList.add("filmProducer");
        filmProducerElement.textContent = film.producer;
        filmListContainer.appendChild(filmProducerElement);

        const filmOpeningElement = document.createElement("p");
        filmOpeningElement.classList.add("filmOpener");
        filmOpeningElement.textContent = film.opening;
        filmListContainer.appendChild(filmOpeningElement);
      });
    } else {
      console.log("Value not found");
      errorElement.innerHTML = "Could not find";
    }
  }
}
