import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CreateRequest = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="h-screen items-center justify-between bg-slate-800">
      <ScrollView className="w-full">
        <View className=" w-full flex-1 items-center justify-center">
          <TextInput
            className="w-[80%] bg-slate-200 p-2 text-lg mt-5"
            placeholder="Topic Name"
          />
          <TextInput
            className="w-[80%] bg-slate-200 p-2 text-lg mt-2"
            placeholder="Language"
          />
          <TextInput
            className="w-[80%] bg-slate-200 p-2 text-lg mt-2 h-[20vh]"
            placeholder="Additional Notes"
            multiline
            editable
            numberOfLines={4}
          />

          <TouchableHighlight
            className="mt-4 bg-slate-300 w-[60%] p-2"
            onPress={() => {
              router.push("/studentHome");
            }}
          >
            <Text className="text-lg text-center">Submit</Text>
          </TouchableHighlight>
        </View>

        <Button
          title="Not a member? Create an account"
          onPress={() => {
            router.push("/createAccount");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateRequest;

const styles = StyleSheet.create({});
