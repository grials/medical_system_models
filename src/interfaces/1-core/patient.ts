import { IAuditUser, ICodeableConcept, IHumanName, IIdentification } from '../0-base';
import { IContactPoint } from '../0-base/contactPoint';

export interface IPatient {
  referedBy: string;
  birthDate: Date;
  deceasedDate: Date;
  active: boolean;
  deceasedBoolean: boolean;
  _user: IAuditUser;
  nationality: ICodeableConcept;
  residenceCountry: ICodeableConcept;
  name: IHumanName[];
  telecom: IContactPoint[];
  identification: IIdentification[];
}
