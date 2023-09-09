"use client";

import React from "react";
import Heading from "./Reusable_ui/Heading";
import { CloudCog, Plus, Paintbrush2 } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter, useParams } from "next/navigation";

import { DataTable } from "./Reusable_ui/DataTable";
import ApiList from "./Reusable_ui/ApiList";
import { ColorColumn, colorsColumns } from "./Table/colorsColumns ";
interface ColorClientProps {
  data: ColorColumn[];
}

const SizeClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage sizes"
          icon={Paintbrush2}
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={colorsColumns} data={data} searchKey="name" />
      <Heading
        title="API"
        description="API routes for Colors"
        icon={CloudCog}
      />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

export default SizeClient;
