import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import homeIcon from "../assets/homeIcon.png";
import requestIcon from "../assets/topicIcon.png";
import mentorIcon from "../assets/mentorIconpng.png";
import { useRouter } from "expo-router";

const NavigationBar = ({ navObjects }) => {
  const router = useRouter();
  return (
    <View className="absolute bottom-5 w-[70vw] h-[8vh] flex-row bg-primary rounded-3xl  justify-between items-center ">
      {navObjects.map((navObject) => {
        return (
          <NavButton
            text={navObject.text}
            path={navObject.path}
            image={navObject.image}
          />
        );
      })}
    </View>
  );
};

const NavButton = ({ text, path, image = requestIcon }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="items-center flex justify-center h-full flex-grow px-5 "
      onPress={() => {
        router.push(path);
      }}
    >
      <Image source={image} className="w-8 h-8" />
      <Text className="color-background font-text text-md opacity-70">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({});
