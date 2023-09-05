import SettingsForm from "@/components/SettingsForm";
import prismaDB from "@/lib/prismDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
