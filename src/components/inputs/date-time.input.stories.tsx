import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { DateTimeInput, DateTimeInputProps } from "./date-time.input";
import { useForm } from "react-hook-form";
import { JSX } from "react/jsx-runtime";

export default {
  title: "Components/DateTimeInput",
  component: DateTimeInput,
} as Meta;

const Template: StoryFn<DateTimeInputProps> = (args: JSX.IntrinsicAttributes & DateTimeInputProps) => {
  const { register } = useForm();

  return <DateTimeInput {...args} register={register} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Select Date and Time",
  name: "dateTime",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Select Date and Time",
  name: "dateTime",
  error: { message: "This field is required", type: "" },
};