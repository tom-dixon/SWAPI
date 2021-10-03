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
  const processedData = processData(films, data);
  return processedData;
};

export const processData = (films = {}, rawData = []) => {
  const count = +rawData.length;
  const results = rawData.map((item) => {
    return {
      name: item.name,
      model: item.model,
      crew: item.crew,
      crewNumber: makeCrewANumber(item.crew),
      passengers: item.passengers,
      films_count: item.films.length,
      films: getFilmDetails(films, item.films)
    };
  });
  // sort by crewNumber
  results.sort(sortFunction);
  // filter out crew < 10
  const filteredResults = results.filter(({ crewNumber }) => {
    if (isNaN(crewNumber)) return true;
    return crewNumber >= 10;
  });
  return {
    count,
    results: filteredResults,
    filteredCount: filteredResults.length
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

const getFilmDetails = (allFilms, starshipFilms) => {
  return starshipFilms.map((film) => allFilms[film]);
};

const sortFunction = ({ crewNumber: a }, { crewNumber: b }) => {
  if (isNaN(a) || isNaN(b)) return 0;
  return a - b;
};

const rangeRegEx = /\d+/g;
const commaRexEx = /,/g;

export const makeCrewANumber = (crew) => {
  // handle strings
  if (isNaN(+crew)) {
    if (crew.match(commaRexEx)) {
      // numbers with commas
      return +crew.replaceAll(commaRexEx, "");
    } else if (crew.match(rangeRegEx)) {
      // ranges - (return the last one)
      return Number(crew.match(rangeRegEx).pop());
    } else {
      // anything else (like 'unknown')
      return crew;
    }
  } else {
    return +crew;
  }
};
