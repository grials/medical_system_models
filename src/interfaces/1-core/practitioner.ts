import { IAuditUser, ICodeableConcept, IHumanName, IIdentification } from '../0-base';
import { IContactPoint } from '../0-base/contactPoint';

export interface IPractitioner {
  name: IHumanName[];
  telecom: IContactPoint[];
  identification: IIdentification[];
  specialties: ICodeableConcept[];
  birthDate: Date;
  active: boolean;
  _user: IAuditUser;
}
