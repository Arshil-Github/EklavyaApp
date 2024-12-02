import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

const TextInputCustom = ({ placeholder, onChangeText, inputMode }) => {
  return (
    <TextInput
      className="w-full min-h-[5vh] bg-slate-300 rounded-lg px-3 text-2xl mt-2 text-background py-2 border-2 border-primary"
      placeholder={placeholder}
      onChangeText={onChangeText}
      inputMode={inputMode}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
});

export default TextInputCustom;
