import PATHS from "@/lib/paths";
import AuthLayout from "../../layouts/auth-layout";
import { RegisterForm } from "../../register/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      header="Register"
      caption="Create a new NoteSnap account."
      footerPath={PATHS.login}
      footerText="Already have an account? Login instead."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
