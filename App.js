import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as SQLite from "expo-sqlite";

const countries = [
  "Argentina",
  "Australia",
  "Brazil",
  "Canada",
  "China",
  "Egypt",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Mexico",
  "Nigeria",
  "Russia",
  "South Africa",
  "Spain",
  "United Kingdom",
  "United States",
  "Vietnam",
];

const cities = [
  "Buenos Aires",
  "Sydney",
  "Rio de Janeiro",
  "Toronto",
  "Shanghai",
  "Cairo",
  "Paris",
  "Berlin",
  "Mumbai",
  "Jakarta",
  "Rome",
  "Tokyo",
  "Mexico City",
  "Lagos",
  "Moscow",
  "Cape Town",
  "Madrid",
  "London",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "San Francisco",
  "Miami",
  "Dallas",
  "Philadelphia",
  "Phoenix",
  "San Antonio",
  "San Diego",
  "San Jose",
  "Atlanta",
  "Boston",
  "Seattle",
  "Denver",
  "Washington D.C.",
  "Minneapolis",
  "Detroit",
  "Jacksonville",
  "Indianapolis",
  "Columbus",
  "Fort Worth",
  "Charlotte",
  "San Antonio",
  "El Paso",
  "Memphis",
];

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    anonymous: false,
    name: "",
    city: "",
    country: "",
    email: "",
    phone: "",
    area: "",
    equipment: "",
    description: "",
    photos: "",
  });
  const [data, setData] = useState([]);
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setFormData({ ...formData, anonymous: !formData.anonymous });
    setAnonymous(!anonymous);
  };

  const saveData = async () => {
    const updatedData = [...data, formData];
    console.log(updatedData);
    setData(updatedData);
    await AsyncStorage.setItem("formData", JSON.stringify(updatedData));
    toggleModal();
    Alert.alert(
      "Success!",
      "Data saved successfully.",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );
    clearData();
  };

  const clearData = () => {
    setFormData({
      anonymous: false,
      name: "",
      city: "",
      country: "",
      email: "",
      phone: "",
      area: "",
      equipment: "",
      description: "",
      photos: "",
    });
  };

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem("formData");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (error) {
      console.log("Error loading data", error);
    }
  };

  return (
    <View className="flex-1 items-center bg-white pt-5">
      <Image
        source={{
          uri: "https://cdn.futura-sciences.com/cdn-cgi/image/width=1520,quality=50,format=auto/sources/images/data-analyst-data-scientist-formation-metier.jpeg",
        }}
        className="w-full h-52"
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="items-center mt-8 m-3">
          <Text className="text-center text-xl font-bold">
            Hello. Welcome to the Robotics, Software, and Al Technical Adverse
            Incidents Reporting System (TechAIRS) for reporting unusual events
            from a robot, software or artificial intelligence system during
            military work in a NATO country.
          </Text>
          <TouchableOpacity
            onPress={toggleModal}
            className="bg-green-900 py-6  m-1 px-16 rounded-full"
          >
            <Text className="text-white font-semibold text-xl text-center">
              Send a raport
            </Text>
          </TouchableOpacity>

          <View className=" ">
            <Text className=" text-gray-500 mt-4">
              This is a beta but functional version of the system.
            </Text>
            <Text className=" text-gray-500 mt-4">
              The purpose of TechAIRS is to receive data on these unusual/
              unexpected events, in order to understand and ultimately inform
              corrections to these systems and operational decision-making.
            </Text>
            <Text className=" text-gray-500 mt-4">
              The system is encrypted for all responses:
            </Text>
            <Text className=" text-gray-500 mt-4">
              - For all responses, we use HTTPS to protect the data in transit
            </Text>
            <Text className=" text-gray-500 mt-4">
              - Everything is stored on a secure server, encrypted at rest
            </Text>
            <Text className=" text-gray-500 mt-4">
              - Even though everything is encrypted, you can also choose to
              remain anonymous.
            </Text>
            <Text className=" text-gray-500 mt-4">
              Thank you very much for your participation. We hope to be able to
              save lives with this information.
            </Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        onRequestClose={toggleModal}
        animationType="slide"
      >
        <View className="flex-1 bg-white p-5">
          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <View className="mb-4">
              <Text className="text-gray-800 font-semibold">
                Would you like this to be anonymous?
              </Text>
              <TouchableOpacity
                onPress={handleCheckboxChange}
                className={`bg-gray-200 text-black py-4 px-4 rounded-full mt-2 ${
                  anonymous ? "bg-green-900 text-white" : ""
                }`}
              >
                <Text
                  className={`text-center font-semibold text-black ${
                    anonymous ? " text-white" : ""
                  }`}
                >
                  {formData.anonymous ? "Not Anonymous" : "Anonymous"}
                </Text>
              </TouchableOpacity>
            </View>
            {!anonymous ? (
              <>
                <Text className="font-semibold text-gray-800 mb-2">Name</Text>
                <TextInput
                  placeholder="Name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  className="rounded-full bg-gray-100 p-3 mb-4"
                />
                <Text className="font-semibold text-gray-800 mb-2">City</Text>
                <View className="rounded-full bg-gray-100 mb-4">
                  <Picker
                    selectedValue={formData.city}
                    onValueChange={(itemValue) =>
                      handleInputChange("city", itemValue)
                    }
                  >
                    {cities.map((city, index) => (
                      <Picker.Item key={index} label={city} value={city} />
                    ))}
                  </Picker>
                </View>
                <Text className="font-semibold text-gray-800 mb-2">
                  Country
                </Text>
                <View className="rounded-full bg-gray-100 mb-4">
                  <Picker
                    selectedValue={formData.country}
                    onValueChange={(itemValue) =>
                      handleInputChange("country", itemValue)
                    }
                  >
                    {countries.map((country, index) => (
                      <Picker.Item
                        key={index}
                        label={country}
                        value={country}
                      />
                    ))}
                  </Picker>
                </View>
                <Text className="font-semibold text-gray-800 mb-2">Email</Text>
                <TextInput
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                  className="rounded-full bg-gray-100 p-3 mb-4"
                />
                <Text className="font-semibold text-gray-800 mb-2">Phone</Text>
                <TextInput
                  placeholder="Phone"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange("phone", text)}
                  className="rounded-full bg-gray-100 p-3 mb-4"
                />
              </>
            ) : null}
            <Text className="font-semibold text-gray-800 mb-2">Area</Text>
            <TextInput
              placeholder="Area"
              value={formData.area}
              onChangeText={(text) => handleInputChange("area", text)}
              className="rounded-full bg-gray-100 p-3 mb-4"
            />
            <Text className="font-semibold text-gray-800 mb-2">
              Equipment or System
            </Text>
            <TextInput
              placeholder="Equipment or System"
              value={formData.equipment}
              onChangeText={(text) => handleInputChange("equipment", text)}
              className="rounded-full bg-gray-100 p-3 mb-4"
            />
            <Text className="font-semibold text-gray-800 mb-2">
              Description
            </Text>
            <TextInput
              placeholder="Description"
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              className="rounded-full bg-gray-100 p-3 mb-4"
            />
            <Text className="font-semibold text-gray-800 mb-2">
              Upload Photos or Videos
            </Text>
            <TextInput
              placeholder="Upload Photos or Videos"
              value={formData.photos}
              onChangeText={(text) => handleInputChange("photos", text)}
              className="rounded-full bg-gray-100 p-3 mb-4"
            />

            <View className="flex-row gap-3 justify-center">
              <TouchableOpacity
                onPress={toggleModal}
                className="py-4 px-8 rounded-full border-2 border-green-900"
              >
                <Text className="text-green-900 text-center font-semibold">
                  Return
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveData}
                className="bg-green-900 py-4 px-8 rounded-full"
              >
                <Text className="text-white text-center font-semibold">
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

App.defaultProps = {
  anonymous: false,
};
