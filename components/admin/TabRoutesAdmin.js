import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import * as Font from "expo-font";
import Logo from "../../assets/images/logobtn.png";
import { LinearGradient } from "expo-linear-gradient";

// import { Debut, Earn, Jeu, Setting, Tether, ConfirmDepot, ConfirmRetrait, PerfectMoney, ConfirmDepotPM, ConfirmRetraitPM, Payeer, ConfirmDepotPayeer, ConfirmRetraitPayeer, Skrill, ConfirmRetraitSkrill, Airtm, ConfirmRetraitAirtm, Reussi, Affiliation, Prochainement } from '../components/index';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import AdminCours from "../admin/cours/AdminCours";
import AdminAirtm from "../admin/airtm/AdminAirtm";
import AdminSkrill from "../admin/skrill/AdminSkrill";
import ValidationHistorySkrill from "../admin/skrill/ValidationHistorySkrill";
import AdminMenu from "../admin/menu/AdminMenu";
import AdminSolde from "../admin/solde/AdminSolde";
import Utilisateurs from "../admin/menu/Utilisateurs";
import Transaction from "../admin/menu/Transaction";
import ValidationHistory from "../admin/airtm/ValidationHistory";
import Bilan from "../admin/menu/Bilan";

// Image
import depotIcon from "../../assets/depotIcon.png";
import retraitIcon from "../../assets/retraitIcon.png";
import btnRetour from "../../assets/btnRetour.png";
import mvola from "../../assets/mvola.png";
import orangemoney from "../../assets/orangemoney.png";
import PayeerImage from "../../assets/pp.png";
import SkrillImage from "../../assets/skrill.png";
import AirtmImage from "../../assets/airtm.png";

import { NavigationContainer, useNavigation } from "@react-navigation/native";

const SoldeStack = createNativeStackNavigator();
const CoursStack = createNativeStackNavigator();
const AirtmStack = createNativeStackNavigator();
const SkrillStack = createNativeStackNavigator();
const ShoyaStack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

function EmptyScreen() {
  return <View></View>;
}

const TabRoutesAdmin = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Tab.Navigator
            screenOptions={{
              tabBarHideOnKeyboard: true,
              tabBarActiveTintColor: "#16daac", // Couleur de l'icône et du texte actifs
              tabBarInactiveTintColor: "#FFFF", // Couleur de l'icône et du texte inactifs
              tabBarLabelStyle: {
                fontSize: 11, // Taille du texte de l'onglet
              },
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#181526",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                paddingBottom: "2%",
                height: "9%",
              },
            }}
          >
            <Tab.Screen
              name="Solde"
              component={SoldeStackScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <IconEntypo name="wallet" size={25} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Cours"
              component={CoursStackScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <IconMaterial
                    name="chart-histogram"
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
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
                      <View style={styles1.modalContainer}>
                        <LinearGradient
                          colors={[
                            "rgba(22, 218, 172, 1)",
                            "rgba(182, 234, 92, 1)",
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={{
                            width: "85%",
                            height: "20%",
                            backgroundColor: "transparent",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              height: "80%",
                              width: "90%",
                              alignSelf: "center",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("AdminSkrill");
                              }}
                            >
                              <View
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 30,
                                  borderColor: "#ccc",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  source={SkrillImage}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    alignSelf: "center",
                                  }}
                                />
                                <Text
                                  style={{
                                    fontFamily: "OnestBold",
                                    marginTop: "5%",
                                    fontSize: 14,
                                  }}
                                >
                                  Skrill
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("AdminAirtm");
                              }}
                            >
                              <View
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 30,
                                  borderColor: "#ccc",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginLeft: 30,
                                }}
                              >
                                <Image
                                  source={AirtmImage}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    alignSelf: "center",
                                  }}
                                />
                                <Text
                                  style={{
                                    fontFamily: "OnestBold",
                                    marginTop: "5%",
                                    fontSize: 14,
                                  }}
                                >
                                  Airtm
                                </Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <View
                                style={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 30,
                                  borderColor: "#ccc",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginLeft: 30,
                                }}
                              >
                                <Image
                                  source={PayeerImage}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    alignSelf: "center",
                                  }}
                                />
                                <Text
                                  style={{
                                    fontFamily: "OnestBold",
                                    marginTop: "5%",
                                    fontSize: 14,
                                  }}
                                >
                                  Payeer
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </LinearGradient>
                        <View style={styles1.modalButtons}>
                          <TouchableOpacity
                            onPress={() => {
                              setModalVisible(false);
                            }}
                          >
                            <Image
                              source={btnRetour}
                              style={styles1.buttonRetour}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </TouchableOpacity>
                ),
              }}
            ></Tab.Screen>
            <Tab.Screen
              name="Utilisateurs"
              component={UserStackScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <IconEntypo name="users" size={25} color={color} />
                ),
              }}
            />

            <Tab.Screen
              name="Menu"
              component={MenuStackScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <IconEntypo name="menu" size={25} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </KeyboardAwareScrollView>
      </>
    </ImageBackground>
  );
};

export default TabRoutesAdmin;

function SoldeStackScreen() {
  return (
    <SoldeStack.Navigator>
      <SoldeStack.Screen
        name="SoldeAdmin"
        component={AdminSolde}
        options={{ headerShown: false, animation: "fade" }}
      />
      <SoldeStack.Screen
        name="AdminAirtm"
        component={AdminAirtm}
        options={{ headerShown: false, animation: "fade" }}
      />
    </SoldeStack.Navigator>
  );
}

function CoursStackScreen() {
  return (
    <CoursStack.Navigator>
      <CoursStack.Screen
        name="CoursAdmin"
        component={AdminCours}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </CoursStack.Navigator>
  );
}

function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="Utilisateurs"
        component={Utilisateurs}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </UserStack.Navigator>
  );
}

function AirtmStackScreen() {
  return (
    <AirtmStack.Navigator>
      <AirtmStack.Screen
        name="AirtmAdmin"
        component={AdminAirtm}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <AirtmStack.Screen
        name="ValidationHistory"
        component={ValidationHistory}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </AirtmStack.Navigator>
  );
}

function SkrillStackScreen() {
  return (
    <SkrillStack.Navigator>
      <SkrillStack.Screen
        name="SkrillAdmin"
        component={AdminSkrill}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <SkrillStack.Screen
        name="ValidationHistorySkrill"
        component={ValidationHistorySkrill}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </SkrillStack.Navigator>
  );
}

function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="MenuAdmin"
        component={AdminMenu}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />

      <MenuStack.Screen
        name="Transaction"
        component={Transaction}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <MenuStack.Screen
        name="Bilan"
        component={Bilan}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <MenuStack.Screen
        name="AdminAirtm"
        component={AdminAirtm}
        options={{ headerShown: false, animation: "fade" }}
      />
      <MenuStack.Screen
        name="AdminSkrill"
        component={AdminAirtm}
        options={{ headerShown: false, animation: "fade" }}
      />
      <MenuStack.Screen
        name="ValidationHistory"
        component={ValidationHistory}
        options={{ headerShown: false, animation: "fade" }}
      />
      <MenuStack.Screen
        name="ValidationHistorySkrill"
        component={ValidationHistorySkrill}
        options={{ headerShown: false, animation: "fade" }}
      />
      <MenuStack.Screen
        name="SkrillAdmin"
        component={AdminSkrill}
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </MenuStack.Navigator>
  );
}

const ModalBtn = () => {
  return <View></View>;
};

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
const styles1 = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  modalButtons: {
    justifyContent: "center",
    marginTop: 20,
  },
  modalButton: {
    alignItems: "center",
  },
  buttonRetour: {
    width: 65,
    height: 65,
  },
});
