import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";
import NavigationBar from "../components/navigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerticalCard from "../components/VerticalCard";
import BodySection1 from "../components/bodySection1";
import PlusIcon from "../assets/plusIcon.png";

const { width: screenWidth } = Dimensions.get("window");

const StudentHome = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const getStudent = async () => {
      const student = JSON.parse(await AsyncStorage.getItem("userData"));
      setStudent(student.name);
    };
    getStudent();
  }, []);

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      className="h-full p-2 bg-secondary flex items-center"
    >
      <View className="w-full h-[25vh] p-3 mt-2">
        <View className="flex flex-row justify-between items-center p-2 ">
          <Text className="text-2xl color-text my-auto">
            Hello, {student ? student.split(" ")[0] : "Student"}
          </Text>
          <View className="w-16 h-16 bg-accent rounded-full" />
        </View>

        <View className="p-2">
          <Text className="text-2xl color-text  font-heading">
            An investment in knowledge
          </Text>
          <Text className="text-3xl tracking-tighter font-heading color-primary">
            pays the best interest
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
          { text: "New", path: "createRequest", image: PlusIcon },
          { text: "Requests", path: "studentRequests" },
        ]}
      />
    </SafeAreaView>
  );
};

export default StudentHome;

const styles = StyleSheet.create({});
