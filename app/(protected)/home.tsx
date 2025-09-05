import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig";

export default function Home() {
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name || "User");
        } else {
          setName("User");
        }
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-4 text-gray-900">
        Welcome {name ? name : "👋"}
      </Text>
      <Text className="text-gray-500 mb-8">
        You are logged in with {user?.email}
      </Text>

      {/* Botão ir para perfil */}
      <TouchableOpacity
        onPress={() => router.push("/(protected)/profile")}
        className="w-full py-3 rounded-xl bg-blue-500 mb-4"
      >
        <Text className="text-white text-center font-semibold text-lg">
          Go to Profile
        </Text>
      </TouchableOpacity>

      {/* Botão logout */}
      <TouchableOpacity
        onPress={handleLogout}
        className="w-full py-3 rounded-xl border border-gray-300"
      >
        <Text className="text-center text-gray-700 font-medium">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
