import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import Navsection from "./Navsection";
import Switcher from "@/components/Switcher";
import { redirect } from "next/navigation";
import prismaDB from "@/lib/prismDB";
const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismaDB.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex items-center h-12 px-4">
        <Switcher items={stores} />
        <Navsection className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
