<script>
import { getStarships, getFilms } from "../utils";

export default {
  data() {
    return {
      films: [],
      starships: [],
    };
  },
  async created() {
    this.films = await getFilms();
    this.starships = await getStarships(this.films);
  },
  computed: {
    starshipsJson() {
      const starshipsForJSON = {
        count: this.starships.count,
        results: this.starships.results.map((s) => {
          delete s.crewNumber;
          return s;
        }),
      };
      return JSON.stringify(starshipsForJSON);
    },
    maxFilmAappearances() {
      return this.starships.results.reduce((appearances, starship) => {
        if (starship.films_count > appearances) {
          return starship.films_count;
        }
        return appearances;
      }, 0);
    },
  },
};
</script>

<template>
  <div class="starships">
    <h1>Starships</h1>
    <ul>
      <li v-for="starship in starships.results" :key="starship.name">
        {{ starship.name }} - {{ starship.films_count }}
      </li>
    </ul>
  </div>
</template>


<style>
</style>