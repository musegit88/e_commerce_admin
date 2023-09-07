import CategoryClient from "@/components/CategoryClient";
import { CategoryColumn } from "@/components/Table/categoriesColumns";
import prismaDB from "@/lib/prismDB";
import { format } from "date-fns";
import React from "react";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismaDB.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLable: item.billboard.lable,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryClient data={formatedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
