"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const Navsection = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}`,
      lable: "Home",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      lable: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      lable: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      lable: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      lable: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/settings`,
      lable: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.lable}
        </Link>
      ))}
    </nav>
  );
};

export default Navsection;
