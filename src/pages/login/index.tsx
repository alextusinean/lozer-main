import { AuthPage } from '../../components';

export const Login = () => {
  return (
    <AuthPage
      type='login'
      forgotPasswordLink={false}
      registerLink={false}
      rememberMe={false}
    />
  );
};
