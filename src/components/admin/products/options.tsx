import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormData } from "./CreateNewProduct";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export const Options = () => {
  const form = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel className="text-base">Options</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: "", value: "" })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Options
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name={`options.${index}.type`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder="Option label" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`options.${index}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder="Value" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="mt-1 text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
