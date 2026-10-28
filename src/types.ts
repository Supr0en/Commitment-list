import { Promise } from "./interfaces";

export type ItemProps = {
   id: string, name: string, endDate: string, onUpdate: (data: Promise) => void;
};
export type PromiseListProps = {
   promises: Promise[], onUpdate: (data: Promise[]) => void;
};
export type TimerProps = { start: Date, end: Date };
