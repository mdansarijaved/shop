import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/actions/product";
import { ReadonlyURLSearchParams } from "next/navigation";

export function useProducts(searchParams: ReadonlyURLSearchParams) {
  const params = Object.fromEntries(searchParams.entries());

  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
}
