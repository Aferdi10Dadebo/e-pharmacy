import React from "react";

import { FormControl, Input, TextArea } from "native-base";

export const CustomInput = (props) => {
  const { label } = props;

  return (
    <FormControl {...props}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        {...props}
        variant="filled"
        bg="white"
        size="lg"
        fontFamily={"regular"}
        placeholderTextColor={"#000"}
      />
    </FormControl>
  );
};

export const CustomTextArea = (props) => {
  const { label } = props;

  <FormControl {...props}w='100%' bg='red.100' p={4}>
    <FormControl.Label>{label}</FormControl.Label>
    <TextArea
      {...props}
      variant="filled"
      bg="white"
      size="lg"
      fontFamily={"regular"}
      placeholderTextColor={"#000"}
    />
  </FormControl>;
};


