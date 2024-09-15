import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import VideoButtons from "./components/VideoButtons";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: windowHeight } = Dimensions.get("window");

const Media = ({ route }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);

  // Route parametrelerinden selectedVideo'yu al
  const { selectedVideo } = route.params || {};

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://66acf2fdf009b9d5c733eeea.mockapi.io/api/v1/videos"
      );
      setData(response.data);

      // selectedVideo varsa, activeVideoIndex'i ayarla
      if (selectedVideo) {
        const initialIndex = response.data.findIndex(
          (video) => video.id === selectedVideo.id
        );
        setActiveVideoIndex(initialIndex >= 0 ? initialIndex : 0);
      } else {
        setActiveVideoIndex(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setActiveVideoIndex(index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref)}
        source={{ uri: item.urls.mp4 }}
        resizeMode="cover"
        style={styles.video}
        shouldPlay={index === activeVideoIndex}
        isLooping
        onPlaybackStatusUpdate={(status) => {
          if (status.isPlaying) {
            setIsLoading(false);
          } else {
            setIsLoading(true);
          }
        }}
      />

      <VideoButtons data={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        initialScrollIndex={activeVideoIndex} // İlk gösterilecek video
        getItemLayout={(data, index) => (
          { length: windowHeight, offset: windowHeight * index, index }
        )}
      />
    </SafeAreaView>
  );
};

export default Media;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Yarı saydam arka plan
    zIndex: 1,
  },
});
