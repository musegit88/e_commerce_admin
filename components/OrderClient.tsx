"use client";

import React from "react";
import Heading from "./Reusable_ui/Heading";
import { Image, CloudCog, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter, useParams } from "next/navigation";

import { DataTable } from "./Reusable_ui/DataTable";
import ApiList from "./Reusable_ui/ApiList";
import { OrderColumn, OrderColumns } from "./Table/OrderColumns";
interface OrderClientProps {
  data: OrderColumn[];
}

const BillboardClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage Orders"
          icon={Image}
        />
      </div>
      <Separator />
      <DataTable columns={OrderColumns} data={data} searchKey="id" />
      
    </>
  );
};

export default BillboardClient;
