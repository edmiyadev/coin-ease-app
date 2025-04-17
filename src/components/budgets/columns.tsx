"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

type Month =
  | "Enero"
  | "Febrero"
  | "Marzo"
  | "Abril"
  | "Mayo"
  | "Junio"
  | "Julio"
  | "Agosto"
  | "Septiembre"
  | "Octubre"
  | "Noviembre"
  | "Diciembre";
type Year = number;

type Period = `${Month} ${Year}`;

export type Budget = {
  id: string;
  budgetAmount: number;
  spentAmount: number;
  remainingAmount: number;
  period: Period;
};

export const columns: ColumnDef<Budget>[] = [
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
    accessorKey: "period",
    header: () => <div className="text-left">Periodo</div>,
    cell: ({ row }) => {
      const period = row.getValue("period") as Period;
      return <div className="text-left font-medium ">{period}</div>;
    },
  },
  {
    accessorKey: "budgetAmount",
    header: () => <div className="text-left">Presupuesto</div>,
    cell: ({ row }) => {
      const budgetAmount = parseFloat(row.getValue("budgetAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(budgetAmount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "spentAmount",
    header: () => <div className="text-left">Gastado</div>,
    cell: ({ row }) => {
      const spentAmount = parseFloat(row.getValue("spentAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(spentAmount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "remainingAmount",
    header: () => <div className="text-left">Restante</div>,
    cell: ({ row }) => {
      const remainingAmount = parseFloat(row.getValue("remainingAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(remainingAmount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];
