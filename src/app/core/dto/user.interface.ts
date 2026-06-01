import { IProfile } from "./profile.interface";

export interface IUser{
  _id: string;
  name: string;
  surname: string;
  profile?: IProfile | null;
}
