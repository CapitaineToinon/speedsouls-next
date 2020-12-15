<script>
import { onMounted, watch } from "vue";
import { fetchLeaderboard, use } from "../api";
import Row from "./LeaderboardRow.vue";

export default {
  components: { Row },
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { data: leaderboard, update } = use(() => {
      return fetchLeaderboard(props.category);
    });

    watch(
      () => props.category,
      () => update(),
      { immediate: true }
    );

    return {
      leaderboard,
    };
  },
};
</script>

<template>
  <table v-if="leaderboard" class="leaderboard">
    <tbody>
      <Row v-for="(run, i) in leaderboard.runs" :key="i" :run="run" />
    </tbody>
  </table>
  <div v-if="leaderboard && !leaderboard.runs.length">there are no runs</div>
</template>

<style scoped></style>
