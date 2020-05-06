import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export function Test({ callback, url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitLogin = () => {
    axios.post(url, {
        email,
        password,
    })
      .then((res) => callback(res.json()))
      .catch((err) => callback(err));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flex: 6,
            justifyContent: "center",
          }}
        >
          <Text>Email*</Text>
          <TextInput
            style={styles.email}
            keyboardType="email-address"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text style={{ marginTop: 15 }}>Password*</Text>
          <TextInput
            style={styles.password}
            secureTextEntry={true}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <View>
            <TouchableOpacity
              onPress={() => submitLogin()}
              style={styles.buttonLogin}
            >
              <Text style={{ color: "#ffffff" }}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.buttonfindPassword}>Find ID/Password</Text>
          </View>
        </View>

        <View style={{ flex: 3,justifyContent: "center", }}>
          <View style={styles.LoginOrther}>
            <TouchableOpacity style={styles.LoginNaver}>
              <Text
                style={{ color: "orange", fontWeight: "bold", fontSize: 15 }}
              >
                N <Text>Log in with Naver?</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.LoginFacebook}>
              <Text
                style={{ color: "orange", fontWeight: "bold", fontSize: 15 }}
              >
                f <Text>Log in with Facebook</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.redireactLink}>
            <Text>
              Your first time here?{" "}
              <Text style={{ color: "blue" }}>Sign up</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  email: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#cdcdcd",
    borderStyle: "solid",
    fontSize: 18,
  },
  password: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#cdcdcd",
    borderStyle: "solid",
    fontSize: 18,
  },
  buttonLogin: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    lineHeight: 40,
    borderRadius: 5,
    marginTop: 15,
    backgroundColor: "red",
  },
  buttonfindPassword: {
    textAlign: "center",
    marginTop: 10,
  },
  LoginOrther: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 50,
  },
  LoginNaver: {
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    lineHeight: 40,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },
  LoginFacebook: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 15,
    height: 40,
    lineHeight: 40,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
  },
  redireactLink: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
