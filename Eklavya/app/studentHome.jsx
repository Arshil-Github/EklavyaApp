import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";

const StudentHome = () => {
  return (
    <SafeAreaView className="h-screen p-2 bg-slate-800">
      <Text className="color-slate-50 m-2 text-5xl tracking-tightest">
        Student Portal
      </Text>
      <ScrollView>
        <View className=" p-2 m-3 bg-slate-600 min-h-[40vh]">
          <Text className="color-slate-50 text-2xl font-semibold">
            Accepted Requests
          </Text>
          <TeacherSingle />
          <TeacherSingle />
          <TeacherSingle />
          <TeacherSingle />
          <TeacherSingle />
        </View>
        <View className="p-2 m-3 bg-slate-600 ">
          <Text className="color-slate-50 text-2xl font-semibold">
            Pending Requests
          </Text>
          <RequestSingle />
          <RequestSingle />
          <RequestSingle />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="p-2 m-3 bg-slate-600 "
        onPress={() => {
          router.push("/createRequest");
        }}
      >
        <Text className="color-slate-50 text-2xl font-semibold">
          New Request
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const TeacherSingle = ({
  studentName = "Test Student",
  studentLocation = "Test Location",
}) => {
  return (
    <TouchableHighlight>
      <View className="flex flex-row justify-between p-2 bg-white mt-3 items-center">
        <View className="flex flex-row items-center">
          <View className="rounded-full bg-red-200 h-10 w-10" />
          <Text className="text-lg ml-2">StudentName</Text>
        </View>
        <Text>Student Location</Text>
      </View>
    </TouchableHighlight>
  );
};

const RequestSingle = ({
  topicName = "Test Topic",
  dateMade = "23 November 2024",
  studentName = "Anant",
  language = "Punjabi",
  studentLocation = "Hyderabad",
  status = "Pending",
}) => {
  return (
    <View className="mx-5 my-2 p-2 bg-red-50">
      <Text className="text-4xl text-slate-800 font-bold">{topicName}</Text>
      <View className="flex flex-row justify-between my-1">
        <Text>in {language}</Text>
        <Text>{dateMade}</Text>
      </View>
      <TouchableOpacity className="bg-red-200 p-2 rounded-md flex flex-row justify-center">
        <Text className="text-xl">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};
export default StudentHome;

const styles = StyleSheet.create({});
