"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function SelectMonthYear() {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "MMMM yyyy", { locale: es })
          ) : (
            <span>Seleccionar fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <Select
            value={date.getFullYear().toString()}
            onValueChange={(year) => {
              const newDate = new Date(date);
              newDate.setFullYear(parseInt(year));
              setDate(newDate);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() - 5 + i
              ).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) => {
              const monthDate = new Date();
              monthDate.setMonth(monthIndex);
              const monthName = format(monthDate, "MMMM", {
                locale: es,
              });
              const isSelected = date.getMonth() === monthIndex;

              return (
                <Button
                  key={monthIndex}
                  variant={isSelected ? "default" : "outline"}
                  className="capitalize"
                  onClick={() => {
                    const newDate = new Date(date);
                    newDate.setMonth(monthIndex);
                    // Establecer el día al 1 para consistencia
                    newDate.setDate(1);
                    setDate(newDate);
                  }}
                  type="button"
                >
                  {monthName.substring(0, 3)}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
