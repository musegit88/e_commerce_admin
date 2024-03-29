import prismaDB from "@/lib/prismDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prismaDB.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
}
