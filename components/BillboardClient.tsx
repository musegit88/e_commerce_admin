"use client";

import React from "react";
import Heading from "./Heading";
import { Image, LucideImage, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useRouter, useParams } from "next/navigation";

const BillboardClient = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Billboards (0)"
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
    </>
  );
};

export default BillboardClient;
