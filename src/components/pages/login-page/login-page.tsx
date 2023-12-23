import PATHS from "@/lib/paths";
import AuthLayout from "../../layouts/auth-layout";
import { LoginForm } from "@/components/login/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
      header="Login"
      caption="Welcome back, log back in to your account"
      footerPath={PATHS.register}
      footerText="Need a new account? Register instead."
    >
      <LoginForm />
    </AuthLayout>
  );
}
