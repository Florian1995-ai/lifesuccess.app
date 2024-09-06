import { signUp, login, logout, isAuthenticated, getUser } from './supabase-auth.js';

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

function toggleDropdown(id) {
    const content = document.getElementById(id);
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
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

function createCharts() {
    const dayCtx = document.getElementById('dayChart').getContext('2d');
    const weekCtx = document.getElementById('weekChart').getContext('2d');

    const chartConfig = {
        type: 'line',
        data: sampleData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    };

    new Chart(dayCtx, chartConfig);
    new Chart(weekCtx, chartConfig);
}

function showAuthForms() {
    document.getElementById('authForms').style.display = 'block';
    document.getElementById('loginButton').style.display = 'none';
    document.getElementById('signupButton').style.display = 'none';
}

function hideAuthForms() {
    document.getElementById('authForms').style.display = 'none';
    document.getElementById('loginButton').style.display = 'inline-block';
    document.getElementById('signupButton').style.display = 'inline-block';
}

async function init() {
    if (await isAuthenticated()) {
        const user = await getUser();
        console.log('Logged in as:', user.email);
        document.getElementById('logoutButton').style.display = 'inline-block';
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('signupButton').style.display = 'none';
    } else {
        console.log('Not logged in');
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('loginButton').style.display = 'inline-block';
        document.getElementById('signupButton').style.display = 'inline-block';
    }

    showTab('myDay');
    createCharts();

    const toggles = document.querySelectorAll('.quadrant h3');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });
    });
}

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    try {
        await signUp(email, password);
        console.log('Signup successful');
        hideAuthForms();
        init();
    } catch (error) {
        console.error('Signup failed:', error.message);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    try {
        await login(email, password);
        console.log('Login successful');
        hideAuthForms();
        init();
    } catch (error) {
        console.error('Login failed:', error.message);
    }
});

document.getElementById('logoutButton').addEventListener('click', async () => {
    try {
        await logout();
        console.log('Logout successful');
        init();
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
});

document.getElementById('loginButton').addEventListener('click', showAuthForms);
document.getElementById('signupButton').addEventListener('click', showAuthForms);

window.onload = init;