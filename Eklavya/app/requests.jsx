import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VerticalCard from "../components/VerticalCard";

const { width: screenWidth } = Dimensions.get("window");
const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await fetch(
          `${config.BackendServer}/request/getAllAvailableRequests`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setRequests(data);
      } catch (e) {
        console.log(e);
        alert("Error Fetching Requests");
      }
    };

    getRequests();
  }, []);
  return (
    <View className="flex h-screen justify-center bg-background ">
      <View className="h-[25vh] justify-center p-5">
        <Text className="text-2xl color-text  font-heading">
          Education is the key to unlock
        </Text>
        <Text className="text-3xl tracking-tighter font-heading color-primary">
          the golden door of freedom
        </Text>
      </View>
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <RequestSingle
            topicName={item.name}
            dateMade={item.date}
            studentId={item.student}
            language={item.langauge}
            studentLocation={item.region}
            status={item.status}
            acceptEvent={(sName) => {
              const newItem = item;
              newItem.student = sName;
              setCurrentRequest(newItem);
            }}
          />
        )}
        keyExtractor={(item) => item._id.toString()} // Ensure unique keys for each item
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Optional: Hide the horizontal scroll indicator
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate="fast"
      />
      {currentRequest ? (
        <AcceptRequestPopUp
          requestInfo={currentRequest}
          acceptEvent={async () => {
            try {
              const response = await fetch(
                `${config.BackendServer}/request/updateRequest`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    requestId: currentRequest._id,
                    newStatus: "Accepted",
                    teacherId: JSON.parse(
                      await AsyncStorage.getItem("userData")
                    )._id,
                  }),
                }
              );
              const data = await response.json();
              setCurrentRequest(null);
              alert("Request Accepted");
            } catch (e) {
              console.log(e);
              alert("Error Accepting Request");
            }
          }}
          ignoreEvent={() => {
            setCurrentRequest(null);
          }}
        />
      ) : (
        <></>
      )}
      <View className="absolute w-full h-full justify-center">
        <View className=" flex-row pl-6 pr-3 justify-between">
          <Text className="text-2xl text-text">{"<"}</Text>
          <Text className="text-2xl text-text">{">"}</Text>
        </View>
      </View>
    </View>
  );
};

const RequestSingle = ({
  topicName = "Test Topic",
  dateMade = "23 November 2024",
  studentId = "",
  language = "Punjabi",
  studentLocation = "Hyderabad",
  status = "Pending",
  acceptEvent = (sName) => {},
}) => {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const getStudent = async () => {
      const name = await getStudentName(studentId);
      setStudentName(name);
    };
    getStudent();
  }, []);

  const getStudentName = async (studentId) => {
    try {
      const response = await fetch(
        `${config.BackendServer}/student/getStudentInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId }),
        }
      );
      const data = await response.json();
      return data.name;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const AcceptButton = (text, event) => {
    return (
      <TouchableOpacity
        className="bg-secondary p-2 mt-3 mb-2 rounded-lg w-[90%]"
        onPress={() => {
          acceptEvent(studentName);
        }}
      >
        <Text className="text-2xl text-center bold text-text">Accept</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View className="p-3  w-[100vw] rounded-lg">
      <VerticalCard
        title={topicName}
        subTitle={`Request ${status}`}
        header1={dateMade}
        header2={language}
        component1={<AcceptButton />}
      />
    </View>
  );
};
const AcceptRequestPopUp = ({
  requestInfo,
  ignoreEvent = () => {},
  acceptEvent = () => {},
}) => {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const getStudent = async () => {
      const name = await getStudentName(studentId);
      setStudentName(name);
    };
    getStudent();
  }, []);

  const getStudentName = async (studentId) => {
    console.log(studentId);
    try {
      const response = await fetch(
        `${config.BackendServer}/student/getStudentInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId }),
        }
      );
      const data = await response.json();
      return data.name;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View className="absolute  h-full w-full flex-1 items-center justify-center z-10">
      <View className="absolute bg-black h-full w-full opacity-60" />

      <View className="bg-background p-5 rounded-lg w-[90%] border-2 border-accent">
        <Text className="text-3xl text-text font-bold py-2">
          {requestInfo.name}
        </Text>

        <View className="flex flex-row justify-between my-1">
          <Text className="text-text">{studentName}</Text>
          <Text className="text-text">{requestInfo.date}</Text>
        </View>
        <View className="bg-primary p-2 rounded-sm">
          <Text className="text-xl text-center mt-2 text-background">
            To be taught in
          </Text>
          <Text className="text-2xl text-center font-semibold text-background">
            {requestInfo.langauge}
          </Text>
          <Text className="text-xl   mt-5">
            Kindly do all interactions with respect and show humanity.
          </Text>
          <Text className="text-2xl text-center  mt-3">Happy Teaching!</Text>
        </View>
        <View className="flex justify-between">
          <TouchableOpacity
            className="bg-success p-2 mt-4 rounded-lg flex flex-row justify-center"
            onPress={acceptEvent}
          >
            <Text className="text-2xl font-semibold color-background">
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-error p-2 mt-4 rounded-lg flex flex-row justify-center"
            onPress={ignoreEvent}
          >
            <Text className="text-2xl font-semibold color-background">
              Ignore
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Requests;
