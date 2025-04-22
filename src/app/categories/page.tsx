"use client";

import { useState } from "react";
import { columns } from "@/components/categories/columns";
import { DataTable } from "@/components/categories/data-table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/category";

// import { DataTable } from "@/components/data-table"; // example data-table

const initialCategoryData: Category[] = [
  {
    id: "1",
    name: "Alimentación",
    description: "Gastos relacionados con la alimentación",
    typeTransaction: "Gasto",
    typeFrecuency: "Fijo",
  },
  {
    id: "2",
    name: "Transporte",
    description: "Gastos relacionados con el transporte",
    typeTransaction: "Gasto",
    typeFrecuency: "Fijo",
  },
  {
    id: "3",
    name: "Salidas y Entretenimiento",
    description: "Gastos relacionados con el entretenimiento",
    typeTransaction: "Gasto",
    typeFrecuency: "Variable",
  },
  {
    id: "4",
    name: "Salud",
    description: "Gastos relacionados con la salud",
    typeTransaction: "Gasto",
    typeFrecuency: "Fijo",
  },
  {
    id: "5",
    name: "Educación",
    description: "Gastos relacionados con la educación",
    typeTransaction: "Gasto",
    typeFrecuency: "Fijo",
  },
];

export default function CategoryPage() {
  const [categoriesData, setCategoriesData] =
    useState<Category[]>(initialCategoryData);

  const columnsWithActions: ColumnDef<Category>[] = [
    ...columns,
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link
              href={`/categories/${row.original.id}`}
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
      setCategoriesData((prevData) =>
        prevData.filter((category) => category.id !== id)
      );

      toast.success("Categoria eliminado con éxito");
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      <div className="flex flex-col container mx-auto py-10">
        <div className="flex justify-end">
          <Button variant={"default"} className="mb-2" asChild>
            <Link
              href="/categories/new"
              className="flex items-center justify-center"
            >
              <Plus />
              Crear Categoria
            </Link>
          </Button>
        </div>
        <DataTable columns={columnsWithActions} data={categoriesData} />
      </div>
    </div>
  );
}
