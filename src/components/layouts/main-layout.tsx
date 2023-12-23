import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useSessionStore from "@/stores/session-store";
import { Header } from "../header/header";
import PATHS from "@/lib/paths";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { session } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate(PATHS.login);
    }
  }, [session, navigate]);

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto pt-12">{children}</main>
    </div>
  );
}
