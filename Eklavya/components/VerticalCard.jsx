import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BookIcon from "../assets/world-book-day.png";

const VerticalCard = ({
  title = "",
  subTitle = "",
  header1 = "",
  header2 = "",
  footer1 = "",
  footer2 = "",
  className = "",
  component1 = null,
  component2 = null,
}) => {
  return (
    <View className={"w-[100vw] px-3 items-center " + className}>
      <View
        className="bg-background rounded-2xl h-[50vh] w-[75%] px-4 py-3 items-center flex justify-between border-4 border-accent"
        style={{
          shadowColor: "rgb(12, 14, 6)",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 8, // Android shadow
        }}
      >
        <View className="flex flex-row w-full justify-between ">
          <Text className="color-text font-text text-lg">{header1} </Text>
          <Text className="color-text font-text text-lg">{header2} </Text>
        </View>
        {/* 
        <View className="w-[23vh] h-[23vh] bg-primary rounded-2xl shadow-md shadow-black my-4" /> */}

        <Image source={BookIcon} className="w-[17vh] h-[17vh] mt-5" />
        <View>
          <Text className="color-primary font-text font-semibold tracking-tighter text-2xl font-heading">
            {title}
          </Text>
        </View>
        {component1 ? component1 : <></>}
        {component2 ? component2 : <></>}

        <Text className="color-text font-text text-xl">{subTitle} </Text>
        <View className="flex flex-row w-full justify-between">
          <Text className="color-text font-text">{footer1} </Text>
          <Text className="color-text font-text text-lg ">{footer2} </Text>
        </View>
      </View>
    </View>
  );
};
export default VerticalCard;
