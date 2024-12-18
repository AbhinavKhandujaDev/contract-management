"use client";

import { useEffect, useState } from "react";

import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
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
import TableFilter from "./table-filter";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Contract } from "../../lib/types";
import useContract from "@/hooks/useContract";
import CustomTableCell from "./custom-table-cell";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

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

const columnHelper = createColumnHelper<Contract>();

const columns = [
  columnHelper.accessor("id", {
    header: () => <span className="font-extrabold">ID</span>,
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("name", {
    id: "name",
    cell: (info) => <CustomTableCell {...info} />,
    header: () => <span className="font-extrabold">Client Name</span>,
  }),
  columnHelper.accessor("status", {
    header: () => <span className="font-extrabold">Status</span>,
    cell: (info) => <CustomTableCell {...info} />,
    footer: (info) => info.column.id,
  }),
];

function ReactTable() {
  const [data, setData] = useState<Contract[]>([]);

  const { getAll, socket, update } = useContract();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        const row = data[rowIndex];
        const { id } = row;
        update(id, { [columnId]: value });
        setData((prev) => {
          const temp = [...prev];
          temp[rowIndex] = { ...temp[rowIndex], [columnId]: value };
          return temp;
        });
      },
    },
  });

  useEffect(() => {
    (async () => {
      const data = await getAll();
      setData(data);
    })();

    if (!socket) return;
    socket.onmessage = (evt: any) => {
      try {
        const json = JSON.parse(evt.data);
        const { data, type } = json;

        if (type === "add") {
          const contract = data as Contract;
          setData((prev) => [...prev, contract]);
        }
        if (type === "upd") {
          const contract = data as Contract;
          setData((prev) => {
            const temp = prev;
            const idx = temp.findIndex(({ id }) => id === contract.id);
            temp[idx] = contract;
            return temp;
          });
        }
        if (type === "del") {
          const contractId = data as string;
          setData((prev) => {
            const temp = prev;
            const idx = temp.findIndex(({ id }) => id === contractId);
            temp.splice(idx, 1);
            return temp;
          });
        }
      } catch (error) {}
    };

    return () => socket.close();
  }, []);

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
