import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email to reset password.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      {message ? <Text style={{ color: "green" }}>{message}</Text> : null}
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button title="Reset Password" onPress={handleReset} />
      <Button
        title="Back to Login"
        onPress={() => router.push("/(auth)/login")}
      />
    </View>
  );
}
