import { Pressable, Text } from "react-native";

interface CustomButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

export function CustomButton({ title, onPress, disabled }: CustomButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className="w-full p-4 bg-blue-600 rounded-2xl shadow-lg active:bg-blue-700"
    >
      <Text className="text-white text-center font-semibold">{title}</Text>
    </Pressable>
  );
}
