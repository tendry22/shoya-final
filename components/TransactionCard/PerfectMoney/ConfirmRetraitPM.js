import React from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import WebView from "react-native-webview";
import { BASE_URL } from "../../../config";
import Axios from "axios";

const ConfirmRetraitPM = ({ route }) => {
  const { montant } = route.params;
  const { iduser } = route.params;
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // État pour contrôler la visibilité de l'ActivityIndicator

  const [cours, setCours] = useState();

  const adresseShoya = process.env.EXPO_PUBLIC_SHOYA_ADRESS_PM;

  useEffect(() => {
    console.log("ADRESSE SHOYA=" + adresseShoya);
    const fetchCours = async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/cours`);
        const liste = response.data;
        for (let i = 0; i < liste.length; i++) {
          if (response.data[i].actif == "pm") {
            setCours(response.data[i].retrait);
          }
        }
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchCours();
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

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
  .formAction {
    margin-top : 10%;
    text-align: center;

  }
    </style>
  </head>
  <body>
    <div class='entete'>
      <h2 class='titleOrdre'>Confirmer l'ordre</h2>
      <p class='recevoirTxt'>Retrait de: </p>
      <h2 class='montantTxt'> ${montant} USD</h2>
    </div>
    <div class='confirmBox'>
      <div class='pair'>
        <p class='txtBox'>Adresse</p>
        <p class='valiny'>${adresseShoya}</p>
      </div>
      <br />
      <div class='pair'>
        <p class='txtBox'>Actif</p>
        <p class='valiny'>USD</p>
      </div>
      <div class='pair'>
        <p class='txtBox'>Montant</p>
        <p class='valiny'>${montant} USD</p>
      </div>
      <div class='pair'>
        <p class='txtBox'>Montant total en Ariary</p>
        <p class='valiny'>${montant * cours} Ariary</p>
      </div>
    </div>
    <div class='avertissementBox'>
    <i class="fa-solid fa-triangle-exclamation"></i>
    <p class='avertissementTxt'>Vérifiez que tout est correct, les transactions ne peuvent pas être annulées</p>
    </div>
    <div class='formAction'>
    <form action="https://perfectmoney.com/api/step1.asp" method="POST">
    <input type="hidden" name="PAYEE_ACCOUNT" value="${adresseShoya}">
    <input type="hidden" name="PAYEE_NAME" value="Shoya Exchange">
    <input type="hidden" name="PAYMENT_AMOUNT" value="${montant}">
    <input type="hidden" name="PAYMENT_UNITS" value="USD">
    <input type="hidden" name="PAYMENT_URL" value="http://192.168.1.104:3000/perfectmoney/retrait/${iduser}/${montant}">
    <input type="hidden" name="NOPAYMENT_URL" value="https://www.instagram.com/">
    <input class="touchableOpacityButton" type="submit" name="PAYMENT_METHOD" value="Confirmer">
  </form>
  </div>
  </body>
  </html>
`;

  const handleConfirm = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    navigation.replace("TabBarRoute");
    // setShowModal(false);
  };

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <TouchableOpacity
        style={styles.retourButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <FontAwesome name="times" size={18} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        {/*  <Text style={styles.texte}>Confirmer l'ordre</Text>
        <Text style={styles.texte1}>Retrait de: </Text>
        <View style={styles.amountContainer}>
          <Text style={styles.montant}>{montant} USD</Text>
        </View>
        <View style={styles.minMaxContainer}>
          <View>
            <Text style={styles.minMaxLabelText}>Adresse</Text>
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.minMaxLabelText}>Actif</Text>
              <Text style={styles.minMaxLabelText}>Montant</Text>
              <Text style={styles.minMaxLabelText}>
                Montant Total en Ariary
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.minMaxValueText}>U35215711</Text>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Text style={styles.minMaxValueText}>USD</Text>
              <Text style={styles.minMaxValueText}>{montant} USD</Text>
              <Text style={styles.minMaxValueText}>
                {(montant * cours).toLocaleString()} Ariary
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.warningContainer}>
          <FontAwesome
            name="warning"
            size={14}
            color="yellow"
            style={{ marginLeft: 8 }}
          />
          <Text style={styles.warningLabelText}>
            Vérifier que tout est correcte. Les transactions ne peuvent pas être
            annulées
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>

        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseModal}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 30,
                borderRadius: 10,
                width: "90%",
                height: "80%",
              }}
            >
              <WebView
                source={{ html: htmlForm }}
                style={{ width: 300, height: 500 }}
              />
              <TouchableOpacity onPress={handleCloseModal}>
                <Text>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>*/}
        <WebView
          source={{ html: htmlContent }}
          style={{
            width: "90%",
            borderWidth: 2,
            borderColor: "white",
            backgroundColor: "transparent",
            alignSelf: "center",
          }}
          onLoadStart={handleLoadStart} // Appelé lorsque le chargement commence
          onLoadEnd={handleLoadEnd} // Appelé lorsque le chargement se termine
        />
        {loading && ( // Affichage conditionnel de l'ActivityIndicator
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color="white"
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "30%",
    height: "70%",
  },
  texte: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "OnestBold",
    color: "white",
  },
  texte1: {
    fontSize: 14,
    fontFamily: "OnestRegular",
    color: "white",
  },
  montant: {
    fontSize: 40,
    fontFamily: "OnestBold",
    color: "white",
    padding: 10,
  },
  retourButton: {
    position: "absolute",
    top: 30,
    right: 20,
    padding: 10,
  },
  amountContainer: {
    flexDirection: "row", // Place les éléments horizontalement
    alignItems: "center", // Aligne les éléments verticalement au centre
  },
  minMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    width: "80%",
    height: 180,
    marginTop: 10,
    borderColor: "gray",
    borderWidth: 0.2,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "rgba(109, 117, 136, 0.5)",
  },
  warningContainer: {
    marginTop: 15,
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.2,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 238, 00, 0.4)",
  },
  minMaxLabelText: {
    textAlign: "left",
    fontFamily: "OnestRegular",
    color: "#ccc",
    fontSize: 10,
    padding: 5,
  },
  warningLabelText: {
    fontFamily: "OnestBold",
    color: "#FFEE00",
    fontSize: 10,
    padding: 5,
    marginLeft: 8,
    marginRight: 8,
  },
  minMaxValueText: {
    textAlign: "right",
    fontFamily: "OnestRegular",
    color: "white",
    fontSize: 10,
    padding: 5,
  },
  separator: {
    height: 3,
    backgroundColor: "white",
    marginBottom: null,
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#FFEE00",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "80%",
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontFamily: "OnestBold",
  },
});

export default ConfirmRetraitPM;
