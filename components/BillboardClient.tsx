"use client";

import React from "react";
import Heading from "./Reusable_ui/Heading";
import { Image, CloudCog, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter, useParams } from "next/navigation";

import { BillboardColumn, columns } from "./BillboardTable/columns";
import { DataTable } from "./Reusable_ui/DataTable";
import ApiList from "./Reusable_ui/ApiList";
interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards"
          icon={Image}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="lable" />
      <Heading
        title="API"
        description="API routes for Billboards"
        icon={CloudCog}
      />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillboardClient;
