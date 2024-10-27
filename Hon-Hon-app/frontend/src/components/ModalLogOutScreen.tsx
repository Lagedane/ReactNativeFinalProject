import { View, Text, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../screens/HomeScreen/HomeScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ModalLogOutScreen = ({showModal,onChangeModal}:{showModal:boolean,onChangeModal:Function}) => {
    const navigation = useNavigation<any>();
    const [showModals, setShowModals] = useState<boolean>(false);

    useEffect(()=>{
        setShowModals(showModal)
    },[showModal])
    
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModals}
      onRequestClose={() => setShowModals(!showModals)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.textHeader}>Log out!</Text>
          <Text
            style={styles.textSub}
          >{`You want to log out this account?`}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={async () => {
              await AsyncStorage.removeItem("@Username");
              onChangeModal(!showModals)
              setShowModals(!showModals);
              navigation.navigate("Welcome");
            }}
          >
            <Text style={styles.closeButtonText}>YES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
                onChangeModal(!showModals)
                setShowModals(!showModals);
            }}
          >
            <Text style={styles.closeButtonText}>NO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLogOutScreen;
