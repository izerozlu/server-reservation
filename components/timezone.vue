<template>
  <component
    :is="isDaySelected ? 'div' : 'button'"
    class="timezone p-1 w-full text-left border border-transparent rounded"
    :class="{
      flex: isDaySelected,
      'items-center': isDaySelected,
      'hover:border-red-300': isDaySelected,
      'cursor-pointer': !isDaySelected,
    }"
    type="button"
    @click="handleTimezoneClick"
  >
    <template v-if="!isSelectedTimezone">{{ timezone.zone }}</template>
    <template v-else>
      <span class="timezone__time w-8">{{ timezone.zone }}</span>
      <div class="timezone__blocks blocks flex items-center w-full h-full px-2">
        <!-- TODO [ozlui] extract this button into a Block component -->
        <button
          v-for="block in blocks"
          :key="block.id"
          class="timezone__block block h-full rounded flex-1"
          :class="{
            'server-block--taken': block.isTaken,
            'bg-red-400': block.isTaken,
            'hover:bg-gray-200': !block.isTaken,
          }"
          type="button"
          :disabled="block.isTaken"
          @click="() => takeBlock(block)"
          @mouseenter="() => hoverBlock({ block, isEnter: true })"
          @mouseleave="() => hoverBlock({ block, isEnter: false })"
        />
      </div>
    </template>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import Timezone from '~/interfaces/timezone';
import Block from '~/interfaces/block';

interface ZoneData {
  blocks: Block[];
}

export default Vue.extend({
  props: {
    timezone: {
      type: Object as () => Timezone,
      default: null,
    },
    isDaySelected: {
      type: Boolean,
      default: false,
    },
  },
  data(): ZoneData {
    return {
      blocks: new Array(5).fill(0).map((_, index: number) => {
        return {
          id: `${this.timezone.day.id}_${this.timezone.id}_${index + 1}`,
          day: this.timezone.day,
          timezone: this.timezone,
          column: index + 1,
          isTaken: false,
        };
      }),
    };
  },
  computed: {
    ...mapState('store', ['selectedTimezone', 'takenBlocks']),
    isSelectedTimezone(): boolean {
      return this.isDaySelected;
    },
  },
  methods: {
    ...mapActions('store', [
      'updateSelectedTimezone',
      'takeBlock',
      'hoverBlock',
    ]),
  },
});
</script>

<style lang="scss" scoped></style>
