import BillboardClient from "@/components/BillboardClient";
import prismaDB from "@/lib/prismDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { format } from "date-fns";
import { BillboardColumn } from "@/components/BillboardTable/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    lable: item.lable,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
