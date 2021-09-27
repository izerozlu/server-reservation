<template>
  <div class="timezone w-full">
    {{ timezone.zone }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Timezone from '~/interfaces/timezone';

export default Vue.extend({
  props: {
    timezone: {
      type: Object as () => Timezone,
      default: null,
    },
  },
});
</script>
