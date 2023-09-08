"use client";

import { useParams, useRouter } from "next/navigation";
import { CategoryColumn } from "./categoriesColumns";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, EditIcon, CopyIcon, DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import AlertModal from "../modals/AlertModal";

interface CategoryCellActionProps {
  data: CategoryColumn;
}

const CategoryCellAction: React.FC<CategoryCellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onUpdate = (id: string) => {
    router.push(`/${params.storeId}/categories/${id}`);
  };
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Copied");
  };
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${id}`);
      router.refresh();
      toast.success("Category deleted");
    } catch (error) {
      console.log(error);
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
        onConfirm={() => onDelete(data.id)}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Open menu</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <CopyIcon className="mr-2 w-4 h-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpdate(data.id)}>
            <EditIcon className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <DeleteIcon className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default CategoryCellAction;
