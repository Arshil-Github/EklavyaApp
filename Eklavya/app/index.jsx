import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";
import { SafeAreaView } from "react-native-safe-area-context";
import MainImage from "../assets/audience.png";

export default function App() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 items-center justify-between bg-background">
      <View className="h-[60%] justify-center">
        <Image source={MainImage} className="w-[30vh] h-[30vh]" />
      </View>
      <View className="flex-1 p-5">
        <Text className="text-5xl text-accent tracking-tighter text-center">
          Eklavya
        </Text>
        <Text className="text-2xl text-text tracking-tighter mt-3 text-justify">
          A new way to learn, connecting student with volunteers to bring about
          a revolution in education.
        </Text>
      </View>
      <StatusBar style="auto" />
      <TouchableOpacity
        className="w-[80vw] p-4 items-center bg-primary rounded-lg mt-2"
        onPress={async () => {
          //check if the async storage has usertype token or not
          const userType = await AsyncStorage.getItem("userType");

          if (userType === "student" && config.useStorage)
            router.push("/studentHome");
          else if (userType === "teacher" && config.useStorage)
            router.push("/teachersHome");
          else router.push("/createAccount");
        }}
      >
        <Text className="text-2xl font-semibold color-background">
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
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
