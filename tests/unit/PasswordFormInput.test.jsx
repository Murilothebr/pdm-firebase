// PasswordFormInput.test.jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PasswordFormInput from "../../components/form/PasswordFormInput";

describe("PasswordFormInput", () => {
  const props = {
    label: "Password",
    onChangeText: jest.fn(),
    value: "",
  };

  it("renders label correctly", () => {
    const { getByText } = render(<PasswordFormInput {...props} />);
    const labelElement = getByText("Password");
    expect(labelElement).toBeTruthy();
  });

  it("renders secure TextInput by default", () => {
    const { getByTestId } = render(<PasswordFormInput {...props} />);
    const input = getByTestId("password-input");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("toggles secure TextInput when icon is pressed", () => {
    const { getByTestId } = render(<PasswordFormInput {...props} />);
    const eyeIcon = getByTestId("eye-icon");
    const input = getByTestId("password-input");

    fireEvent.press(eyeIcon);
    expect(input.props.secureTextEntry).toBe(false);

    fireEvent.press(eyeIcon);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("applies focus styles on focus and removes on blur", () => {
    const { getByTestId } = render(<PasswordFormInput {...props} />);
    const input = getByTestId("password-input");

    fireEvent(input, "focus");
    fireEvent(input, "blur");
  });
});
