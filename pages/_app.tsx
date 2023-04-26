import { isAuthenticate } from "@/auth";
import { checkTokenFromCookie } from "@/auth/cookieSetup";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = checkTokenFromCookie();
    if (!token) {
      router.push("/login");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <Component {...pageProps} />;
}
