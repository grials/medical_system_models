import { IAuditUser } from '../0-base';
import { IPatient } from './patient';
import { IPractitioner } from './practitioner';
import { IProcedureType } from './procedureType';

export interface IAppointment {
  practitioner: IPractitioner;
  patient: IPatient;
  date: Date;
  procedureType: IProcedureType;
  startTime: number;
  endTime: number;
  active: boolean;
  _user: IAuditUser;
}
