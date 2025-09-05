import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(protected)/home");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [user, loading]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
