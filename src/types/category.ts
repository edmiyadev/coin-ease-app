export type Category = {
  id: string;
  name: string;
  description?: string;
  typeTransaction: "ingreso" | "gasto";
  typeFrecuency: "fijo" | "variable";
};