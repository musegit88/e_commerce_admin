"use client";
import { Size } from "@prisma/client";
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
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/AlertModal";
import { useOrigin } from "@/hooks/useOrigin";
import { LucideIcon, ImagePlus } from "lucide-react";
import ImageUploader from "./Reusable_ui/ImageUploader";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least one character" }),
  value: z.string().min(1, { message: "" }),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

const BillboardForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  // console.log(params);//Testing
  const router = useRouter();
  // console.log(router); //Testing
  const origin = useOrigin();
  // console.log(origin);

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData
    ? "Edit a size for your store"
    : "Create a size for your store";
  const toastMessage = initialData ? "Size updated" : "Size created";
  const action = initialData ? "Save" : "Create";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    // console.log(data)//Testing
    try {
      setLoading(true);
      {
        initialData
          ? await axios.patch(
              `/api/${params.storeId}/sizes/${params.sizeId}`,
              data
            )
          : await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
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
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size deleted");
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
        <Heading title={title} description={description} icon={PlusCircle} />
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
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="Value" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
