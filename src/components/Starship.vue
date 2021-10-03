<script>
export default {
  props: {
    starship: Object,
    maxFilms: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<template>
  <div class="starship">
    <div class="starship-iconContainer">
      <div v-if="starship.films_count === maxFilms">🚀</div>
    </div>
    <div class="starship-details">
      <div class="starship-name">
        {{ starship.name }}
      </div>
      <div class="starship-model">
        {{ starship.model }}
      </div>
      <div class="starship-films">
        Has appeared in {{ starship.films_count }} film<span
          v-if="starship.films_count !== 1"
          >s</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.starship {
  display: grid;
  grid-template-columns: 2rem 1fr;

  &-name {
    color: var(--color-heading);
    font-size: 1.5rem;
    font-weight: bold;
  }

  &-model {
    color: var(--color-text);
  }

  &-films {
    color: var(--color-subtext);
    font-size: 0.9rem;
  }
}
</style>
