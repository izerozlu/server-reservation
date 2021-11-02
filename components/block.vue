<template>
  <button
    :key="block.id"
    class="block h-full rounded flex-1"
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
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import BlockTemplate from '~/interfaces/block-template';

export default Vue.extend({
  props: {
    block: {
      type: Object as () => BlockTemplate,
      default: () => {},
    },
  },
  methods: {
    ...mapActions('store', ['takeBlock', 'hoverBlock']),
  },
});
</script>

<style></style>
