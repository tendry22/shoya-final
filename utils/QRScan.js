import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import { StyleSheet } from "react-native";
import { Button } from "react-native";

const QRScan = () => {
  const [displayText, setDisplayText] = useState("");
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    // pick an image from gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // if the user successfully picks an image then we check if the image has a QR code
    if (result && result.assets[0].uri) {
      try {
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );

        const dataNeeded = scannedResults[0].data;
        setDisplayText(dataNeeded);
      } catch (error) {
        // if there this no QR code
        setDisplayText("No QR Code Found");
        setTimeout(() => setDisplayText(""), 4000);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        style={{ flex: 1 }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(...args) => {
          const data = args[0].data;
          let result = JSON.stringify(data);
          setDisplayText(result);
        }}
      />
      <View style={styles.boxContainer}>
        <View style={{ marginBottom: 50 }}>
          <Text
            style={{
              height: 40,
              width: 300,
              backgroundColor: "white",
              marginBottom: 20,
            }}
          >
            {displayText}
          </Text>
          <Button title="Pick from gallery" onPress={pickImage} />
        </View>
      </View>

      <View style={styles.scanBoxContainer}>
        <View style={styles.scanBox}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  scanBoxContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    zIndex: 0,
  },
  scanBox: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default QRScan;
