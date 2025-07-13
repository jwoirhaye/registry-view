import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("registryUrl");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login", { replace: true });
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onLogout={handleLogout} onHomeClick={handleHomeClick} />
      <main className="flex-1 w-full max-w-5xl mx-auto py-6 px-2">{children}</main>
      <Toaster theme="dark" richColors position="bottom-right" />
      <Footer />
    </div>
  );
}
