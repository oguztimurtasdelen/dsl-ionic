import { UserRoleEnum } from "src/app/core/enums/userRole.enum";



export interface SignInModel {
  email: string;
  password: string;
}

export interface SignUpModel{
  userRole: UserRoleEnum;
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordValidation: string;
  termsAndConditions: TermsAndConditions,
  isEmailVerified: boolean,
  isActive: boolean

}

export interface TermsAndConditions{
  termsAndCondition: boolean;
  dataProcessing: boolean;
  emailSubscription: boolean;
}

export interface IProfile{
  _id: string;
  user: string;
  avatar?: string | null;
}
export interface IUser{
  _id: string;
  name: string;
  surname: string;
  profile?: IProfile | null;
}


