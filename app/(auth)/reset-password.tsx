import { useRouter } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Check your email to reset your password.");
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email.");
          break;
        default:
          setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center text-gray-900">
        Reset Password 🔑
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />

      {message ? <Text className="text-green-600 mb-3">{message}</Text> : null}
      {error ? <Text className="text-red-500 mb-3">{error}</Text> : null}

      <TouchableOpacity
        onPress={handleReset}
        disabled={loading}
        className={`w-full py-3 rounded-xl mb-4 ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Sending..." : "Send Reset Link"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        className="w-full py-3 rounded-xl border border-gray-300"
      >
        <Text className="text-center text-gray-700 font-medium">
          Back to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
