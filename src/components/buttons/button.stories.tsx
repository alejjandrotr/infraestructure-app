// src/components/Buttons.stories.tsx
import React from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { OptionButton, OptionButtonProps } from "./option-button";
import { AddButton } from "./add-button";
import { EditButton } from "./edit-button";
import { RemoveButton } from "./remove-button";
import { StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/Buttons",
  component: OptionButton,
};

const TemplateOptionButton: StoryFn<OptionButtonProps> = (args) => (
  <BrowserRouter>
    <OptionButton {...args} />
  </BrowserRouter>
);
const TemplateAddButton: StoryFn<{ title: string; onClick: () => void }> = (
  args
) => (
  <BrowserRouter>
    <AddButton {...args} />
  </BrowserRouter>
);
const TemplateEditButton: StoryFn<OptionButtonProps> = (args) => (
  <BrowserRouter>
    <EditButton {...args} />
  </BrowserRouter>
);
const TemplateRemoveButton: StoryFn<OptionButtonProps> = (args) => (
  <BrowserRouter>
    <RemoveButton {...args} />
  </BrowserRouter>
);

export const DefaultOptionButton = TemplateOptionButton.bind({});
DefaultOptionButton.args = {
  Icon: FaEdit,
  onClick: () => alert("Option Button Clicked"),
};

export const DefaultAddButton = TemplateAddButton.bind({});
DefaultAddButton.args = {
  title: "Item",
  onClick: () => alert("Add Button Clicked"),
};

export const DefaultEditButton = TemplateEditButton.bind({});
DefaultEditButton.args = {
  onClick: () => alert("Edit Button Clicked"),
};

export const DefaultRemoveButton = TemplateRemoveButton.bind({});
DefaultRemoveButton.args = {
  onClick: () => alert("Remove Button Clicked"),
};
