import { Budget, columns } from "@/components/budgets/columns";
import { DataTable } from "@/components/budgets/data-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
// import { DataTable } from "@/components/data-table"; // example data-table

const budgetData: Budget[] = [
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
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      <div className="flex flex-col container mx-auto py-10">
        <div className="flex justify-end">
          <Button variant={"default"} className="mb-2" asChild>
            <Link href="/budgets/new" className="flex items-center justify-center">
              <Plus />
               Crear Presupuesto
            </Link>
          </Button>
        </div>
        <DataTable columns={columns} data={budgetData} />
      </div>
    </div>
  );
}
