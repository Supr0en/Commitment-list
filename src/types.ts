import { Promise } from "./interfaces";

export type ItemProps = { name: string, endDate: string };
export type PromiseListProps = { promises: Promise[] };
export type TimerProps = { start: Date, end: Date };
