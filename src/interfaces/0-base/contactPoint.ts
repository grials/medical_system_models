export type telecomSystem = 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
export type telecomUse = 'home' | 'work' | 'temp' | 'old' | 'mobile' | 'administrative';

export interface IContactPoint {
  rank: number;
  value: string;
  use: telecomUse;
  system: telecomSystem;
}
