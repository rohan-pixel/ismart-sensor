import { ArrowBack, FiberManualRecord } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const temp = [
  {
    id: 0,
    title: "Velocity RMS X",
    actionTxt: "0.008 mm/s",
  },
  {
    id: 1,
    title: "Velocity RMS Y",
    actionTxt: "0.007 mm/s",
  },
  {
    id: 2,
    title: "Velocity RMS Z",
    actionTxt: "0.006 mm/s",
  },
];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page H",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page I",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page J",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page K",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page L",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page M",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  const navigate = useNavigate();

  const [kpi, setKPI] = useState(0);

  const [image, setImage] = useState(null);
  const [chartData, setChartData] = useState(data);

  const [searchParams] = useSearchParams();

  const assets = useSelector((state) => state.assetsReducer.assets);

  // const dispatch = useDispatch();

  const serialNumber = useMemo(
    () => searchParams.get("serialNumber"),
    [searchParams]
  );

  const getAssetDetail = useCallback(
    (serialNumber) => {
      // Navigate to the asset list
      if (!serialNumber) return navigate("/");

      const assetDetail = assets.find(
        (ele) => ele.serialNumber === serialNumber
      );

      if (!assetDetail) {
        alert(`No Asset exists with Serial Number: ${serialNumber}`);
        return navigate("/");
      }

      const { otherProperty, ...others } = assetDetail;

      setImage(others?.assetImage);
    },
    [assets]
  );

  useEffect(() => {
    setChartData(data);
  }, [kpi]);

  useEffect(() => {
    // find asset Details
    getAssetDetail(serialNumber);
  }, [serialNumber, assets]);

  // update data on every seconds
  useEffect(() => {
    let interval = setInterval(() => {
      let tempData = [];

      for (const chartEle of chartData) {
        tempData.push({
          ...chartEle,
          uv: chartEle?.uv + (Math.floor(Math.random() * 3000) - 1000),
          pv: chartEle?.pv + (Math.floor(Math.random() * 3000) - 1000),
          amt: chartEle?.amt + (Math.floor(Math.random() * 3000) - 1000),
        });
      }

      setChartData(tempData);
    }, 1000);

    return () => clearInterval(interval);
  }, [chartData]);

  return (
    <Container>
      <div className="dashboard-container">
        <div className="top">
          <Button
            sx={{
              position: "absolute",
            }}
            color="secondary"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBack />}
            size="small"
          >
            Back
          </Button>

          <Typography className="heading">Dashboard</Typography>
        </div>

        <div className="image-container">
          {image && <img loading="lazy" src={image} alt="dashboard-img" />}
          <Typography variant="caption">Measurement data 2s ago</Typography>
        </div>

        <Typography className="sub-heading">KPI Parameters</Typography>

        <List component="ul" aria-label="kpi-list">
          {temp.map((list) => (
            <ListItem
              key={list.id}
              secondaryAction={<Typography>{list?.actionTxt}</Typography>}
              disablePadding
            >
              <ListItemButton
                onClick={() => setKPI(list.id)}
                selected={kpi === list.id}
              >
                <ListItemIcon>
                  <FiberManualRecord color="success" />
                </ListItemIcon>
                {list?.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Typography className="sub-heading">Chart {kpi + 1}</Typography>

        <div className="chart-container">
          <ResponsiveContainer minWidth={300} minHeight={250}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Brush dataKey="name" height={30} stroke="#8884d8" />
              <Line
                type="monotone"
                dataKey="pv"
                name="Normal"
                stroke="#008000"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                name="Alert"
                dataKey="uv"
                stroke="#ffff00"
              />
              <Line
                type="monotone"
                name="Alarm"
                dataKey="amnt"
                stroke="#ff0000"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
