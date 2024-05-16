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
        {transactionInfo.map((item) => (
          <View style={styles.contenuContainer} key={item.id}>
            <View style={styles.contentContainer}>
              <Text style={styles.idU}>{item.date}</Text>
              <Text style={styles.solde}>{item.reference}</Text>
              <Text style={styles.solde}>{item.montant}</Text>
              <TouchableOpacity>
                <View style={styles.transactionButton}>
                  <Text style={styles.transactionText}>Valider</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
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
