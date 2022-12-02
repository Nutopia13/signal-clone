import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@rneui/themed";
import { auth, db } from "../lib/firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  }, []);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        size={50}
        containerStyle={styles.avatar}
        rounded
        source={{
          uri:
            chatMessages?.[0]?.photoURL ||
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
          {/* Chat Message */}
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
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
