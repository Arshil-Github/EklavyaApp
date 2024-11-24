import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import "../global.css";
import { verifyInstallation } from "nativewind";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="teachersHome" options={{ headerShown: false }} />
      <Stack.Screen name="studentHome" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ headerShown: false }} />
      <Stack.Screen name="createAccount" options={{ headerShown: false }} />
      <Stack.Screen
        name="createRequest"
        options={{
          headerTitle: "Create Request",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="requests"
        options={{
          headerTitle: "Requests (Teachers)",
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
};

export default RootLayout;
