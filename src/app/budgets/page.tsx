"use client";

import { useState } from "react";
import { Budget, columns } from "@/components/budgets/columns";
import { DataTable } from "@/components/budgets/data-table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";

// import { DataTable } from "@/components/data-table"; // example data-table

const initialBudgetData: Budget[] = [
  {
    id: "1",
    budgetAmount: 1500,
    spentAmount: 1200,
    remainingAmount: 300,
    period: "Enero 2021",
  },
  {
    id: "2",
    budgetAmount: 600,
    spentAmount: 550,
    remainingAmount: 1000,
    period: "Enero 2023",
  },
  {
    id: "3",
    budgetAmount: 400,
    spentAmount: 380,
    remainingAmount: 800,
    period: "Marzo 2020",
  },
  {
    id: "4",
    budgetAmount: 200,
    spentAmount: 250,
    remainingAmount: 2100,
    period: "Abril 2023",
  },
  {
    id: "5",
    budgetAmount: 300,
    spentAmount: 290,
    remainingAmount: 2200,
    period: "Abril 2023",
  },
];

export default function BudgetsPage() {
  const [budgetData, setBudgetData] = useState<Budget[]>(initialBudgetData);

  const columnsWithActions: ColumnDef<Budget>[] = [
    ...columns,
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link
              href={`/budgets/${row.original.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <Pencil />
            </Link>
          </Button>

          <Button
            variant="ghost"
            onClick={() => handleDelete(row.original.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este presupuesto?")) {
      setBudgetData((prevData) =>
        prevData.filter((budget) => budget.id !== id)
      );

      toast.success("Presupuesto eliminado con éxito");
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      <div className="flex flex-col container mx-auto py-10">
        <div className="flex justify-end">
          <Button variant={"default"} className="mb-2" asChild>
            <Link
              href="/budgets/new"
              className="flex items-center justify-center"
            >
              <Plus />
              Crear Presupuesto
            </Link>
          </Button>
        </div>
        <DataTable columns={columnsWithActions} data={budgetData} />
      </div>
    </div>
  );
}
