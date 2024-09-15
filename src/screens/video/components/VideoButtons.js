import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";

const VideoButtons = ({ data }) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
        <AntDesign
          name="heart"
          size={26}
          color={isLiked ? "#FF0000" : "#FFFFFF"}
        />
      </TouchableOpacity>
      <Text style={styles.text}>
        {!data?.likes_count
          ? "0"
          : data.likes_count > 10000
          ? (data.likes_count / 1000).toFixed(1) + " k"
          : data.likes_count}
      </Text>
      <TouchableOpacity style={{ marginTop: 15 }}>
        <Image
          source={require("../../../assets/icons/comments.png")}
          style={{
            width: 26,
            height: 26,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.text}>
        {!data?.comments_count
          ? "0"
          : data.comments_count > 10000
          ? (data.comments_count / 1000).toFixed(1) + " k"
          : data.comments_count}
      </Text>
      <Entypo
        name="dots-three-horizontal"
        size={15}
        color="#FFFFFF"
        style={{ marginTop: 15 }}
      />
    </View>
  );
};

export default VideoButtons;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 85,
    right: 10,
    alignItems: "center",
    zIndex: 2,
  },
  text: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
});
