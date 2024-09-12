import { IAuditUser } from './auditUser';

export interface ICoding {
  code: string;
  system: string;
  version: string;
  display: string;
  userSelected: boolean;
  _user: IAuditUser;
}
