
// script.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('download-data/sentiment_by_year.json') // Adjust the path to your JSON file as necessary
    .then(response => response.json())
    .then(dataSet => {
        const labels = [...new Set(dataSet.map(data => data.year))];
        const dataByLabel = {
            positive: [],
            negative: [],
            neutral: [],
        };

        labels.forEach(year => {
            const yearData = dataSet.filter(data => data.year === year);
            dataByLabel.positive.push(yearData.find(data => data.label === "positiv")?.percentage || 0);
            dataByLabel.negative.push(yearData.find(data => data.label === "negativ")?.percentage || 0);
            dataByLabel.neutral.push(yearData.find(data => data.label === "neutral")?.percentage || 0);
        });

      // After organizing the data, create the chart
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Positive',
                        data: dataByLabel.positive,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        pointRadius: 0
                    },
                    {
                        label: 'Negative',
                        data: dataByLabel.negative,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        pointRadius: 0
                    },
                    {
                        label: 'Neutral',
                        data: dataByLabel.neutral,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                        pointRadius: 0
                    }
                ]
            },
            
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: "Percentage"
                        }
                    }, 
                },
                interaction: {
                    mode: 'point', // Consider the nearest item (single point) only
                    intersect: true,
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        enabled: true,
                    }
                },
                
                onHover: (event, chartElement) => {
                    const chart = myChart;
                    if (chartElement.length) {
                        const dataIndex = chartElement[0].datasetIndex;
                        chart.data.datasets.forEach((dataset, index) => {
                            dataset.borderColor = index === dataIndex ? dataset.originalBorderColor : 'rgba(0,0,0,0.08)';
                        });
                    } else {
                        chart.data.datasets.forEach((dataset) => {
                            dataset.borderColor = dataset.borderColor; // Restore original border color
                        });
                    }
                    chart.update();
                },
                
                onLeave: (event, chartElements, chart) => {
                    // Loop through datasets to reset the borderColor to original
                    myChart.data.datasets.forEach((dataset) => {
                        // Assuming 'originalBorderColor' is where you store the original color
                        // You might need to adjust this part based on how you're managing colors
                        dataset.borderColor = dataset.originalBorderColor; 
                    });
                    myChart.update();
                },

            },
            
        });
        // Store original border colors for restoration
        myChart.data.datasets.forEach((dataset) => {
            dataset.originalBorderColor = dataset.borderColor;
        });
    })
    .catch(error => console.error('Error loading the JSON data:', error));
});
