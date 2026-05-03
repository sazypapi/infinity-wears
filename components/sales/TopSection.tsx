import GradientText from "@/components/GradientText";
import { formatCurrency } from "../../utils/format";

function TopSection({
  totalRevenue,
  totalOrders,
  averageOrdervalue,
  totalItemsSold,
}: {
  totalRevenue: number;
  totalOrders: number;
  averageOrdervalue: number;
  totalItemsSold: number;
}) {
  return (
    <div className="grid gap-10 justify-between grid-cols-2 sm:grid-cols-4 mt-5">
      <div className="border-2 border-neutral-100 shadow-xs rounded-sm w-40 sm:w-50 pr-5 pl-2 pt-3 pb-1">
        <p className="text-xs text-[10px] text-neutral-400">total revenue</p>
        <GradientText
          colors={["#000000", "#71717a", "#d4d4d8"]}
          animationSpeed={8}
          showBorder={false}
          className="custom-class text-left text-2xl sm:text-3xl font-semibold"
        >
          {formatCurrency(totalRevenue)}
        </GradientText>
      </div>
      <div className="border-2 border-neutral-100 shadow-xs rounded-sm w-40 sm:w-50 pr-5 pl-2 pt-3 pb-1">
        <p className="text-xs text-[10px] text-neutral-400">total orders</p>
        <GradientText
          colors={["#000000", "#71717a", "#d4d4d8"]}
          animationSpeed={8}
          showBorder={false}
          className="custom-class text-left text-2xl sm:text-3xl font-semibold"
        >
          {totalOrders}
        </GradientText>
      </div>{" "}
      <div className="border-2 border-neutral-100 shadow-xs rounded-sm w-40 sm:w-50 pr-5 pl-2 pt-3 pb-1">
        <p className="text-xs text-[10px] text-neutral-400">
          average order value
        </p>
        <GradientText
          colors={["#000000", "#71717a", "#d4d4d8"]}
          animationSpeed={8}
          showBorder={false}
          className="custom-class text-left text-2xl sm:text-3xl font-semibold"
        >
          {formatCurrency(averageOrdervalue)}
        </GradientText>
      </div>{" "}
      <div className="border-2 border-neutral-100 shadow-xs rounded-sm w-40 sm:w-50 pr-5 pl-2 pt-3 pb-1">
        <p className="text-xs text-[10px] text-neutral-400">total items sold</p>
        <GradientText
          colors={["#000000", "#71717a", "#d4d4d8"]}
          animationSpeed={8}
          showBorder={false}
          className="custom-class text-left text-2xl sm:text-3xl font-semibold"
        >
          {totalItemsSold}
        </GradientText>
      </div>{" "}
    </div>
  );
}

export default TopSection;
