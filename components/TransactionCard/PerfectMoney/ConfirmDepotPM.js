import React from "react";
import {
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  Image,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { BASE_URL } from "../../../config";
import { useState, useEffect, useRef } from "react";
import WebView from "react-native-webview";
import { ActivityIndicator } from "react-native";

const ConfirmDepotPM = ({ route }) => {
  const { montant, address } = route.params;
  const navigation = useNavigation();

  const [cours, setCours] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const webViewRef = useRef(null);

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/cours`);
        const liste = response.data;
        for (let i = 0; i < liste.length; i++) {
          if (response.data[i].actif == "pm") {
            setCours(response.data[i].depot);
          }
        }
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setIsLoading(false); // Marquer le chargement comme terminé
      }
    };
    fetchCours();
  }, []);

  const handleSubmit = async () => {
    try {
      const jwt_token = await AsyncStorage.getItem("jwt_token");
      if (jwt_token) {
        const user = await Axios.post(`${BASE_URL}/users/validate-token`, {
          token: jwt_token,
        });
        console.log("adresse=" + address);
        console.log("montant=" + montant);
        console.log("iduser=" + user.data.id);
        const apiUrl = `${BASE_URL}/perfectmoney/depot`;
        const response = await Axios.post(apiUrl, {
          iduser: user.data.id,
          receveur: address,
          montant: +montant,
        });
        console.log(response.data.messageresult);
        if (response.data.messageresult == "Transaction effectuee") {
          navigation.navigate("Reussi");
        } else {
          ToastAndroid.show(response.data.messageresult, ToastAndroid.SHORT);
        }
      } else {
        navigation.navigate("ConnectWallet");
        console.error("JWT introuvable dans l'Async Storage");
      }
    } catch (error) {
      console.error("Erreur lors de la requête Axios :", error);
    }
  };

  // const handleSubmit = () => {
  //   console.log("Adresse:", address);
  //   console.log("Montant:", montant, "USDT");
  //   console.log("Montant total en Ar:", montant * 4600 + 4502, "Ar");
  //   navigation.navigate("Reussi");
  // };

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
    <title>WebView avec paramètres</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/9bff927a12.js" crossorigin="anonymous"></script>
    <style>
      .titleOrdre {
        color: whitesmoke;
        text-align: center;
        font-size: 18px;
      }
      .recevoirTxt {
        text-align: center;
        color: whitesmoke;
        font-size: 14px; 
      }
      .montantTxt {
        text-align: center;
        color: white;
        font-size: 30px; 
      }
      .confirmBox {
        width: 95%; 
        height: auto;
        border: 0.2px solid #ccc;
        margin: 0 auto;
        display: flex; /* Utilisation de Flexbox */
        flex-direction: column; /* Disposition des éléments en colonne */
        border-radius: 10px;
        background-color: rgba(109, 117, 136, 0.5); 
      }
      .txtBox {
        font-size: 11px;
        margin-left: 5px ;     
        font-weight: bold; /* Rendre le texte en gras */ 
        color: whitesmoke; 
      }
      .valiny {
        margin-left: auto; /* Marge à gauche automatique pour aligner à droite */
        font-size: 11px;
        margin-right: 5px ;
        color: whitesmoke;
        
      }
      .pair {
        display: flex; /* Utilisation de Flexbox */
        justify-content: space-between; /* Espacement égal entre les éléments */
        margin-bottom: 5px; /* Marge entre chaque paire */
      }
      .avertissementBox {
        width: 95%; 
        border: 0.2px solid #ccc;
        height: auto;
        margin: 0 auto;
        margin-top: 10%;  
        border-radius: 10px; 
        display: flex;
        align-items: center; /* Alignement vertical */
        background-color: rgba(255, 238, 00, 0.4);
      }
      .avertissementTxt {
        font-size: 12px;
        margin-left: 10px;
        color: #FFEE00;
      }
      .avertissementBox i {
        margin-left: 5px; /* Espacement entre l'icône et le texte */
        color: yellow;
    }
    .touchableOpacityButton {
      background-color: #FFEE00; /* Couleur de fond */
      color: black; /* Couleur du texte */
      border: none; /* Supprimer la bordure */
      padding: 10px 20px; /* Espacement intérieur */
      font-size: 14px; /* Taille de la police */
      border-radius: 5px; /* Bordure arrondie */
      cursor: pointer; /* Curseur de la souris */
      transition: background-color 0.3s ease; /* Transition pour l'effet de pression */
      font-weight: bold; 
      width: 95%;
  }
  
  .touchableOpacityButton:hover {
      background-color:  #FFEE00; /* Couleur de fond au survol */
  }
  
  .touchableOpacityButton:active {
      background-color:  #FFEE00; /* Couleur de fond lorsqu'il est activé (cliqué) */
  }
  .button {
    display: flex;
    align-items: center; /* Alignement vertical */
    justify-content: center;
    margin-top: 10%;
  }
    </style>
  </head>
  <body>
    <div class='entete'>
      <h2 class='titleOrdre'>Confirmer l'ordre</h2>
      <p class='recevoirTxt'>Vous recevrez: </p>
      <h2 class='montantTxt'> ${montant} USD</h2>
    </div>
    <div class='confirmBox'>
      <div class='pair'>
        <p class='txtBox'>Adresse</p>
        <p class='valiny'>${address}</p>
      </div>
      <div class='pair'>
        <p class='txtBox'>Actif</p>
        <p class='valiny'>USD</p>
      </div>
      <div class='pair'>
        <p class='txtBox'>Montant</p>
        <p class='valiny'>${montant}</p>
      </div>
      <div class='pair'>
        <p class='txtBox'>Cours</p>
        <p class='valiny'>${cours}</p>
      </div>
      <div class='pair'>
        <p class='txtBox'>Montant total en Ariary</p>
        <p class='valiny'>${montant * cours}</p>
      </div>
    </div>
    <div class='avertissementBox'>
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p class='avertissementTxt'>Vérifiez que tout est correct, les transactions ne peuvent pas être annulées</p>
    </div>
    <div class='button'>
    <button class="touchableOpacityButton" onclick="handleClick()">Confirmer</button>
    <script>
      function handleClick() {
        window.ReactNativeWebView.postMessage('confirm');
      }
    </script>
    </div>
  </body>
  </html>
`;

  const handleWebViewMessage = (event) => {
    if (event.nativeEvent.data === "confirm") {
      handleSubmit();
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {isLoading && ( // Afficher l'ActivityIndicator si le chargement est en cours
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#FFEE00" />
        </View>
      )}
      <TouchableOpacity
        style={styles.retourButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <FontAwesome name="times" size={18} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          style={{
            width: "90%",
            borderWidth: 2,
            borderColor: "white",
            backgroundColor: "transparent",
            alignSelf: "center",
          }}
          onMessage={handleWebViewMessage}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    height: "70%",
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  retourButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
  },
});

export default ConfirmDepotPM;
