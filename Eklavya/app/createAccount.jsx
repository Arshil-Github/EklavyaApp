import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const CreateAccount = () => {
  const router = useRouter();
  const [identity, setIdentity] = useState("student"); // default to student

  // Automatically create Anant Arora's account on load
  useEffect(() => {
    const autoCreateAccount = async () => {
      const studentInfo = {
        name: "Anant Arora",
        language: "English",
        location: "Delhi",
        phoneNumber: "9999999999",
        password: "abc@123",
      };

      await SendStudentInfo(studentInfo, router);
    };

    autoCreateAccount();
  }, []);

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      className="h-full items-center justify-center bg-background "
    >
      <View className="flex items-center justify-center h-[20%] w-[90%] " />
      <Text className="text-xl text-center color-text">
        Logging in Anant Arora...
      </Text>
    </SafeAreaView>
  );
};

const SendStudentInfo = async (studentInfo, router) => {
  if (
    studentInfo.name === "" ||
    studentInfo.language === "" ||
    studentInfo.location === "" ||
    studentInfo.phoneNumber === "" ||
    studentInfo.password === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  try {
    const response = await fetch(`${config.BackendServer}/auth/studentSignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: studentInfo.name,
        phoneNumber: studentInfo.phoneNumber,
        region: studentInfo.location,
        languages: studentInfo.language,
        password: studentInfo.password,
      }),
    });

    const data = await response.json();
    alert("Account created successfully");
    await AsyncStorage.setItem("userType", "student");
    await AsyncStorage.setItem("userData", JSON.stringify(data));
    router.push("/studentHome");
  } catch (e) {
    alert("Error in creating account");
    console.log(e);
  }
};

export default CreateAccount;

const styles = StyleSheet.create({});
