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
    :class="[
      modifier ? `day--${modifier}` : null,
      {
        'col-span-2': isDaySelected,
        'day--selected': isDaySelected,
        'cursor-pointer': !isDaySelected,
      },
    ]"
    @click="updateSelectedDay(day.weekday)"
  >
    <div class="day__header flex justify-between">
      <h2 class="day__title capitalize text-2xl">{{ day.name }}</h2>
      <h3 v-if="modifier" class="day__sub-title">
        {{ modifier }}
      </h3>
    </div>
    <template v-if="isDaySelected">
      <h4
        class="
          day__server-header
          text-base
          flex
          items-center
          justify-center
          pl-9
        "
      >
        Integration
      </h4>
      <div
        class="
          day__server-columns
          server-columns
          flex
          justify-start
          pl-9
          divide-x divide-gray-300
          h-6
          self-center
        "
      >
        <h5
          v-for="column in columns"
          :key="column"
          class="
            server-columns__column
            column
            flex
            items-center
            justify-center
            flex-1
            text-center
          "
          :class="{
            'column--hovered': hoveredColumn === column,
            'bg-gray-200': hoveredColumn === column,
          }"
        >
          {{ column }}
        </h5>
      </div>
    </template>
    <Timezone
      v-for="timezone in timezones"
      :key="timezone.id"
      class="day__zone"
      :timezone="timezone"
      :is-day-selected="isDaySelected"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import TimezoneTemplate from '~/interfaces/timezone-template';
import DayTemplate from '~/interfaces/day-template';

interface ComponentData {
  timezones: TimezoneTemplate[];
  columns: number[];
}

export default Vue.extend({
  props: {
    day: {
      type: Object as () => DayTemplate,
      default: null,
    },
    modifier: {
      type: String,
      default: null,
    },
  },
  data(): ComponentData {
    const timezones = new Array(19).fill(0).map((_, index) => {
      return {
        zone: `${Math.floor((index + 18) / 2)}${
          index % 2 === 0 ? ':00' : ':30'
        }`,
        id: index,
        day: this.day,
      };
    });

    return {
      timezones,
      columns: new Array(5).fill(0).map((_, index) => index + 1),
    };
  },
  computed: {
    ...mapState('store', ['selectedDay', 'hoveredBlock']),
    isDaySelected() {
      return !this.selectedDay
        ? this.modifier === 'today'
        : this.selectedDay === this.day.weekday;
    },
    hoveredColumn(): number {
      return this.hoveredBlock?.column;
    },
  },
  methods: {
    ...mapActions('store', ['updateSelectedDay']),
  },
});
</script>

<style lang="scss" scoped>
.day--selected {
  outline: 4px solid var(--primary-color);
  border-color: transparent;
}

.day:not(.day--selected):hover {
  outline: 4px dashed var(--primary-color);
  border-color: transparent;
}
</style>
