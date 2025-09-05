import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>🎉 Welcome to Home (Protected Route)</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
