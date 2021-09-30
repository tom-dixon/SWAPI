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
};
</script>

<template>
  <div class="caci">
    <h1>CACI</h1>
    <div v-for="starship in starships" :key="starship.name">
      <ul>
        <li v-for="key in Object.keys(starship)" :key="key">
          {{ key }}
        </li>
      </ul>
    </div>
  </div>
</template>


<style>
</style>