import React from 'react';
import { TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type HeaderWithTitleProps = {
  title: string;
  actionSheetOptions: string[];
  HideThisPage: boolean;
};

const HeaderWithTitle = ({ title, actionSheetOptions, HideThisPage }: HeaderWithTitleProps) => {
  const onPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: actionSheetOptions,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Cancel button action
        } else if (buttonIndex === 1) {
          if (HideThisPage) {
            router.push(`/home`);
          } else {
            router.push(`/about`);
          }
        } else if (buttonIndex === 2) {
          router.replace("/");
        }
      },
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      testID="header-left-button" // Adicionando o testID aqui
    >
      <Ionicons name="menu-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default HeaderWithTitle;
