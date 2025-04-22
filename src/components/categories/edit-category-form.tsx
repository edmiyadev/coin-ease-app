"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Textarea } from "../ui/textarea";
import { Category } from "@/types/category";

// Sample category data - in a real app this would come from an API
const categoriesData: Record<string, Category> = {
  "1": {
    id: "1",
    name: "Alimentos",
    description: "Gastos relacionados con comida y alimentación",
    typeTransaction: "gasto",
    typeFrecuency: "variable",
  },
  "2": {
    id: "2",
    name: "Salario",
    description: "Ingresos por trabajo",
    typeTransaction: "ingreso",
    typeFrecuency: "fijo",
  },
};

export function EditCategoryForm() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params?.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [typeTransaction, setTypeTransaction] = useState("");
  const [typeFrecuency, setTypeFrecuency] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchCategory = () => {
      setIsLoading(true);
      try {
        // Simulate loading data
        setTimeout(() => {
          const categoryData = categoriesData[categoryId];
          
          if (categoryData) {
            setName(categoryData.name);
            setDescription(categoryData.description);
            setTypeTransaction(categoryData.typeTransaction);
            setTypeFrecuency(categoryData.typeFrecuency);
          } else {
            toast.error("No se encontró la categoría");
            router.push("/categories");
          }
          
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error al cargar la categoría:", error);
        toast.error("Error al cargar la categoría");
        setIsLoading(false);
      }
    };
    
    fetchCategory();
  }, [categoryId, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would be an API call to update the category
    toast.promise(
      // Simulating an async operation
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: "Actualizando categoría...",
        success: "¡Categoría actualizada exitosamente!",
        error: "Error al actualizar la categoría",
      }
    );
    
    setTimeout(() => {
      router.push("/categories");
    }, 1500);
  };

  if (isLoading) {
    return <div className="py-10 text-center">Cargando categoría...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
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
                value={typeTransaction}
                onValueChange={(value) => setTypeTransaction(value)}
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
                value={typeFrecuency}
                onValueChange={(value) => setTypeFrecuency(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar frecuencia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fijo">Fijo</SelectItem>
                  <SelectItem value="variable">Variable</SelectItem>
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
            Actualizar Categoría
          </Button>
        </div>
      </div>
    </form>
  );
}
