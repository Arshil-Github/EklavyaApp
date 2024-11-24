import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-800">
      <Text className="text-9xl text-slate-200">Eklavya</Text>
      <StatusBar style="auto" />
      <Link
        href="/signIn"
        className="p-3 bg-red-200 w-[80%] text-center rounded-2xl text-slate-800 text-xl font-bold tracking-tighter mt-10"
      >
        Get Started
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
