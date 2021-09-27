<template>
  <div class="week h-full grid grid-flow-col auto-cols-auto gap-x-2 px-2 py-4">
    <Day v-for="day in days" :key="day.name" :day="day" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Day from '~/interfaces/day';

interface WeekData {
  days: Day[];
}

export default Vue.extend({
  data(): WeekData {
    return {
      days: [
        { name: 'Monday' },
        { name: 'Tuesday' },
        { name: 'Wednesday' },
        { name: 'Thursday' },
        { name: 'Friday' },
      ],
    };
  },
});
</script>
