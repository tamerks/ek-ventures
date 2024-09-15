import React from "react";
import { View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { DefaultColors } from "../constans/DefaultColors";
import TabHomeIcon from "../assets/icons/home-icon.svg";
import TabVideoIcon from "../assets/icons/media-icon.svg";
import TabGamesIcon from "../assets/icons/program-icon.svg";
import TabReportsIcon from "../assets/icons/stats-icon.svg";

// İkonları bir objede topluyoruz
const icons = {
  Home: TabHomeIcon,
  Video: TabVideoIcon,
  Games: TabGamesIcon,
  Reports: TabReportsIcon,
};

export const BottomMenuItem = ({ screenName, isCurrent }) => {
  const IconComponent = icons[screenName];
  const fillColor = isCurrent ? DefaultColors.primary : "none"; // Seçiliyse içi dolacak, değilse boş olacak
  const strokeColor = isCurrent
    ? DefaultColors.primary
    : DefaultColors.secondary; // Seçili değilse border rengi

  const size = screenName === "Games" ? 25 : 24;
  console.log(`screenName: ${screenName}, isCurrent: ${isCurrent}`);
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
              : "#0A0A0A"
          }
          strokeWidth={
            screenName === "Home" || screenName === "Video" ? 1 : 0.5
          } // Border kalınlığını ayarlamak için
        />
      ) : (
        <FontAwesome5
          name="user"
          size={24}
          color={isCurrent ? DefaultColors.blue : "#0A0A0A"}
        />
      )}
    </View>
  );
};
