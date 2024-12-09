import React from "react";
import Loader from "./index";
import { StoryFn } from "@storybook/react/";

export default {
  title: "Components/Loader",
  component: Loader,
};

const Template: StoryFn = () => <Loader />;

export const Default = Template.bind({});
Default.args = {};