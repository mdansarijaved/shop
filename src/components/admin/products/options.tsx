import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormData } from "./CreateNewProduct";
import { MaterialType } from "@/enums";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const Options = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    name: "options",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Options
        </label>
        <button
          type="button"
          onClick={() => append({ cost: 0 })}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Options
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <div className="flex-1">
            <Input
              {...register(`options.${index}.type`)}
              placeholder="option label"
            />
          </div>

          <div className="flex-1">
            <Input
              type="number"
              {...register(`options.${index}.value`, {
                valueAsNumber: true,
              })}
              className="h-full py-2 block w-full rounded-md "
              placeholder="value"
            />
          </div>

          <button
            type="button"
            onClick={() => remove(index)}
            className="mt-1 p-2 text-red-600 hover:text-red-800"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
    </div>
  );
};
