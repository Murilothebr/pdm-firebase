import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/consts/colors";
import { Spacing } from "@/consts/spacing";
import { AntDesign } from '@expo/vector-icons';

type FormInput = {
  label?: string;
} & TextInputProps;

export default function PasswordFormInput({ label, ...rest }: FormInput) {
  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, focus && styles.focusContainer]}>
      {label && (
        <Text style={[styles.label, focus && styles.focus]}>{label}</Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          {...rest}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          secureTextEntry={!showPassword}
          style={styles.input} // Added style prop
        />

        <AntDesign
          name={showPassword ? "eye" : "eyeo"}
          size={26}
          color="black"
          style={styles.icon}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  container: {
    marginLeft: 15,
    marginTop: 30,
    padding: 4,
    width: "85%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 16,
    color: 'gray'
  },
  focus: {
    color: Colors.primary,
    fontWeight: "bold",
  },
  focusContainer: {
    borderBottomColor: Colors.primary,
  },
  icon: {

  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
});
