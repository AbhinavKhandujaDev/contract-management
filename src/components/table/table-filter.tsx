import React from "react";
import { OptionSelect } from "../ui/select";
import { Input } from "../ui/input";
import statuses from "./statuses.json";
import { Column } from "@tanstack/react-table";

const placeholders: any = {
  id: "Enter Id",
  name: "Enter client name",
  status: "Select status",
};

const TableFilter = (props: { column: Column<any, unknown> }) => {
  const { id, setFilterValue, getIsSorted } = props.column;
  if (id === "id" || id === "name") {
    return (
      <Input
        placeholder={placeholders[id]}
        onChange={(e) => setFilterValue(e.target.value)}
        type={id === "id" ? "number" : "text"}
      />
    );
  }

  return (
    <OptionSelect
      selected="all"
      onValueChange={(value) => setFilterValue(value != "all" ? value : "")}
      opts={[{ id: "all", title: "All" }, ...statuses]}
    />
  );
};

export default TableFilter;
