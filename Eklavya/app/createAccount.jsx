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
      className="h-full items-center justify-center bg-background "
    >
      <View className="flex items-center justify-center h-[20%] w-[90%] " />
      {identity === null ? (
        <View className="flex-1 items-center justify-center w-[90%]">
          <Text className="color-text text-2xl">I am a</Text>
          <TouchableHighlight
            className=" bg-primary rounded-lg mt-2 w-[80%] p-2"
            onPress={() => {
              setIdentity("student");
            }}
          >
            <Text className="text-2xl font-semibold color-background text-center">
              Student
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            className=" bg-primary rounded-lg mt-2 w-[80%] p-2"
            onPress={() => {
              setIdentity("teacher");
            }}
          >
            <Text className="text-2xl font-semibold color-background text-center">
              Teacher
            </Text>
          </TouchableHighlight>
        </View>
      ) : null}
      {identity === "student" ? (
        <StudentForm setIdentity={setIdentity} router={router} />
      ) : null}
      {identity === "teacher" ? (
        <TeacherForm setIdentity={setIdentity} router={router} />
      ) : null}

      <View className="mb-10">
        <TouchableHighlight
          onPress={() => {
            router.push("/signIn");
          }}
        >
          <Text className="text-xl  color-blue-600 text-center">
            Already a member? Sign in
          </Text>
        </TouchableHighlight>
      </View>
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

const SendTeacherInfo = async (teacherInfo, router) => {
  if (
    teacherInfo.name === "" ||
    teacherInfo.expertise === "" ||
    teacherInfo.region === "" ||
    teacherInfo.phoneNumber === "" ||
    teacherInfo.password === ""
  ) {
    alert("Please fill all the fields");
    return;
  }

  try {
    const response = await fetch(`${config.BackendServer}/auth/teacherSignIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: teacherInfo.name,
        phoneNumber: teacherInfo.phoneNumber,
        region: teacherInfo.region,
        languages: teacherInfo.languages,
        expertise: teacherInfo.expertise,
        password: teacherInfo.password,
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
    console.log(teacherInfo);
  }
};

const StudentForm = ({ setIdentity, router }) => {
  const studentInfo = {
    name: "",
    language: "",
    location: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  return (
    <View className="flex-1 items-center justify-center w-[90%]">
      <Text className="color-text text-2xl mb-10">
        Create Account - Student
      </Text>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="w-full">
        <View className="w-full flex-1 items-center">
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Name"
            onChangeText={(text) => {
              studentInfo.name = text;
            }}
            inputMode="text"
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Preffered Language"
            onChangeText={(text) => {
              studentInfo.language = text;
            }}
            inputMode="text"
            enablesReturnKeyAutomatically={true}
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Location"
            onChangeText={(text) => {
              studentInfo.location = text;
            }}
            inputMode="text"
            enablesReturnKeyAutomatically={true}
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Phone Number"
            onChangeText={(text) => {
              studentInfo.phoneNumber = text;
            }}
            inputMode="numeric"
            enablesReturnKeyAutomatically={true}
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Password"
            onChangeText={(text) => {
              studentInfo.password = text;
            }}
            enablesReturnKeyAutomatically={true}
            secureTextEntry
          />
          <TouchableHighlight
            className="mt-10 bg-accent w-full p-3 rounded-xl"
            onPress={() => {
              SendStudentInfo(studentInfo, router);
            }}
          >
            <Text className="text-2xl text-center font-semibold tracking-wider color-background">
              Create Account
            </Text>
          </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback>

      <View className="mb-3">
        <TouchableHighlight
          onPress={() => {
            setIdentity(null);
          }}
        >
          <Text className="text-xl  color-blue-600 text-center">Go back</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const TeacherForm = ({ setIdentity, router }) => {
  const teacherInfo = {
    name: "",
    phoneNumber: "",
    region: "",
    languages: "",
    expertise: "",
    password: "",
  };

  return (
    <View className="flex-1 items-center justify-center w-[90%]">
      <Text className="color-slate-50 text-3xl">Create Account - Teacher</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="w-full">
        <View className="w-full flex-1 items-center">
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Name"
            onChangeText={(text) => {
              teacherInfo.name = text;
            }}
            inputMode="text"
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Expertise"
            onChangeText={(text) => {
              teacherInfo.expertise = text;
            }}
            inputMode="text"
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Preffered Language"
            onChangeText={(text) => {
              teacherInfo.languages = text;
            }}
            inputMode="text"
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Location"
            onChangeText={(text) => {
              teacherInfo.region = text;
            }}
            inputMode="text"
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Phone Number"
            onChangeText={(text) => {
              teacherInfo.phoneNumber = text;
            }}
            inputMode="numeric"
          />
          <TextInput
            className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
            placeholder="Password"
            onChangeText={(text) => {
              teacherInfo.password = text;
            }}
            inputMode="text"
            enablesReturnKeyAutomatically={true}
            secureTextEntry
          />
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

