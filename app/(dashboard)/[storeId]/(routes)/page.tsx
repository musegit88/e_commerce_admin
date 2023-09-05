import prismaDB from "@/lib/prismDB";
import { auth } from "@clerk/nextjs";
import React from "react";

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  return (
    <div>
      <p>store name : {store?.name}</p>
      <p>store id : {store?.id}</p>
    </div>
  );
};

export default DashboardPage;
