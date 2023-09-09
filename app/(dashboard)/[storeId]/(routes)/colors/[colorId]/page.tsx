import ColorForm from "@/components/ColorForm";
import prismaDB from "@/lib/prismDB";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  const color = await prismaDB.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};
export default ColorPage;
