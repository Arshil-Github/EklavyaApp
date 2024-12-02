import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import config from "../config";
import { useRouter } from "expo-router";
import VerticalCard from "../components/VerticalCard";

const { width: screenWidth } = Dimensions.get("window");

const TeacherStudent = () => {
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await fetch(
          `${config.BackendServer}/teacher/getAllRequests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ teacherId: "6742b2b073be5a861bbca3bd" }),
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
    <View className=" flex h-screen justify-center bg-background">
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
          <TopicRequestSingle
            requestInfo={item}
            moreDetailsEvent={() => {
              setCurrentRequest(item);
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
        <ConfirmPopUp
          request={currentRequest}
          ignoreEvent={() => {
            setCurrentRequest(null);
          }}
          router={router}
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
const TopicRequestSingle = ({ requestInfo, moreDetailsEvent = () => {} }) => {
  const requestText = {
    Available: "Request Available",
    Accepted: "You accepted this request",
    InProgress: "Request in Progress",
    Completed: "Request Completed",
    Rejected: "Request Rejected",
    Deleted: "Request Deleted",
  };
  const MoreInfoButton = () => {
    if (requestInfo.status == "InProgress") {
      return (
        <TouchableHighlight
          className="bg-secondary p-2 mt-3 mb-2 rounded-lg w-[90%]"
          onPress={() => {
            moreDetailsEvent();
          }}
        >
          <Text className="text-2xl text-center bold text-text">
            Mark as Done
          </Text>
        </TouchableHighlight>
      );
    }
  };
  return (
    <View className=" p-3  w-[100vw] rounded-lg">
      <VerticalCard
        title={requestInfo.name}
        subTitle={requestText[requestInfo.status]}
        header1={requestInfo.date}
        header2={requestInfo.language}
        footer1={requestInfo.region}
        component1={<MoreInfoButton />}
      />
    </View>
  );
};

const ConfirmPopUp = ({ request, ignoreEvent = () => {}, router }) => {
  const [student, setStudentInfo] = React.useState({
    name: "Anant",
    location: "Hyderabad",
    phoneNumber: "1234567890",
  });

  const [requestInfo, setRequestInfo] = React.useState({
    name: "Test Topic",
    date: "23 November 2024",
    studentLocation: "Hyderabad",
    status: "Pending",
  });
  const [requestCompleted, setRequestCompleted] = React.useState(false);

  const getStudentInfo = async (studentId) => {
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
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  React.useEffect(() => {
    const requestInfo = request;
    if (requestInfo) {
      setRequestInfo(requestInfo);
      if (requestInfo.status == "Completed") {
        setRequestCompleted(true);
      }
    }

    const handleStudentInfo = async (id) => {
      const studentInfo = await getStudentInfo(id);
      setStudentInfo(studentInfo);
    };
    handleStudentInfo(requestInfo.student);
  }, [requestCompleted]);

  const confirmRequest = async () => {
    try {
      const response = await fetch(
        `${config.BackendServer}/request/updateRequest`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestId: request._id,
            newStatus: "Completed",
          }),
        }
      );
      const data = await response.json();
    } catch (e) {
      console.log(e);
      alert("Error Confirming Request");
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
          <Text className="text-text">{requestInfo.field}</Text>
          <Text className="text-text">{requestInfo.date}</Text>
        </View>

        <View className="bg-primary p-2 rounded-sm">
          <Text className="text-3xl text-center mt-2 text-background">
            Accepted
          </Text>

          <Text className="text-xl text-center  mt-3">
            Please click the button below if you have completed the reques
          </Text>
        </View>

        <View className="flex justify-between">
          {requestCompleted ? (
            <View>
              <Text className="text-xl text-center color-blue-700 my-2">
                Request Completed?
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              className="bg-success p-2 mt-4 rounded-lg flex flex-row justify-center"
              onPress={() => {
                confirmRequest();
                router.navigate("/teacherHome");
              }}
            >
              <Text className="text-2xl font-semibold color-background">
                Mark as Done
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            className="bg-error p-2 mt-4 rounded-lg flex flex-row justify-center"
            onPress={ignoreEvent}
          >
            <Text className="text-2xl font-semibold color-background">
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TeacherStudent;

const styles = StyleSheet.create({});
