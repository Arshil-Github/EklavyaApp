import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const TeachersHome = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="h-screen p-2 bg-slate-800">
      <Text className="color-slate-50 m-2 text-5xl tracking-tightest">
        Volunteer Teacher
      </Text>
      <View className=" p-2 m-3 bg-slate-600 min-h-[40vh]">
        <Text className="color-slate-50 text-2xl font-semibold">
          My Students
        </Text>
        <StudentSingle />
        <StudentSingle />
        <StudentSingle />
        <StudentSingle />
        <StudentSingle />
        <StudentSingle />
        <Button
          title="View All"
          onPress={() => {
            alert("View All Students");
          }}
        />
      </View>
      <View className="p-2 m-3 bg-slate-600 ">
        <Text className="color-slate-50 text-2xl font-semibold">
          Recomemded Request
        </Text>
        <RequestSingle />
        <Button
          title="View All"
          onPress={() => {
            router.push("/requests");
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const StudentSingle = ({
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
        <Text>by {studentName}</Text>
        <Text>{dateMade}</Text>
      </View>
      <Text className="text-xl text-center color-blue-700 my-2">
        To be taught in {language}
      </Text>
      <View className="flex flex-row justify-between mb-3">
        <Text>{studentLocation}</Text>
        <Text>{status}</Text>
      </View>
      <TouchableOpacity className="bg-red-200 p-2 rounded-md flex flex-row justify-center">
        <Text className="text-xl">Accept</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeachersHome;

const styles = StyleSheet.create({});
