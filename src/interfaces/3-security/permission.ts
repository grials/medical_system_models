import { IAuditUser } from '../0-base';

export interface IPermissionFeature {
  name: string;
  level: number[];
}

export interface IPermission {
  name: string;
  features: IPermissionFeature[];
  _user: IAuditUser;
}
