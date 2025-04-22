import { Category } from "@/types/category";
import { create } from "zustand";

type CategoryState = {
  categories: Category[];
  addCategory: (category: Category) => void;
  deleteCategory: (id: Category['id']) => void;
};

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
];

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: initialCategoryData,
  addCategory: (category: Category) => 
    set((state) => ({ 
      categories: [...state.categories, category] 
    })),
    deleteCategory: (id: Category['id']) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));
