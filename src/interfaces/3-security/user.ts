import { IAuditUser } from '../0-base';

export interface IUser {
  type: string;
  email: string;
  username: string;
  password: string;
  active: boolean;
  _user: IAuditUser;
}
