
// script.js 
async function fetchDataAndCreateChart() {
    try {
        // Adjust the path to where your actual JSON file is located
        const response = await fetch('../../download-data/speech_length_by_year.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Assuming jsonData is an array of objects with 'year' and 'characters' properties
        const years = jsonData.map(data => data.year);
        const characterCounts = jsonData.map(data => data.num_characters);

        // Create the chart
        const ctx = document.getElementById('speech_length').getContext('2d');

        Chart.defaults.font.color = '#152E93';

        const speechLengthChart = new Chart(ctx, {
            type: 'line',  // This example uses a line chart
            data: {
                labels: years,  // x-axis labels
                datasets: [{
                    label: 'Speech Length (Characters)',
                    data: characterCounts,  // y-axis data
                    fill: true,
                    borderColor: '#152E93',
                    borderWidth: 1,
                    pointRadius: 0,
                    tension: 0.5  // Adds some curve between points
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Characters',
                            color: '#152E93',
                        },
                        ticks: {
                            color: '#152E93',
                            callback: function(value, index, values) {
                                // Assuming the value is a number, format it with commas
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            },
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            color: '#152E93',
                        },
                        ticks: {
                            color: '#152E93',
                        },
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    }
                },
                responsive: true,
                maintainAspectRatio: true
            }
        });
    } catch (error) {
        console.error('Failed to fetch the data:', error);
    }
}

// Call the function to fetch data and create the chart
fetchDataAndCreateChart();

document.addEventListener("DOMContentLoaded", function() {
    fetch('../download-data/sentiment_by_year.json') // Adjust the path to your JSON file as necessary
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
        const ctx = document.getElementById('sentiment_over_time').getContext('2d');
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
                        pointRadius: 0,
                        tension: 0.3 
                    },
                    {
                        label: 'Negative',
                        data: dataByLabel.negative,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        pointRadius: 0,
                        tension: 0.3
                    },
                    {
                        label: 'Neutral',
                        data: dataByLabel.neutral,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                        pointRadius: 0,
                        tension: 0.3
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
                            text: "Percentage",
                            color: '#152E93'
                        },
                        ticks: {
                            color: '#152E93'
                        }
                    }, 
                    x: {
                        title: {
                            display: true,
                            color: '#152E93'
                        },
                        ticks: {
                            color: '#152E93'
                        }
                    }
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
