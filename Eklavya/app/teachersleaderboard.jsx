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
import { useRouter } from "expo-router";
import NavigationBar from "../components/navigationBar";

const TeachersHome = () => {
  const router = useRouter();
  return <View></View>;
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
