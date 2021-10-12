<template>
  <div class="week h-full grid grid-flow-col grid-cols-6 gap-x-3 px-2 py-4">
    <Day
      v-for="day in days"
      :key="day.name"
      :day="day"
      :modifier="getDayModifier(day.weekday)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Day from '~/interfaces/day';
import DayModifier from '~/interfaces/day-modifier';

interface WeekData {
  days: Day[];
}

export default Vue.extend({
  data(): WeekData {
    return {
      days: [
        { name: 'Monday', weekday: 1, id: '1' },
        { name: 'Tuesday', weekday: 2, id: '2' },
        { name: 'Wednesday', weekday: 3, id: '3' },
        { name: 'Thursday', weekday: 4, id: '4' },
        { name: 'Friday', weekday: 5, id: '5' },
      ],
    };
  },
  methods: {
    getDayModifier: (weekday: number): DayModifier | null => {
      const today = 3 || new Date().getDay();
      switch (weekday) {
        case today - 1:
          return 'yesterday';
        case today:
          return 'today';
        case today + 1:
          return 'tomorrow';
        default:
          return null;
      }
    },
  },
});
</script>
