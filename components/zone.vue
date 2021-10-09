<template>
  <button
    class="
      timezone
      p-1
      w-full
      hover:text-white
      cursor-pointer
      transition-colors
      text-left
      rounded
    "
    :class="{
      'timezone--selected': isSelectedTimezone,
    }"
    type="button"
    @click="handleTimezoneClick"
  >
    {{ timezone.zone }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

import Timezone from '~/interfaces/timezone';

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
  computed: {
    ...mapState('store', ['selectedTimezone']),
    isSelectedTimezone(): boolean {
      return (
        this.isDaySelected && this.selectedTimezone?.id === this.timezone.id
      );
    },
  },
  methods: {
    ...mapActions('store', ['updateSelectedTimezone']),
    handleTimezoneClick() {
      this.notifyParentWithClick();
      this.updateSelectedTimezone(this.timezone);
    },
    notifyParentWithClick() {
      this.$emit('click', this.timezone);
    },
  },
});
</script>

<style lang="scss" scoped>
.timezone {
  &--selected {
    background-color: red;
  }

  &:hover {
    background-color: var(--primary-color);
  }
}
</style>
