<template>
  <div
    class="
      day
      border border-gray-600
      rounded-lg
      grid grid-flow-row
      auto-rows-auto
      p-2
      text-xs
    "
  >
    <h2 class="day__title capitalize text-2xl">{{ day.name }}</h2>
    <Zone
      v-for="timezone in timezones"
      :key="timezone.id"
      class="day__zone"
      :timezone="timezone"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Timezone from '~/interfaces/timezone';
import Day from '~/interfaces/day';

interface DayData {
  timezones: Timezone[];
}

export default Vue.extend({
  props: {
    day: {
      type: Object as () => Day,
      default: null,
    },
  },
  data(): DayData {
    const timezones = new Array(19).fill(0).map((_, index) => {
      return {
        zone: `${Math.floor((index + 18) / 2)}${
          index % 2 === 0 ? ':00' : ':30'
        }`,
        id: index,
      };
    });

    return {
      timezones,
    };
  },
});
</script>

<style lang="scss" scoped></style>
