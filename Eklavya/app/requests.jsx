import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const requests = [
  {
    topicName: "Thermodynamics",
    dateMade: "23 November 2024",
    studentName: "Anant",
    language: "Punjabi",
    studentLocation: "Hyderabad",
    status: "Pending",
  },
  {
    topicName: "Fluid Mechanics",
    dateMade: "22 November 2024",
    studentName: "Aarav",
    language: "Hindi",
    studentLocation: "Jaipur",
    status: "Completed",
  },
  {
    topicName: "Optics",
    dateMade: "20 November 2024",
    studentName: "Kavya",
    language: "Tamil",
    studentLocation: "Chennai",
    status: "In Progress",
  },
  {
    topicName: "Electromagnetism",
    dateMade: "19 November 2024",
    studentName: "Ishaan",
    language: "Kannada",
    studentLocation: "Bengaluru",
    status: "Pending",
  },
  {
    topicName: "Quantum Mechanics",
    dateMade: "21 November 2024",
    studentName: "Manya",
    language: "Marathi",
    studentLocation: "Pune",
    status: "Completed",
  },
  {
    topicName: "Organic Chemistry",
    dateMade: "18 November 2024",
    studentName: "Suhas",
    language: "Gujarati",
    studentLocation: "Ahmedabad",
    status: "In Progress",
  },
];
const Requests = () => {
  return (
    <SafeAreaView className="bg-slate-200 h-full ">
      <FlatList
        data={requests}
        renderItem={({ item }) => <RequestSingle {...item} />}
      />
    </SafeAreaView>
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

export default Requests;
