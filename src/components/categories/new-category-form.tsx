"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
import { Textarea } from "../ui/textarea";

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

export function NewCategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeTransaction, setTypeTransaction] = useState("");
  const [typeFrecuency, setTypeFrecuency] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //todo: implement budget creation logic
    router.push("/categories");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la categoría"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-y-2">
              <Label htmlFor="typeTransaction">Tipo</Label>
              <Select
                onValueChange={(value) => setTypeTransaction(value)}
                defaultValue={typeTransaction}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingreso">Ingreso</SelectItem>
                  <SelectItem value="gasto">Gasto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-y-2">
              <Label htmlFor="typeFrecuency">Frecuencia</Label>
              <Select
                onValueChange={(value) => setTypeFrecuency(value)}
                defaultValue={typeFrecuency}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Fijo</SelectItem>
                  <SelectItem value="semanal">Variable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción de la categoría"
              className="resize-none h-24"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:space-x-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/categories")}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Guardar Categoría
          </Button>
        </div>
      </div>
    </form>
  );
}
