import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { BASE_URL } from "../../config";

const ProfileNav = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [unverifiedCount, setUnverifiedCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    const getUser = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem("jwt_token");
        if (!jwtToken) {
          navigation.navigate("ConnectWallet");
          console.error("JWT introuvable dans l'Async Storage");
          return;
        }

        const response = await Axios.post(`${BASE_URL}/users/validate-token`, {
          token: jwtToken,
        });

        if (isActive) {
          setUser(response.data);
          await getTransactions(jwtToken, response.data.id);
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    };

    const getTransactions = async (token, userId) => {
      try {
        const response = await Axios.get(`${BASE_URL}/transactionhistory`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filteredTransactions = response.data.filter(
          (transaction) => transaction.iduser === userId
        );

        const unverified = filteredTransactions.filter(transaction => !transaction.etat).length;
        setUnverifiedCount(unverified);

        setTransactions(filteredTransactions);
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error);
      }
    };

    getUser();

    const intervalId = setInterval(getUser, 5000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [navigation]);

  const updateNotifications = async () => {
    try {
      const requests = transactions.map(transaction =>
        Axios.post(`${BASE_URL}/transactionhistory/notificationverif/`, {
          id: transaction.id,
        })
      );
      await Promise.all(requests);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des notifications :", error);
    }
  };

  const handleNotificationPress = () => {
    const newNotifications = transactions.map(transaction => ({
      id: transaction.id,
      title: `Transaction ${transaction.type}`,
      content: `Actif: ${transaction.actif}, Montant: ${transaction.montant} USDT, Date: ${new Date(transaction.date).toLocaleString()}`,
      time: `Date: ${new Date(transaction.date).toLocaleString()}   ${transaction.validation}`
    }));

    setNotifications(newNotifications);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal immediately
    updateNotifications();  // Update notifications after closing the modal
  };

  return (
    <View style={styles.navsView}>
      <View style={{ justifyContent: "center" }}>
        <View style={styles.navCompte}>
          {user && user.validation ? (
            <>
              <Feather name="user-check" size={30} color={"#B6EA5C"} />
              <View style={styles.textContainer}>
                <Text style={styles.monCompteText}>Bienvenue !</Text>
                <Text style={styles.nomCompte}>{user.email}</Text>
              </View>
            </>
          ) : (
            <>
              <Feather name="user-x" size={30} color={"#FF0A0A"} />
              <View style={styles.textContainer}>
                <Text style={styles.monCompteText}>Bienvenue !</Text>
                <Text style={styles.nomCompte}>
                  {user ? user.email : "Utilisateur"}
                </Text>
                <Text style={styles.nomCompteNonVerifie}>Compte non vérifié</Text>
              </View>
            </>
          )}
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={handleNotificationPress}>
          <View style={styles.notifIcon}>
            <MaterialIcons
              name="circle-notifications"
              size={30}
              color={"whitesmoke"}
            />
            {unverifiedCount > 0 && (
              <View style={styles.notificationCountContainer}>
                <Text style={styles.notificationCountText}>{unverifiedCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            {notifications.length > 0 ? (
              <ScrollView style={styles.notificationsList}>
                {notifications.map(notification => (
                  <View key={notification.id} style={styles.notificationItem}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationContent}>{notification.content}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                    
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noNotificationsText}>Aucune notification pour le moment.</Text>
            )}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navsView: {
    height: "7%",
    marginTop: "8%",
    width: "95%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monCompteText: {
    fontFamily: "OnestBold",
    color: "whitesmoke",
    fontSize: 14,
  },
  nomCompte: {
    fontFamily: "OnestRegular",
    color: "#B6EA5C",
    fontSize: 12,
  },
  nomCompteNonVerifie: {
    fontFamily: "OnestRegular",
    color: "#FF0A0A",
    fontSize: 12,
  },
  navCompte: {
    flexDirection: "row",
  },
  textContainer: {
    marginLeft: "4%",
  },
  notifIcon: {
    position: "relative",
  },
  notificationCountContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCountText: {
    color: "white",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    height: "85%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationContent: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: "gray",
    textAlign: "right",
  },
  noNotificationsText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  closeButton: {
    color: "blue",
    textAlign: "right",
    marginTop: 10,
  },
});

export default ProfileNav;
