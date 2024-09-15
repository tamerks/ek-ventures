import React from "react";
import { Text, View, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { DefaultColors } from "../constans/DefaultColors";
import TabHomeIcon from "../assets/icons/home-icon.svg";
import TabVideoIcon from "../assets/icons/media-icon.svg";
import TabGamesIcon from "../assets/icons/program-icon.svg";
import TabReportsIcon from "../assets/icons/stats-icon.svg";
import { useSelector } from "react-redux";

const icons = {
  Home: TabHomeIcon,
  Video: TabVideoIcon,
  Games: TabGamesIcon,
  Reports: TabReportsIcon,
};

export const BottomMenuItem = ({
  screenName,
  isCurrent,
  selectedScreenIndex,
}) => {
  const IconComponent = icons[screenName];

  const user = useSelector((state) => state.userReducer);

  const size = screenName === "Games" ? 25 : 24;

  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {IconComponent ? (
        <IconComponent
          width={size}
          height={size}
          fill={
            isCurrent
              ? screenName === "Video"
                ? "#ffffff"
                : DefaultColors.blue
              : "transparent"
          }
          stroke={
            isCurrent
              ? screenName === "Video"
                ? "#ffffff"
                : DefaultColors.blue
              : selectedScreenIndex === 1
              ? "#ffffff"
              : "#0A0A0A"
          }
          strokeWidth={
            screenName === "Home" || screenName === "Video" ? 1 : 0.5
          }
        />
      ) : (
        <Image
          source={{ uri: user.avatar }}
          style={{
            width: 28,
            height: 28,
            resizeMode: "contain",
            borderRadius: 14,
            borderWidth: 2,
            borderColor: DefaultColors.blue,
          }}
        />
      )}
      <Text
        style={{
          color: isCurrent
            ? selectedScreenIndex === 1
              ? "#ffffff"
              : DefaultColors.blue
            : selectedScreenIndex === 1
            ? "#ffffff"
            : "#0A0A0A",
          fontWeight: "400",
          marginTop: 3,
        }}
      >
        {screenName}
      </Text>
    </View>
  );
};
