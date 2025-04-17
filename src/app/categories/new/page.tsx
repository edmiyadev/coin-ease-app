import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewCategoryForm } from "@/components/categories/new-category-form";

export const metadata: Metadata = {
  title: "Crear Categoria",
  description: "Crear una nueva categoria",
};

export default function NewBudgetPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/categories">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Nueva Categoria</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Categoria</CardTitle>
            <CardDescription>
              Completa los detalles de la nueva categoria.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewCategoryForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
