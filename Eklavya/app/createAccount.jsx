import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateAccount = () => {
  const [identity, setIdentity] = useState(null);
  return (
    <SafeAreaView className="h-screen items-center justify-center bg-slate-800 ">
      <View className="flex items-center justify-center h-[15%] w-[90%]">
        <Text className="text-5xl color-slate-50 font-semibold">
          Create Account
        </Text>
      </View>

      {identity === null ? (
        <View className="flex-1 items-center justify-center w-[90%]">
          <Text className="color-slate-50 text-3xl">I am a</Text>
          <TouchableHighlight
            className="mt-4 bg-slate-300 w-[80%] p-2"
            onPress={() => {
              setIdentity("student");
            }}
          >
            <Text className="text-2xl text-center">Student</Text>
          </TouchableHighlight>
          <TouchableHighlight
            className="mt-4 bg-slate-300 w-[80%] p-2"
            onPress={() => {
              setIdentity("teacher");
            }}
          >
            <Text className="text-2xl text-center">Teacher</Text>
          </TouchableHighlight>
        </View>
      ) : null}
      {identity === "student" ? (
        <StudentForm setIdentity={setIdentity} />
      ) : null}
      {identity === "teacher" ? (
        <TeacherForm setIdentity={setIdentity} />
      ) : null}
    </SafeAreaView>
  );
};
const StudentForm = ({ setIdentity }) => {
  return (
    <View className="flex-1 items-center justify-center w-[90%]">
      <Text className="color-slate-50 text-3xl">I am a Student</Text>
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Name"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Class"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Preffered Language"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Location"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Phone Number"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Email"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Password"
      />

      <TouchableHighlight
        className="mt-4 bg-slate-300 w-[80%] p-2"
        onPress={() => {
          setIdentity("teacher");
        }}
      >
        <Text className="text-2xl text-center">Create Account</Text>
      </TouchableHighlight>
      <Button
        title="Go back"
        onPress={() => {
          setIdentity(null);
        }}
      />
    </View>
  );
};
const TeacherForm = ({ setIdentity }) => {
  return (
    <View className="flex-1 items-center justify-center w-[90%]">
      <Text className="color-slate-50 text-3xl">I am a Teacher</Text>
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Name"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Skill"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Preffered Language"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Location"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Phone Number"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Email"
      />
      <TextInput
        className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
        placeholder="Password"
      />

      <TouchableHighlight
        className="mt-4 bg-slate-300 w-[80%] p-2"
        onPress={() => {
          setIdentity("teacher");
        }}
      >
        <Text className="text-2xl text-center">Create Account</Text>
      </TouchableHighlight>
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
