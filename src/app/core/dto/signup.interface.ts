import { UserRoleEnum } from "../enums/userRole.enum";
import { UserTypeEnum } from "../enums/userType.enum";

export interface SignUpDto {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    birthDate: string; // ISO format date YYYY-MM-DD
    password: string;
    passwordValidation: string;
    userRole: UserRoleEnum;
    userType: UserTypeEnum;
    termsAndConditions: {
        termsAndConditions: boolean;
        dataProcessing: boolean;
        emailSubscription: boolean;
    };
    isEmailVerified: boolean;
    isActive: boolean;
}