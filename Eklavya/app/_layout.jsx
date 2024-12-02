import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import "../global.css";
import { verifyInstallation } from "nativewind";
import { useTailwind } from "nativewind";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config"; // Adjust path as needed

const fullConfig = resolveConfig(tailwindConfig);
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="teachersHome"
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Stack.Screen
        name="studentHome"
        options={{ headerShown: false, headerTitle: "Home" }}
      />
      <Stack.Screen
        name="signIn"
        options={{
          headerShown: false,
          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen name="createAccount" options={{ headerShown: false }} />

      <Stack.Screen
        name="teachersleaderboard"
        options={{
          headerTitle: "Leaderboard",
          headerStyle: {
            backgroundColor: fullConfig.theme.colors.secondary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="teacherStudents"
        options={{
          headerTitle: "My Students",
          headerStyle: {
            backgroundColor: fullConfig.theme.colors.secondary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="createRequest"
        options={{
          headerTitle: "New Request",
          headerStyle: {
            backgroundColor: fullConfig.theme.colors.secondary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="studentMentors"
        options={{
          headerTitle: "My Mentors",
          headerStyle: {
            backgroundColor: fullConfig.theme.colors.secondary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="studentRequests"
        options={{
          headerTitle: "My Requests",
          headerStyle: {
            backgroundColor: fullConfig.theme.colors.secondary,
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
          headerTitle: "Available Requests",
          headerStyle: {
            backgroundColor: fullConfig.theme.colors.secondary,
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
