<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="category">
    <h2>{{ category.name }}</h2>
    <leaderboard :category="category" />
  </div>
</template>

<script>
import { onMounted, reactive, toRef, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchGame, use } from "../../api";

import Leaderboard from "../../components/Leaderboard.vue";

export default {
  components: { Leaderboard },
  setup() {
    const route = useRoute();

    const { error, data: category, update } = use(async () => {
      const game = await fetchGame(route.params.abbreviation);
      const category = game.categories.data.find(
        (c) => c.id == route.params.category
      );
      if (!category) throw "Category not found";
      return category;
    });

    watch(
      () => route.params,
      () => update(),
      { immediate: true }
    );

    return {
      error,
      category,
    };
  },
};
</script>
