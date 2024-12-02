import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";
import VerticalCard from "../components/VerticalCard";

const { width: screenWidth } = Dimensions.get("window");

const StudentRequests = () => {
  const [requests, setRequests] = React.useState([]);
  const [currentRequest, setCurrentRequest] = React.useState(null);
  const [currentPopUp, setCurrentPopUp] = React.useState(null);

  React.useEffect(() => {
    const getRequests = async () => {
      try {
        const studentInfo = await AsyncStorage.getItem("userData");
        const studentId = JSON.parse(studentInfo)._id;
        const response = await fetch(
          `${config.BackendServer}/student/getStudentRequests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentId: studentId }),
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
    <View className="flex h-screen justify-center bg-background">
      <View className="h-[25vh] justify-center p-5">
        <Text className="text-2xl color-text  font-heading">
          Education is the key to unlock
        </Text>
        <Text className="text-3xl tracking-tighter font-heading color-primary">
          the golden door of freedom
        </Text>
      </View>
      <View className="flex-1 justify-center mx-auto ">
        <FlatList
          data={requests}
          renderItem={({ item }) => (
            <RequestSingle
              topicName={item.name}
              language={item.langauge}
              status={item.status}
              dateMade={item.date}
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
      </View>
      {currentRequest ? (
        <TeacherPopUp
          request={currentRequest}
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
  language = "Punjabi",
  status = "Pending",
  moreDetailsEvent = () => {},
  feedbackEvent = () => {},
}) => {
  const requestText = {
    Available: "Yet to be accepted",
    Accepted: "Your request was accepted",
    InProgress: "Request in Progress",
    Completed: "Request Completed",
    Rejected: "Request Rejected",
    Deleted: "Request Deleted",
  };
  const StatusElement = () => {
    const moreDetailButton = (text, event) => {
      return (
        <TouchableHighlight
          className="bg-secondary p-2 mt-3 mb-2 rounded-lg w-[90%]"
          onPress={() => {
            event();
          }}
        >
          <Text className="text-2xl text-center bold text-text">
            {text ? text : "More Details"}
          </Text>
        </TouchableHighlight>
      );
    };

    switch (status) {
      case "Available":
        return <></>;
      case "Accepted":
        return moreDetailButton("View Teacher", moreDetailsEvent);
      case "InProgress":
        return moreDetailButton("View Teacher", moreDetailsEvent);
      case "Completed":
        return moreDetailButton("Give Feedback", feedbackEvent);
      default:
        return <></>;
    }
  };

  return (
    <View className="p-3  w-[100vw] rounded-lg">
      <VerticalCard
        title={topicName}
        subTitle={`${requestText[status]}`}
        header1={dateMade}
        header2={language}
        component1={<StatusElement />}
      />
    </View>
  );
};

const TeacherPopUp = ({ request, ignoreEvent = () => {} }) => {
  const [teacherInfo, setTeacherInfo] = React.useState({
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
  const [requestConfirmed, setRequestConfirmed] = React.useState(false);

  const getTeacherInfo = async (teacherId) => {
    try {
      const response = await fetch(
        `${config.BackendServer}/teacher/getTeacherInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherId }),
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
      if (requestInfo.status != "Accepted") {
        setRequestConfirmed(true);
      }
    }

    const handleTeacherInfo = async (teacherId) => {
      const teacherInfo = await getTeacherInfo(teacherId);
      setTeacherInfo(teacherInfo);
    };
    handleTeacherInfo(requestInfo.teacher);
  }, [requestConfirmed]);

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
            newStatus: "InProgress",
          }),
        }
      );
      console.log(request._id);
      const data = await response.json();
      console.log(data);
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
        <View className="flex flex-row justify-between my-1 ">
          <Text className="text-text">{requestInfo.field}</Text>
          <Text className="text-text">{requestInfo.date}</Text>
        </View>

        <View className="bg-primary p-2 rounded-sm">
          <Text className="text-xl text-center mt-2 text-background">
            Accepted by
          </Text>
          <Text className="text-2xl text-center font-semibold text-background ">
            {teacherInfo.name}
          </Text>
          <Text className="text-xl text-center  mt-3">Contact them at</Text>

          {requestConfirmed ? (
            <Text className="text-xl text-center font-semibold color-blue-700">
              {teacherInfo.phoneNumber}
            </Text>
          ) : (
            <View className="bg-secondary rounded-lg p-2 mt-4 mx-3">
              <Text className="text-lg text-center font-semibold">
                Confirm Request to view Phone
              </Text>
            </View>
          )}

          <Text className="text-xl text-center  mt-3">
            Kindly do all interactions with respect and show humanity
          </Text>
        </View>

        <View className="flex justify-between">
          {requestConfirmed ? (
            <></>
          ) : (
            <TouchableOpacity
              className="bg-success p-2 mt-4 rounded-lg flex flex-row justify-center"
              onPress={() => {
                confirmRequest();
                setRequestConfirmed(true);
              }}
            >
              <Text className="text-2xl font-semibold color-background">
                Confirm Request
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
export default StudentRequests;

const styles = StyleSheet.create({});
