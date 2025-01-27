

async function fetchDataAndCreateChart(person) {
    // Define the path to your data file
    const dataPath = `/download-data/${person}-speech_length_by_year.json`; // Adjust the filename if needed

    try {
        // Fetch the data using the defined dataPath
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();

        // Assuming jsonData is an array of objects with 'year' and 'num_characters' properties
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
                            callback: function(value) {
                                // Format the ticks with commas
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


// Call the function to fetch data and create the chart
fetchDataAndCreateChart();

// Function to visualize sentiment over time for a specific person
async function fetchSentimentData(person, canvasId) {
    const dataPath = `/download-data/${person}-sentiment_by_year.json`;

    try {
        const response = await fetch(dataPath);
        const dataSet = await response.json();

        const labels = [...new Set(dataSet.map(data => data.year))];
        const dataByLabel = { positive: [], negative: [], neutral: [] };

        labels.forEach(year => {
            const yearData = dataSet.filter(data => data.year === year);
            dataByLabel.positive.push(yearData.find(data => data.label === "positiv")?.percentage || 0);
            dataByLabel.negative.push(yearData.find(data => data.label === "negativ")?.percentage || 0);
            dataByLabel.neutral.push(yearData.find(data => data.label === "neutral")?.percentage || 0);
        });

        // Create or update the chart
        const ctx = document.getElementById(canvasId).getContext('2d');
        const sentimentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: 'Positive', data: dataByLabel.positive, borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1, pointRadius: 0, tension: 0.3 },
                    { label: 'Negative', data: dataByLabel.negative, borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1, pointRadius: 0, tension: 0.3 },
                    { label: 'Neutral', data: dataByLabel.neutral, borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 1, pointRadius: 0, tension: 0.3 }
                ]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, max: 100, title: { display: true, text: "Percentage", color: '#152E93' }, ticks: { color: '#152E93' }},
                    x: { title: { display: true, color: '#152E93' }, ticks: { color: '#152E93' }}
                },
                plugins: {
                    tooltip: { mode: 'index', enabled: true },
                    legend: { display: true, position: 'top' }
                },
                responsive: true,
                maintainAspectRatio: true
            }
        });
    } catch (error) {
        console.error('Error loading the JSON data:', error);
    }
}

// Call only the sentiment data function for Margrethe and Frederik
document.addEventListener("DOMContentLoaded", function() {
    fetchSentimentData('margrethe', 'sentiment_margrethe');
    fetchSentimentData('frederik', 'sentiment_frederik');
});
