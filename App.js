// App.js

import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ModalComponent from "./components/ModalComponent";

export default function App() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Show Modal" onPress={toggleModal} />
      <ModalComponent isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
