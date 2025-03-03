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

type SessionUser = {
  id?: string;
  email?: string | null
  username?: string;
  displayName?: string;
  avatar?: string;
  accessToken?: string;
  name?: string | null
  image?: string | null
}