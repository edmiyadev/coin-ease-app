"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/types/category";

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Nombre</div>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <div className="text-left font-medium ">{name}</div>;
    },
  },
  {
    accessorKey: "typeTransaction",
    header: () => <div className="text-left">Tipo</div>,
    cell: ({ row }) => {
      const typeTransaction = row.getValue("typeTransaction") as string;
      return <div className="text-left font-medium ">{typeTransaction}</div>;
    },
  },
  {
    accessorKey: "typeFrecuency",
    header: () => <div className="text-left">Frecuencia</div>,
    cell: ({ row }) => {
      const typeFrecuency = row.getValue("typeFrecuency") as string;
      return <div className="text-left font-medium ">{typeFrecuency}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Descripcion</div>,
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <div className="text-left font-medium ">{description}</div>;
    },
  },
];
