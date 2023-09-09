"use client";

import React, { useState } from "react";
import { SizeColumn } from "./sizesColumns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, CopyIcon, DeleteIcon, EditIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AlertModal from "@/components/modals/AlertModal";

interface SizeCellActioinProps {
  data: SizeColumn;
}
const SizeCellAction: React.FC<SizeCellActioinProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Copied");
  };
  //or
  // const onCopy = (id:string) => {
  //   navigator.clipboard.writeText(id);
  //   toast.success("Copied");
  // };
  const onUpdate = (id: string) => {
    router.push(`/${params.storeId}/sizes/${id}`);
  };
  // const onDelete = (id: string) => {
  //   router.push(`/${params.storeId}/billboards/${id}`);
  // };
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${id}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Size deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false)
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Open menu</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onCopy}
            // or onClick={()=>navigator.clipboard.writeText(data.id)}
          >
            <CopyIcon className="w-4 h-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdate(data.id)}>
            <EditIcon className="w-4 h-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <DeleteIcon className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SizeCellAction;
