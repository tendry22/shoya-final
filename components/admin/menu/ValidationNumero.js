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

import Axios from "axios";
import { BASE_URL } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { formatNumero } from "../../utils";

const ValidationNumero = () => {
  const navigation = useNavigation();

  const [listeNumero, setListeNumero] = useState([]);

  const handleSubmit = async (idtransaction) => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        const apiUrl = `${BASE_URL}/phone/validation`;
        const response = await Axios.post(apiUrl, { id: idtransaction });
        ToastAndroid.show(response.data.messageresult, ToastAndroid.SHORT);
        fetchNumero();
      } else {
        ToastAndroid.show(
          "Erreur pendant l'authentification",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête Axios :", error);
    }
  };

  const handleSubmitCancel = async (idtransaction) => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) {
        const apiUrl = `${BASE_URL}/phone/refuse`;
        const response = await Axios.post(apiUrl, { id: idtransaction });
        ToastAndroid.show(response.data.messageresult, ToastAndroid.SHORT);
        fetchNumero();
      } else {
        ToastAndroid.show(
          "Erreur pendant l'authentification",
          ToastAndroid.SHORT
        );
      }
    } catch (error) {
      console.error("Erreur lors de la requête Axios :", error);
    }
  };

  const fetchNumero = async () => {
    try {
      const response = await Axios.get(`${BASE_URL}/phone/pending`);
      const newData = response.data;
      setListeNumero(newData);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  useEffect(() => {
    fetchNumero();
    const intervalId = setInterval(fetchNumero, 5000);
  
    return () => clearInterval(intervalId);
  }, [listeNumero]);
  

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <CompteAdminNavs />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Validation Numero</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {listeNumero.map((item) => (
          <View style={styles.contenuContainer} key={item.id}>
            <View style={styles.contentContainer}>
              <Text style={styles.idU}>{item.user_reference}</Text>
              <Text style={styles.idU}>{'0'+formatNumero(item.numero)}</Text>
              <Text style={styles.idU}>{item.validation}</Text>
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
export default ValidationNumero;
