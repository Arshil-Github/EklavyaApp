import React, { useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropdownComponent() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); // Selected value
  const [items, setItems] = useState([
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-lg font-bold mb-4">Select an Option</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select an item"
        style={{ borderColor: "#d1d5db", borderRadius: 8 }} // Tailwind equivalent of border-gray-300 rounded-lg
        dropDownContainerStyle={{ borderColor: "#d1d5db" }} // Styling the dropdown
        textStyle={{ fontSize: 16 }} // Tailwind equivalent of text-base
        className="w-72" // Tailwind for width
      />
    </View>
  );
}
