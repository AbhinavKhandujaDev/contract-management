import React from "react";
import { OptionSelect } from "../ui/select";
import { Input } from "../ui/input";
import statuses from "./statuses.json";
import { CellContext, Column, ColumnDef } from "@tanstack/react-table";
import { Contract } from "@/lib/types";

const placeholders: any = {
  id: "Enter Id",
  name: "Enter client name",
  status: "Select status",
};

const CustomTableCell = (props: CellContext<Contract, unknown>) => {
  const { getValue, row, column, table } = props;

  const { index } = row;
  const { id: colId } = column;

  if (colId === "id" || colId === "name") {
    return (
      <Input
        defaultValue={getValue() as any}
        placeholder={placeholders[colId]}
        onBlur={(e) =>
          table.options.meta?.updateData(index, colId, e.target.value)
        }
        type={colId === "id" ? "number" : "text"}
      />
    );
  }

  return (
    <OptionSelect
      selected={getValue() as any}
      onValueChange={(value) =>
        table.options.meta?.updateData(index, colId, value)
      }
      opts={statuses}
    />
  );
};

export default CustomTableCell;
