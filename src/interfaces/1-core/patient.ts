import { IAuditUser, IHumanName, IIdentification } from '../0-base';
import { IContactPoint } from '../0-base/contactPoint';

export interface IPatient {
  birthDate: Date;
  active: boolean;
  _user: IAuditUser;
  name: IHumanName[];
  telecom: IContactPoint[];
  identificantion: IIdentification[];
}
