import prismaDB from "@/lib/prismDB";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import OrderClient from "@/components/OrderClient";
import { OrderColumn } from "@/components/Table/OrderColumns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismaDB.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(item.createdAt, "MMMM do ,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <OrderClient data={formatedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
