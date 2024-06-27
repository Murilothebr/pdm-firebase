// HeaderWithTitle.test.jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HeaderWithTitle from "../../components/headers/Header";
import { ActionSheetIOS } from "react-native";
import { router } from "expo-router";
jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  RN.ActionSheetIOS = {
    showActionSheetWithOptions: jest.fn(),
  };
  return RN;
});

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock("react-native/Libraries/ActionSheetIOS/ActionSheetIOS", () => ({
  showActionSheetWithOptions: jest.fn((options, callback) => callback(1)), // Mocking selection of Option1
}));

describe("HeaderWithTitle", () => {
  const actionSheetOptions = ["Cancel", "Option1", "Delete"];
  const title = "Test Title";

  it("renders correctly and triggers ActionSheet on press", () => {
    const { getByTestId } = render(
      <HeaderWithTitle
        title={title}
        actionSheetOptions={actionSheetOptions}
        HideThisPage={false}
      />
    );

    const button = getByTestId("header-left-button");
    fireEvent.press(button);

    expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledTimes(1);
    expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        options: actionSheetOptions,
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
      }),
      expect.any(Function)
    );
  });

  it("navigates correctly based on ActionSheet selection", () => {
    const { getByTestId } = render(
      <HeaderWithTitle
        title={title}
        actionSheetOptions={actionSheetOptions}
        HideThisPage={false}
      />
    );

    const button = getByTestId("header-left-button");
    fireEvent.press(button);

    const callback = ActionSheetIOS.showActionSheetWithOptions.mock.calls[0][1];

    // Simulate ActionSheet button presses
    callback(0); // Cancel button
    expect(router.replace).not.toHaveBeenCalled();

    callback(1); // Option1
    expect(router.push).toHaveBeenCalledWith("/about");
    expect(router.replace).not.toHaveBeenCalled();

    callback(2); // Delete
    expect(router.replace).toHaveBeenCalledWith("/");
  });

  it("navigates to home when HideThisPage is true", () => {
    const { getByTestId } = render(
      <HeaderWithTitle
        title={title}
        actionSheetOptions={actionSheetOptions}
        HideThisPage={true}
      />
    );

    const button = getByTestId("header-left-button");
    fireEvent.press(button);

    const callback = ActionSheetIOS.showActionSheetWithOptions.mock.calls[0][1];

    // Simulate ActionSheet button press
    callback(1); // Option1
    expect(router.push).toHaveBeenCalledWith("/home");
  });
});
