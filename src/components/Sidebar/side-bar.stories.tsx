import React from "react";
import Sidebar from "./index";
import { MemoryRouter } from "react-router-dom";
import { StoryFn } from "@storybook/react/*";
import { AuthProvider } from "../../core/Users/context/auth.context";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default {
  title: "Components/Sidebar",
  component: Sidebar,
};

const Template: StoryFn<SidebarProps> = (args: SidebarProps) => (
  <AuthProvider>
    <MemoryRouter>
      <Sidebar {...args} />
    </MemoryRouter>
  </AuthProvider>
);

export const Default = Template.bind({});
Default.args = {
  sidebarOpen: true,
  setSidebarOpen: (open) => console.log("Sidebar open:", open),
};
