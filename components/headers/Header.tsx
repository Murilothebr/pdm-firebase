import { View, Text, TouchableOpacity, ActionSheetIOS } from "react-native";
import React from "react";
import { Stack, router, useNavigation } from "expo-router";
import Icon from 'react-native-ionicons'
import { Ionicons } from "@expo/vector-icons"; // Assuming you have Ionicons installed
import { DrawerActions } from "@react-navigation/native";

type HeaderWithTitleProps = {
  title: string;
  HideThisPage: boolean;
  actionSheetOptions: string[],
};

export default function HeaderWithTitle({ title, actionSheetOptions, HideThisPage }: HeaderWithTitleProps) {

  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionSheetOptions,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
        } else if (buttonIndex === 1) {
          if(HideThisPage)
          {
            router.push(`/home`);
            return;
          }
            
          router.push(`/about`);
        } else if (buttonIndex === 2) {
          router.replace("/");
        }
      },
    );
  }

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title,
        headerLeft: () => (
          <TouchableOpacity
            onPress={onPress}
          >
            <Ionicons name="menu-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
