import { IAuditUser, ICodeableConcept } from '../0-base';

export type procedureTypeCategories = 'appointment';

export interface IProcedureType {
  specialty: ICodeableConcept;
  name: string;
  description: string;
  duration: number;
  active: boolean;
  category: procedureTypeCategories;
  _user: IAuditUser;
}
