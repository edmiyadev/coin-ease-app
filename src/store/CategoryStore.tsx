import { Category } from "@/types/category";
import { create } from "zustand";

type CategoryState = {
  categories: Category[];
  category: Category | null;
  addCategory: (category: Category) => void;
  deleteCategory: (id: Category["id"]) => void;
  findCategoryById: (id: Category["id"]) => void;
  updateCategory: (updatedCategory: Category) => void;
};

const initialCategoryData: Category[] = [
  {
    id: "1",
    name: "Alimentación",
    description: "Gastos relacionados con la alimentación",
    typeTransaction: "gasto",
    typeFrecuency: "fijo",
  },
  {
    id: "2",
    name: "Transporte",
    description: "Gastos relacionados con el transporte",
    typeTransaction: "gasto",
    typeFrecuency: "fijo",
  },
  {
    id: "3",
    name: "Salidas y Entretenimiento",
    description: "Gastos relacionados con el entretenimiento",
    typeTransaction: "gasto",
    typeFrecuency: "variable",
  },
];

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  category: null,
  addCategory: (category: Category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),
  deleteCategory: (id: Category["id"]) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
  findCategoryById: (id: Category["id"]) =>
    set((state) => ({
      category: state.categories.find((category) => category.id === id),
    })),
  updateCategory: (updatedCategory: Category) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    })),
}));
