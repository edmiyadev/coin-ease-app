"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryStore } from "@/store/CategoryStore";
import { Category } from "@/types/category";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(200).optional(),
  typeTransaction: z.enum(["ingreso", "gasto"]),
  typeFrecuency: z.enum(["fijo", "variable"]),
});

export function NewCategoryForm() {
  const router = useRouter();
  const addCategory = useCategoryStore((state) => state.addCategory);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      typeTransaction: "gasto",
      typeFrecuency: "fijo",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      typeTransaction: values.typeTransaction,
      typeFrecuency: values.typeFrecuency,
    };
    addCategory(newCategory);

    router.push("/categories");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2 grid-cols-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Nombre de la categoría"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-y-2">
                  <FormField
                    control={form.control}
                    name="typeTransaction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Transaccion</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ingreso">Ingreso</SelectItem>
                            <SelectItem value="gasto">Gasto</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-y-2">
                  <FormField
                    control={form.control}
                    name="typeFrecuency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Frecuencua</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fijo">Fijo</SelectItem>
                            <SelectItem value="variable">Variable</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Breve descripción de la categoría"
                        className="resize-none h-24"
                      />
                    </FormItem>
                  )}
                />
              </div>
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
    </Form>
  );
}
