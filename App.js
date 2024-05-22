import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Connexion from "./components/Authentification/Connexion";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./utils/LoadingScreen";
import { useFonts } from "expo-font";
import SeConnecter from "./components/Authentification/SeConnecter";
import CreateWallet from "./components/Authentification/CreateWallet";
import MailValidation from "./components/Authentification/MailValidation";
import PinValidation from "./components/Authentification/PinValidation";
import VerificationLoading from "./utils/VerificationLoading";
import ConnectWallet from "./components/Authentification/ConnecWallet";
import PinConnection from "./components/Authentification/PinConnection";
import TabBarRoute from "./components/MenuPrincipal/TabBarRoute";
import TabRoutesAdmin from "./components/admin/TabRoutesAdmin";
import HomeAdminConnexion from "./components/Authentification/HomeAdminConnexion";
import MailValidationConnexion from "./components/Authentification/MailValidationConnexion";

import ValidationNumero from "./components/admin/menu/ValidationNumero";

import QRScan from "./utils/QRScan";
import NetInfo from "@react-native-community/netinfo";
import { Alert, BackHandler } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    OnestBold: require("./assets/fonts/OnestBold1602-hint.ttf"),
    OnestRegular: require("./assets/fonts/OnestRegular1602-hint.ttf"),
    PoppinsSemi: require("./assets/fonts/Poppins-SemiBold.ttf"),
    OnestMedium: require("./assets/fonts/OnestMedium1602-hint.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemi: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const [isConnected, setIsConnected] = useState(true); // par défaut, on suppose que l'utilisateur est connecté
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isConnected) {
      // Si l'utilisateur n'est pas connecté, afficher une alerte
      Alert.alert(
        "Connexion impossible",
        "Veuillez vérifier que vous êtes connecté à Internet.",
        [
          {
            text: "OK",
            onPress: () => {
              // Fermer l'application lors de l'appui sur "OK"
              BackHandler.exitApp();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Connexion"
          component={Connexion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SeConnecter"
          component={SeConnecter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateWallet"
          component={CreateWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MailValidation"
          component={MailValidation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MailValidationConnexion"
          component={MailValidationConnexion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PinValidation"
          component={PinValidation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerificationLoading"
          component={VerificationLoading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConnectWallet"
          component={ConnectWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PinConnection"
          component={PinConnection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeAdminConnexion"
          component={HomeAdminConnexion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabBarRoute"
          component={TabBarRoute}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabRoutesAdmin"
          component={TabRoutesAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRScan"
          component={QRScan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ValidationNumero"
          component={ValidationNumero}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
