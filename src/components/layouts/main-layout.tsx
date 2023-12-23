import { Header } from "../header/header";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto pt-12">{children}</main>
    </div>
  );
}
