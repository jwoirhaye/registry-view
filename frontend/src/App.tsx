import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import RepoDetails from "@/pages/RepoDetails";
import TagDetails from "./pages/TagDetails";
import AppLayout from "@/components/AppLayout";

const useAuth = () => {
  return !!localStorage.getItem("registryUrl");
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default function App() {
  const isAuthenticated = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repo/:repoName"
          element={
            <ProtectedRoute>
              <RepoDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repo/:repoName/tag/:tagName"
          element={
            <ProtectedRoute>
              <TagDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
