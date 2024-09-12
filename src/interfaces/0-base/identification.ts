import { IAuditUser } from './auditUser';
import { ICodeableConcept } from './codeableConcept';

export type identificationUse = 'usual' | 'official' | 'temp' | 'secondary' | 'old';

export interface IIdentification {
  value: string;
  system: string;
  assigner: { display: string };
  _user: IAuditUser;
  use: identificationUse;
  identifierType: ICodeableConcept;
}
