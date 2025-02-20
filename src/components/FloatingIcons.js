import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FloatingIcons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon name="heart" size={24} color="white" />
        <Text style={styles.text}>4.2k</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="shopping-outline" size={24} color="white" />
        <Text style={styles.text}>Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="send" size={24} color="white" />
        <Text style={styles.text}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="bookmark-outline" size={24} color="white" />
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    top: "30%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
    width: 60,
  },
  text: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
});

export default FloatingIcons;
