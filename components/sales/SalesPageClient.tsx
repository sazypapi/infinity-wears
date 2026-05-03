"use client";

import { Prisma } from "@/generated/prisma";
import { useState } from "react";
import Filters from "./Filters";
import TopSection from "./TopSection";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { RxValueNone } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import RevenueChart from "./RevenueChart";
import TopSalesTable from "./TopSalesTable";
import RecentOrders from "./RecentOrders";
type ordersWithUsers = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
  };
}> & {
  user: {
    firstName: string | null;
    lastName: string | null;
  };
};
type orders = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
  };
}>;
const getDaysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};
function SalesPageClient({
  orders,
  ordersWithUsers,
}: {
  orders: orders[];
  ordersWithUsers: ordersWithUsers[];
}) {
  const [range, setRange] = useState("allTime");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    if (range === "7days") return orderDate >= getDaysAgo(7);
    if (range === "30days") return orderDate >= getDaysAgo(30);
    if (range === "90days") return orderDate >= getDaysAgo(90);
    if (range === "thisYear")
      return orderDate.getFullYear() === new Date().getFullYear();
    if (range === "custom" && customStart && customEnd) {
      return (
        orderDate >= new Date(customStart) && orderDate <= new Date(customEnd)
      );
    }
    return true;
  });
  const totalRevenue = filteredOrders.reduce((total, order) => {
    return total + order.totalAmount;
  }, 0);
  const topSellingProducts = Object.values(
    filteredOrders
      .flatMap((order) => order.orderItems)
      .filter((item) => item.productId != null)
      .reduce(
        (acc, item) => {
          if (!acc[item.productId!]) {
            acc[item.productId!] = {
              name: item.name,
              unitsSold: 0,
              revenue: 0,
            };
          }
          acc[item.productId!].unitsSold += item.quantity;
          acc[item.productId!].revenue += item.price * item.quantity;
          return acc;
        },
        {} as Record<
          string,
          { name: string; unitsSold: number; revenue: number }
        >,
      ),
  )
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  const allOrderItems = filteredOrders.flatMap((order) => order.orderItems);
  const totalItems = allOrderItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const groupByDay = (orders: orders[]) => {
    const map: Record<string, number> = {};

    orders.forEach((order) => {
      // turn the date into a string like "Mar 25"
      const date = new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      // if this date already exists, add to it, otherwise start at 0
      map[date] = (map[date] || 0) + order.totalAmount;
    });

    // turn the object into an array the chart can use
    return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
  };
  const groupByMonth = (orders: orders[]) => {
    const map: Record<string, number> = {};

    orders.forEach((order) => {
      // turn the date into a string like "Jan 2025"
      const date = new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      map[date] = (map[date] || 0) + order.totalAmount;
    });

    return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
  };
  const groupByWeek = (orders: orders[]) => {
    const map: Record<string, number> = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      // get the week number of the year
      const week = Math.ceil(
        (date.getDate() +
          new Date(date.getFullYear(), date.getMonth(), 1).getDay()) /
          7,
      );
      const label = `W${week} ${date.toLocaleDateString("en-US", { month: "short" })}`;
      map[label] = (map[label] || 0) + order.totalAmount;
    });

    return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
  };
  const getGrouping = () => {
    if (range === "7days" || range === "30days") return "day";
    if (range === "90days") return "week";
    if (range === "custom" && customStart && customEnd) {
      const days =
        (new Date(customEnd).getTime() - new Date(customStart).getTime()) /
        (1000 * 60 * 60 * 24);
      if (days <= 30) return "day";
      if (days <= 90) return "week";
      return "month";
    }
    return "month";
  };

  const grouping = getGrouping();
  const revenueData =
    grouping === "day"
      ? groupByDay(filteredOrders)
      : grouping === "week"
        ? groupByWeek(filteredOrders)
        : groupByMonth(filteredOrders);
  return (
    <div>
      <Filters
        customEnd={customEnd}
        customStart={customStart}
        range={range}
        setCustomEnd={setCustomEnd}
        setCustomStart={setCustomStart}
        setRange={setRange}
      />
      {filteredOrders.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <RxValueNone />
            </EmptyMedia>
            <EmptyTitle className="text-neutral-500">No Sale Found</EmptyTitle>
            <EmptyDescription className="text-neutral-600">
              No sale fits your filter
            </EmptyDescription>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button
                className="bg-transparent text-black border-2 border-black hover:text-white hover:bg-black transition duration-500"
                onClick={() => {
                  setRange("allTime");
                  setCustomStart("");
                  setCustomEnd("");
                }}
              >
                Clear Filters
              </Button>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : (
        <>
          <TopSection
            totalRevenue={totalRevenue}
            averageOrdervalue={totalRevenue / filteredOrders.length}
            totalItemsSold={totalItems}
            totalOrders={filteredOrders.length}
          />
          <RevenueChart data={revenueData} />
          <TopSalesTable data={topSellingProducts} />
          <RecentOrders orders={ordersWithUsers} />
        </>
      )}
    </div>
  );
}

export default SalesPageClient;
