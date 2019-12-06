import { Mark } from './mark';
export interface MarkOverviewElementModel {
  url: string,
  title: string,
  marks: Mark[],
  createdAt: number
}
