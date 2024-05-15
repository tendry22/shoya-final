import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import BackNavs from "../Navs/BackNavs";

const DepotOrange = () => {
  const [montant, setMontant] = useState("");
  const navigation = useNavigation();

  const handleMinPress = () => {
    setMontant("25000");
  };

  const handleMontantChange = (text) => {
    if (text === "" || (parseInt(text) >= 1 && parseInt(text) <= 5000000)) {
      setMontant(text);
    }
  };

  const handleSubmit = () => {
    if (montant === "" || montant < 25000) {
      ToastAndroid.show("Veuillez vérifier les champs", ToastAndroid.SHORT);
    } else {
      Alert.alert(
        "Confirmation du dépôt Orange Money",
        `Voulez-vous continuer avec le montant ${
          montant ? parseInt(montant).toLocaleString() : ""
        } Ar ?`,
        [
          {
            text: "Annuler",
            style: "cancel",
          },
          {
            text: "Continuer",
            onPress: () => {
              navigation.navigate("Reussi", {});
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ alignSelf: "flex-start", marginTop: 13, marginLeft: 7 }}>
        <BackNavs />
      </View>
      <View style={styles.formCard}>
        <Text style={styles.texte}>Dépôt Orange Money</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Montant"
              keyboardType="numeric"
              placeholderTextColor="#999"
              value={montant}
              onChangeText={handleMontantChange}
            />
            <View style={styles.vw}>
              <Text style={styles.staticText}>Ariary</Text>
              <TouchableOpacity onPress={handleMinPress}>
                <Text style={styles.staticText1}>Min</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.minMaxContainer}>
                <View>
                  <Text style={styles.minMaxLabelText}>Minimum</Text>
                  <Text style={styles.minMaxLabelText}>Maximum</Text>
                </View>
                <View>
                  <Text style={styles.minMaxValueText}>25 000 Ar</Text>
                  <Text style={styles.minMaxValueText}>5 000 000 Ar</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={handleSubmit}>
              <LinearGradient
                colors={["#16DAAC", "#B6EA5C"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  alignSelf: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 4,
                  width: "80%", // Réduire la largeur du bouton ici
                  marginTop: 20,
                }}
              >
                <Text style={styles.buttonText}>Continuer</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  retourButton: {
    position: "absolute",
    top: 30,
    right: 20,
    padding: 10,
  },
  vw: {
    flexDirection: "row",
    position: "absolute",
    top: 12,
    right: 12,
  },
  staticText1: {
    color: "black",
    fontFamily: "OnestBold",
    fontSize: 14,
    marginLeft: 5,
  },
  texte: {
    fontSize: 28,
    marginBottom: 25,
    fontFamily: "OnestBold",
    color: "#B6EA5C",
    textAlign: "center",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 10,
  },
  staticText: {
    color: "gray",
    fontFamily: "OnestBold",
    fontSize: 14,
  },
  staticTextAddress: {
    color: "white",
    fontFamily: "OnestRegular",
    fontSize: 10,
    padding: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "white",
    borderWidth: 0.5,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 30,
    fontFamily: "OnestBold",
    color: "black",
    backgroundColor: "white",
  },
  text: {
    color: "white",
    fontFamily: "OnestRegular",
    fontSize: 11,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#FFEE00",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    width: "80%", // Réduire la largeur du bouton ici
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontFamily: "OnestBold",
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 16,
    marginTop: 15,
    borderBottomColor: "gray",
    paddingHorizontal: 8,
    borderColor: "#ccc",
  },
  selectButtonText: {
    flex: 1,
    color: "#ccc",
    fontFamily: "OnestBold",
    fontSize: 14,
  },
  icon: {
    width: 12,
    height: 12,
    marginLeft: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: "#16DAAC",
    fontFamily: "OnestBold",
    fontSize: 14,
    color: "white",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    borderRadius: 0,
    padding: 20,
    margin: 20,
    marginBottom: 0,
    width: "100%",
    flex: 1,
    maxHeight: 300,
  },
  cardHeader: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "OnestBold",
    color: "white",
  },
  optionCard: {
    backgroundColor: "lightgray",
    borderRadius: 8,
    marginBottom: 10,
  },
  minMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "100%",
    height: 40,
    marginTop: 10,
    borderColor: "gray",
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "rgba(109, 117, 136, 0)",
  },
  minMaxLabelText: {
    textAlign: "left",
    fontFamily: "OnestBold",
    color: "#B6EA5C",
    fontSize: 11,
  },
  minMaxValueText: {
    textAlign: "right",
    fontFamily: "OnestRegular",
    color: "#B6EA5C",
    fontSize: 11,
  },
  formCard: {
    width: "100%",
    height: 300,
    padding: 20,
    borderRadius: 10,
    marginTop: "30%",
  },
});

export default DepotOrange;
