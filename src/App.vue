<template>
  <div id="app">
    <Starships />
  </div>
</template>

<script>
import Starships from "./components/Starships";

export default {
  name: "App",
  components: {
    Starships,
  },
};
</script>

<style>
#app {
  font-family: sans-serif;
}
</style>
