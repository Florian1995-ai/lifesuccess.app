function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

const sampleData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [{
        label: 'Positivity',
        data: [7, 8, 6, 9, 7],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
    }, {
        label: 'Energy Levels',
        data: [6, 7, 8, 7, 9],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
    }]
};

function createChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}

function init() {
    showTab('myDay');
    createChart('dayChart', sampleData);
    createChart('weekChart', sampleData);
}

document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.quadrant h3');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content.classList.contains('open')) {
                content.classList.remove('open');
            } else {
                document.querySelectorAll('.dropdown-content').forEach(item => {
                    item.classList.remove('open');
                });
                content.classList.add('open');
            }
        });
    });
});

window.onload = init;