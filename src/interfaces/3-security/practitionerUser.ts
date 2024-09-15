import { IPractitioner } from '../1-core/practitioner';
import { IPermission } from './permission';
import { IUser } from './user';

export interface IPractitionerUser extends IUser {
  practitionerProfile: IPractitioner;
  permits: IPermission[];
}
