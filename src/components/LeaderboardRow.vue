<script>
import { computed } from "vue";

export default {
  props: {
    run: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <tr>
    <td>{{ run.place }}</td>
    <td>{{ run.run.times.primary_t }}</td>
    <td>{{ run.run.weblink }}</td>
  </tr>
</template>
