import React from "react";
import TableCrud from "./table-crud/table-crud";
import { StoryFn } from "@storybook/react/*";
import { FilterProvider } from "../../context/filter.context";
import { EditButton } from "../buttons/edit-button";
import { RemoveButton } from "../buttons/remove-button";

interface person {
  id: string;
  name: string;
  age: string;
  direccion: {
    pais: string;
    estado: string;
    inner: {
      code: string;
    };
  };
}

const generateMockData = (numEntries: number) => {
  return Array.from({ length: numEntries }, (_, index) => ({
    id: (index + 1).toString(),
    name: `Person ${index + 1}`,
    age: Math.floor(Math.random() * 100).toString(), // Random age between 0 and 99
  }));
};

export default {
  title: "Components/TableCrud",
  component: TableCrud,
};

const Template: StoryFn<any> = (args: any) => (
  <FilterProvider>
    <TableCrud {...args} />
  </FilterProvider>
);

export const Default = Template.bind({});
Default.args = {
  title: "Sample Data",
  columns: [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
  ],
  data: [
    { id: "1", name: "John Doe", age: "30" },
    { id: "2", name: "Jane Smith", age: "25" },
  ],
};

export const LargeData = Template.bind({});
LargeData.args = {
  title: "Sample Large Data",
  columns: [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
  ],
  data: generateMockData(600),
};

export const InnerData = Template.bind({});
InnerData.args = {
  title: "Sample Data",
  columns: [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    { key: "direccion.pais", title: "Pais" },
    { key: "direccion.estado", title: "Estado" },
    { key: "direccion.inner.code", title: "Codigo" },
  ],
  data: [
    {
      id: "1",
      name: "John Doe",
      age: "30",
      direccion: {
        pais: "Venezuela",
        estado: "Nueva Esparta",
        inner: { code: "ás" },
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      age: "25",
      direccion: {
        pais: "Venezuela",
        estado: "Nueva Esparta",
        inner: { code: "ás" },
      },
    },
  ],
};

export const onShowFnData = Template.bind({});
onShowFnData.args = {
  title: "Sample Data",
  columns: [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    {
      key: "direccion",
      title: "Direccion",
      onShow: (data: any) => {
        const obj = data as person;
        return `${obj.direccion.pais} / ${obj.direccion.estado} /  ${obj.direccion.inner.code} `;
      },
    },
  ],
  data: [
    {
      id: "1",
      name: "John Doe",
      age: "30",
      direccion: {
        pais: "Venezuela",
        estado: "Nueva Esparta",
        inner: { code: "ás" },
      },
    },
    {
      id: "2",
      name: "Jane Smith",
      age: "25",
      direccion: {
        pais: "Venezuela",
        estado: "Nueva Esparta",
        inner: { code: "ás" },
      },
    },
  ],
};

export const componentRender = Template.bind({});
componentRender.args = {
  title: "Sample Data",
  columns: [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    {
      key: "options",
      title: "Opciones",
      component(userParams: unknown) {
        return (
          <>
            <EditButton onClick={() => alert('editar')} />
            <RemoveButton onClick={() => alert('eliminar')} />
          </>
        );
      },
    },
  ],
  data: [
    {
      id: "1",
      name: "John Doe",
      age: "30",
    },
    {
      id: "2",
      name: "Jane Smith",
      age: "25",
    },
  ],
};
