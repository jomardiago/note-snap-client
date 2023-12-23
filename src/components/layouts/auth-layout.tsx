import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import useSessionStore from "@/stores/session-store";
import PATHS from "@/lib/paths";

type Props = {
  children: React.ReactNode;
  header: string;
  caption: string;
  footerPath: string;
  footerText: string;
};

export default function AuthLayout({
  children,
  header,
  caption,
  footerPath,
  footerText,
}: Props) {
  const { session } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate(PATHS.root);
    }
  }, [session, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white w-[500px] p-8 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">{header}</h1>
          <p className="text-gray-700">{caption}</p>
        </div>
        {children}
        <div className="text-sm font-semibold">
          <Link to={footerPath} className="link">
            {footerText}
          </Link>
        </div>
      </div>
    </div>
  );
}
