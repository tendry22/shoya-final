import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import BackNavs from "../components/Navs/BackNavs";
import { Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";

// #16DAAC
// #B6EA5C

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "#16DAAC",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#16DAAC",
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: "#16DAAC",
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: "#16DAAC",
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#16DAAC",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#16DAAC",
};

const labels = [
  { text: "Base", image: require("../assets/CommonAccount.png") },
  { text: "Silver", image: require("../assets/SilverAccount.gif") },
  { text: "Gold", image: require("../assets/GoldAccount.gif") },
  { text: "Platinum", image: require("../assets/PlatinumAccount.gif") },
  { text: "Diamond", image: require("../assets/DiamondAccount.gif") },
  { text: "Elite", image: require("../assets/EliteAccount.gif") },
];

const currentPosition = 2; // Change this to reflect the current step (0-based index)

const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
  return (
    <View style={styles.labelContainer}>
      <View style={styles.imageContainer}>
        <Image source={labels[position].image} style={styles.labelImage} />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.labelText,
            currentPosition === position && {
              color: customStyles.currentStepLabelColor,
            },
          ]}
        >
          {labels[position].text}
        </Text>
      </View>
    </View>
  );
};

const TypeDeCompte = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.screenContainer}>
        <BackNavs />

        <View style={styles.titleScreen}>
          <Text style={styles.titleText}>Niveaux de compte</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons
              name="information-circle-sharp"
              size={25}
              color={"#FFEE00"}
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.stepContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels.map((label) => label.text)} // StepIndicator still expects an array of strings here
            stepCount={labels.length}
            direction="vertical"
            renderLabel={renderLabel}
          />
        </View>
        <View style={styles.infoContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infoText}>Transactions totales: </Text>
            <Text style={styles.infoValue}>3 120 </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infoText}>Niveau actuel: </Text>
            <Text style={styles.infoValue}>Gold </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infoText}>Prochain niveau:</Text>
            <Text style={styles.infoValue}>Platinum</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.infoText}>Prochain niveau dans:</Text>
            <Text style={styles.infoValue}> 100 Transactions</Text>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: "15%",

                  height: "auto",
                  alignSelf: "flex-end",
                  marginTop: "4%",
                  marginRight: "4%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign name="closecircle" size={23} color={"#B6EA5C"} />
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View>
                  <Text style={styles.modalTitre}>Présentation</Text>
                  <Text style={styles.modalText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae dolores error placeat quos amet itaque obcaecati sunt
                    cum? Unde dolore pariatur exercitationem laboriosam omnis
                    amet in eos autem a error quam iusto nostrum eveniet
                    accusantium eaque tempora hic quod voluptate, totam ipsam.
                    Nesciunt dolores reiciendis provident nulla, nam modi
                    ducimus aut, laboriosam quis reprehenderit debitis
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalTitre}>Avantages</Text>
                  <Text style={styles.modalText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae dolores error placeat quos amet itaque obcaecati sunt
                    cum? Unde dolore pariatur exercitationem laboriosam omnis
                    amet in eos autem a error quam iusto nostrum eveniet
                    accusantium eaque tempora hic quod voluptate, totam ipsam.
                    Nesciunt dolores reiciendis provident nulla, nam modi
                    ducimus aut, laboriosam quis reprehenderit debitis
                  </Text>
                </View>
                <View>
                  <Text style={styles.modalTitre}>Comment ça fonctionne ?</Text>
                  <Text style={styles.modalTextFInal}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae dolores error placeat quos amet itaque obcaecati sunt
                    cum? Unde dolore pariatur exercitationem laboriosam omnis
                    amet in eos autem a error quam iusto nostrum eveniet
                    accusantium eaque tempora hic quod voluptate, totam ipsam.
                    Nesciunt dolores reiciendis provident nulla, nam modi
                    ducimus aut, laboriosam quis reprehenderit debitis
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default TypeDeCompte;

const styles = StyleSheet.create({
  screenContainer: {
    width: "95%",
    height: "85%",
    alignSelf: "center",
    marginTop: "7%",
  },
  infoText: {
    color: "#16DAAC",
    fontFamily: "OnestBold",
    fontSize: 11,
  },
  infoValue: {
    fontFamily: "OnestRegular",
    color: "#ccc",
    fontSize: 11,
  },
  titleScreen: {
    width: "75%",
    height: "8%",
    alignSelf: "center",
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleText: {
    color: "#B6EA5C",
    fontFamily: "OnestBold",
    fontSize: 18,
  },
  stepContainer: {
    width: "50%",
    height: "60%",
    marginTop: "4%",
    alignSelf: "center",
    justifyContent: "center",
  },
  infoContainer: {
    width: "85%",
    height: "auto",
    borderWidth: 0.2,
    borderColor: "white",
    alignSelf: "center",
    marginTop: "5%",
    borderRadius: 5,
    backgroundColor: "rgba(24, 21, 38, 0.8)",
    padding: "3%",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    padding: 5,
    marginBottom: 10,
    height: 70, // Uniform height for the label container
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
  },
  labelImage: {
    width: 80,
    height: 80,
    resizeMode: "contain", // This ensures the image maintains its aspect ratio
  },
  labelText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center", // Center align text within the container
    fontFamily: "OnestBold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "85%",
    backgroundColor: "#181526",
    borderRadius: 10,
    height: "75%",
    borderWidth: 0.5,
    borderColor: "white",
  },
  modalTitre: {
    fontFamily: "OnestBold",
    fontSize: 18,
    textAlign: "center",
    marginTop: "5%",
    color: "#B6EA5C",
  },
  modalText: {
    textAlign: "justify",

    width: "85%",
    alignSelf: "center",
    marginTop: "3%",
    padding: "2%",
    fontFamily: "OnestRegular",
    fontSize: 14,
    color: "whitesmoke",
  },
  modalTextFInal: {
    textAlign: "justify",

    width: "85%",
    alignSelf: "center",
    marginTop: "3%",
    padding: "2%",
    fontFamily: "OnestRegular",
    fontSize: 14,
    marginBottom: "7%",
    color: "whitesmoke",
  },
  buttonClose: {
    backgroundColor: "#ff0000",
  },
});
