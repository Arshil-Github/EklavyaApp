// File: CreateAccount.js

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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const CreateAccount = () => {
  const router = useRouter();
  const [identity, setIdentity] = useState(null);

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      className="h-full items-center justify-center bg-background"
    >
      <View className="flex items-center justify-center h-[20%] w-[90%]" />

      {identity === null && (
        <View className="flex-1 items-center justify-center w-[90%]">
          <Text className="color-text text-2xl">I am a</Text>
          <TouchableHighlight
            className="bg-primary rounded-lg mt-2 w-[80%] p-2"
            onPress={() => setIdentity("student")}
          >
            <Text className="text-2xl font-semibold color-background text-center">
              Student
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            className="bg-primary rounded-lg mt-2 w-[80%] p-2"
            onPress={() => setIdentity("teacher")}
          >
            <Text className="text-2xl font-semibold color-background text-center">
              Teacher
            </Text>
          </TouchableHighlight>
        </View>
      )}

      {identity === "student" && (
        <StudentForm setIdentity={setIdentity} router={router} />
      )}
      {identity === "teacher" && (
        <TeacherForm setIdentity={setIdentity} router={router} />
      )}

      <View className="mb-10">
        <TouchableHighlight onPress={() => router.push("/signIn")}>
          <Text className="text-xl color-blue-600 text-center">
            Already a member? Sign in
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const SendStudentInfo = async (studentInfo, router) => {
  const { name, language, location, phoneNumber, password } = studentInfo;
  if (!name || !language || !location || !phoneNumber || !password) {
    alert("Please fill all the fields");
    return;
  }

  try {
    const response = await fetch(`${config.BackendServer}/auth/studentSignIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phoneNumber,
        region: location,
        languages: language,
        password,
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

const SendTeacherInfo = async (teacherInfo, router) => {
  const { name, expertise, region, phoneNumber, password, languages } = teacherInfo;
  if (!name || !expertise || !region || !phoneNumber || !password) {
    alert("Please fill all the fields");
    return;
  }

  try {
    const response = await fetch(`${config.BackendServer}/auth/teacherSignIn`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phoneNumber,
        region,
        languages,
        expertise,
        password,
      }),
    });

    const data = await response.json();
    alert("Account created successfully");
    await AsyncStorage.setItem("userType", "teacher");
    await AsyncStorage.setItem("userData", JSON.stringify(data));
    router.push("/teachersHome");
  } catch (e) {
    alert("Error in creating account");
    console.log(e);
  }
};

const StudentForm = ({ setIdentity, router }) => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    language: "",
    location: "",
    phoneNumber: "",
    password: "",
  });

  return (
    <View className="flex-1 items-center justify-center w-[90%]">
      <Text className="color-text text-2xl mb-10">Create Account - Student</Text>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="w-full">
        <View className="w-full flex-1 items-center">
          {Object.keys(studentInfo).map((field, idx) => (
            <TextInput
              key={idx}
              className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
              placeholder={field === "language" ? "Preferred Language" : field[0].toUpperCase() + field.slice(1)}
              onChangeText={(text) => setStudentInfo({ ...studentInfo, [field]: text })}
              inputMode={field === "phoneNumber" ? "numeric" : "text"}
              enablesReturnKeyAutomatically
              secureTextEntry={field === "password"}
            />
          ))}

          <TouchableHighlight
            className="mt-10 bg-accent w-full p-3 rounded-xl"
            onPress={() => SendStudentInfo(studentInfo, router)}
          >
            <Text className="text-2xl text-center font-semibold tracking-wider color-background">
              Create Account
            </Text>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>

      <View className="mb-3">
        <TouchableHighlight onPress={() => setIdentity(null)}>
          <Text className="text-xl color-blue-600 text-center">Go back</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const TeacherForm = ({ setIdentity }) => {
  const router = useRouter(); // ✅ Fix: define router here
  const [teacherInfo, setTeacherInfo] = useState({
    name: "",
    phoneNumber: "",
    region: "",
    languages: "",
    expertise: "",
    password: "",
  });

  return (
    <View className="flex-1 items-center justify-center w-[90%]">
      <Text className="color-slate-50 text-3xl">Create Account - Teacher</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="w-full">
        <View className="w-full flex-1 items-center">
          {["name", "expertise", "languages", "region", "phoneNumber", "password"].map((field, idx) => (
            <TextInput
              key={idx}
              className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
              placeholder={
                field === "languages"
                  ? "Preferred Language"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              onChangeText={(text) =>
                setTeacherInfo({ ...teacherInfo, [field]: text })
              }
              inputMode={field === "phoneNumber" ? "numeric" : "text"}
              enablesReturnKeyAutomatically
              secureTextEntry={field === "password"}
            />
          ))}
          <TouchableHighlight
            className="mt-10 bg-accent w-full p-3 rounded-xl"
            onPress={() => {
              SendTeacherInfo(teacherInfo, router);
            }}
          >
            <Text className="text-2xl text-center text-background">
              Create Account
            </Text>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>
      <Button
        title="Go back"
        onPress={() => {
          setIdentity(null);
        }}
      />
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
