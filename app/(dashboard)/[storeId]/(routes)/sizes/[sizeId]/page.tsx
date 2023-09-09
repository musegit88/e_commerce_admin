import SizeForm from "@/components/SizeForm";
import prismaDB from "@/lib/prismDB";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismaDB.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};
export default SizePage;
