import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { DefaultColors } from "../../../constans/DefaultColors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MediaList from "./MediaList";

const MediaCard = () => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome5 name="play" size={15} color="#000000" />
        <Text
          style={{
            color: DefaultColors.text,
            fontWeight: "600",
            fontSize: 20,
            marginLeft: 10,
          }}
        >
          Media
        </Text>
      </View>

      <MediaList />
    </View>
  );
};

export default MediaCard;

const styles = StyleSheet.create({});
