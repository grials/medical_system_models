import { ICoding } from './coding';

export interface IDisplays {
  value: string;
  language: string;
  abbreviation: string;
}

export interface ICodeableConcept {
  text: string;
  coding: ICoding[];
  displays: IDisplays[];
}
