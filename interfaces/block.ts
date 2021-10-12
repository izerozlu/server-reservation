import Timezone from './timezone';
import Day from './day';

export default interface Block {
  id: string;
  day: Day;
  timezone: Timezone;
  column: number;
  isTaken: boolean;
  note?: string;
}
