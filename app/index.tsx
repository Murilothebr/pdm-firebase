import { View, Text, TextInput, StyleSheet, Alert, ImageBackground } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import FormInput from "@/components/form/FormInput";
import FormButton from "@/components/form/FormButton";
import { Spacing } from "@/consts/spacing";
import { Colors } from "@/consts/colors";
import FullScreen from "@/components/containers/FullScreen";
import { Image } from 'expo-image';

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (username != "teste") {
      Alert.alert(
        "Usuario não registrado",
        "Certifique-se de que seu usuario está registrado",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );

      return;
    }

    if (password != "123") {
      Alert.alert(
        "Senha incorreta",
        "Certifique-se de que seu senha está correta",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );

      return;
    }

    router.replace("/home");
  };

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    
  return (
    <FullScreen>

      <Image
        source={{ uri: "https://www.lojacarros.com.br/static/images/loja-carros.png" }}
        style={styles.logo}
        placeholder={blurhash}
      />

      <FormInput
        label="Username"
        value={username}
        onChangeText={setUsername}
      />

      <FormInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <FormButton onPress={handleLogin} title="Login!" />

      <Link style={styles.registerLink} href="/register">
        Novo por aqui? Registre-se!
      </Link>

    </FullScreen>
  );
}

const styles = StyleSheet.create({

  imageContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo: {
    width: 200,
    height: 150,
    marginBottom: Spacing.md,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    width: '100%',
    height: 10,
    backgroundColor: '#0553',
  },
  registerLink: {
    marginTop: Spacing.md,
    fontSize: 12,
    textAlign: "center",
  }
});
