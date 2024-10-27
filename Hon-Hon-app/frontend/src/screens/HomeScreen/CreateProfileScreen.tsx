import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./HomeScreenStyles";
import colors from "../../styles/color";
import { HomeScreenNavigationProp } from "../../types/types";
import BarChartDemo from "./BarChartDemo";
import DropDown from "./DropDown/DropDown";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { insertProfile } from "../../../services/product-service";
import ModalLogOutScreen from "./ModalLogOutScreen";

const HomeScreen = (): React.JSX.Element => {
  const formData = new FormData();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [titleText, setTitleText] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTypeBook, setSelectedTypeBook] = useState<string | null>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your gallery to proceed."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      const imageUri = result.assets[0].uri;

      // แปลง URI เป็น Blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new Error("Failed to load image"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", imageUri, true);
        xhr.send();
      });

      formData.append("image", blob, imageUri.split("/").pop());
    }
  };

  const handleDropdownChange = (value: string | null) => {
    setSelectedTypeBook(value);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      setErrorMessage("");

      // Validate title
      if (!titleText) {
        setErrorMessage("The title cannot be empty.");
        setAlertModalVisible(true);
        return;
      }
      formData.append("title", titleText);

      // Validate selected category
      if (!selectedTypeBook) {
        setErrorMessage("Please select a category.");
        setAlertModalVisible(true);
        return;
      }
      formData.append("category", selectedTypeBook);

      if (selectedImage) {
        // Handle selected image from picker
        const uriParts = selectedImage.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("image", {
          uri: selectedImage,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        console.log(selectedImage + " " + fileType);
      } else {
        const defaultImage = require("../../assets/images/default.jpg");
        formData.append("image", {
          uri: Image.resolveAssetSource(defaultImage).uri,
          name: `photo.jpeg`,
          type: `image/jpeg`,
        });

        console.log(Image.resolveAssetSource(defaultImage).uri);
      }

      // Submit the form
      await insertProfile(formData);
      setModalVisible(true);
    } catch (error: any) {
      console.error("Upload failed", error);
      const message = error.response?.data?.message || "Something went wrong.";
      Alert.alert("Upload Failed", message);
    }
  };

  const onChangeModal = (modal: boolean) => {
    setShowModal(modal);
  };

  return (
    <LinearGradient
      colors={[
        colors.backgroundSecondary,
        colors.backgroundSecondary,
        colors.primary,
        colors.primary,
      ]} // Gradient colors
      style={styles.container}
      start={{ x: 0, y: 0 }} // Gradient start point (top-left corner)
      end={{ x: 1, y: 1 }} // Gradient end point (bottom-right corner)
    >
      <View style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={navigation.goBack}
          >
            <Ionicons name="chevron-back" size={40} color={colors.background} />
          </TouchableOpacity>
          <Text style={styles.title}>Hon Hon</Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 25 }}
            onPress={async () => setShowModal(true)}
          >
            <Ionicons
              name="person-circle-outline"
              size={45}
              color={colors.background}
            />
            <ModalLogOutScreen
              showModal={showModal}
              onChangeModal={onChangeModal}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={{ width: "100%" }}>
            <View>
              <Text style={styles.contentTitle}>Create Profile</Text>
              <Text style={styles.subContentTitle}>
                Let's make your own profile
              </Text>
              <View style={{ marginTop: 30 }}>
                <View style={styles.centerButton}>
                  <TouchableOpacity
                    style={styles.selectImage}
                    onPress={pickImage}
                  >
                    {selectedImage ? (
                      <>
                        <Image
                          source={{ uri: selectedImage }}
                          style={styles.ImgShow}
                        />
                        <View
                          style={[
                            styles.selectImgText,
                            { backgroundColor: "rgba(155,153,156,0.8)" },
                          ]}
                        >
                          <Text style={[styles.textImag, { color: "white" }]}>
                            Select Image
                          </Text>
                        </View>
                      </>
                    ) : (
                      <View style={styles.selectImage}>
                        <Ionicons
                          name="camera-outline"
                          size={45}
                          color={colors.textSecondary}
                          style={{ marginTop: 30 }}
                        />
                        <View style={styles.selectImgText}>
                          <Text style={styles.textImag}>Select Image</Text>
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{ position: "relative" }}>
                  <TextInput
                    placeholder="Title"
                    style={styles.inputTitle}
                    keyboardType="default"
                    onChangeText={setTitleText}
                  />
                  <Ionicons
                    name="pencil"
                    size={20}
                    color={"#9B999C"}
                    style={{ position: "absolute", right: 20, top: 15 }}
                  />
                </View>

                <View style={{ width: "100%" }}>
                  <DropDown onValueChange={handleDropdownChange} dropDownType={1}/>
                </View>
              </View>
              <View style={styles.centerButton}>
                <TouchableOpacity
                  style={styles.buttonCreate}
                  onPress={handleSubmit}
                >
                  <Text style={styles.textButton}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.textHeader}>Successfully Created</Text>
            <Text style={styles.textSub}>
              Your profile has been added to Home
            </Text>
            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("Home", { timeData: titleText });
              }}
            >
              <Text style={styles.closeButtonText}>
                Back to <Ionicons name="home-outline" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={alertModalVisible}
        onRequestClose={() => setAlertModalVisible(!alertModalVisible)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.textHeader}>Warning!</Text>
            <Text style={styles.textSub}>{errorMessage}</Text>
            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={() => setAlertModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default HomeScreen;
