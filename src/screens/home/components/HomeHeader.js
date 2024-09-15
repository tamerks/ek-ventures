import React from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { DefaultColors } from "../../../constans/DefaultColors";

const { width, height } = Dimensions.get("window");

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../../../assets/ek-logo.png")}
          style={{
            width: 187,
            height: 32,
            resizeMode: "contain",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "30%",
          }}
        >
          <EvilIcons name="search" size={35} color={DefaultColors.iconBlack} />
          <Image
            source={require("../../../assets/icons/messages.png")}
            style={{
              width: 23,
              height: 23,
              resizeMode: "contain",
              alignSelf: "center",
            }}
          />
          <EvilIcons name="bell" size={35} color={DefaultColors.iconBlack} />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: 110,
    justifyContent: "flex-end",
    borderBottomWidth: 0.3,
    borderBottomColor: "#C9CCD1",
    paddingHorizontal: 10,
  },
});
