import { useEffect, useState } from "react";

interface UseUserInfoReturn {
  username: string;
  registryUrl: string;
}

export const useUserInfo = (): UseUserInfoReturn => {
  const [username, setUsername] = useState("");
  const [registryUrl, setRegistryUrl] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "anonymous person 🥷 ...";
    const storedRegistryUrl = localStorage.getItem("registryUrl") || "http://localhost:8080";

    setUsername(storedUsername);
    setRegistryUrl(storedRegistryUrl);
  }, []);

  return {
    username,
    registryUrl,
  };
};
