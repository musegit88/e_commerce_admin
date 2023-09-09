"use client";

import React from "react";
import Heading from "./Reusable_ui/Heading";
import { CloudCog, Plus, GridIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter, useParams } from "next/navigation";

import { DataTable } from "./Reusable_ui/DataTable";
import ApiList from "./Reusable_ui/ApiList";
import { SizeColumn, sizesColumns } from "./Table/sizesColumns";
interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes"
          icon={GridIcon}
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={sizesColumns} data={data} searchKey="name" />
      <Heading title="API" description="API routes for Sizes" icon={CloudCog} />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizeClient;
