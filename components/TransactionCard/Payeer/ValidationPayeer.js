import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import BackNavs from "../../Navs/BackNavs";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ValidationPayeer = ({ route }) => {
  const { montant } = route.params;
  const navigation = useNavigation();
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes en secondes
  const circleScale = useRef(new Animated.Value(1)).current; // Animation pour la taille du cercle
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [recoursClicked, setRecoursClicked] = useState(false);

  const handleRecoursClick = () => {
    // Mettre à jour l'état lorsque le bouton "Recours" est cliqué
    setRecoursClicked(true);
  };

  const currentDate = moment().format("YYYY-MM-DD");

  const handleAnnuler = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setCountdownFinished(true); // Mettre à jour l'état lorsque le compte à rebours est terminé
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, "0"); // Formatage des minutes pour toujours avoir deux chiffres
  const seconds = (timeRemaining % 60).toString().padStart(2, "0"); // Formatage des secondes pour toujours avoir deux chiffres

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <BackNavs />
        <Text style={styles.texte}>En attente de validation</Text>
        <View
          style={{
            flexDirection: "row",
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "3%",
            marginBottom: "3%",
            marginRight: "3%",
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../../assets/timer.gif")}
          />
          <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
        </View>
        <View style={styles.viewInterieur}>
          <Text style={styles.texte1}>Retrait Payeer</Text>
          <View style={styles.minMaxContainer}>
            <View>
              <Text style={styles.minMaxLabelText}>Adresse</Text>
              <Text style={styles.minMaxLabelText}>Montant</Text>
              <Text style={styles.minMaxLabelText}>Numéro de l'ordre</Text>
              <View>
                <Text style={styles.minMaxLabelText}>Date de création</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.minMaxValueText}>
                  Ambinintsoak@gmail.com
                </Text>
                <Text style={styles.minMaxValueText}>{montant} USD</Text>
              </View>
              <View>
                <Text style={styles.minMaxValueText}>152135846</Text>
                <Text style={styles.minMaxValueText}>{currentDate}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "4%",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handleAnnuler}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={countdownFinished ? styles.button1 : styles.buttonDisabled}
            disabled={!countdownFinished}
            onPress={handleRecoursClick}
          >
            <Text
              style={
                countdownFinished
                  ? styles.buttonText
                  : styles.buttonTextDisabled
              }
            >
              Recours
            </Text>
          </TouchableOpacity>
        </View>
        {recoursClicked && countdownFinished && (
          <View style={styles.warningContainer}>
            <AntDesign
              name="infocirlce"
              size={14}
              color="#16daac"
              style={{ marginLeft: 8 }}
            />
            <Text style={styles.warningLabelText}>
              Demande transmise, veuiller patienter un moment
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontFamily: "OnestBold",
  },
  button: {
    backgroundColor: "#FFEE00",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "32%",
    marginTop: 20,
  },
  warningContainer: {
    marginTop: 15,
    width: "75%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.2,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 218, 172, 0.4)",
    justifyContent: "center",
  },
  warningLabelText: {
    fontFamily: "OnestBold",
    color: "white",
    fontSize: 10,
    paddingRight: 12,
    marginLeft: 8,
    marginRight: 8,
  },
  button1: {
    backgroundColor: "#FFEE00",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "32%",
    marginLeft: "10%",
    marginTop: 20,
  },
  minMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    marginBottom: "2%",
    width: "80%",
    height: 200,
    marginTop: "4%",
    borderColor: "gray",
    borderWidth: 0.2,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "rgba(109, 117, 136, 0.5)",
    alignSelf: "center",
  },
  minMaxLabelText: {
    textAlign: "left",
    fontFamily: "OnestBold",
    color: "whitesmoke",
    fontSize: 12,
    padding: 5,
  },
  minMaxValueText: {
    textAlign: "right",
    fontFamily: "OnestRegular",
    color: "whitesmoke",
    fontSize: 12,
    padding: 5,
  },
  texte: {
    fontSize: 25,
    fontFamily: "OnestBold",
    color: "#B6EA5C",
    textAlign: "center",
    marginTop: "38%",
  },
  texte1: {
    fontSize: 18,
    fontFamily: "OnestBold",
    color: "whitesmoke",
    borderWidth: 1,
    borderColor: "white",
    width: "40%",
    padding: 8,
    textAlign: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#181526",
    marginTop: "2%",
  },
  timerText: {
    fontSize: 16,
    fontFamily: "OnestBold",
    color: "white",
  },
  viewInterieur: {
    width: "95%",
    alignSelf: "center",
  },
  buttonDisabled: {
    backgroundColor: "#212128",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "32%",
    marginLeft: "10%",
    marginTop: 20,
  },
  buttonTextDisabled: {
    color: "gray",
    textAlign: "center",
    fontFamily: "OnestRegular",
    textDecorationLine: "line-through",
  },
});

export default ValidationPayeer;
