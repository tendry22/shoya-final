import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { BackHandler } from "react-native";
import { Feather } from "@expo/vector-icons";

const UserCanceled = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      // Empêcher le retour en arrière si vous êtes sur la page CreateWallet
      if (navigation.isFocused()) {
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("TabBarRoute");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.operationReussie}>
          <View style={styles.decorationView}></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather
              name="user-x"
              color={"red"}
              size={25}
              style={styles.transactionIcon}
            />
            <Text style={styles.transactionText}>Identité non validé !</Text>
          </View>
          <LottieView
            source={require("../assets/echec.json")}
            loop={false}
            autoPlay
            style={{ width: "80%", height: "80%", alignSelf: "center" }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    height: "100%",
  },
  operationReussie: {
    borderWidth: 0.5,
    borderColor: "gray",
    width: "85%",
    height: "50%",
    borderRadius: 15,
    backgroundColor: "rgba(24, 21, 38, 0.8)",
  },
  decorationView: {
    width: "85%",
    borderWidth: 2,
    borderColor: "red",
    alignSelf: "center",
    marginTop: "6%",
  },
  transactionText: {
    fontFamily: "OnestBold",
    color: "whitesmoke",
    fontSize: 18,
    marginTop: "5%",
    textAlign: "center",
    marginLeft: "2%",
  },
  transactionIcon: {
    fontFamily: "OnestBold",
    color: "whitesmoke",
    fontSize: 18,
    marginTop: "5%",
    textAlign: "center",
  },
});
export default UserCanceled;
