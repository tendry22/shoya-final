import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import IconOcti from "react-native-vector-icons/Octicons";

const validationInfo = [
  {
    id: 1,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
    idUtilisateur: "110110",
    statut: "Terminé",
  },
  {
    id: 2,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
    idUtilisateur: "110111",
    statut: "Terminé",
  },
  {
    id: 3,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
    idUtilisateur: "110112",
    statut: "Terminé",
  },
  {
    id: 4,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
    idUtilisateur: "110113",
    statut: "Annulé",
  },
  {
    id: 5,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
    idUtilisateur: "110114",
    statut: "Annulé",
  },
  {
    id: 6,
    date: "07-16 17:49:22",
    reference: "Instant_Trade_001",
    montant: "23,03 USD",
    idUtilisateur: "110115",
    statut: "Annulé",
  },
];

import CompteAdminNavs from "../navs/CompteAdminNavs";
import RetourNavs from "../navs/RetourNavs";

const ValidationHistoryPayeer = () => {
  const [filter, setFilter] = useState("Tout"); // État local pour suivre le statut du filtre
  const filteredTransactions =
    filter === "Tout"
      ? validationInfo
      : validationInfo.filter((item) => item.statut === filter);

  return (
    <ImageBackground
      source={require("../../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <CompteAdminNavs />
      <RetourNavs />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Historique de validation Payeer</Text>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.tout} onPress={() => setFilter("Tout")}>
          <Text
            style={[
              styles.txtTout,
              filter === "Tout" && styles.selectedButtonText,
            ]}
          >
            Tout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.termine}
          onPress={() => setFilter("Terminé")}
        >
          <Text
            style={[
              styles.txtTermine,
              filter === "Terminé" && styles.selectedButtonText,
            ]}
          >
            Terminé
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.annule}
          onPress={() => setFilter("Annulé")}
        >
          <Text
            style={[
              styles.txtAnnule,
              filter === "Annulé" && styles.selectedButtonText,
            ]}
          >
            Annulé
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView>
          {filteredTransactions.map((item) => (
            <View key={item.id}>
              <View style={styles.validationContainer}>
                <View>
                  <Text style={styles.txtContenu}>
                    Référence: {item.reference}{" "}
                  </Text>
                  <Text style={styles.txtContenu}>
                    Montant: {item.montant}{" "}
                  </Text>
                  <Text style={styles.txtContenu}>
                    ID Utilisateur: {item.idUtilisateur}
                  </Text>
                </View>
                <View>
                  <Text
                    style={
                      item.statut === "Annulé"
                        ? styles.txtContenuDroiteAnnule
                        : styles.txtContenuDroite
                    }
                  >
                    {item.statut}
                  </Text>

                  <Text style={styles.txtDate}>{item.date}</Text>
                </View>
              </View>
              <View>
                <View style={styles.separator} />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  selectedButtonText: {
    color: "#ABDC57",
    borderColor: "#ABDC57",
    borderBottomWidth: 2,
  },
  separator: {
    height: 2,
    backgroundColor: "white",
    borderRadius: 30,
    width: "90%",
    alignSelf: "center",
    marginTop: "4%",
  },
  txtContenuDroiteAnnule: {
    color: "#F44336",
    textAlign: "right",
    fontFamily: "OnestBold",
    fontSize: 12,
    padding: "1.5%",
  },

  txtContenuDroite: {
    color: "#ABDC57",
    textAlign: "right",
    fontFamily: "OnestBold",
    fontSize: 12,
    padding: "1.5%",
  },
  txtDate: {
    color: "white",
    fontFamily: "OnestRegular",
    fontSize: 10,
  },
  titleContainer: {
    marginTop: "30%",
    width: "90%",
    alignSelf: "center",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    marginBottom: "7%",
    marginTop: "3%",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgba(24, 21, 38, 0.8)",
    borderRadius: 15,
  },
  validationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "4%",
    width: "90%",
    alignSelf: "center",
  },
  txtContenu: {
    color: "white",
    fontFamily: "OnestBold",
    fontSize: 12,
    padding: "1.5%",
  },
  tout: {
    width: "20%",
    alignItems: "center",
  },
  txtTout: {
    fontFamily: "OnestBold",
    color: "white",
    fontSize: 14,
  },
  txtTermine: {
    fontFamily: "OnestBold",
    color: "white",
    fontSize: 14,
  },
  txtAnnule: {
    fontFamily: "OnestBold",
    color: "white",
    fontSize: 14,
  },
  termine: {
    width: "20%",
    alignItems: "center",
  },
  annule: {
    width: "20%",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginTop: "5%",
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "OnestBold",
    color: "#ABDC57",
    fontSize: 18,
  },
});

export default ValidationHistoryPayeer;
