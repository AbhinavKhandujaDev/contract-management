import React, { useState } from "react";
import { OptionSelect } from "../ui/select";
import { Input } from "../ui/input";
import statuses from "./statuses.json";
import { CellContext, Column, ColumnDef } from "@tanstack/react-table";
import { Contract } from "@/lib/types";
import { Button, ButtonLoading } from "../ui/button";
import { DeleteIcon, Trash } from "lucide-react";
import useContract from "@/hooks/useContract";

const placeholders: any = {
  id: "Enter Id",
  name: "Enter client name",
  status: "Select status",
};

const DeleteButton = (props: { id: string; onDelete: () => void }) => {
  const { onDelete, id } = props;
  const { del } = useContract();

  const [deleting, setDelete] = useState(false);

  const handleClick = () => {
    setDelete(true);
    del(id)
      .then(() => onDelete())
      .finally(() => setDelete(false));
  };

  return (
    <div className="w-full grid place-items-center">
      <ButtonLoading
        loading={deleting}
        className="bg-red-500"
        onClick={handleClick}
      >
        <Trash className="text-white" />
      </ButtonLoading>
    </div>
  );
};

const CustomTableCell = (props: CellContext<Contract, unknown>) => {
  const { getValue, row, column, table } = props;

  const { index, original } = row;
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
  if (colId === "status") {
    return (
      <OptionSelect
        selected={getValue() as any}
        onValueChange={(value) =>
          table.options.meta?.updateData(index, colId, value)
        }
        opts={statuses}
      />
    );
  }

  return (
    <DeleteButton
      id={original.id}
      onDelete={() => table.options.meta?.updateData(index, colId, "")}
    />
  );
};

export default CustomTableCell;
