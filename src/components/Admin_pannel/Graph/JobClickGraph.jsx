import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CircularProgress, Grid } from '@mui/material';

// Register the necessary components
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

// Predefined darker colors array
const colors = [
  'rgba(55, 99, 132, 0.8)',
  'rgba(34, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(99, 99, 99, 0.8)',
  'rgba(33, 102, 255, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(83, 255, 107, 0.8)',
  'rgba(253, 255, 85, 0.8)',
];

const JobClickGraph = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchClickData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/job_clicks_data/');
      const clickData = response.data;

      console.log('Click data:', clickData); // Log the received data for debugging

      // Transform the data to fit Chart.js format
      const jobTitles = [];
      const jobClicks = {};

      clickData.forEach(click => {
        const jobTitle = click.job__title;
        if (!jobClicks[jobTitle]) {
          jobClicks[jobTitle] = 0;
        }
        jobClicks[jobTitle] += click.clicks;
      });

      const labels = Object.keys(jobClicks);
      const clicks = Object.values(jobClicks);

      const dataset = {
        labels,
        datasets: [
          {
            data: clicks,
            backgroundColor: labels.map((_, index) => colors[index % colors.length]),
            hoverBackgroundColor: labels.map((_, index) => colors[index % colors.length]),
          },
        ],
      };

      setData(dataset);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
  };

  useEffect(() => {
    fetchClickData();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent='center' alignItems='center' style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <div style={{ backgroundColor: 'rgba(150, 100, 200, 0.3)', borderRadius: '8px', padding: '10px', width: '400px', margin: 'auto' }}>
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                generateLabels: function (chart) {
                  const original = ChartJS.overrides.pie.plugins.legend.labels.generateLabels;
                  const labelsOriginal = original.call(this, chart);

                  // Build an array of colors used in the datasets of the chart
                  let datasetColors = chart.data.datasets.map(function (e) {
                    return e.backgroundColor;
                  });
                  datasetColors = datasetColors.flat();

                  // Modify the color and hide state of each label
                  labelsOriginal.forEach(label => {
                    label.datasetIndex = (label.index - label.index % 2) / 2;
                    label.hidden = false; // Ensure all labels are shown
                    label.fillStyle = datasetColors[label.index];
                  });

                  return labelsOriginal;
                },
              },
              onClick: function (mouseEvent, legendItem, legend) {
                legend.chart.getDatasetMeta(legendItem.datasetIndex).hidden = !legend.chart.isDatasetVisible(legendItem.datasetIndex);
                legend.chart.update();
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.chart.data.labels[context.dataIndex];
                  const value = context.formattedValue;
                  return `${label}: ${value}`;
                },
              },
            },
          },
        }}
        height={200} // Reduce the height of the graph
      />
    </div>
  );
};

export default JobClickGraph;
