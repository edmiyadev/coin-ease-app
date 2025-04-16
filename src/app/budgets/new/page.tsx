import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewBudgetForm } from "@/components/budgets/new-budget-form"

export const metadata: Metadata = {
  title: "Crear Presupuesto",
  description: "Crear un nuevo presupuesto con gastos fijos y variables",
}

export default function NewBudgetPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/budgets">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Atrás</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Nuevo Presupuesto</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Presupuesto</CardTitle>
            <CardDescription>
              Crea un presupuesto con gastos fijos y variables para mejor control de tus finanzas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewBudgetForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

