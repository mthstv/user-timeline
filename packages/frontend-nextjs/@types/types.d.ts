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