import React from "react";
import { View } from "react-native";

const BodySection1 = ({ children }) => {
  return (
    <View className=" bg-background flex-1 h-[75vh] rounded-t-3xl py-5  w-[100vw]">
      {children}
    </View>
  );
};

export default BodySection1;
