import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { BASE_URL } from "../config";

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const deco = await AsyncStorage.getItem("deco");
      if (deco) {
        const jwt_token = await AsyncStorage.getItem("jwt_token");
        const user = await Axios.post(`${BASE_URL}/users/validate-token`, {
          token: jwt_token,
        });
        navigation.navigate("PinConnection", {
          email: user.data.email,
        });
      } else {
        const timer = setTimeout(() => {
          navigation.navigate("Connexion"); // Naviguer vers une autre page
        }, 3000); // 3000 millisecondes = 3 secondes
        return () => clearTimeout(timer); // Nettoyer le timer quand le composant est démonté
      }
    };

    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      {/* Votre logo */}
      <Image source={require("../assets/images/logo.png")} />
      <LottieView
        source={require("../assets/chargement.json")}
        loop
        autoPlay
        style={{ width: 125, height: 125 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#181526",
  },
  logo: {
    resizeMode: "contain",
    width: 150,
    height: 150,
  },
});

export default LoadingScreen;
