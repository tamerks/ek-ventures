import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Avatar, Text, Card, Title, Paragraph } from "react-native-paper";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");

const Account = () => {
  const user = useSelector((state) => state.userReducer);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Avatar.Image
            size={width * 0.4}
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />
          <Title style={styles.name}>
            {user.name} {user.surname}
          </Title>
          <Paragraph style={styles.company}>{user.company}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 10,
    elevation: 5,
  },
  content: {
    alignItems: "center",
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  company: {
    fontSize: 16,
    color: "#555",
  },
});

export default Account;
