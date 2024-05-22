import { View, Text, ScrollView, StyleSheet, ToastAndroid, Alert } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import { RefreshControl } from "react-native-gesture-handler";

import Axios from "axios";
import { BASE_URL } from "../../../config";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import { formatDateTime, formatNumberAr } from "../../utils";

import { useNavigation } from "@react-navigation/native";

const TransactionHistory = () => {
  const [TransactionHistoryListe, setTransactionHistoryListe] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const getTransactionHistory = async () => {
    const jwt_token = await AsyncStorage.getItem("jwt_token");

    if (jwt_token) {
      try {
        const user = await Axios.post(`${BASE_URL}/users/validate-token`, {
          token: jwt_token,
        });
        const apiUrl = `${BASE_URL}/transactionhistory`;
        const response = await Axios.get(apiUrl);

        const transHistory = response.data;

        const filteredTransactions = transHistory.filter(
          (transaction) => transaction.iduser === user.data.id
        );

        setTransactionHistoryListe(filteredTransactions);
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    } else {
      navigation.navigate("ConnectWallet");
      console.error("JWT introuvable dans l'Async Storage");
    }
  };

  useEffect(() => {
    getTransactionHistory();
  }, []);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("Ordre copié !", ToastAndroid.SHORT);
  };

  // useEffect(() => {
  //   getTransactionHistory();
  //   const intervalId = setInterval(() => {
  //     getTransactionHistory();
  //   }, 4000);
  //   return () => clearInterval(intervalId);
  // }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTransactionHistory();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  function formatNumber(number) {
    let thing = parseFloat(number)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return thing.replace(/,/g, " ");
  }

  useEffect(() => {
    const checkToken = async () => {
      const email = await AsyncStorage.getItem("email");
      const jwt_time = await AsyncStorage.getItem("time_connect");
      if (jwt_time) {
        const timenow = new Date();
        const sessionTime = new Date(jwt_time).getTime();
        const currentTime = timenow.getTime();
        const timeDifferenceSeconds = Math.floor(
          (currentTime - sessionTime) / 1000
        );

        const newTimeRemaining = 10 * 60 - timeDifferenceSeconds;

        if (newTimeRemaining <= 0) {
          clearInterval(interval);
          ToastAndroid.show("Votre Session est expirée, Veuillez vous reconnecter", ToastAndroid.SHORT);
          navigation.navigate("PinConnection", { email });
        }
      }
    };

    const interval = setInterval(checkToken, 10000);

    return () => clearInterval(interval);
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {TransactionHistoryListe.length === 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
            alignSelf: "center",
            marginTop: "25%",
          }}
        >
          <LottieView
            source={require("../../../assets/fileSearch.json")}
            loop={false}
            autoPlay
            style={{ width: 250, height: 150 }}
          />
          <Text style={{ color: "#ccc" }}>Aucune transaction effectuée</Text>
        </View>
      ) : (
        TransactionHistoryListe.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  styles.typeCu,
                  { color: item.type === "depot" ? "#FF0A0A" : "#16DAAC" },
                ]}
              >
                {item.type}
              </Text>
              <Text style={styles.textC}>{item.actif}</Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                }}
              >
                {/* <Text style={styles.stat}>
                  {item.stat}{" "}
                  <Icon
                    style={styles.stat}
                    name="chevron-right"
                    size={20}
                    color="white"
                  />
                </Text> */}
              </View>
              <Text style={styles.text}>
                <Text style={styles.boldText}></Text>
                <Text
                  style={{
                    color:
                      item.validation === "validated"
                        ? "green"
                        : item.validation === "cancelled"
                        ? "red"
                        : item.validation === "pending"
                        ? "yellow"
                        : "black",
                  }}
                >
                  {item.validation}
                </Text>
              </Text>
            </View>

            <Text style={styles.text}>
              <Text style={styles.boldText}>Prix:</Text>{" "}
              {formatNumberAr(item.cours)} Ariary
            </Text>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Montant:</Text> {item.montant}{" "}
                USDT
              </Text>
              <Text style={styles.dateText}>{formatDateTime(item.date)}</Text>
            </View>

            <View style={styles.orderContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.boldText}>Ordre: {item.numeroordre}</Text>
                <View>
                  <TouchableOpacity
                    onPress={() => copyToClipboard(item.numeroordre)}
                  >
                    <Icon
                      style={styles.icon}
                      name="copy"
                      size={12}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.total}>
                Ar {formatNumberAr(item.montantmga)}
              </Text>
            </View>

            <View style={styles.separator}></View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: "76%",
    backgroundColor: "rgba(24, 21, 38, 0.8)",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "white",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  itemContainer: {
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  text: {
    fontSize: 12,
    paddingBottom: "2%",
    fontFamily: "OnestRegular",
    color: "white",
    padding: 1,
  },
  total: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: "OnestBold",
    color: "white",
    padding: 1,
  },
  boldText: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: "OnestBold",
    color: "white",
  },
  textC: {
    fontSize: 14,
    fontFamily: "MontserratBold",
    color: "white",
    padding: 2,
    marginRight: 10,
  },
  separator: {
    height: 3,
    backgroundColor: "white",
    marginTop: "5%",

    borderRadius: 10,
  },
  typeCu: {
    fontFamily: "MontserratSemi",
    padding: 2,
    fontSize: 14,
    marginRight: 10,
    marginBottom: 20,
  },
  stat: {
    fontFamily: "MontserratSemi",
    fontSize: 12,
    color: "white",
    padding: 5,
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginLeft: "20%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 11,
    fontFamily: "OnestRegular",
    color: "white",
    padding: 1,
    textAlign: "right",
  },
});

export default TransactionHistory;
