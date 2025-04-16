"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useExpenses } from "@/hooks/budgets/useExpenses";
import { SelectMonthYear } from "../select-month-year";

// Categorías de ejemplo para gastos
const expenseCategories = [
  { value: "vivienda", label: "Vivienda" },
  { value: "alimentacion", label: "Alimentación" },
  { value: "transporte", label: "Transporte" },
  { value: "servicios", label: "Servicios" },
  { value: "salud", label: "Salud" },
  { value: "educacion", label: "Educación" },
  { value: "entretenimiento", label: "Entretenimiento" },
  { value: "ahorro", label: "Ahorro" },
  { value: "deudas", label: "Deudas" },
  { value: "otros", label: "Otros" },
];

type ExpenseProps = {
  title: string;
  description: string;
  totalExpenses: number;
  expenses: Expense[];
  removeExpense: (id: string) => void;
  updateExpense: (id: string, field: string, value: string) => void;
  addExpense: () => void;
};

export type Expense = {
  id: string;
  category: string;
  amount: string;
  description: string;
};

// Ejemplo de presupuestos para obtener por ID - simula una base de datos
const budgetsData: Record<string, {
  id: string;
  period: string;
  description: string;
  fixedExpenses: Expense[];
  variableExpenses: Expense[];
}> = {
  "1": {
    id: "1",
    period: "Enero 2021",
    description: "Presupuesto mensual de enero",
    fixedExpenses: [
      { id: "f1", category: "vivienda", amount: "800", description: "Alquiler" },
      { id: "f2", category: "servicios", amount: "150", description: "Luz y agua" },
    ],
    variableExpenses: [
      { id: "v1", category: "alimentacion", amount: "250", description: "Comida" },
    ],
  },
  "2": {
    id: "2",
    period: "Enero 2023",
    description: "Presupuesto de inicio de año",
    fixedExpenses: [
      { id: "f1", category: "vivienda", amount: "850", description: "Alquiler" },
    ],
    variableExpenses: [
      { id: "v1", category: "entretenimiento", amount: "100", description: "Netflix" },
      { id: "v2", category: "otros", amount: "50", description: "Imprevistos" },
    ],
  },
};

export function EditBudgetForm() {
  const router = useRouter();
  const params = useParams();
  const budgetId = params?.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("");

  const {
    expenses: fixedExpenses,
    addExpense: addFixedExpense,
    removeExpense: removeFixedExpense,
    updateExpense: updateFixedExpense,
    total: totalFixedExpenses,
    setExpenses: setFixedExpenses,
  } = useExpenses([]);

  const {
    expenses: variableExpenses,
    addExpense: addVariableExpense,
    removeExpense: removeVariableExpense,
    updateExpense: updateVariableExpense,
    total: totalVariableExpenses,
    setExpenses: setVariableExpenses,
  } = useExpenses([]);

  useEffect(() => {
    // En una aplicación real, esto sería una llamada a una API
    const fetchBudget = () => {
      setIsLoading(true);
      try {
        // Simular carga de datos
        setTimeout(() => {
          const budgetData = budgetsData[budgetId];
          
          if (budgetData) {
            setDescription(budgetData.description);
            setPeriod(budgetData.period);
            
            // Inicializar los gastos fijos y variables
            if (budgetData.fixedExpenses.length > 0) {
              setFixedExpenses(budgetData.fixedExpenses);
            }
            
            if (budgetData.variableExpenses.length > 0) {
              setVariableExpenses(budgetData.variableExpenses);
            }
            toast.error("Presupuesto cargado exitosamente");

          } else {
            toast.error("No se encontró el presupuesto");
            router.push("/budgets");
          }
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error al cargar el presupuesto:", error);
        toast.error("Error al cargar el presupuesto");
        setIsLoading(false);
      }
    };

    fetchBudget();
  }, [budgetId, router, setFixedExpenses, setVariableExpenses]);

  const totalExpenses = totalFixedExpenses + totalVariableExpenses;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // En una aplicación real, aquí se enviarían los datos actualizados a la API
    toast.promise(
      // Simulando una operación asíncrona
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Actualizando presupuesto...",
        success: "¡Presupuesto actualizado exitosamente!",
        error: "Error al actualizar el presupuesto",
      }
    );
    
    setTimeout(() => {
      router.push("/budgets");
    }, 1500);
  };

  const ExpenseFixedProps = {
    title: "Gastos Fijos",
    description: "Gastos que se mantienen constantes cada mes",
    totalExpenses: totalFixedExpenses,
    expenses: fixedExpenses,
    removeExpense: removeFixedExpense,
    updateExpense: updateFixedExpense,
    addExpense: addFixedExpense,
  };

  const ExpenseVariableProps = {
    title: "Gastos Variables",
    description: "Gastos que pueden variar cada mes",
    totalExpenses: totalVariableExpenses,
    expenses: variableExpenses,
    removeExpense: removeVariableExpense,
    updateExpense: updateVariableExpense,
    addExpense: addVariableExpense,
  };

  if (isLoading) {
    return <div className="py-10 text-center">Cargando presupuesto...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información general del presupuesto */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="date">Mes y Año</Label>
            <SelectMonthYear initialValue={period} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descripción de este presupuesto"
          />
        </div>
      </div>

      <Separator />

      <CardExpense {...ExpenseFixedProps} />
      <CardExpense {...ExpenseVariableProps} />

      <Card>
        <CardHeader>
          <CardTitle>Resumen del Presupuesto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">Gastos Fijos</h4>
                <div className="text-2xl font-bold">
                  ${totalFixedExpenses.toFixed(2)}
                </div>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">Gastos Variables</h4>
                <div className="text-2xl font-bold">
                  ${totalVariableExpenses.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/20">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xl text-blue-600">
                  Balance Final
                </h4>
                <div className="text-2xl font-bold text-blue-600">
                  ${totalExpenses.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:space-x-2">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("/budgets")}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
        <Button type="submit" className="w-full sm:w-auto">
          Actualizar Presupuesto
        </Button>
      </div>
    </form>
  );
}

const CardExpense = ({
  title,
  description,
  totalExpenses,
  expenses,
  removeExpense,
  updateExpense,
  addExpense,
}: ExpenseProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge variant="default" className="ml-auto">
            Total: ${totalExpenses.toFixed(2)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="rounded-lg border bg-card text-card-foreground p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExpense(expense.id)}
                  disabled={expenses.length <= 1}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Eliminar gasto</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor={`category-${expense.id}`}>
                    Categoría
                  </Label>
                  <Select
                    value={expense.category}
                    onValueChange={(value) =>
                      updateExpense(expense.id, "category", value)
                    }
                  >
                    <SelectTrigger id={`category-${expense.id}`}>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`amount-${expense.id}`}>Monto</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id={`amount-${expense.id}`}
                      type="number"
                      min={0}
                      value={expense.amount}
                      onChange={(e) =>
                        updateExpense(expense.id, "amount", e.target.value)
                      }
                      placeholder="0.00"
                      className="pl-7"
                      step="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${expense.id}`}>
                    Descripción
                  </Label>
                  <Input
                    id={`description-${expense.id}`}
                    value={expense.description}
                    onChange={(e) =>
                      updateExpense(expense.id, "description", e.target.value)
                    }
                    placeholder="Descripción (opcional)"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full mt-2 flex items-center justify-center"
            onClick={addExpense}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar {title}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
