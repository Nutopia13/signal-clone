import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { auth } from "../lib/firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        size={50}
        containerStyle={styles.avatar}
        rounded
        source={{
          uri:
            //   chatMessages?.[0]?.photoURL ||
            `https://robohash.org/${auth.currentUser}.png`,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {/* Chat Title */}
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle
          style={styles.subtitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Abc
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#2C6BED",
  },
  subtitle: {
    color: "grey",
    marginTop: 5,
  },
});
