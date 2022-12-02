import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Button, Input, Text } from "@rneui/themed";
import { auth } from "../lib/firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerBackTitle: "Back to Login",
      }[navigation]
    );
  });
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || `https://robohash.org/${auth.currentUser}.png`,
        });
      })

      .catch((error) => alert(error.message));
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputCont}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          onChangeText={(text) => {
            setName(text);
          }}
          value={name}
        />
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Input
          placeholder="Password"
          autoFocus
          secureTextEntry
          type="password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          autoFocus
          type="text"
          onChangeText={(text) => {
            setImageUrl(text);
          }}
          value={imageUrl}
          onSubmitEditing={register}
        />
      </View>
      <Button
        raised
        containerStyle={styles.button}
        onPress={register}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputCont: {
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});
