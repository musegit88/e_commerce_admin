"use client";
import { Category, Product, Size, Color, Image } from "@prisma/client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "./Reusable_ui/Heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/AlertModal";
import { useOrigin } from "@/hooks/useOrigin";
import { ImagePlus } from "lucide-react";
import ImageUploader from "./Reusable_ui/ImageUploader";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least one character" }),
  images: z.object({ url: z.string() }).array(),
  categoryId: z.string().min(1, { message: "" }),
  sizeId: z.string().min(1, { message: "" }),
  colorId: z.string().min(1, { message: "" }),
  price: z.coerce.number().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: (Product & { images: Image[] }) | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
}) => {
  const params = useParams();
  // console.log(params);//Testing
  const router = useRouter();
  // console.log(router); //Testing
  const origin = useOrigin();
  // console.log(origin);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData
    ? "Edit a product for your store"
    : "Create a product for your store";
  const toastMessage = initialData ? "Product updated" : "product created";
  const action = initialData ? "Save" : "Create";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? { ...initialData, price: parseFloat(String(initialData?.price)) }
      : {
          name: "",
          images: [],
          categoryId: "",
          sizeId: "",
          colorId: "",
          price: 0,
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    // console.log(data)//Testing
    try {
      setLoading(true);
      {
        initialData
          ? await axios.patch(
              `/api/${params.storeId}/products/${params.productId}`,
              data
            )
          : await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/products/${params.productId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} icon={ImagePlus} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUploader
                    disabled={loading}
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name of the product"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          <div className="flex items-center gap-x-2">
                            {color.name}
                            <div
                              className="w-4 h-4 border rounded-md"
                              style={{ backgroundColor: color.name }}
                            />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-2">
                      <Input
                        placeholder="Price of the product"
                        disabled={loading}
                        {...field}
                        type="number"
                      />
                      <div className="flex items-center p-2 h-10 rounded-md border bg-muted pointer-none">
                        $
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="flex gap-x-2"> */}
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>

                    <div className="space-y-1 leading-none"><FormLabel>Featured</FormLabel><FormDescription>This product will appear in the homepage</FormDescription></div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none"><FormLabel>Archived</FormLabel><FormDescription>This product will not appear on the store</FormDescription></div>
                  </FormItem>
                )}
              />
            {/* </div> */}
          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;

