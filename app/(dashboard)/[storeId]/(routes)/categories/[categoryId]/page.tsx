import CategoryForm from "@/components/CategoryForm";
import prismaDB from "@/lib/prismDB";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismaDB.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};
export default CategoryPage;
