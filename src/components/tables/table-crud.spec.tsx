import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableCrud from "./table-crud/table-crud";
import { FilterProvider } from "../../context/filter.context";

const mockColumns = [
  { key: "name", title: "Name" },
  { key: "age", title: "Age" },
];

const mockData = [
  { id: "1", name: "John Doe", age: "30" },
  { id: "2", name: "Jane Smith", age: "25" },
];

describe("TableCrud Component", () => {
  it("renders correctly with basic data", () => {
    render(
      <FilterProvider>
        <TableCrud title="Test Title" columns={mockColumns} data={mockData} />
      </FilterProvider>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("displays the correct number of rows", () => {
    render(
      <FilterProvider>
        <TableCrud title="Test Title" columns={mockColumns} data={mockData} />
      </FilterProvider>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockData.length);
  });

  it("renders correctly with inner data structure", () => {
    const innerColumns = [
      { key: "name", title: "Name" },
      { key: "age", title: "Age" },
      { key: "direccion.pais", title: "Pais" },
      { key: "direccion.estado", title: "Estado" },
      { key: "direccion.inner.code", title: "Codigo" },
    ];

    const innerData = [
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
          pais: "USA",
          estado: "Florida",
          inner: { code: "1562" },
        },
      },
    ];

    render(
      <FilterProvider>
        <TableCrud
          title="Inner Data Test"
          columns={innerColumns}
          data={innerData}
        />
      </FilterProvider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Venezuela")).toBeInTheDocument(); 
    expect(screen.getByText("1562")).toBeInTheDocument(); 
  });

  it("renders options column with action buttons", () => {
    const actionColumns = [
      { key: "name", title: "Name" },
      { key: "age", title: "Age" },
      {
        key: "options",
        title: "Opciones",
        component(userParams) {
          return (
            <>
              <button onClick={() => console.log("editar")}>Edit</button>
              <button onClick={() => console.log("eliminar")}>Remove</button>
            </>
          );
        },
      },
    ];

    const actionData = [
      { id: "1", name: "John Doe", age: "30" },
      { id: "2", name: "Jane Smith", age: "25" },
    ];

    render(
      <FilterProvider>
        <TableCrud
          title="Action Buttons Test"
          columns={actionColumns}
          data={actionData}
        />
      </FilterProvider>
    );

    const editBtns = screen.getAllByText("Edit");
    const deleteBtns = screen.getAllByText("Remove");

    expect(editBtns.length).toBe(2)
    expect(deleteBtns.length).toBe(2)

    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);
  });
});
