type SignupDto = {
  email?: string;
  username?: string;
  displayName?: string;
  password?: string;
  passwordConfirmation?: string;
}

type SigninDto = {
  email?: string;
  password?: string;
}

type UserProfile = {
  userId?: string;
  username?: string;
  displayName?: string;
  bio?: string;
  avatar?: string | null;
  initials?: string;
};

type SessionUser = {
  id?: string;
  accessToken?: string;
}

type UserPost = {
  id?: string;
  content?: string;
  createdBy?: string;
  createdAt?: string;
  likesCount?: number;
  hasLiked?: boolean;
  profile?: UserProfile;
}