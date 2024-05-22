import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import CompteAdminNavs from "../navs/CompteAdminNavs";
import Icon from "react-native-vector-icons/Ionicons";
import IconOct from "react-native-vector-icons/Octicons";

import { useNavigation } from "@react-navigation/native";

import Axios from 'axios';
import { BASE_URL } from "../../../config";
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ajout de l'import AsyncStorage
import * as LocalAuthentication from "expo-local-authentication";
import { formatDateTime } from "../../utils";

const transactionInfo = [
  {
    id: 1,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
  },
  {
    id: 2,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
  },
  {
    id: 3,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
  },
  {
    id: 4,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
  },
  {
    id: 5,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
  },
];

const AdminPayeer = () => {
  const navigation = useNavigation();

  const [listeAirtm, setListeAirtm] = useState([]);

  const handleSubmit = async (idtransaction) => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        const apiUrl = `${BASE_URL}/payeer/validation`;
        const response = await Axios.post(apiUrl, { idpayeertransaction: idtransaction });
        if(response.data.messageresult == 'transaction payeer validee'){
          navigation.navigate("ValidationHistoryPayeer");
        }
        else{
          ToastAndroid.show(
            response.data.messageresult,
            ToastAndroid.SHORT
          );
        } 
      }
      else{
        ToastAndroid.show(
          "Erreur pendant l'authentification",
          ToastAndroid.SHORT
        );
      } 
    } catch (error) {
      console.error('Erreur lors de la requête Axios :', error);
    }
  };

  const handleSubmitCancel = async (idtransaction) => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        const apiUrl = `${BASE_URL}/payeer/cancel`;
        const response = await Axios.post(apiUrl, { idpayeertransaction: idtransaction });
        if(response.data.messageresult == 'transaction payeer refusee'){
          navigation.navigate("ValidationHistoryPayeer");
        }
        else{
          ToastAndroid.show(
            'Il y a une erreur',
            ToastAndroid.SHORT
          );
        }
      }
      else{
        ToastAndroid.show(
          "Erreur pendant l'authentification",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error('Erreur lors de la requête Axios :', error);
    }
  };

  useEffect(() => {
    const fetchAirtm = async () => {
      try {
        const response = await Axios.get(`${BASE_URL}/payeer/pending`);
        const newData = response.data;
        setListeAirtm(newData);
      } catch (error) {
        console.log(error.response.data);
      }
    };
  
    fetchAirtm();
    const intervalId = setInterval(fetchAirtm, 5000);
  
    return () => clearInterval(intervalId);
  }, [listeAirtm]);
  

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <CompteAdminNavs />
      <TouchableOpacity
        style={styles.retourButton}
        onPress={() => {
          navigation.navigate("ValidationHistoryPayeer");
        }}
      >
        <IconOct name="history" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Validation Payeer</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {listeAirtm.map((item) => (
          <View style={styles.contenuContainer} key={item.id}>
            <View style={styles.contentContainer}>
              <Text style={styles.idU}>{formatDateTime(item.date)}</Text>
              <Text style={styles.solde}>{item.numeroordre}</Text>
              <Text style={styles.solde}>{item.montant}</Text>
              <TouchableOpacity onPress={() => handleSubmit(item.id)}>
                <View style={styles.transactionButton}>
                  <Text style={styles.transactionText}>Valider</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSubmitCancel(item.id)}>
                <Icon name="close-circle" size={16} color="#F44336" />
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: "30%",
    width: "90%",
    alignSelf: "center",
  },
  retourButton: {
    position: "absolute",
    top: 30,
    right: 20,
    padding: 10,
  },
  title: {
    fontFamily: "OnestBold",
    color: "#ABDC57",
    fontSize: 18,
  },
  scrollContainer: {
    flexGrow: 1,
    marginRight: "5%",
    marginLeft: "5%",
    marginBottom: "7%",
    marginTop: "5%",
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
    fontSize: 12,
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
    fontFamily: "OnestBold",
    fontSize: 11,
  },
  solde: {
    color: "white",
    fontFamily: "OnestBold",
    fontSize: 11,
  },
  separator: {
    height: 2,
    backgroundColor: "white",
    marginTop: "5%",
    borderRadius: 30,
  },
});
export default AdminPayeer;