import React from "react";
import { SearchComponent, SearchComponentProps } from "./search-component";
import { JSX } from "react/jsx-runtime";
import { StoryFn } from "@storybook/react/*";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/SearchComponent",
  component: SearchComponent,
};

const Template: StoryFn<SearchComponentProps> = (
  args: SearchComponentProps
) => (
  <BrowserRouter>
    <SearchComponent {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
  title: "Add Item",
  onSearch: (searchTerm) => console.log("Searching for:", searchTerm),
  onAdd: () => console.log("Add button clicked"),
};

export const WithAdvancedSearch = Template.bind({});
WithAdvancedSearch.args = {
  title: "Add Item",
  onSearch: (searchTerm) => console.log("Searching for:", searchTerm),
  onAdd: () => console.log("Add button clicked"),
  children: (
    <div>
      <input
        type="text"
        placeholder="Advanced Search Field"
        className="border rounded-md p-2 w-full"
      />
    </div>
  ),
};
