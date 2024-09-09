export type humanNameUse = 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';

export interface IHumanName {
  use: humanNameUse;
  text: string;
  family: string;
  given: string[];
  prefix: string[];
  suffix: string[];
}
