import { HelloWave } from "@/components/HelloWave";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(protected)/home");
    } catch (err: any) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email.");
          break;
        default:
          setError("Failed to login. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2 text-center text-gray-900">
        Welcome Back <HelloWave />
      </Text>
      <Text className="text-gray-500 mb-6 text-center">
        Login to continue your fitness journey 💪
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />

      <View className="mb-4 relative">
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-xl px-4 py-3 pr-12"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-3"
        >
          <Text className="text-blue-500 font-medium">
            {showPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text className="text-red-500 mb-3 text-center">{error}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className={`w-full py-3 rounded-xl mb-4 ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/signup")}
        className="w-full py-3 rounded-xl border border-gray-300 mb-3"
      >
        <Text className="text-center text-gray-700 font-medium">
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/reset-password")}
        className="w-full py-3 rounded-xl"
      >
        <Text className="text-center text-blue-500 font-medium">
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
