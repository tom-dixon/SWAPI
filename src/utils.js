import axios from "axios";

export const getStarships = async (films) => {
  const firstPage = await axios("https://swapi.dev/api/starships/");
  let data = firstPage.data.results;
  let next = firstPage.data.next;
  while (!!next) {
    const nextPage = await axios(next);
    data.push(...nextPage.data.results);
    next = nextPage.data.next;
  }
  const processedData = processData(data);
  console.log("processed data: ", processedData);
  return processedData;
};

const processData = (rawData = []) => {
  console.log("processing", rawData, rawData.length);
  const count = +rawData.length;
  const results = rawData.map((item) => {
    return {
      name: item.name,
      model: item.model,
      crew: item.crew,
      passengers: item.passengers,
      films_count: item.films.length,
      films: getFilmDetails(item.films)
    };
  });
  return {
    count,
    results
  };
};

export const getFilms = async () => {
  const filmsResponse = await axios("https://swapi.dev/api/films/");
  const films = {};
  filmsResponse.data.results.forEach((film) => {
    films[film.url] = {
      title: film.title,
      director: film.director,
      release_date: film.release_date
    };
  });
  return films;
};

const getFilmDetails = (films) => {
  console.log("films", films);
  // Promise.all(
  //   films.map((film) => {
  //     return axios(film);
  //   })
  // ).then((responses) => {
  //   responses.forEach((response) => {
  //     console.log(response);
  //   });
  // });
};