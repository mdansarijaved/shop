import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormData } from "./CreateNewProduct";
import { FeatureType, MaterialType } from "@/enums";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const CreateFeatures = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    name: "features",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          Add Features of product
        </label>
        <button
          type="button"
          onClick={() =>
            append({ featureType: FeatureType.COLOR, feature: "" })
          }
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Features
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <div className="flex-1">
            <Select {...register(`features.${index}.featureType`)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(FeatureType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Input
              type="number"
              {...register(`features.${index}.feature`)}
              className="h-full py-2 block w-full rounded-md "
              placeholder="Cost"
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
