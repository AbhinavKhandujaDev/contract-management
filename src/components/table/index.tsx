"use client";

import { useState } from "react";
import statuses from "./statuses.json";

import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OptionSelect } from "../ui/select";
import TableFilter from "./table-filter";
import { ArrowDown, ArrowUp } from "lucide-react";

const SortButton = (props: { column: Column<any, unknown> }) => {
  const { getIsSorted } = props.column;

  const sorted = getIsSorted();

  return (
    <div className="flex flex-col px-3">
      <label>
        <ArrowUp
          className={`${
            sorted === "asc" ? "text-black" : "text-gray-300"
          } cursor-pointer select-none`}
          size="15"
        />
      </label>
      <label>
        <ArrowDown
          className={`${
            sorted === "desc" ? "text-black" : "text-gray-300"
          } cursor-pointer select-none`}
          size="15"
        />
      </label>
    </div>
  );
};

type Contract = {
  id: string;
  name: string;
  status: string;
};

const defaultData: Contract[] = [
  {
    id: "1",
    name: "Rahul Mahajan",
    status: "1",
  },
  {
    id: "2",
    name: "Ajay Juneja",
    status: "1",
  },
  {
    id: "3",
    name: "Abhinav Khanduja",
    status: "2",
  },
];

const columnHelper = createColumnHelper<Contract>();

const columns = [
  columnHelper.accessor("id", {
    header: () => <span className="font-extrabold">ID</span>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span className="font-extrabold">Client Name</span>,
  }),
  columnHelper.accessor("status", {
    header: () => <span className="font-extrabold">Status</span>,
    cell: (info) => (
      <div>
        <OptionSelect selected={info.getValue()} opts={statuses} />
      </div>
    ),
    footer: (info) => info.column.id,
  }),
];

function ReactTable() {
  const [data, _setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-5 w-full">
      <Table className="w-full border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className="border-r border-l py-2" key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex justify-between items-center"
                          : "flex justify-between items-center",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div onClick={(e) => e.stopPropagation()}>
                            <TableFilter column={header.column} />
                          </div>
                        ) : null}
                      </div>
                      <SortButton column={header.column} />
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell className="border-r border-l" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ReactTable;
