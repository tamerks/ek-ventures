import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HomeHeader from "./components/HomeHeader";
import { DefaultColors } from "../../constans/DefaultColors";
import { sizes } from "../../constans/sizes";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import MediaCard from "./components/MediaCard";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.userReducer);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView>
        <View style={{ paddingHorizontal: sizes.paddingHorizontal }}>
          <Text
            style={{
              color: DefaultColors.text,
              fontWeight: "bold",
              fontSize: 22,
              alignSelf: "center",
              marginTop: 15,
            }}
          >
            Hello {user.name},
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: DefaultColors.text,
              fontWeight: "500",
              marginTop: 15,
            }}
          >
            Please tap below
          </Text>

          <TouchableOpacity style={styles.button}>
            <View
              style={{
                backgroundColor: DefaultColors.green,
                height: "100%",
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="heartbeat" size={26} color="#FFFFFF" />
            </View>

            <View>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: DefaultColors.text,
                }}
              >
                Large font title
              </Text>
              <Text
                style={{
                  color: DefaultColors.text,
                  fontSize: 14,
                  fontWeight: "400",
                  marginTop: 2,
                }}
              >
                Sub-title 💎💎💎{" "}
              </Text>
            </View>

            <EvilIcons
              name="chevron-right"
              size={35}
              color={DefaultColors.iconBlack}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>

          <View
            style={{
              height: 0.3,
              width: "100%",
              backgroundColor: "#C9CCD1",
              marginTop: 15,
              marginBottom: 20,
            }}
          />

          <MediaCard />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 100,
              backgroundColor: DefaultColors.blue,
              height: 40,
              borderRadius: 6,
            }}
          >
            <Image
              source={require("../../assets/icons/camera.png")}
              style={{
                width: 21,
                height: 21,
                marginRight: 10,
                resizeMode: "contain",
              }}
            />
            <Text
              style={{
                color: "#FFFFFF",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultColors.background,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 63,
    backgroundColor: "#F9BA0514",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 15,
  },
});
