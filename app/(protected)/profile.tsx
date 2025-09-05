import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig";

export default function Profile() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const user = auth.currentUser;

  // carregar dados existentes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setGender(data.gender || "");
        setAge(data.age?.toString() || "");
        setHeight(data.height?.toString() || "");
      }
    };
    fetchUserData();
  }, [user]);

  // salvar dados
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        gender,
        age: Number(age),
        height: Number(height),
        email: user.email,
        updatedAt: new Date(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 py-10">
      <Text className="text-3xl font-bold text-center mb-8">My Profile 👤</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />
      <TextInput
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        className={`w-full py-3 rounded-xl ${
          loading ? "bg-gray-400" : "bg-blue-500"
        }`}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>

      {saved && (
        <Text className="text-green-600 text-center mt-3">
          Profile updated successfully! 🎉
        </Text>
      )}
    </View>
  );
}
