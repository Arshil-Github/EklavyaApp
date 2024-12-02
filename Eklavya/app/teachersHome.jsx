import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import NavigationBar from "../components/navigationBar";
import BodySection1 from "../components/bodySection1";
import VerticalCard from "../components/VerticalCard";
import ExploreIcon from "../assets/explore.png";
import LeaderboardIcon from "../assets/ranking.png";

const { width: screenWidth } = Dimensions.get("window");

const TeachersHome = () => {
  const router = useRouter();

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const getTeacher = async () => {
      const teacher = JSON.parse(await AsyncStorage.getItem("userData"));
      console.log(teacher);
      setTeacher(teacher.name);
    };
    getTeacher();
  }, []);

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      className="h-full p-2 bg-secondary flex items-center"
    >
      <View className="w-full h-[25vh] mt-2">
        <View className="flex flex-row justify-between items-center p-2">
          <Text className="text-2xl color-text ">
            Welcome, {teacher ? teacher.split(" ")[0] : "Teacher"}
          </Text>
          <View className="w-16 h-16 bg-primary rounded-full" />
        </View>

        <View className="p-2 mt-3">
          <Text className="text-2xl color-text  font-heading">
            Children learn more from who you
          </Text>
          <Text className="text-3xl tracking-tighter font-semibold color-accent">
            are than what you teach.
          </Text>
        </View>
      </View>

      <BodySection1>
        <ScrollView
          className="flex-1 "
          horizontal
          snapToInterval={screenWidth}
          snapToAlignment="center"
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          persistentScrollbar={false}
        >
          <VerticalCard
            title="Thermodynamics"
            subTitle="in Punjabi"
            header1="23 November"
            header2="Pending"
            className="mt-[4vh]"
          />
          <VerticalCard
            title="Thermodynamics"
            subTitle="in Punjabi"
            header1="23 November"
            header2="Pending"
            className="mt-[4vh]"
          />
          <VerticalCard
            title="Thermodynamics"
            subTitle="in Punjabi"
            header1="23 November"
            header2="Pending"
            className="mt-[4vh]"
          />
          <VerticalCard
            title="Thermodynamics"
            subTitle="in Punjabi"
            header1="23 November"
            header2="Pending"
            className="mt-[4vh]"
          />
        </ScrollView>
        <View className="absolute w-full h-full justify-center">
          <View className=" flex-row p-5 justify-between">
            <Text className="text-4xl text-text">{"<"}</Text>
            <Text className="text-4xl text-text">{">"}</Text>
          </View>
        </View>
      </BodySection1>

      <NavigationBar
        navObjects={[
          { text: "Explore", path: "requests", image: ExploreIcon },
          { text: "Requests", path: "teacherStudents" },
          {
            text: "Ranking",
            path: "teachersleaderboard",
            image: LeaderboardIcon,
          },
        ]}
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

export default TeachersHome;

const styles = StyleSheet.create({});
