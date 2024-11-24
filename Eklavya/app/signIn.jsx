import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="h-screen items-center justify-between bg-slate-800">
      <View className=" w-full flex-1 items-center justify-center">
        <Text className="color-slate-100 text-5xl ">Sign In</Text>
        <TextInput
          className="w-[80%] bg-slate-200 p-2 text-lg mt-5"
          placeholder="Email"
        />
        <TextInput
          className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
          placeholder="Password"
        />

        <TouchableHighlight
          className="mt-4 bg-slate-300 w-[60%] p-2"
          onPress={() => {
            router.push("/studentHome");
          }}
        >
          <Text className="text-lg text-center">Sign in</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className="mt-4 bg-slate-300 w-[60%] p-2"
          onPress={() => {
            router.push("/teachersHome");
          }}
        >
          <Text className="text-lg text-center">Sign in</Text>
        </TouchableHighlight>
      </View>

      <Button
        title="Not a member? Create an account"
        onPress={() => {
          router.push("/createAccount");
        }}
      />
    </SafeAreaView>
  );
};

export default SignIn;
