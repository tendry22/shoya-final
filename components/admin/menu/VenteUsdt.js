import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Axios from 'axios';
import { BASE_URL } from '../../../config';
import { formatDateTime, formatNumberAr } from "../../utils";

function formatNumber(number) {
  let thing = parseFloat(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return thing.replace(/,/g, " ");
}

const data = [
  {
    id: 1,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 2,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 3,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 4,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 5,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 6,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 7,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 8,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 9,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
  {
    id: 10,
    date: "07/07/23 17:49:22",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    cours: "Ar 4 434",
    prixAchat: "Ar 233 583",
  },
];

const VenteUsdt = () => {

  const [venteUsdtHistory, setVenteUsdtHistory] = useState([]);

  const getVenteUsdtHistory = async() => {
    
      try{

        const apiUrl = `${BASE_URL}/transactionhistory/filtered`;

        const response = await Axios.post(apiUrl, { type: 'depot', portefeuille: 'usdt' });

        const venteUsdt = response.data;

        setVenteUsdtHistory(venteUsdt);

        // console.log('Réponse de l\'API :', userVerified);

      }catch(error){
        console.error('Erreur lors de la requête :', error);
      }
    
  }

  useEffect(() => {
    getVenteUsdtHistory();
  }, [])

  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>ID</Text>
          <Text style={styles.headerText}>Montant</Text>
          <Text style={styles.headerText}>Cours</Text>
          <Text style={styles.headerText}>Prix d'achat</Text>
          <Text style={styles.headerText}>Date</Text>
        </View>
        {venteUsdtHistory.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.cell}>{item.numeroordre}</Text>
            <Text style={styles.cell}>{item.montant} USDT </Text>
            <Text style={styles.cell}>{formatNumberAr(item.cours)} Ar</Text>
            <Text style={styles.cell}>{formatNumberAr(item.montantmga)} Ar</Text>
            <Text style={styles.cell}>{formatDateTime(item.date)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    backgroundColor: "#FF2D2D",
    borderRadius: 2,
  },
  headerText: {
    fontFamily: "OnestBold",
    fontSize: 10,
    color: "white",
    flex: 1,
    textAlign: "center",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#FF2D2D",
  },
  cell: {
    fontFamily: "OnestBold",
    fontSize: 10,
    color: "white",
    flex: 1,
    textAlign: "center",
    padding: 5,
  },
});

export default VenteUsdt;
