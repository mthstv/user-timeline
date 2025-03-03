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
  username?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  initials?: string;
};

type SessionUser = {
  id?: string;
  accessToken?: string;
}