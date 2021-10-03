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
:root {
  --color-heading: #000;
  --color-text: #333;
  --color-subtext: #666;
  --color-border: #ddd;
  --color-bg: #efefef;
  --color-white: #fff;
  --shadow: 1px 2px 4px 2px rgba(75, 75, 100, 0.1);

  background: var(--color-bg);
  font-family: sans-serif;
  font-size: 16px;
}

html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
