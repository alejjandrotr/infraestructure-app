import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { InputText, InputProp } from "./InputText";
import { useForm, SubmitHandler } from "react-hook-form";

export default {
  title: "Components/InputText",
  component: InputText,
} as Meta<InputProp>;

const Template: StoryFn<InputProp> = (args) => {
  const { register, handleSubmit } = useForm();
  
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    alert(JSON.stringify(data)); // Display submitted data for demonstration
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText {...args} register={register} />
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Enter Text",
  name: "inputText",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Enter Number",
  name: "inputNumber",
  type: "number",
  error: { message: "This field is required", type: "" },
};