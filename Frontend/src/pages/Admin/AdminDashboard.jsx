import Chart from "react-apexcharts";
import { useGetAllUsersQuery } from "../../app/api/userApiSlice";
import {
  useGetAllOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../app/api/orderApiSlice";
import { useState, useEffect } from "react";
const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingUsers } = useGetAllUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetAllOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();
  console.log(salesDetail);
  // console.log("customer", customers);
  // console.log("Orders",orders);

  const [state, setState] = useState({
    options: {
      chart: { 
        type: "line", 
        height: 300,
        background: "#2d224b", 
      },
      tooltip: { theme: "light" },
      colors: ["#00E396"],
      dataLabels: { enabled: true },
      stroke: { curve: "smooth" },
      title: { text: "Sales Trend", align: "left" },
      grid: { borderColor: "#ccc" },
      markers: { size: 5 }, 
      xaxis: {
        title: { text: "Date" },
        reversed: false,
      },
      yaxis: {
        title: { text: "Sales" },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });
  

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesData = salesDetail
        .filter((item) => item._id && item.totalSales !== undefined)
        .map((item) => ({
          x: item._id,
          y: item.totalSales,
        }));
      setState({
        options: {
          ...state.options,
          // Remove xaxis.categories when using object data format
          xaxis: {
            title: { text: "Date" },
          },
        },
        series: [{ name: "Sales", data: formattedSalesData }],
      });
    }
  }, [salesDetail]);

  return (
    <>
      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[80%] flex justify-around flex-wrap">
          <div className="rounded-lg bg-[#2d224b] p-5 w-[20rem] mt-5">
            <div className="font-bold  rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5 text-white">Sales</p>
            <h1 className="text-xl font-bold text-white">
              ${" "}
              {isLoading ? (
                <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              ) : (
                <span className="text-white">
                  {sales.totalSales.toFixed(2)}
                </span>
              )}
            </h1>
          </div>

          <div className="rounded-lg bg-[#2d224b] p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5 text-white">Customers</p>
            <h1 className="text-xl font-bold text-white">
              {isLoading ? (
                <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              ) : (
                <span className="text-white">{customers?.users?.length}</span>
              )}
            </h1>
          </div>

          <div className="rounded-lg bg-[#2d224b] p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5 text-white">All Orders</p>
            <h1 className="text-xl font-bold text-white">
              {" "}
              {isLoading ? (
                <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
              ) : (
                <span className="text-white">{orders?.length}</span>
              )}
            </h1>
          </div>
        </div>
        <div className="ml-[10rem] mt-10">
          {salesDetail && state.series[0].data.length > 0 ? (
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="70%"
            />
          ) : (
            <div className="w-full h-200 bg-gray-200 rounded animate-pulse"></div>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
