import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import axios from "axios";
import VideoButtons from "./components/VideoButtons";

const { height: windowHeight } = Dimensions.get("window");

const Media = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);
  const flatListRef = useRef(null);

  const { selectedVideo } = route.params || {};

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://66acf2fdf009b9d5c733eeea.mockapi.io/api/v1/videos"
      );
      setData(response.data);

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
  }, [selectedVideo]);

  // Scroll the list when the active video changes
  useEffect(() => {
    if (data.length > 0 && activeVideoIndex !== null && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: activeVideoIndex,
        animated: false,
      });
    }
  }, [data, activeVideoIndex]);

  // Update the active video index when the visible item changes
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setActiveVideoIndex(index);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80, // Activate when 80% of the video is visible
  };

  // Preload the next video
  const preloadNextVideo = useCallback(
    (index) => {
      if (index + 1 < data.length) {
        const nextVideo = data[index + 1];
        // const videoSource = nextVideo.urls.hls?.playlist || nextVideo.urls.mp4;
        const videoSource = nextVideo.urls.mp4;

        videoRefs.current[index + 1]?.loadAsync(
          { uri: videoSource },
          {},
          false
        );
      }
    },
    [data]
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      const videoSource = item.urls.mp4;

      return (
        <View style={styles.videoContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}
          <Video
            ref={(ref) => (videoRefs.current[index] = ref)}
            source={{
              uri: videoSource,
              shouldCache: true,
            }}
            resizeMode="contain"
            style={styles.video}
            shouldPlay={index === activeVideoIndex} //  Only the active video is played
            isLooping
            onLoad={() => {
              preloadNextVideo(index);
            }}
            onPlaybackStatusUpdate={(status) => {
              // Show loading when the video is paused
              if (status.isPlaying) {
                setLoading(false);
              } else {
                setLoading(true);
              }
            }}
            onError={(error) => console.log(error)}
          />

          <VideoButtons data={item} />
        </View>
      );
    },
    [activeVideoIndex, loading, preloadNextVideo]
  );

  return (
    <View style={styles.safeArea}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(data, index) => ({
          length: windowHeight,
          offset: windowHeight * index,
          index,
        })}
        snapToInterval={windowHeight} // EShow only one video that covers the screen
        snapToAlignment="start"
        removeClippedSubviews={true} // Unmount off-screen videos
        maxToRenderPerBatch={1} //  Only one video is rendered at a time
        windowSize={2} //  Only the next video is preloaded
        decelerationRate={Platform.OS === "ios" ? "fast" : "normal"}
      />
    </View>
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});
