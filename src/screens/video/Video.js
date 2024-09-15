import React, { useState, useRef, useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Video, Audio } from "expo-av";
import VideoButtons from "./components/VideoButtons";
import { sizes } from "../../constans/sizes";
import axios from "axios"; // Import axios for data fetching

const Media = ({ route }) => {
  if (route.params?.selectedVideo) {
    var { selectedVideo } = route.params;
  }
  const [data, setData] = useState([]);
  const [videoUri, setVideoUri] = useState(null);
  const videoRef = useRef(null);
  const soundRef = useRef(new Audio.Sound()); // Reference for audio control
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://66acf2fdf009b9d5c733eeea.mockapi.io/api/v1/videos"
      );
      setData(response.data);
      // Set videoUri to the first item's URL if data is available
      if (response.data.length > 0) {
        setVideoUri(response.data[0].urls.mp4);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadAndPlayAudio = async () => {
    try {
      if (selectedVideo?.urls?.hls?.files?.[0]) {
        await soundRef.current.loadAsync(
          { uri: selectedVideo.urls.hls.files[0] }, // HLS audio source
          { shouldPlay: true, isLooping: true } // Auto-start and loop
        );
      }
    } catch (error) {
      console.log("Audio loading failed: ", error);
    }
  };

  const stopAudio = async () => {
    try {
      await soundRef.current.stopAsync();
    } catch (error) {
      console.log("Failed to stop audio: ", error);
    }
  };

  useEffect(() => {
    if (!selectedVideo) {
      getData(); // Fetch data if selectedVideo is undefined
    } else {
      setVideoUri(selectedVideo.urls.mp4);
    }
  }, [selectedVideo]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Media</Text>
        <Image
          source={require("../../assets/icons/camera-outline.png")}
          style={styles.headerIcon}
        />
      </View>

      {isLoading && ( // Show loading spinner if the video is buffering or not playing
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      {videoUri && (
        <Video
          ref={videoRef}
          source={{ uri: videoUri }} // Video source
          resizeMode="stretch"
          style={styles.video}
          shouldPlay // Auto-start video playback
          isLooping // Video loops continuously
          onPlaybackStatusUpdate={(status) => {
            if (status.isPlaying) {
              setIsLoading(false); // Remove loading indicator when video starts
            } else {
              setIsLoading(true); // Show loading when video is paused
            }
          }}
        />
      )}

      <VideoButtons data={selectedVideo || data[0]} />
    </View>
  );
};

export default Media;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    top: 50,
    width: "100%",
    paddingHorizontal: sizes.paddingHorizontal,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "600",
  },
  headerIcon: {
    width: 27,
    height: 16,
    resizeMode: "contain",
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for loader
    zIndex: 3, // Ensure loader appears above video
  },
});
