import { ColorColumn } from "@/components/Table/colorsColumns ";
import prismaDB from "@/lib/prismDB";
import { format } from "date-fns";
import ColorClient from "@/components/ColorClient";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismaDB.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <div className="flex-col">
      {" "}
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ColorClient data={formatedColors} />
      </div>
    </div>
  );
};
export default ColorsPage;
