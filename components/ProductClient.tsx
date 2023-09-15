"use client";

import React from "react";
import Heading from "./Reusable_ui/Heading";
import { Image, CloudCog, Plus, Container } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter, useParams } from "next/navigation";
import { DataTable } from "./Reusable_ui/DataTable";
import ApiList from "./Reusable_ui/ApiList";
import { ProductColumn, productColumns } from "./Table/productColumns";
interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products"
          icon={Container}
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={productColumns} data={data} searchKey="name"/>
      <Heading
        title="API"
        description="API routes for Billboards"
        icon={CloudCog}
      />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
