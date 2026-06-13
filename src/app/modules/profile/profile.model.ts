export interface ProfileModel {
  _id: string;     // profile id
  user: string;    // user id (senin kırmızı işaretlediğin alan)
  nickname: string;
  avatar?: string;
  isActive: boolean;
}

export interface CreateProfileRequest {
    user: string;
    nickname: string;
    avatar: string;
    isActive: boolean;
}
