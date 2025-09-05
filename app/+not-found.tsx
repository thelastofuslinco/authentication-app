import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🚧 Page Not Found</Text>
      <Button
        title="Go Home"
        onPress={() => router.replace("/(protected)/home")}
      />
    </View>
  );
}
