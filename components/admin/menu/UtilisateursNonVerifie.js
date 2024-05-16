import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import Axios from "axios";
import { BASE_URL } from "../../../config";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ajout de l'import AsyncStorage
import * as Notifications from 'expo-notifications';
import { schedulePushNotification, sendPushNotification } from '../notificationsUtils';
import { getExpoPushTokenAsync } from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const userInfo = [
  {
    id: 1,
    idUtilisateur: "211511",
    solde: "372,514.32",
    nom: "RAKOTONDRATSIORY",
    prenom: "Ambinintsoa Kevin Maria",
    email: "ambinintsoak@gmail.com",
    cin: "117 293 892 012",
    adresse: "Tanjombato Résidence Onisoa Tanjombato",
  },
  {
    id: 2,
    idUtilisateur: "211512",
    solde: "372,514.32",
    nom: "RAKOTO",
    prenom: "Maria",
    email: "rakotok@gmail.com",
    cin: "117 293 892 012",
    adresse: "Analamahitsy",
  },
  {
    id: 3,
    idUtilisateur: "211513",
    solde: "420,558.32",
    nom: "RAKOTONDRATSIORY",
    prenom: "Ambinintsoa Kevin Maria",
    email: "ambinintsoak@gmail.com",
    cin: "117 293 892 012",
    adresse: "Tanjombato Résidence Onisoa Tanjombato",
  },
  {
    id: 4,
    idUtilisateur: "211514",
    solde: "50,000.32",
    nom: "RAKOTONDRATSIORY",
    prenom: "Ambinintsoa Kevin Maria",
    email: "ambinintsoak@gmail.com",
    cin: "117 293 892 012",
    adresse: "Tanjombato Résidence Onisoa Tanjombato",
  },
  {
    id: 5,
    idUtilisateur: "211511",
    solde: "172,452.32",
    nom: "RAKOTONDRATSIORY",
    prenom: "Ambinintsoa Kevin Maria",
    email: "ambinintsoak@gmail.com",
    cin: "117 293 892 012",
    adresse: "Tanjombato Résidence Onisoa Tanjombato",
  },
];

const UtilisateursNonVerifie = () => {
  const [isCollapsed, setIsCollapsed] = useState(userInfo.map(() => true)); // tableau pour stocker l'état de chaque utilisateur

  const [userDataUnVerified, setUserDataUnVerified] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const projectId = 'da434518-0960-451b-834b-0a20a9ec1e31'; // Votre projet ID
        const token = (await getExpoPushTokenAsync({ projectId })).data;
        console.log('Expo Push Token:', token);
        await AsyncStorage.setItem('adminExpoToken', token);
        console.log('Jeton Expo de l\'administrateur stocké avec succès.');
  
        //await sendPushNotification(token, 'Skrill :Aucun Transaction', 'Personne n`a fait de transaction Skrill');
      } catch (error) {
        console.error('Erreur lors du stockage du jeton Expo de l\'administrateur :', error);
      }
    })();
  }, []);
  const [notificationTriggered, setNotificationTriggered] = useState(false);
  const getUserUnVerified = async () => {
    try {
      const apiUrl = `${BASE_URL}/kyc/nonverified`;

      const response = await Axios.get(apiUrl);
      // const adminExpoToken = await AsyncStorage.getItem('adminExpoToken');
      // if (adminExpoToken) {
      //   await schedulePushNotification({
      //     adminExpoToken,
      //     title: "Users : Nouvelle utilisateur 🎉🎉",
      //     body: `Une nouvelle utilisateur en attente de verification 🎉🎉.`,
      //     data: { type: 'Utilisateur'},
      //   }, { seconds: 1 });
      //   setNotificationTriggered(true); // Mettre à jour l'état de la notification
      // } else {
      //   console.error('Jeton Expo de l\'administrateur non trouvé ou invalide.');
      // }

      if (response.data.length === 0) {
        ToastAndroid.show("Aucun utilisateur", ToastAndroid.SHORT);
      } else {
        const userVerified = response.data;
        console.log("===========");
        console.log(userVerified);
        console.log("===========");
        await schedulePushNotification({
          
          title: "Users : Nouvelle utilisateur 🎉🎉",
          body: `Une nouvelle utilisateur en attente de verification 🎉🎉.`,
          data: { type: 'Utilisateur'},
        }, { seconds: 1 });
        setNotificationTriggered(true);

        setUserDataUnVerified(userVerified);

        console.log("Réponse de l'API :", userVerified);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  const handleSubmit = async (id) => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        const response = await Axios.post(`${BASE_URL}/kyc/validation`, {
          idkyc: id,
        });

        if (response.data.messageresult != null) {
          ToastAndroid.show("Changement effectué", ToastAndroid.SHORT);
        }
      } else {
        ToastAndroid.show(
          "Erreur lors de l'authentification",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserUnVerified();
  }, []);

  const toggleView = (index) => {
    const updatedCollapsed = [...isCollapsed]; // copie du tableau
    updatedCollapsed[index] = !updatedCollapsed[index]; // mise à jour de l'état pour l'utilisateur spécifique
    setIsCollapsed(updatedCollapsed);
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("ID de l'utilisateur copié !", ToastAndroid.SHORT);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {userDataUnVerified.map((item, index) => (
        <View style={styles.contenuContainer} key={item.id}>
          <TouchableOpacity onPress={() => toggleView(index)}>
            <View style={styles.contentContainer}>
              <View style={styles.icoTxt}>
                <TouchableOpacity onPress={() => copyToClipboard(item.kyc.id)}>
                  <Icon name="copy" size={14} color="white" />
                </TouchableOpacity>
                <Text style={styles.idU}>{item.user_reference}</Text>
              </View>
              <Text style={styles.solde}></Text>
              <TouchableOpacity onPress={() => handleSubmit(item.kyc.id)}>
                <View style={styles.transactionButton}>
                  <Text style={styles.transactionText}>Vérifier</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          {isCollapsed[index] ? null : (
            <View style={styles.info}>
              <Text style={styles.infoText}>Nom: {item.kyc.nom}</Text>
              <Text style={styles.infoText}>Prénom: {item.kyc.prenom}</Text>
              <Text style={styles.infoText}>Email: {item.email}</Text>
              <Text style={styles.infoText}>CIN: {item.kyc.cin_passeport}</Text>
              <Text style={styles.infoText}>Adresse: {item.kyc.adresse}</Text>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: BASE_URL + "/uploads/" + item.kyc.lienimage_selfie,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <Image
                  source={{
                    uri: BASE_URL + "/uploads/" + item.kyc.lienimage_cin,
                  }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity>
                <View style={styles.modifBtn}>
                  <Text style={styles.modifText}>Modifié</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.separator} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginRight: "5%",
    marginLeft: "5%",
  },
  modifBtn: {
    backgroundColor: "#00FFA8",
    borderRadius: 10,
    padding: "2%",
    width: "30%",
    marginTop: "4%",
    alignSelf: "flex-end",
  },
  modifText: {
    color: "black",
    fontSize: 14,
    fontFamily: "OnestBold",
    textAlign: "center",
  },
  info: {
    marginTop: "5%",
  },
  infoText: {
    color: "white",
    padding: "0.5%",
    fontFamily: "OnestRegular",
    fontSize: 12,
  },
  contenuContainer: {
    flexDirection: "column",
  },
  icoTxt: {
    flexDirection: "row",
  },
  transactionButton: {
    backgroundColor: "#FFEE00",
    borderRadius: 10,
    padding: "2%",
  },
  transactionText: {
    color: "black",
    fontSize: 14,
    fontFamily: "OnestBold",
    textAlign: "center",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "7%",
  },
  idU: {
    color: "white",
    paddingLeft: "2%",
    fontFamily: "OnestBold",
    fontSize: 14,
  },
  solde: {
    color: "white",
    fontFamily: "OnestBold",
    fontSize: 14,
  },
  separator: {
    height: 2,
    backgroundColor: "white",
    marginTop: "5%",
    borderRadius: 30,
  },
});

export default UtilisateursNonVerifie;
