import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Home, Earn, Games, Settings } from "./screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../assets/images/logobtn.png";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tether from "../TransactionCard/Tether/Tether";
import ConfirmDepot from "../TransactionCard/Tether/ConfirmDepot";
import ConfirmRetrait from "../TransactionCard/Tether/ConfirmRetrait";
import Reussi from "../TransactionCard/ReussiteEchec/Reussi";
import ConfirmDepotPM from "../TransactionCard/PerfectMoney/ConfirmDepotPM";
import ConfirmRetraitPM from "../TransactionCard/PerfectMoney/ConfirmRetraitPM";
import PerfectMoney from "../TransactionCard/PerfectMoney/PerfectMoney";
import Payeer from "../TransactionCard/Payeer/Payeer";
import ConfirmDepotPayeer from "../TransactionCard/Payeer/ConfirmDepotPayeer";
import ConfirmRetraitPayeer from "../TransactionCard/Payeer/ConfirmRetraitPayeer";
import Airtm from "../TransactionCard/Airtm/Airtm";
import ConfirmRetraitAirtm from "../TransactionCard/Airtm/ConfirmRetraitAirtm";
import ValidationAirtm from "../TransactionCard/Airtm/ValidationAirtm";
import Skrill from "../TransactionCard/Skrill/Skrill";
import ValidationSkrill from "../TransactionCard/Skrill/ValidationSkrill";
import ConfirmRetraitSkrill from "../TransactionCard/Skrill/ConfirmRetraitSkrill";
import Identity from "./Settings/Identity";
import Numero from "./Settings/Numero";
import AideAssistance from "./Settings/AideAssistance";
import Echec from "../TransactionCard/ReussiteEchec/Echec";
import ValidationPayeer from "../TransactionCard/Payeer/ValidationPayeer";
import { Modal } from "react-native";
import { useState } from "react";

// Image
import depotIcon from "../../assets/depotIcon.png";
import retraitIcon from "../../assets/retraitIcon.png";
import btnRetour from "../../assets/btnRetour.png";
import mvola from "../../assets/mvola.png";
import orangemoney from "../../assets/orangemoney.png";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import DepotMvola from "../mobilePayment/DepotMvola.js";
import DepotOrange from "../mobilePayment/DepotOrange.js";
import MvolaRetrait from "../mobilePayment/MvolaRetrait.js";
import TypeDeCompte from "../../utils/TypeDeCompte.js";

const HomeStack = createNativeStackNavigator();

const TabBarRoute = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const [modalOperateurVisible, setModalOperateurVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const openModalOperateur = () => {
    setModalOperateurVisible(true);
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#181526",
          position: "absolute",
          bottom: "2%",
          marginHorizontal: "3%",
          // width: "100%",
          height: "7%",
          borderRadius: 10,
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}
    >
      <Tab.Screen
        name={"HomeStack"}
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="home"
                size={25}
                color={focused ? "#16daac" : "#FFFF"}
              ></MaterialCommunityIcons>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={"Earn"}
        component={Earn}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="account-cash"
                size={25}
                color={focused ? "#16daac" : "#FFFF"}
              ></MaterialCommunityIcons>
            </View>
          ),
        }}
      ></Tab.Screen>

      {/* TabScreen action  */}
      <Tab.Screen
        name={"ActionButton"}
        component={EmptyScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "80%",
                }}
              >
                <Image source={Logo}></Image>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <LinearGradient
                    colors={["rgba(22, 218, 172, 1)", "rgba(182, 234, 92, 1)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalContent}
                  >
                    <View style={styles.modalButton}>
                      <Text style={styles.modalText}>Dépôt</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          openModalOperateur();
                          setModalVisible(false);
                        }}
                      >
                        <Image source={depotIcon} style={styles.buttonImage} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modalButton}>
                      <Text style={styles.modalText}>Retrait</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate("RetraitMvola");
                        }}
                      >
                        <Image
                          source={retraitIcon}
                          style={styles.buttonImage}
                        />
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}
                    >
                      <Image source={btnRetour} style={styles.buttonRetour} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              {/* Modal Operateur */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalOperateurVisible}
                onRequestClose={() => setModalOperateurVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <LinearGradient
                    colors={["rgba(22, 218, 172, 1)", "rgba(182, 234, 92, 1)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalContentO}
                  >
                    <View style={styles.modalButton}>
                      <Text style={styles.modalTextO}>Telma</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setModalOperateurVisible(false);
                          navigation.navigate("DepotMvola");
                        }}
                      >
                        <Image source={mvola} style={styles.buttonImageO} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.modalButton}>
                      <Text style={styles.modalTextO}>Orange</Text>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setModalOperateurVisible(false);
                          navigation.navigate("DepotOrange");
                        }}
                      >
                        <Image
                          source={orangemoney}
                          style={styles.buttonImageO}
                        />
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOperateurVisible(false);
                      }}
                    >
                      <Image source={btnRetour} style={styles.buttonRetour} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name={"Games"}
        component={Games}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="gamepad"
                size={25}
                color={focused ? "#16daac" : "#FFFF"}
              ></MaterialCommunityIcons>
            </View>
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name={"Settings"}
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialCommunityIcons
                name="menu"
                size={25}
                color={focused ? "#16daac" : "#FFFF"}
              ></MaterialCommunityIcons>
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

function EmptyScreen() {
  return <View></View>;
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false, animation: "fade" }}
      />
      <HomeStack.Screen
        name="Tether"
        component={Tether}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmDepot"
        component={ConfirmDepot}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmDepotPM"
        component={ConfirmDepotPM}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmRetrait"
        component={ConfirmRetrait}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmRetraitPM"
        component={ConfirmRetraitPM}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="Reussi"
        component={Reussi}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="Echec"
        component={Echec}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="PerfectMoney"
        component={PerfectMoney}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="Payeer"
        component={Payeer}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmDepotPayeer"
        component={ConfirmDepotPayeer}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmRetraitPayeer"
        component={ConfirmRetraitPayeer}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ValidationPayeer"
        component={ValidationPayeer}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="Airtm"
        component={Airtm}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="Skrill"
        component={Skrill}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmRetraitAirtm"
        component={ConfirmRetraitAirtm}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ValidationAirtm"
        component={ValidationAirtm}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ValidationSkrill"
        component={ValidationSkrill}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="ConfirmRetraitSkrill"
        component={ConfirmRetraitSkrill}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="Identity"
        component={Identity}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="Numero"
        component={Numero}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="AideAssistance"
        component={AideAssistance}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="DepotMvola"
        component={DepotMvola}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="DepotOrange"
        component={DepotMvola}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="RetraitMvola"
        component={MvolaRetrait}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <HomeStack.Screen
        name="TypeDeCompte"
        component={TypeDeCompte}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </HomeStack.Navigator>
  );
}

export default TabBarRoute;

// Styles
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "8%",
    width: "70%",
    height: "22%",
  },
  modalContentO: {
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "8%",
    width: "70%",
    height: "25%",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
  },
  modalButtons: {
    justifyContent: "center",
    marginTop: 20,
  },
  modalButton: {
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
  buttonImageO: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  buttonRetour: {
    width: 65,
    height: 65,
  },
  modalText: {
    fontSize: 22,
    color: "#FFF",
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: "OnestBold",
  },
  modalTextO: {
    fontSize: 16,
    color: "#FFF",
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: "OnestBold",
    color: "black",
  },
});
