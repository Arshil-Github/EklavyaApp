import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextInputCustom from "../components/TextInputCustom";

const sendToServer = async (info, router) => {
  if (info.phoneNumber === "" || info.password === "") {
    alert("Please fill all the fields");
    return;
  }

  try {
    const response = await fetch(`${config.BackendServer}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: info.phoneNumber,
        password: info.password,
      }),
    });
    const data = await response.json();
    alert("LoggedIn successfully");

    if (data.hasOwnProperty("_id")) {
      await AsyncStorage.setItem("userData", JSON.stringify(data));

      if (data.hasOwnProperty("expertise")) {
        await AsyncStorage.setItem("userType", "teacher");
        router.navigate("/teachersHome");
      } else {
        await AsyncStorage.setItem("userType", "student");
        router.navigate("/studentHome");
      }
    } else {
      alert("Invalid credentials");
      return;
    }
  } catch (e) {
    alert("Error in logging in");
    console.log(e);
  }
};

const SignIn = () => {
  const router = useRouter();

  const loginInfo = {
    phoneNumber: "",
    password: "",
  };

  return (
    <SafeAreaView className="h-screen items-center justify-between bg-background">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className=" w-full flex-1 items-center justify-center">
          <Text className="text-text text-4xl ">Sign In</Text>

          <TextInput
            className="w-[80%] bg-slate-200 p-4 text-2xl mt-5 rounded-lg border-2 border-accent"
            placeholder="Phone Number"
            keyboardType="numeric"
            onChangeText={(text) => {
              loginInfo.phoneNumber = text;
            }}
            inputMode="numeric"
            enablesReturnKeyAutomatically={true}
          />

          <TextInput
            className="w-[80%] bg-slate-200 p-4 text-2xl mt-2 rounded-lg border-2 border-accent"
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => {
              loginInfo.password = text;
            }}
            inputMode="text"
            enablesReturnKeyAutomatically={true}
          />

          <TouchableHighlight
            className="mt-4 bg-primary w-[80%] p-3 rounded-lg"
            onPress={() => {
              sendToServer(loginInfo, router);
            }}
          >
            <Text className="text-2xl color-background text-center font-semibold tracking-wider">
              Submit
            </Text>
          </TouchableHighlight>

          {/* <TouchableHighlight
          className="mt-4 bg-country-lightyellow w-[80%] p-3 rounded-xl"
          onPress={() => {
            router.push("/teachersHome");
          }}
        >
          <Text className="text-2xl text-center font-semibold tracking-wider">
            Teacher
          </Text>
        </TouchableHighlight> */}
          {/* <TouchableHighlight
          className="mt-4 bg-slate-300 w-[60%] p-2"
          onPress={() => {
            router.push("/teachersHome");
          }}
        >
          <Text className="text-lg text-center">Sign in</Text>
        </TouchableHighlight> */}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
