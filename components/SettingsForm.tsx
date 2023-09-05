"use client";
import { Store } from "@prisma/client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "./Heading";
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
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useParams, useRouter } from "next/navigation";
import AlertModal from "./modals/AlertModal";
import ApiAlert from "./ApiAlert";
import { useOrigin } from "@/hooks/useOrigin";
import { LucideIcon, Settings } from "lucide-react";


const formSchema = z.object({
  name: z
  .string()
    .min(1, { message: "Name must contain at least one character" }),
  });
  
  type SettingsFormValues = z.infer<typeof formSchema>;
  
  interface SettingsFormProps {
    initialData: Store;
  }
  
const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  // console.log(params);//Testing
  const router = useRouter();
  // console.log(router); //Testing
  const origin = useOrigin();
  // console.log(origin);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    // console.log(data)//Testing
    try {
      setLoading(true);
      const response = await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Stroe updated");
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
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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
        <Heading
          title="Settings"
          description="Manage your store settings"
          icon={Settings}
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
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
                    <Input placeholder="name" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        // with hooks
        description={`${origin}/api/${params.storeId}`}
        // Second method without hooks
        // description={`${window.location.origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
