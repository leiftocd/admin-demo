document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const dashboard = document.querySelector('.flex.h-screen');
    dashboard.style.display = isLoggedIn ? 'flex' : 'none';

    // Create auth container only if it doesn't exist
    let authContainer = document.getElementById('auth-container');
    if (!authContainer) {
        authContainer = document.createElement('div');
        authContainer.id = 'auth-container';
        authContainer.className = 'fixed inset-0 flex items-center justify-center bg-gray-100';
        authContainer.style.display = isLoggedIn ? 'none' : 'flex';
        authContainer.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div class="flex justify-between mb-6">
                    <button id="login-tab" class="px-4 py-2 font-semibold text-blue-600 border-b-2 border-blue-600">Login</button>
                    <button id="register-tab" class="px-4 py-2 font-semibold text-gray-600">Register</button>
                </div>
                <!-- Login Form -->
                <div id="login-form" class="form">
                    <h2 class="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="login-email" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email">
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="login-password" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password">
                    </div>
                    <button id="login-btn" class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Login</button>
                    <p id="login-error" class="text-red-500 text-sm mt-2 hidden">Invalid email or password</p>
                </div>
                <!-- Register Form -->
                <div id="register-form" class="form hidden">
                    <h2 class="text-2xl font-semibold mb-6 text-center">Register</h2>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" id="register-username" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your username">
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="register-email" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email">
                    </div>
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="register-password" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password">
                    </div>
                    <button id="register-btn" class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">Register</button>
                    <p id="register-error" class="text-red-500 text-sm mt-2 hidden">All fields are required</p>
                    <p id="register-success" class="text-green-500 text-sm mt-2 hidden">Registration successful! Please login.</p>
                </div>
            </div>
        `;
        document.body.appendChild(authContainer);
    }

    // Tab switching
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
        registerTab.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        registerTab.classList.add('text-gray-600');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
        loginTab.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        loginTab.classList.add('text-gray-600');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    });

    // Registration
    document.getElementById('register-btn').addEventListener('click', () => {
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const error = document.getElementById('register-error');
        const success = document.getElementById('register-success');

        if (!username || !email || !password) {
            error.textContent = 'All fields are required';
            error.classList.remove('hidden');
            success.classList.add('hidden');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error.textContent = 'Invalid email format';
            error.classList.remove('hidden');
            success.classList.add('hidden');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(user => user.email === email)) {
            error.textContent = 'Email already registered';
            error.classList.remove('hidden');
            success.classList.add('hidden');
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        error.classList.add('hidden');
        success.classList.remove('hidden');

        // Clear form
        document.getElementById('register-username').value = '';
        document.getElementById('register-email').value = '';
        document.getElementById('register-password').value = '';
    });

    // Login
    document.getElementById('login-btn').addEventListener('click', () => {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const error = document.getElementById('login-error');

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            authContainer.style.display = 'none';
            dashboard.style.display = 'flex';
            error.classList.add('hidden');
            updateAdminName();
        } else {
            error.classList.remove('hidden');
        }
    });

    // Add logout button to header
    const header = document.querySelector('header .flex.items-center:last-child');
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt mr-1"></i> Logout';
    header.appendChild(logoutBtn);

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        dashboard.style.display = 'none';
        authContainer.style.display = 'flex';
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        loginTab.click(); // Switch to login tab
    });

    // Update admin name in header with logged-in user
    const updateAdminName = () => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const adminName = document.querySelector('header .text-sm.font-medium');
        if (user.username) {
            adminName.textContent = user.username;
        }
    };

    // Fake data for demo purposes
    const games = [
        { id: 1, name: "Cyber Racer", categories: ["Racing", "Action"], description: "High-speed racing game", price: 29.99, rating: 4.8, status: "Published", downloads: 1200 },
        { id: 2, name: "Space Explorer", categories: ["Simulation", "Adventure"], description: "Explore the galaxy", price: 24.99, rating: 4.7, status: "Published", downloads: 800 },
        { id: 3, name: "Mystery Island", categories: ["Puzzle", "Adventure"], description: "Solve island mysteries", price: 9.99, rating: 4.0, status: "Draft", downloads: 300 },
        { id: 4, name: "Fantasy Quest", categories: ["RPG", "Adventure"], description: "Epic RPG adventure", price: 19.99, rating: 4.5, status: "Published", downloads: 950 },
        { id: 5, name: "Battle Arena", categories: ["Strategy", "Multiplayer"], description: "Competitive strategy game", price: 14.99, rating: 4.2, status: "Published", downloads: 600 }
    ];

    const users = [
        { id: "U5481", name: "Alex Johnson", email: "alex.j@example.com", phone: "+1 (555) 123-4567", registration: "2025-02-12", games: 8, totalSpent: 234.85, status: "Active", role: "Customer" },
        { id: "U5480", name: "Sarah Lee", email: "slee@example.com", phone: "+1 (555) 987-6543", registration: "2025-01-25", games: 12, totalSpent: 349.76, status: "Active", role: "Customer" },
        { id: "U5479", name: "Mike Smith", email: "mike.s@example.com", phone: "+1 (555) 456-7890", registration: "2025-03-05", games: 5, totalSpent: 89.95, status: "Suspended", role: "Customer" }
    ];

    const transactions = [
        { id: "TX8765", user: "Alex Johnson", email: "alex.j@example.com", game: "Cyber Racer", date: "2025-05-12", amount: 29.99, paymentMethod: "Credit Card", status: "Completed" },
        { id: "TX8764", user: "Sarah Lee", email: "slee@example.com", game: "Fantasy Quest", date: "2025-05-12", amount: 19.99, paymentMethod: "PayPal", status: "Completed" },
        { id: "TX8763", user: "Mike Smith", email: "mike.s@example.com", game: "Battle Arena", date: "2025-05-11", amount: 14.99, paymentMethod: "Crypto", status: "Processing" },
        { id: "TX8762", user: "Linda Chen", email: "linda.c@example.com", game: "Space Explorer", date: "2025-05-11", amount: 24.99, paymentMethod: "Bank Transfer", status: "Completed" },
        { id: "TX8761", user: "James Wilson", email: "jwilson@example.com", game: "Mystery Island", date: "2025-05-10", amount: 9.99, paymentMethod: "Credit Card", status: "Failed" }
    ];

    // Demo notifications data
    const notifications = [
        { id: 1, title: "New User Registered", message: "A new user, John Doe, has registered on the platform.", time: "2025-05-13 10:30 AM" },
        { id: 2, title: "Transaction Failed", message: "Transaction TX8761 for Mystery Island failed due to payment issues.", time: "2025-05-13 09:15 AM" },
        { id: 3, title: "Game Published", message: "Cyber Racer has been successfully published.", time: "2025-05-12 03:45 PM" }
    ];

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('href').substring(1);
            navLinks.forEach(l => l.classList.remove('active-nav', 'bg-gray-700', 'text-gray-100'));
            link.classList.add('active-nav', 'bg-gray-700', 'text-gray-100');
            pages.forEach(page => page.classList.add('hidden'));
            document.getElementById(`${targetPage}-page`).classList.remove('hidden');
            pageTitle.textContent = targetPage.charAt(0).toUpperCase() + targetPage.slice(1);
        });
    });

    // Chart Initialization
    const downloadChart = new Chart(document.getElementById('downloadChart'), {
        type: 'line',
        data: {
            labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
            datasets: [{
                label: 'Downloads',
                data: [200, 250, 300, 280, 320, 350, 400],
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    const categoryChart = new Chart(document.getElementById('categoryChart'), {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'Revenue',
                data: [],
                backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
            }]
        },
        options: { responsive: true }
    });

    // Data for Revenue by Game Category
    const categoryData = [
        { label: 'Action', revenue: 15000 },
        { label: 'Adventure', revenue: 10000 },
        { label: 'RPG', revenue: 8000 },
        { label: 'Simulation', revenue: 7000 },
        { label: 'Strategy', revenue: 1200 },
        { label: 'Puzzle', revenue: 1000 },
        { label: 'Racing', revenue: 900 },
        { label: 'Sports', revenue: 1500 }
    ];

    // Process category data: show top 4, combine rest into "Other"
    const topCategories = categoryData.sort((a, b) => b.revenue - a.revenue).slice(0, 4);
    const otherCategories = categoryData.slice(4);
    const otherRevenue = otherCategories.reduce((sum, cat) => sum + cat.revenue, 0);

    categoryChart.data.labels = [...topCategories.map(cat => cat.label), 'Other'];
    categoryChart.data.datasets[0].data = [...topCategories.map(cat => cat.revenue), otherRevenue];
    categoryChart.update();

    const reportChart = new Chart(document.getElementById('reportChart'), {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
            datasets: [{
                label: 'User Activity',
                data: [5000, 5500, 5700, 6000, 7000, 8000, 8500],
                backgroundColor: 'rgb(59, 130, 246)'
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });

    // Populate Tables
    function populateGameTable(filteredGames) {
        const tbody = document.getElementById('game-table-body');
        tbody.innerHTML = '';
        filteredGames.forEach(game => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <img src="https://th.bing.com/th/id/OIP.u4A2oNRhViddfzqwjhJAwQHaHa?rs=1&pid=ImgDetMain" alt="Game" class="w-10 h-10 rounded-lg">
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${game.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.categories.join(', ')}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${game.price.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${game.status === 'Published' ? 'green' : game.status === 'Draft' ? 'yellow' : 'red'}-100 text-${game.status === 'Published' ? 'green' : game.status === 'Draft' ? 'yellow' : 'red'}-800">${game.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="text-sm font-medium text-gray-900">${game.rating}</div>
                        <div class="ml-1 flex text-yellow-400">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(game.rating))}
                            ${game.rating % 1 >= 0.5 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            ${'<i class="far fa-star"></i>'.repeat(5 - Math.ceil(game.rating))}
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-game" data-id="${game.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 mr-3 view-game" data-id="${game.id}"><i class="fas fa-eye"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-game" data-id="${game.id}"><i class="fas fa-trash"></i></a>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function populateUserTable(filteredUsers) {
        const tbody = document.getElementById('user-table-body');
        tbody.innerHTML = '';
        filteredUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/019/465/366/original/3d-user-icon-on-transparent-background-free-png.png" alt="User" class="w-10 h-10 rounded-full">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                            <div class="text-xs text-gray-500">User ID: ${user.id}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${user.email}</div>
                    <div class="text-sm text-gray-500">${user.phone}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${user.registration}</div>
                    <div class="text-xs text-gray-500">Registered</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.games} games</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$${user.totalSpent.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${user.status === 'Active' ? 'green' : user.status === 'Suspended' ? 'red' : 'yellow'}-100 text-${user.status === 'Active' ? 'green' : user.status === 'Suspended' ? 'red' : 'yellow'}-800">${user.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-user" data-id="${user.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 mr-3 view-user" data-id="${user.id}"><i class="fas fa-user-shield"></i></a>
                    <a href="#" class="text-${user.status === 'Suspended' ? 'green' : 'red'}-600 hover:text-${user.status === 'Suspended' ? 'green' : 'red'}-900 toggle-user-status" data-id="${user.id}"><i class="fas fa-${user.status === 'Suspended' ? 'check' : 'ban'}"></i></a>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function populateTransactionTable(filteredTransactions) {
        const tbody = document.getElementById('transaction-table-body');
        const tbodyFull = document.getElementById('transaction-table-body-full');
        tbody.innerHTML = '';
        tbodyFull.innerHTML = '';
        filteredTransactions.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/019/465/366/original/3d-user-icon-on-transparent-background-free-png.png" alt="User" class="w-8 h-8 rounded-full">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${transaction.user}</div>
                            <div class="text-sm text-gray-500">${transaction.email}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.game}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$${transaction.amount.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.paymentMethod}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${transaction.status === 'Completed' ? 'green' : transaction.status === 'Processing' ? 'yellow' : 'red'}-100 text-${transaction.status === 'Completed' ? 'green' : transaction.status === 'Processing' ? 'yellow' : 'red'}-800">${transaction.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-transaction" data-id="${transaction.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 mr-3 view-transaction" data-id="${transaction.id}"><i class="fas fa-eye"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-transaction" data-id="${transaction.id}"><i class="fas fa-trash"></i></a>
                </td>
            `;
            tbodyFull.appendChild(row);
            if (index < 5) tbody.appendChild(row.cloneNode(true)); // Limit to 5 rows in dashboard
        });
    }

    // Header Search Functionality
    const headerSearch = document.getElementById('header-search');
    const searchResults = document.getElementById('search-results');
    const searchResultsContent = document.getElementById('search-results-content');
    const noResults = document.getElementById('no-results');

    headerSearch.addEventListener('input', () => {
        const query = headerSearch.value.trim().toLowerCase();
        searchResultsContent.innerHTML = '';
        noResults.classList.add('hidden');
        searchResults.classList.add('hidden');

        if (query) {
            const results = [];
            games.forEach(game => {
                if (game.name.toLowerCase().includes(query)) {
                    results.push({
                        type: 'game',
                        id: game.id,
                        name: game.name,
                        details: `$${game.price.toFixed(2)} - ${game.categories.join(', ')}`,
                        page: 'games'
                    });
                }
            });
            users.forEach(user => {
                if (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)) {
                    results.push({
                        type: 'user',
                        id: user.id,
                        name: user.name,
                        details: user.email,
                        page: 'users'
                    });
                }
            });
            transactions.forEach(transaction => {
                if (transaction.user.toLowerCase().includes(query) || 
                    transaction.game.toLowerCase().includes(query) || 
                    transaction.id.toLowerCase().includes(query)) {
                    results.push({
                        type: 'transaction',
                        id: transaction.id,
                        name: transaction.id,
                        details: `${transaction.user} - ${transaction.game} - $${transaction.amount.toFixed(2)}`,
                        page: 'transactions'
                    });
                }
            });
            const reportTypes = [
                { type: 'report', id: 'user-activity', name: 'User Activity', page: 'reports' },
                { type: 'report', id: 'game-performance', name: 'Game Performance', page: 'reports' },
                { type: 'report', id: 'revenue-analysis', name: 'Revenue Analysis', page: 'reports' },
                { type: 'report', id: 'transaction-summary', name: 'Transaction Summary', page: 'reports' }
            ];
            reportTypes.forEach(report => {
                if (report.name.toLowerCase().includes(query)) {
                    results.push({
                        type: report.type,
                        id: report.id,
                        name: report.name,
                        details: 'Report',
                        page: report.page
                    });
                }
            });

            const limitedResults = results.slice(0, 5);
            if (limitedResults.length > 0) {
                limitedResults.forEach(result => {
                    const item = document.createElement('div');
                    item.className = 'p-2 hover:bg-gray-100 cursor-pointer search-result';
                    item.dataset.type = result.type;
                    item.dataset.id = result.id;
                    item.dataset.page = result.page;
                    item.innerHTML = `
                        <div class="text-sm font-medium text-gray-900">${result.name}</div>
                        <div class="text-xs text-gray-500">${result.details}</div>
                    `;
                    searchResultsContent.appendChild(item);
                });
                searchResults.classList.remove('hidden');
            } else {
                noResults.classList.remove('hidden');
                searchResults.classList.remove('hidden');
            }
        }
    });

    searchResults.addEventListener('click', (e) => {
        const result = e.target.closest('.search-result');
        if (result) {
            const type = result.dataset.type;
            const id = result.dataset.id;
            const targetPage = result.dataset.page;
            const navLink = document.querySelector(`.nav-link[href="#${targetPage}"]`);
            if (navLink) {
                navLink.click();
                if (type !== 'report') {
                    setTimeout(() => {
                        const tableBody = document.getElementById(`${targetPage.slice(0, -1)}-table-body`);
                        const row = tableBody.querySelector(`[data-id="${id}"]`);
                        if (row) {
                            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            row.classList.add('bg-blue-100');
                            setTimeout(() => row.classList.remove('bg-blue-100'), 2000);
                        }
                    }, 100);
                } else {
                    const reportTypeSelect = document.getElementById('report-type');
                    if (reportTypeSelect) {
                        reportTypeSelect.value = id;
                        reportTypeSelect.dispatchEvent(new Event('change'));
                    }
                }
            }
            searchResults.classList.add('hidden');
            headerSearch.value = '';
        }
    });

    document.addEventListener('click', (e) => {
        if (!headerSearch.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });

    // Notification Bell Functionality
    const notificationBell = document.getElementById('notification-bell');
    const notificationSubnav = document.getElementById('notification-subnav');
    const notificationContent = document.getElementById('notification-content');

    function populateNotifications() {
        notificationContent.innerHTML = '';
        notifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = 'p-4 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer';
            item.innerHTML = `
                <div class="text-sm font-medium text-gray-900">${notification.title}</div>
                <div class="text-sm text-gray-500">${notification.message}</div>
                <div class="text-xs text-gray-400 mt-1">${notification.time}</div>
            `;
            notificationContent.appendChild(item);
        });
    }

    populateNotifications();

    notificationBell.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationSubnav.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!notificationBell.contains(e.target) && !notificationSubnav.contains(e.target)) {
            notificationSubnav.classList.add('hidden');
        }
    });

    // Filter and Sort Functions
    function filterGames() {
        const search = document.getElementById('game-search').value.toLowerCase();
        const category = document.getElementById('game-category-filter').value;
        const status = document.getElementById('game-status-filter').value;
        const sort = document.getElementById('game-sort').value;

        let filteredGames = games.filter(game => 
            game.name.toLowerCase().includes(search) &&
            (category === '' || game.categories.includes(category)) &&
            (status === '' || game.status === status)
        );

        if (sort === 'newest') {
            filteredGames.sort((a, b) => b.id - a.id);
        } else if (sort === 'oldest') {
            filteredGames.sort((a, b) => a.id - b.id);
        } else if (sort === 'popular') {
            filteredGames.sort((a, b) => b.downloads - a.downloads);
        } else if (sort === 'rating') {
            filteredGames.sort((a, b) => b.rating - a.rating);
        }

        populateGameTable(filteredGames);
    }

    function filterUsers() {
        const search = document.getElementById('user-search').value.toLowerCase();
        const role = document.getElementById('user-role-filter').value;
        const status = document.getElementById('user-status-filter').value;
        const sort = document.getElementById('user-sort').value;

        let filteredUsers = users.filter(user => 
            (user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)) &&
            (role === '' || user.role === role) &&
            (status === '' || user.status === status)
        );

        if (sort === 'newest') {
            filteredUsers.sort((a, b) => new Date(b.registration) - new Date(a.registration));
        } else if (sort === 'oldest') {
            filteredUsers.sort((a, b) => new Date(a.registration) - new Date(a.registration));
        } else if (sort === 'name') {
            filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'activity') {
            filteredUsers.sort((a, b) => b.games - a.games);
        }

        populateUserTable(filteredUsers);
    }

    function filterTransactions() {
        const search = document.getElementById('transaction-search').value.toLowerCase();
        const status = document.getElementById('transaction-status-filter').value;
        const paymentMethod = document.getElementById('transaction-payment-filter').value;
        const dateRange = document.getElementById('transaction-date-filter').value;

        let filteredTransactions = transactions.filter(transaction => 
            (transaction.user.toLowerCase().includes(search) || transaction.game.toLowerCase().includes(search) || transaction.id.toLowerCase().includes(search)) &&
            (status === '' || transaction.status === status) &&
            (paymentMethod === '' || transaction.paymentMethod === paymentMethod) &&
            (dateRange === '' || isWithinDateRange(transaction.date, dateRange))
        );

        populateTransactionTable(filteredTransactions);
    }

    function isWithinDateRange(date, range) {
        const transactionDate = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(today - transactionDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return range === '' || diffDays <= parseInt(range);
    }

    // Event Listeners for Filters
    document.getElementById('game-search').addEventListener('input', filterGames);
    document.getElementById('game-category-filter').addEventListener('change', filterGames);
    document.getElementById('game-status-filter').addEventListener('change', filterGames);
    document.getElementById('game-sort').addEventListener('change', filterGames);

    document.getElementById('user-search').addEventListener('input', filterUsers);
    document.getElementById('user-role-filter').addEventListener('change', filterUsers);
    document.getElementById('user-status-filter').addEventListener('change', filterUsers);
    document.getElementById('user-sort').addEventListener('change', filterUsers);

    document.getElementById('transaction-search').addEventListener('input', filterTransactions);
    document.getElementById('transaction-status-filter').addEventListener('change', filterTransactions);
    document.getElementById('transaction-payment-filter').addEventListener('change', filterTransactions);
    document.getElementById('transaction-date-filter').addEventListener('change', filterTransactions);

    // CRUD Operations
    // Add Game Modal
    const addGameModal = document.getElementById('add-game-modal');
    const addGameBtn = document.getElementById('add-game-btn');
    const addGameSave = document.getElementById('add-game-save');
    const addGameCancel = document.getElementById('add-game-cancel');
    const addGameError = document.getElementById('add-game-error');

    addGameBtn.addEventListener('click', () => {
        addGameModal.classList.remove('hidden');
        addGameModal.querySelector('.scale-95').classList.add('scale-100');
        document.getElementById('add-game-name').value = '';
        document.getElementById('add-game-description').value = '';
        document.querySelectorAll('#add-game-categories input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.getElementById('add-game-price').value = '';
        document.getElementById('add-game-status').value = 'Published';
        addGameError.classList.add('hidden');
        addGameSave.dataset.mode = 'add';
    });

    addGameSave.addEventListener('click', () => {
        const name = document.getElementById('add-game-name').value.trim();
        const description = document.getElementById('add-game-description').value.trim();
        const categories = Array.from(document.querySelectorAll('#add-game-categories input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
        const price = parseFloat(document.getElementById('add-game-price').value);
        const status = document.getElementById('add-game-status').value;
        const mode = addGameSave.dataset.mode;
        const gameId = parseInt(addGameSave.dataset.id);

        if (!name || categories.length === 0 || isNaN(price) || price < 0 || !description) {
            addGameError.textContent = 'Please fill in all fields correctly';
            addGameError.classList.remove('hidden');
            return;
        }

        if (mode === 'edit') {
            const game = games.find(g => g.id === gameId);
            game.name = name;
            game.description = description;
            game.categories = categories;
            game.price = price;
            game.status = status;
        } else {
            const newGame = {
                id: games.length ? Math.max(...games.map(g => g.id)) + 1 : 1,
                name,
                description,
                categories,
                price,
                rating: 0,
                status,
                downloads: 0
            };
            games.push(newGame);
        }

        filterGames();
        addGameModal.classList.add('hidden');
        showToast('Game saved successfully', 'success');
    });

    addGameCancel.addEventListener('click', () => {
        addGameModal.classList.add('hidden');
    });

    // Add User Modal
    const addUserModal = document.getElementById('add-user-modal');
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserSave = document.getElementById('add-user-save');
    const addUserCancel = document.getElementById('add-user-cancel');
    const addUserError = document.getElementById('add-user-error');

    addUserBtn.addEventListener('click', () => {
        addUserModal.classList.remove('hidden');
        addUserModal.querySelector('.scale-95').classList.add('scale-100');
        document.getElementById('add-user-username').value = '';
        document.getElementById('add-user-email').value = '';
        document.getElementById('add-user-role').value = 'Customer';
        document.getElementById('add-user-status').value = 'Active';
        addUserError.classList.add('hidden');
        addUserSave.dataset.mode = 'add';
    });

    addUserSave.addEventListener('click', () => {
        const username = document.getElementById('add-user-username').value.trim();
        const email = document.getElementById('add-user-email').value.trim();
        const role = document.getElementById('add-user-role').value;
        const status = document.getElementById('add-user-status').value;
        const mode = addUserSave.dataset.mode;
        const userId = addUserSave.dataset.id;

        if (!username || !email) {
            addUserError.textContent = 'Username and email are required';
            addUserError.classList.remove('hidden');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            addUserError.textContent = 'Please enter a valid email';
            addUserError.classList.remove('hidden');
            return;
        }

        if (users.some(user => user.email === email && (mode === 'add' || user.id !== userId))) {
            addUserError.textContent = 'Email already exists';
            addUserError.classList.remove('hidden');
            return;
        }

        if (mode === 'edit') {
            const user = users.find(u => u.id === userId);
            user.name = username;
            user.email = email;
            user.role = role;
            user.status = status;
        } else {
            const newUser = {
                id: `U${5481 + users.length}`,
                name: username,
                email,
                phone: '+1 (555) 000-0000',
                registration: new Date().toISOString().split('T')[0],
                games: 0,
                totalSpent: 0,
                status,
                role
            };
            users.push(newUser);
        }

        localStorage.setItem('users', JSON.stringify(users));
        filterUsers();
        addUserModal.classList.add('hidden');
        showToast('User saved successfully', 'success');
    });

    addUserCancel.addEventListener('click', () => {
        addUserModal.classList.add('hidden');
    });

    // Add Transaction Modal
    const addTransactionModal = document.getElementById('add-transaction-modal');
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    const addTransactionSave = document.getElementById('add-transaction-save');
    const addTransactionCancel = document.getElementById('add-transaction-cancel');
    const addTransactionError = document.getElementById('add-transaction-error');

    function populateTransactionDropdowns() {
        const userDropdown = document.getElementById('add-transaction-user-email');
        const gameDropdown = document.getElementById('add-transaction-game');
        userDropdown.innerHTML = '<option value="">Select user</option>';
        gameDropdown.innerHTML = '<option value="">Select game</option>';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.email;
            option.textContent = `${user.name} (${user.email})`;
            userDropdown.appendChild(option);
        });
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game.name;
            option.textContent = game.name;
            gameDropdown.appendChild(option);
        });
    }

    addTransactionBtn.addEventListener('click', () => {
        addTransactionModal.classList.remove('hidden');
        addTransactionModal.querySelector('.scale-95').classList.add('scale-100');
        document.getElementById('add-transaction-user-email').value = '';
        document.getElementById('add-transaction-game').value = '';
        document.getElementById('add-transaction-amount').value = '';
        document.getElementById('add-transaction-payment-method').value = '';
        document.getElementById('add-transaction-status').value = '';
        addTransactionError.classList.add('hidden');
        addTransactionSave.dataset.mode = 'add';
        populateTransactionDropdowns();
    });

    addTransactionSave.addEventListener('click', () => {
        const email = document.getElementById('add-transaction-user-email').value;
        const gameName = document.getElementById('add-transaction-game').value;
        const amount = parseFloat(document.getElementById('add-transaction-amount').value);
        const paymentMethod = document.getElementById('add-transaction-payment-method').value;
        const status = document.getElementById('add-transaction-status').value;
        const mode = addTransactionSave.dataset.mode;
        const transactionId = addTransactionSave.dataset.id;

        if (!email || !gameName || isNaN(amount) || amount <= 0 || !paymentMethod || !status) {
            addTransactionError.textContent = 'Please fill in all fields correctly';
            addTransactionError.classList.remove('hidden');
            return;
        }

        const user = users.find(u => u.email === email);
        if (!user) {
            addTransactionError.textContent = 'Invalid user';
            addTransactionError.classList.remove('hidden');
            return;
        }

        const game = games.find(g => g.name === gameName);
        if (!game) {
            addTransactionError.textContent = 'Invalid game';
            addTransactionError.classList.remove('hidden');
            return;
        }

        if (mode === 'edit') {
            const transaction = transactions.find(t => t.id === transactionId);
            transaction.user = user.name;
            transaction.email = email;
            transaction.game = gameName;
            transaction.amount = amount;
            transaction.paymentMethod = paymentMethod;
            transaction.status = status;
        } else {
            const newTransaction = {
                id: `TX${8765 + transactions.length}`,
                user: user.name,
                email,
                game: gameName,
                date: new Date().toISOString().split('T')[0],
                amount,
                paymentMethod,
                status
            };
            transactions.push(newTransaction);
            user.games += 1;
            user.totalSpent += amount;
        }

        filterTransactions();
        addTransactionModal.classList.add('hidden');
        showToast('Transaction saved successfully', 'success');
    });

    addTransactionCancel.addEventListener('click', () => {
        addTransactionModal.classList.add('hidden');
    });

    // Close modals when clicking outside or pressing Esc
    document.addEventListener('click', (e) => {
        if (e.target === addGameModal) addGameModal.classList.add('hidden');
        if (e.target === addUserModal) addUserModal.classList.add('hidden');
        if (e.target === addTransactionModal) addTransactionModal.classList.add('hidden');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            addGameModal.classList.add('hidden');
            addUserModal.classList.add('hidden');
            addTransactionModal.classList.add('hidden');
        }
    });

    // Toast Notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Table Action Listeners
    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-game')) {
            const id = parseInt(e.target.closest('.edit-game').dataset.id);
            const game = games.find(g => g.id === id);
            addGameModal.classList.remove('hidden');
            addGameModal.querySelector('.scale-95').classList.add('scale-100');
            document.getElementById('add-game-name').value = game.name;
            document.getElementById('add-game-description').value = game.description;
            document.querySelectorAll('#add-game-categories input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = game.categories.includes(checkbox.value);
            });
            document.getElementById('add-game-price').value = game.price;
            document.getElementById('add-game-status').value = game.status;
            addGameError.classList.add('hidden');
            addGameSave.dataset.mode = 'edit';
            addGameSave.dataset.id = id;
        } else if (e.target.closest('.view-game')) {
            const id = parseInt(e.target.closest('.view-game').dataset.id);
            const game = games.find(g => g.id === id);
            alert(`Game Details:\nName: ${game.name}\nDescription: ${game.description}\nCategories: ${game.categories.join(', ')}\nPrice: $${game.price.toFixed(2)}\nStatus: ${game.status}\nRating: ${game.rating}\nDownloads: ${game.downloads}`);
        } else if (e.target.closest('.delete-game')) {
            const id = parseInt(e.target.closest('.delete-game').dataset.id);
            if (confirm(`Delete game with ID ${id}?`)) {
                games.splice(games.findIndex(g => g.id === id), 1);
                filterGames();
                showToast('Game deleted successfully', 'success');
            }
        } else if (e.target.closest('.edit-user')) {
            const id = e.target.closest('.edit-user').dataset.id;
            const user = users.find(u => u.id === id);
            addUserModal.classList.remove('hidden');
            addUserModal.querySelector('.scale-95').classList.add('scale-100');
            document.getElementById('add-user-username').value = user.name;
            document.getElementById('add-user-email').value = user.email;
            document.getElementById('add-user-role').value = user.role;
            document.getElementById('add-user-status').value = user.status;
            addUserError.classList.add('hidden');
            addUserSave.dataset.mode = 'edit';
            addUserSave.dataset.id = id;
        } else if (e.target.closest('.view-user')) {
            const id = e.target.closest('.view-user').dataset.id;
            const user = users.find(u => u.id === id);
            alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nPhone: ${user.phone}\nRegistration: ${user.registration}\nGames: ${user.games}\nTotal Spent: $${user.totalSpent.toFixed(2)}\nStatus: ${user.status}\nRole: ${user.role}`);
        } else if (e.target.closest('.toggle-user-status')) {
            const id = e.target.closest('.toggle-user-status').dataset.id;
            const user = users.find(u => u.id === id);
            user.status = user.status === 'Active' ? 'Suspended' : 'Active';
            localStorage.setItem('users', JSON.stringify(users));
            filterUsers();
            showToast(`User ${user.status === 'Active' ? 'activated' : 'suspended'} successfully`, 'success');
        } else if (e.target.closest('.edit-transaction')) {
            const id = e.target.closest('.edit-transaction').dataset.id;
            const transaction = transactions.find(t => t.id === id);
            addTransactionModal.classList.remove('hidden');
            addTransactionModal.querySelector('.scale-95').classList.add('scale-100');
            populateTransactionDropdowns();
            document.getElementById('add-transaction-user-email').value = transaction.email;
            document.getElementById('add-transaction-game').value = transaction.game;
            document.getElementById('add-transaction-amount').value = transaction.amount;
            document.getElementById('add-transaction-payment-method').value = transaction.paymentMethod;
            document.getElementById('add-transaction-status').value = transaction.status;
            addTransactionError.classList.add('hidden');
            addTransactionSave.dataset.mode = 'edit';
            addTransactionSave.dataset.id = id;
        } else if (e.target.closest('.view-transaction')) {
            const id = e.target.closest('.view-transaction').dataset.id;
            const transaction = transactions.find(t => t.id === id);
            alert(`Transaction Details:\nID: ${transaction.id}\nUser: ${transaction.user} (${transaction.email})\nGame: ${transaction.game}\nDate: ${transaction.date}\nAmount: $${transaction.amount.toFixed(2)}\nPayment Method: ${transaction.paymentMethod}\nStatus: ${transaction.status}`);
        } else if (e.target.closest('.delete-transaction')) {
            const id = e.target.closest('.delete-transaction').dataset.id;
            if (confirm(`Delete transaction with ID ${id}?`)) {
                transactions.splice(transactions.findIndex(t => t.id === id), 1);
                filterTransactions();
                showToast('Transaction deleted successfully', 'success');
            }
        }
    });

    // Report Generation
    document.getElementById('generate-report-btn').addEventListener('click', () => {
        const reportType = document.getElementById('report-type').value;
        const dateRange = document.getElementById('report-date-range').value;
        reportChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        reportChart.data.datasets[0].label = reportType.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        reportChart.data.datasets[0].data = Array(5).fill().map(() => Math.random() * 10000);
        reportChart.update();
        showToast(`Generated ${reportChart.data.datasets[0].label} report`, 'success');
    });

    // Save Settings
    document.getElementById('save-settings-btn').addEventListener('click', () => {
        const platformName = document.getElementById('platform-name').value.trim();
        const adminEmail = document.getElementById('admin-email').value.trim();
        const currency = document.getElementById('currency').value;
        if (!platformName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
            showToast('Please enter valid settings', 'error');
            return;
        }
        showToast(`Settings saved: ${platformName}, ${adminEmail}, ${currency}`, 'success');
    });

    // Initial Population
    populateGameTable(games);
    populateUserTable(users);
    populateTransactionTable(transactions);
});