import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";

const MediaList = () => {
  const [data, setData] = useState([]);
  const videoRefs = useRef([]);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://66acf2fdf009b9d5c733eeea.mockapi.io/api/v1/videos"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.button}
      onPress={() => {
        navigation.navigate("Video", { selectedVideo: item });
      }}
    >
      <Video
        ref={(ref) => {
          videoRefs.current[index] = ref;
        }}
        source={{ uri: item.urls.mp4 }} // MP4 dosyasını buraya yükledik
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        // shouldPlay={false} // Otomatik oynatmayı kapattık
        style={{ width: 209, height: 371, borderRadius: 12 }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MediaList;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: -16,
  },
  button: {
    height: 371,
    width: 209,
    borderRadius: 12,
    marginHorizontal: 5,
  },
});
