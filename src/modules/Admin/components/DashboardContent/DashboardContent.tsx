import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Grid, Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2"; // Đảm bảo bạn đã cài đặt và sử dụng biểu đồ
import { fetchGetOrder } from "../../../../store/slices/CartOderSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContent = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState([]); // Giả sử orders được lưu trữ trong Redux
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [], // Tháng hoặc ngày
    datasets: [
      {
        label: "Doanh thu theo thời gian",
        data: [], // Dữ liệu doanh thu
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
    ],
  });

  // Lấy dữ liệu đơn hàng khi component được render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await dispatch(fetchGetOrder());
        setOrder(res?.payload);
        console.log(res, "res................");
      } catch (error) {}
    };
    fetchData(); // Giả sử bạn gọi action để lấy dữ liệu đơn hàng
  }, []);

  // Khi orders thay đổi, tính tổng doanh thu và cập nhật biểu đồ
  useEffect(() => {
    if (order.length > 0) {
      let totals = 0;
      const revenueData: any = [];
      const labels: any = [];

      // Duyệt qua các đơn hàng để tính tổng doanh thu và tạo dữ liệu cho biểu đồ
      order.forEach((order: any) => {
        totals += order.total; // Giả sử order có trường amount là số tiền của đơn hàng
        const date = new Date(order.date.date); // Giả sử order có trường date là ngày tạo đơn
        const monthYear: string = `${order.date.month}/${order.date.year}`; // Lấy tháng/năm
        if (!labels.includes(monthYear)) {
          labels.push(monthYear);
          revenueData.push(order.total);
        } else {
          const index = labels.indexOf(monthYear);
          revenueData[index] += order.total;
        }
      });

      // Cập nhật giá trị tổng doanh thu
      setTotalRevenue(totals);

      // Cập nhật dữ liệu cho biểu đồ
      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Doanh thu theo tháng",
            data: revenueData,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
          },
        ],
      });
    }
  }, [order]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Hiển thị tổng doanh thu */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tổng doanh thu:
            </Typography>
            <Typography variant="h5" color="primary">
              {totalRevenue.toLocaleString()} VND
            </Typography>
          </Paper>
        </Grid>

        {/* Biểu đồ doanh thu */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Doanh thu theo tháng
            </Typography>
            <Line data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardContent;
