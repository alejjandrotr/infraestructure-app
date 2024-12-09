import React from "react";
import SelectCRUD, { SelectCRUDProps } from "./select-crud";
import { useForm, SubmitHandler } from "react-hook-form";
import { StoryFn } from "@storybook/react/*";

export default {
  title: "Components/SelectCRUD",
  component: SelectCRUD,
};

const Template: StoryFn<SelectCRUDProps> = (args: SelectCRUDProps) => {
  const { register, handleSubmit } = useForm();
  
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    alert(JSON.stringify(data)); // Display submitted data for demonstration
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectCRUD {...args} register={register} />
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Select an Option",
  name: "selectOption",
  options: [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
  ],
  isOptionSelected: false,
};

