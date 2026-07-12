export interface CreateTrainingRequest {
    profile: string;
    device?: string;
    trainingType: string;
    trainingStatus: string;
    trainingLevel?: number;
    trainingProgram?: Object;
    trainingResult?: Object;
}

