<template>
  <ul v-if="games">
    <li v-for="game in games" :key="game.id">
      <router-link :to="`/leaderboards/${game.abbreviation}`">{{
        game.names.international
      }}</router-link>
    </li>
  </ul>
</template>

<script>
import { onMounted } from "vue";
import { use, fetchGames } from "../../api";

export default {
  setup() {
    const { data: games, update } = use(fetchGames);

    onMounted(update);

    return {
      games,
    };
  },
};
</script>
