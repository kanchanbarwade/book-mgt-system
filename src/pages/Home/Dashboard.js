import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getDashboardStats } from "../../services/dashboardService";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load dashboard");
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  const chartData = isAdmin
    ? {
        labels: ["Issued Books", "Available Books"],
        datasets: [
          {
            data: [stats.issuedCopies || 0, stats.availableCopies || 0],
            backgroundColor: ["#81c784", "#64b5f6"],
          },
        ],
      }
    : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        {isAdmin ? (
          <>
            <StatCard title="Total Books" value={stats.totalBookCopies} />
            <StatCard title="Issued Books" value={stats.issuedCopies} />
            <StatCard title="Available Books" value={stats.availableCopies} />
            <StatCard title="Users" value={stats.users} />
          </>
        ) : (
          <StatCard title="My Issued Books" value={stats.issuedCopies} />
        )}
      </Grid>

      {isAdmin && chartData && (
        <Box mt={4} maxWidth={300} mx="auto">
          <Typography variant="h6" align="center" gutterBottom>
            Books Status
          </Typography>
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

function StatCard({ title, value }) {
  const cardColors = {
    "Total Books": "#e3f2fd",
    "Issued Books": "#ffebee",
    "Available Books": "#e8f5e9",
    "Users": "#fff8e1",
    "My Issued Books": "#ede7f6"
  };

  const borderColors = {
    "Total Books": "#2196f3",
    "Issued Books": "#f44336",
    "Available Books": "#4caf50",
    "Users": "#ff9800",
    "My Issued Books": "#673ab7"
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper
        sx={{
          p: 2,
          backgroundColor: cardColors[title] || "#f5f5f5",
          borderLeft: `6px solid ${borderColors[title] || "#1976d2"}`,
          boxShadow: 3,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="h4" color="textPrimary">
          {value ?? 0}
        </Typography>
      </Paper>
    </Grid>
  );
}


export default Dashboard;
