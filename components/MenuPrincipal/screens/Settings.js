import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image, Alert, Modal, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getExpoPushTokenAsync } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { BASE_URL } from "../../../config";
import { sendPushNotification } from "../notificationsUtils";
import bgImage from "../../../assets/images/bgImage.jpg";
import identity from "../../../assets/icons/identity.png";
import numero from "../../../assets/icons/numero.png";
import aide from "../../../assets/icons/aide.png";
import logout from "../../../assets/icons/logout.png";
import ProfileNav from "../../Navs/ProfileNav";
import global from "../../../assets/css/global";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Settings = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("non-verifie"); // 'verifie', 'non-verifie', 'en-cours'

  useEffect(() => {
    (async () => {
      try {
        const projectId = "da434518-0960-451b-834b-0a20a9ec1e31"; // Votre projet ID
        const token = (await getExpoPushTokenAsync({ projectId })).data;
        await AsyncStorage.setItem("userToken", token);
      } catch (error) {
        console.error("Erreur lors du stockage du jeton Expo de l'administrateur :", error);
      }
    })();
  }, []);

  const getVerificationStyles = () => {
    let textStyles = styles.verifie;
    let icon = "check";
    let textColor = "#06664E"; // Couleur du texte pour l'état "vérifié"
    let backgroundColor = "#04F8BB"; // Couleur de fond pour l'état "vérifié"

    if (verificationStatus === "non-verifie") {
      textStyles = styles.nonVerifie;
      icon = "times";
      textColor = "#FF2D2D"; // Couleur du texte pour l'état "non vérifié"
      backgroundColor = "#FFA8A8"; // Couleur de fond pour l'état "non vérifié"
    } else if (verificationStatus === "en-cours") {
      textStyles = styles.enCours;
      icon = "ellipsis-h";
      textColor = "#181526"; // Couleur du texte pour l'état "en cours"
      backgroundColor = "#EAE55C"; // Couleur de fond pour l'état "en cours"
    }

    useEffect(() => {
      getUserVerified();
    }, []);

    return { textStyles, icon, textColor, backgroundColor };
  };

  // Fonction pour vérifier et envoyer la notification
const sendVerificationNotification = async () => {
  const notificationSent = await AsyncStorage.getItem("notificationSent");

  if (!notificationSent) {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      await sendPushNotification(token, "🎉🎉 Vérification réussie 🎉🎉", "Votre compte a été vérifié avec succès🎉🎉.");
      await AsyncStorage.setItem("notificationSent", "true");
    }
  }
};


  const getUserVerified = async () => {
    const jwt_token = await AsyncStorage.getItem("jwt_token");

    if (jwt_token) {
      const user = await Axios.post(`${BASE_URL}/users/validate-token`, { token: jwt_token });
      const listekyc = await Axios.get(`${BASE_URL}/kyc`);
      let mananaKYC = false;
      let kyc;

      for (let i = 0; i < listekyc.data.length; i++) {
        if (listekyc.data[i].iduser == user.data.id) {
          kyc = listekyc.data[i].validation;
          mananaKYC = true;
        }
      }

      try {
        if (!mananaKYC) {
          setVerificationStatus("non-verifie");
        } else if (mananaKYC && !kyc) {
          setVerificationStatus("en-cours");
        } else if (mananaKYC && kyc) {
          setVerificationStatus("verifie");
          sendVerificationNotification(); // Envoi de la notification si nécessaire
        }
      } catch (error) {
        console.error("Erreur lors de la requête Axios :", error);
      }
    } else {
      console.error("JWT introuvable dans l'Async Storage ATO");
    }
  };

  useEffect(() => {
    getUserVerified();
    const intervalId = setInterval(() => {
      getUserVerified();
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const { textStyles, icon, textColor, backgroundColor } = getVerificationStyles();

  const handleLogout = () => {
    setShowModal(true);
    setTimeout(async () => {
      setShowModal(false);
      const jwt_token = AsyncStorage.getItem("deco");
      if (jwt_token) {
        await AsyncStorage.removeItem("deco");
        navigation.navigate("Connexion");
      } else {
        navigation.navigate("Connexion");
      }
    }, 2000);
  };

  const confirmLogout = async() => {
    Alert.alert(
      "Confirmation",
      "Souhaitez-vous vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Déconnexion",
          onPress: handleLogout, // Remplacez `handleLogout` par votre fonction de déconnexion
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground source={bgImage} style={styles.pageContainer} resizeMode="cover">
      <View style={styles.viewCover}>
        <ProfileNav />
        <View style={styles.logoContainer}>
          <Text style={global.grandTextJaune}>Information Personnelle</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.compteContainer} onPress={() => navigation.navigate("Identity")}>
            <LinearGradient colors={["#16daac", "#b6ea5c"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.gradient, { backgroundColor }]}>
              <Image source={identity} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.textIdent}>Identité</Text>
                <View style={[styles.verifView, { backgroundColor }]}>
                  <Icon name={icon} style={[styles.icon, { color: textColor }]} />
                  <Text style={[styles.verificationText, textStyles]}>
                    {verificationStatus === "verifie" ? "Vérifié" : verificationStatus === "non-verifie" ? "Non vérifié" : "En cours"}
                  </Text>
                </View>
              </View>
              <Icon name="chevron-right" style={styles.icone} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.compteContainer} onPress={() => navigation.navigate("Numero")}>
            <LinearGradient colors={["#16daac", "#b6ea5c"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
              <Image source={numero} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Numéro enregistré</Text>
              </View>
              <Icon name="chevron-right" style={styles.icone} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.compteContainer} onPress={() => navigation.navigate("AideAssistance")}>
            <LinearGradient colors={["#16daac", "#b6ea5c"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
              <Image source={aide} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Aide et Assistance</Text>
              </View>
              <Icon name="chevron-right" style={styles.icone} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.compteContainer} onPress={confirmLogout}>
            <LinearGradient colors={["#16daac", "#b6ea5c"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
              <Image source={logout} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>Déconnexion</Text>
              </View>
              <Icon name="chevron-right" style={styles.icone} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(24, 21, 38, 0.8)",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <ActivityIndicator size="large" />
            <Text
              style={{
                marginTop: "2%",
                fontFamily: "OnestBold",
                color: "#fff",
              }}
            >
              Déconnexion
            </Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default Settings;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    resizeMode: "cover",
  },
  viewCover: {
    height: "90%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: "1%",
    marginTop: "20%",
  },
  navContainer: {
    alignSelf: "flex-start",
  },
  container: {
    alignItems: "center",
    marginTop: "2%",
  },
  compteContainer: {
    width: "88%",
    height: "14%",
    borderRadius: 20,
    marginBottom: 20,
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
  },
  image: {
    width: 27,
    height: 27,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  textIdent: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    marginRight: 75,
    textAlign: "left",
    marginLeft: 11,
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
    textAlign: "left",
    marginLeft: 9,
  },
  verifie: {
    fontSize: 12,
    color: "#FFFFFF",
  },
  icone: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  verifie: {
    color: "#06664E",
    padding: 5,
  },
  nonVerifie: {
    color: "#FF2D2D",
    padding: 5,
  },
  enCours: {
    color: "#181526",
    padding: 5,
  },
  icon: {
    marginLeft: 5,
  },
  verifView: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'flex-end',
    flex: 2,
    marginRight: "10%",
  },
  verificationText: {
    fontSize: 12,
    // fontWeight: 'bold',
  },
});
