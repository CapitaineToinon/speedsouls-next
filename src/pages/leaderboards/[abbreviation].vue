<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="game">
    <h1>{{ game.names.international }}</h1>

    <ul>
      <li v-for="category in game.categories.data" :key="category.id">
        <router-link
          :to="`/leaderboards/${game.abbreviation}/${category.id}`"
          >{{ category.name }}</router-link
        >
      </li>
    </ul>

    <router-view v-if="game.categories.data.length" />
    <div v-else>This game has no categories.</div>
  </div>
</template>

<script>
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchGame, use } from "../../api";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    const { error, data: game, update } = use(async () => {
      const game = await fetchGame(route.params.abbreviation);

      if (!route.params.category && game.categories.data.length) {
        router.replace(
          `/leaderboards/${game.abbreviation}/${game.categories.data[0].id}`
        );
      }

      return game;
    });

    watch(
      () => route.params,
      () => update(),
      { immediate: true }
    );

    return {
      error,
      game,
    };
  },
};
</script>
