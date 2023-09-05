import BillboardForm from "@/components/BillboardForm";
import prismaDB from "@/lib/prismDB";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismaDB.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};
export default BillboardPage;
