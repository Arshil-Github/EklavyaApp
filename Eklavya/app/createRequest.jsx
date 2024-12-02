import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BodySection1 from "../components/bodySection1";
import { tw } from "nativewind";
import VerticalCard from "../components/VerticalCard";

const SendRequest = async (info, router) => {
  if (info.name === "" || info.field === "") {
    alert("Please fill in all fields");
    return;
  }

  const student = JSON.parse(await AsyncStorage.getItem("userData"));
  const { name, field } = info;
  const requestInfo = {
    name: name,
    field: field,
    studentId: student._id,
  };
  console.log(requestInfo);

  try {
    const response = await fetch(
      `${config.BackendServer}/request/createRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestInfo),
      }
    );
    const data = await response.json();
    alert("Request Sent Successfully");
    router.push("/studentHome");
  } catch (e) {
    console.log(e);
    alert("Error Sending Information");
  }
};

const CreateRequest = () => {
  const router = useRouter();
  const requestInfo = {
    name: "",
    field: "",
  };
  const [getInfo, setGetInfo] = useState(null);
  useEffect(() => {
    const getInfo = async () => {
      const student = JSON.parse(await AsyncStorage.getItem("userData"));
      setGetInfo(student);
    };
    getInfo();
  }, []);

  return (
    <SafeAreaView className="flex h-screen justify-center bg-background">
      <View className="p-3 mb-10">
        <Text className="text-2xl color-text  font-heading">
          Asking for help is a sign of
        </Text>
        <Text className="text-3xl tracking-tighter font-heading color-primary">
          strength, not weakness
        </Text>
      </View>
      <View className=" flex-grow p-3 w-full  items-center">
        <View className="w-[100vw] px-3 items-center ">
          <View
            className="bg-background rounded-2xl h-[55vh] w-[85%] px-4 py-3 items-center flex justify-between border-4 border-accent"
            style={{
              shadowColor: "rgb(12, 14, 6)",
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 8, // Android shadow
            }}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              className="w-full"
            >
              <View className="w-full flex-1 items-center justify-between">
                <View className="w-full">
                  <TextInput
                    className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
                    placeholder="Title"
                    onChangeText={(text) => {
                      requestInfo.name = text;
                    }}
                    inputMode="text"
                  />
                  <TextInput
                    className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-xl mt-4 text-background py-2 border-2 border-primary"
                    placeholder="Field"
                    onChangeText={(text) => {
                      requestInfo.field = text;
                    }}
                    inputMode="text"
                  />
                </View>

                <View className="w-[23vh] h-[23vh] bg-primary rounded-2xl shadow-xl shadow-white" />
                <View className="flex flex-row w-full justify-between ">
                  <Text className="color-text font-text text-lg">
                    {new Date().toDateString()}
                  </Text>
                  <Text className="color-text font-text text-lg">
                    {getInfo ? getInfo.languages[0] : "Student"}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableHighlight
          className="mt-10 bg-accent w-[85%] p-3 rounded-xl"
          onPress={() => {
            SendRequest(requestInfo, router);
          }}
        >
          <Text className="text-2xl text-center font-semibold tracking-wider color-background">
            Make Request
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default CreateRequest;

const styles = StyleSheet.create({});
