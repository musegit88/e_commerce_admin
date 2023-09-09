"use client";
import { Color } from "@prisma/client";
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
import { PaintBucket } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must contain at least one character" }),
  value: z.string().min(4),
  // .regex(/^#/, { message: "String must be a valid hex code" }),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

const BillboardForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const params = useParams();
  // console.log(params);//Testing
  const router = useRouter();
  // console.log(router); //Testing
  const origin = useOrigin();
  // console.log(origin);

  const title = initialData ? "Edit color" : "Create color";
  const description = initialData
    ? "Edit a color for your store"
    : "Create a color for your store";
  const toastMessage = initialData ? "Color updated" : "Color created";
  const action = initialData ? "Save" : "Create";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: ColorFormValues) => {
    // console.log(data)//Testing
    try {
      setLoading(true);
      {
        initialData
          ? await axios.patch(
              `/api/${params.storeId}/colors/${params.colorId}`,
              data
            )
          : await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
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
        <Heading title={title} description={description} icon={PaintBucket} />
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
                    <Input
                      placeholder="color name"
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Input
                        placeholder="color value"
                        disabled={loading}
                        {...field}
                      />
                      <div
                        className="w-12 h-8 rounded-md border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
