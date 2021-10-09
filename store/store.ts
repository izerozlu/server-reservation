// eslint-disable-next-line import/named
import { ActionContext } from 'vuex';

import Timezone from '~/interfaces/timezone';

export interface State {
  selectedDay: number | null;
  selectedTimezone: Timezone | null;
}

export const state: State = {
  selectedDay: null,
  selectedTimezone: null,
};

export const mutations = {
  updateSelectedDay(state: State, day: number) {
    state.selectedDay = day;
  },
  updateSelectedTimezone(state: State, timezone: Timezone) {
    state.selectedTimezone = timezone;
  },
};

export const actions = {
  updateSelectedDay(context: ActionContext<State, {}>, day: number) {
    context.commit('updateSelectedDay', day);
  },
  updateSelectedTimezone(
    context: ActionContext<State, {}>,
    timezone: Timezone
  ) {
    context.commit('updateSelectedTimezone', timezone);
  },
};
