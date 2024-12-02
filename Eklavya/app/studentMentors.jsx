import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const StudentMentors = () => {
  return (
    <ScrollView className="w-full h-screen bg-country-lightbrown">
      <View className="w-full flex justify-center items-center mt-3">
        <TeacherSingle />
        <TeacherSingle />
        <TeacherSingle />
        <TeacherSingle />
        <TeacherSingle />
      </View>
    </ScrollView>
  );
};

const TeacherSingle = ({
  studentName = "Test Student",
  studentLocation = "Test Location",
}) => {
  return (
    <TouchableOpacity className="w-[90vw]">
      <View className="flex flex-row justify-between p-5 bg-country-lightyellow mt-3 items-center rounded-xl">
        <View className="flex flex-row items-center">
          <View className="rounded-full bg-slate-50 h-16 w-16" />
          <Text className="text-2xl ml-2 font-semibold color-slate-700">
            Mentor Name
          </Text>
        </View>
        <Text className="text-xl color-slate-700">Topic Name</Text>
      </View>
    </TouchableOpacity>
  );
};
export default StudentMentors;

const styles = StyleSheet.create({});
