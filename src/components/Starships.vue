<script>
import { getStarships, getFilms } from "../utils";
import Starship from "./Starship";

export default {
  components: {
    Starship,
  },
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
    <ul class="starships-list">
      <li
        v-for="starship in starships.results"
        :key="starship.name"
        class="starships-listItem"
      >
        <Starship :starship="starship" :maxFilms="maxFilmAappearances" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.starships {
  margin: 0 auto;
  max-width: 800px;
  padding: 0.5rem;

  &-list {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(2, 1fr);
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  &-listItem {
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    padding: 0.5rem;
  }
}

@media only screen and (max-width: 700px) {
  .starships-list {
    grid-template-columns: 1fr;
  }
}
</style>