// eslint-disable-next-line import/named
import { ActionContext } from 'vuex';

import Block from '~/interfaces/block-template';

export interface State {
  selectedDay: number | null;
  takenBlocks: Block[];
  hoveredBlock: Block | null;
}

export const state: State = {
  selectedDay: null,
  takenBlocks: [],
  hoveredBlock: null,
};

export const mutations = {
  updateSelectedDay(state: State, day: number) {
    state.selectedDay = day;
  },
  takeBlock(state: State, block: Block) {
    block.isTaken = true;
    state.takenBlocks = [...state.takenBlocks, block];
  },
  hoverBlock(
    state: State,
    { block, isEnter }: { block: Block; isEnter: boolean }
  ) {
    state.hoveredBlock = isEnter ? block : null;
  },
};

export const actions = {
  updateSelectedDay(context: ActionContext<State, {}>, day: number) {
    context.commit('updateSelectedDay', day);
  },
  takeBlock(context: ActionContext<State, {}>, block: Block) {
    context.commit('takeBlock', block);
  },
  hoverBlock(
    context: ActionContext<State, {}>,
    { block, isEnter }: { block: Block; isEnter: boolean }
  ) {
    context.commit('hoverBlock', { block, isEnter });
  },
};
