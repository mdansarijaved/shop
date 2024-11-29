import { useFieldArray, useFormContext } from "react-hook-form";
import { ProductFormData } from "./CreateNewProduct";
import { FeatureType } from "@/enums";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export const CreateFeatures = () => {
  const form = useFormContext<ProductFormData>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel className="text-base">Add Features of product</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({ featureType: FeatureType.COLOR, feature: "" })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Features
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name={`features.${index}.featureType`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`features.${index}.feature`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input {...field} placeholder="Feature" />
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
