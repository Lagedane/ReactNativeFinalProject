import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import LoadingForReact from "./LoadingForReact";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../styles/color";
import styles from "./HomeScreenStyles";
import Slider from "@react-native-community/slider";
import { updateFocusTime } from "../../../services/product-service";
import ModalLogOutScreen from "./ModalLogOutScreen";
import DropDown from "./DropDown/DropDown";
import { playSound, stopSound } from "../../components/musicFunction";

const TimerScreen = (): React.JSX.Element => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const [showLoader, setShowLoader] = useState(false);
  const [cancel, setCancel] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalLogout, setShowModalLogout] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [selectedMusic, setSelectedMusic] = useState<string | null>("Rain");
  const [onPlay, setOnPlay] = useState<boolean>(false);
  const [toggleMusic, setToggleMusic] = useState<boolean>(false);
  const [timeCount, setTimeCount] = useState<number>(0);
  const [time, setTime] = useState<number>(1);
  const [value, setValue] = useState<number>(1);

  const { data, index } = route.params;

  const countDown = (remainingTime: number) => {
    setTimeCount(remainingTime);

    if (remainingTime === time * 60) {
      setCancel(false);
    } else if (remainingTime > time * 60 - 5) {
      setCancel(true);
    } else {
      setCancel(false);
    }
  };

  const onTimeOut = async () => {
    setShowModalSuccess(true);
    const times = time * 60;
    await updateFocusTime(times, index);
  };

  const handleAction = async () => {
    if (!showLoader && time === 0) {
      setShowModal(true);
      return setShowLoader((prev) => prev);
    } else if (showLoader && timeCount > 0 && !cancel) {
      setShowModal(true);
      const timesSec = time * 60 - timeCount;

      if (timesSec >= 60) {
        const timeMin = timesSec / 60;
        const times = Math.floor(timeMin) * 60;
        await updateFocusTime(times, index);
      }
    }
    setShowLoader((prev) => !prev);
  };

  const onChangeModal = (modal: boolean) => {
    setShowModalLogout(modal);
  };

  const handleDropdownChange = (value: string | null) => {
    if (value!==selectedMusic) {
      stopSound()
      playSound(value)
      setSelectedMusic(value);
    }
  };

  const handlePlayStopButton = () => {
    setOnPlay(!onPlay);
    if (!onPlay) {
      playSound(selectedMusic);
    }else{
      stopSound()
    }
  };

  const formattedTime = `${Math.floor((time * 60 - timeCount) / 60)
    .toString()
    .padStart(2, "0")}:${((time * 60 - timeCount) % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <LinearGradient
      colors={[
        colors.backgroundSecondary,
        colors.backgroundSecondary,
        colors.primary,
        colors.primary,
      ]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.scrollView}>
        <View style={styles.logoContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              stopSound()
              navigation.goBack()
            }}
          >
            <Ionicons name="chevron-back" size={40} color={colors.background} />
          </TouchableOpacity>
          <Text style={styles.title}>{data.title}</Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 25 }}
            onPress={async () => setShowModalLogout(true)}
          >
            <Ionicons
              name="person-circle-outline"
              size={45}
              color={colors.background}
            />
            <ModalLogOutScreen
              showModal={showModalLogout}
              onChangeModal={onChangeModal}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.content, { paddingBottom: 60 }]}>
          {/* {showLoader ? ( */}
          <LoadingForReact
            key={time.toString()} // บังคับให้ React รู้ว่าเป็นคอมโพเนนต์ใหม่เมื่อ time เปลี่ยนแปลง
            timing={time}
            onStart={showLoader}
            onTimeOut={onTimeOut}
            setTimeDown={countDown}
          />
          {/* ) : (
            <View></View>
          )} */}

          <Slider
            value={value}
            onValueChange={(val: number) => {
              setValue(val);
              setTime(val);
            }}
            minimumValue={0}
            maximumValue={180}
            step={5}
            minimumTrackTintColor="#4A6CF7" // Left side track color
            maximumTrackTintColor="#3E5AA9" // Right side track color
            thumbTintColor="#3E5AA9" // Thumb color
            style={{
              width: 300,
              height: 40,
              marginTop: 20,
            }}
            disabled={showLoader ? true : false}
          />

          <TouchableOpacity onPress={handleAction} style={styles.actionButton}>
            <Text style={{ color: colors.background, fontWeight: "bold" }}>
              {!showLoader ? "Start" : cancel ? "Cancel" : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.circleCenter}>
        <TouchableOpacity
          style={styles.circleMusic}
          onPress={() => setToggleMusic(!toggleMusic)}
        >
          <Ionicons name="musical-note" size={60} color={"#576CAA"} />
        </TouchableOpacity>

        <View
          style={[
            styles.musicPopUp,
            { display: toggleMusic ? "flex" : "none" },
          ]}
        >
          <View>
            <DropDown onValueChange={handleDropdownChange} dropDownType={2} />
          </View>
          <View style={styles.directionButton}>
            <TouchableOpacity
              style={[
                styles.buttonAction,
                { backgroundColor: colors.background },
              ]}
              onPress={handlePlayStopButton}
            >
              <Text style={{ color: colors.secondary, fontWeight: "bold" }}>
                {onPlay ? "Stop" : "Play"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonAction,
                { backgroundColor: colors.backgroundSecondary },
              ]}
              onPress={() => setToggleMusic(false)}
            >
              <Text style={{ color: colors.background, fontWeight: "bold" }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.textHeader}>
              {timeCount > 0 ? "Unfortunately!" : "Caution!"}
            </Text>
            <Text style={styles.textSub}>
              {timeCount > 0
                ? `You didn't reach your goal today \nTotal focused time: ${formattedTime} min`
                : `You didn't entered the time \nPlaease enter the time before starting`}
            </Text>
            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={() => {
                setShowModal(!showModal);
                if (timeCount > 0)
                  navigation.navigate("Home", { timeData: timeCount });
              }}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalSuccess}
        onRequestClose={() => setShowModalSuccess(!showModalSuccess)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.textHeader}>Congratulations!</Text>
            <Text
              style={styles.textSub}
            >{`You did well today, keep it up \nTotal focused time: ${time} min`}</Text>
            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={() => {
                setShowModalSuccess(!showModalSuccess);
                navigation.navigate("Home", { timeData: timeCount });
              }}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default TimerScreen;

function formatTime(arg0: number) {
  throw new Error("Function not implemented.");
}
