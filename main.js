document.addEventListener('DOMContentLoaded', () => {
    // Hard-coded admin account
    const adminAccount = {
        username: "admin",
        password: "admin"
    };

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const dashboard = document.querySelector('.flex.h-screen');
    dashboard.style.display = isLoggedIn ? 'flex' : 'none';

    // Create auth container
    let authContainer = document.getElementById('auth-container');
    if (!authContainer) {
        authContainer = document.createElement('div');
        authContainer.id = 'auth-container';
        authContainer.className = 'fixed inset-0 flex items-center justify-center bg-gray-100';
        authContainer.style.display = isLoggedIn ? 'none' : 'flex';
        authContainer.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 class="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
                <div id="login-form" class="form">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input type="text" id="login-username" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your username" value="admin">
                    </div>
                    <div class="mb-6 relative">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input type="password" id="login-password" class="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" value="admin">
                        <button type="button" id="toggle-password" class="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <button id="login-btn" class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Login</button>
                    <p id="login-error" class="text-red-500 text-sm mt-2 hidden">Invalid username or password</p>
                </div>
            </div>
        `;
        document.body.appendChild(authContainer);
    }

    // Set default input values and handle show/hide password
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const togglePasswordBtn = document.getElementById('toggle-password');

    // Set default values
    usernameInput.value = adminAccount.username;
    passwordInput.value = adminAccount.password;

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePasswordBtn.innerHTML = `<i class="fas fa-${isPassword ? 'eye-slash' : 'eye'}"></i>`;
    });

    // Login
    document.getElementById('login-btn').addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const error = document.getElementById('login-error');

        if (username === adminAccount.username && password === adminAccount.password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({ username: adminAccount.username }));
            authContainer.style.display = 'none';
            dashboard.style.display = 'flex';
            error.classList.add('hidden');
            updateAdminName();
        } else {
            error.classList.remove('hidden');
        }
    });

    // Logout
    const header = document.querySelector('header .flex.items-center:last-child');
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm logout-btn';

    // Check screen size to set logout button content
    const isMobile = window.innerWidth < 641;
    logoutBtn.innerHTML = isMobile 
        ? '<i class="fas fa-sign-out-alt"></i>' 
        : '<i class="fas fa-sign-out-alt mr-1"></i> Logout';

    // Update logout button on window resize
    window.addEventListener('resize', () => {
        const isMobileNow = window.innerWidth < 641;
        logoutBtn.innerHTML = isMobileNow 
            ? '<i class="fas fa-sign-out-alt"></i>' 
            : '<i class="fas fa-sign-out-alt mr-1"></i> Logout';
    });

    header.appendChild(logoutBtn);

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        dashboard.style.display = 'none';
        authContainer.style.display = 'flex';
        // Reset input values to default
        usernameInput.value = adminAccount.username;
        passwordInput.value = adminAccount.password;
        passwordInput.type = 'password';
        togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
        updateAdminName();
    });

    // Update admin name
    const updateAdminName = () => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const adminNameSpan = document.querySelector('.ad-name');
        adminNameSpan.textContent = user.username || 'Admin';
    };
    updateAdminName();
    //localstorage data
    localStorage.setItem('platformUsers', JSON.stringify([
        {
            id: "U5481",
            name: "Alice Nguyen",
            email: "alice.nguyen@example.com",
            wallet: 100.00,
            status: "Active",
            gameHistory: [
                { game: "Lucky Card Flip", date: "2025-05-12", result: "Win", bet: 100.00, payout: 200.00 }, // Profit: $100
                { game: "Slot Machine", date: "2025-05-11", result: "Lose", bet: 50.00, payout: 0.00 } // Profit: -$50
            ]
        },
        {
            id: "U5480",
            name: "Brian Tran",
            email: "brian.tran@example.com",
            wallet: 200.00,
            status: "Active",
            gameHistory: [
                { game: "Dice Roll", date: "2025-05-12", result: "Win", bet: 150.00, payout: 300.00 } // Profit: $150
            ]
        },
        {
            id: "U5479",
            name: "Cindy Le",
            email: "cindy.le@example.com",
            wallet: 50.00,
            status: "Banned",
            gameHistory: []
        },
        {
            id: "U5482",
            name: "David Pham",
            email: "david.pham@example.com",
            wallet: 300.00,
            status: "Active",
            gameHistory: [
                { game: "Crash", date: "2025-05-14", result: "Win", bet: 20.00, payout: 50.00 } // Profit: $30
            ]
        },
        {
            id: "U5483",
            name: "Emma Vu",
            email: "emma.vu@example.com",
            wallet: 250.00,
            status: "Active",
            gameHistory: [
                { game: "Aviator", date: "2025-05-14", result: "Win", bet: 15.00, payout: 40.00 } // Profit: $25
            ]
        },
        {
            id: "U5484",
            name: "Frank Ho",
            email: "frank.ho@example.com",
            wallet: 200.00,
            status: "Active",
            gameHistory: [
                { game: "Dice Roll", date: "2025-05-14", result: "Win", bet: 10.00, payout: 30.00 } // Profit: $20
            ]
        },
        {
            id: "U5485",
            name: "Grace Tran",
            email: "grace.tran@example.com",
            wallet: 150.00,
            status: "Active",
            gameHistory: [
                { game: "Lucky Card Flip", date: "2025-05-14", result: "Win", bet: 5.00, payout: 20.00 } // Profit: $15
            ]
        },
        {
            id: "U5486",
            name: "Henry Nguyen",
            email: "henry.nguyen@example.com",
            wallet: 100.00,
            status: "Active",
            gameHistory: [
                { game: "Lucky Wheel", date: "2025-05-14", result: "Win", bet: 10.00, payout: 30.00 } // Profit: $20
            ]
        },
        {
            id: "U5487",
            name: "Isabella Le",
            email: "isabella.le@example.com",
            wallet: 120.00,
            status: "Active",
            gameHistory: [
                { game: "Plinko", date: "2025-05-14", result: "Win", bet: 10.00, payout: 25.00 } // Profit: $15
            ]
        },
        {
            id: "U5488",
            name: "Jack Dao",
            email: "jack.dao@example.com",
            wallet: 180.00,
            status: "Active",
            gameHistory: [
                { game: "Coin Flip", date: "2025-05-14", result: "Win", bet: 5.00, payout: 15.00 } // Profit: $10
            ]
        },
        {
            id: "U5489",
            name: "Kelly Bui",
            email: "kelly.bui@example.com",
            wallet: 220.00,
            status: "Active",
            gameHistory: [
                { game: "Limbo", date: "2025-05-14", result: "Win", bet: 20.00, payout: 50.00 } // Profit: $30
            ]
        },
        {
            id: "U5490",
            name: "Liam Vo",
            email: "liam.vo@example.com",
            wallet: 270.00,
            status: "Active",
            gameHistory: [
                { game: "Goal", date: "2025-05-14", result: "Win", bet: 15.00, payout: 40.00 } // Profit: $25
            ]
        },
        {
            id: "U5491",
            name: "Mia Phan",
            email: "mia.phan@example.com",
            wallet: 300.00,
            status: "Active",
            gameHistory: [
                { game: "Video Poker", date: "2025-05-14", result: "Win", bet: 10.00, payout: 30.00 } // Profit: $20
            ]
        },
        {
            id: "U5492",
            name: "Noah Dinh",
            email: "noah.dinh@example.com",
            wallet: 190.00,
            status: "Active",
            gameHistory: [
                { game: "Classic Wheel", date: "2025-05-14", result: "Win", bet: 5.00, payout: 20.00 } // Profit: $15
            ]
        },
        {
            id: "U5493",
            name: "Olivia Huynh",
            email: "olivia.huynh@example.com",
            wallet: 260.00,
            status: "Active",
            gameHistory: [
                { game: "Racing", date: "2025-05-14", result: "Win", bet: 10.00, payout: 35.00 } // Profit: $25
            ]
        }
    ]));
    // Data
    let games = JSON.parse(localStorage.getItem('games')) || [
        { id: 1, name: "Lucky Card Flip", description: "Flip one of three cards to reveal a hidden reward", status: "On", winRate: 55, preResult: "", plays: 1200 },
        { id: 2, name: "Dice Roll", description: "Guess the result of a dice roll from 1 to 6", status: "On", winRate: 60, preResult: "Win", plays: 800 },
        { id: 3, name: "Lucky Wheel", description: "Spin the wheel and win based on the landed segment", status: "On", winRate: 45, preResult: "", plays: 1500 },
        { id: 4, name: "Slot Machine", description: "Classic 3-row slot with randomized symbols and combinations", status: "On", winRate: 50, preResult: "Lose", plays: 1000 },
        { id: 5, name: "Mystery Box", description: "Open a random box for a chance to win valuable prize", status: "Off", winRate: 40, preResult: "", plays: 300 },
        { id: 6, name: "Plinko", description: "Drop a ball through a peg board to land in a random reward slot", status: "On", winRate: 52, preResult: "", plays: 900 },
        { id: 7, name: "Mine", description: "Choose safe tiles on a grid without hitting mines", status: "On", winRate: 48, preResult: "Win", plays: 600 },
        { id: 8, name: "Crash", description: "Bet and cash out before the rising multiplier crashes", status: "On", winRate: 65, preResult: "", plays: 1800 },
        { id: 9, name: "Jackpot Ladder", description: "Climb the reward ladder — the longer you play, the bigger the jackpot", status: "On", winRate: 42, preResult: "", plays: 400 },
        { id: 10, name: "Aviator", description: "Bet on a plane's ascent and cash out before it crashes", status: "On", winRate: 58, preResult: "Lose", plays: 1100 },
        { id: 11, name: "Higher or Lower", description: "Predict whether the next number will be higher or lower", status: "On", winRate: 50, preResult: "", plays: 700 },
        { id: 12, name: "Number Guess", description: "Guess a number from 1–10; correct guesses win big", status: "Off", winRate: 38, preResult: "", plays: 200 },
        { id: 13, name: "Coin Flip", description: "Simple heads-or-tails coin toss betting game", status: "On", winRate: 55, preResult: "Win", plays: 1300 },
        { id: 14, name: "Color Guess", description: "Guess which color will appear next", status: "On", winRate: 47, preResult: "", plays: 500 },
        { id: 15, name: "Limbo", description: "Bet on a multiplier and cash out before the number drops", status: "On", winRate: 60, preResult: "", plays: 950 },
        { id: 16, name: "Goal", description: "Shoot the ball and avoid the goalkeeper to score", status: "On", winRate: 53, preResult: "", plays: 850 },
        { id: 17, name: "Space Max", description: "Navigate a spaceship to pass checkpoints and collect rewards", status: "On", winRate: 49, preResult: "Lose", plays: 650 },
        { id: 18, name: "Racing", description: "Bet on animated cars and win if your pick finishes first", status: "On", winRate: 46, preResult: "", plays: 1400 },
        { id: 19, name: "Video Poker", description: "Play a quick 5-card poker game against probability", status: "On", winRate: 51, preResult: "", plays: 750 },
        { id: 20, name: "Classic Wheel", description: "Spin a wheel with fixed win segments", status: "On", winRate: 54, preResult: "", plays: 1600 }
    ];

    let users = JSON.parse(localStorage.getItem('platformUsers')) || [
        {
            id: "U5481",
            name: "Alice Nguyen",
            email: "alice.nguyen@example.com",
            wallet: 100.00,
            status: "Active",
            gameHistory: [
                { game: "Lucky Card Flip", date: "2025-05-12", result: "Win", bet: 100.00, payout: 200.00 }, // Profit: $10
                { game: "Slot Machine", date: "2025-05-11", result: "Lose", bet: 50.00, payout: 0.00 } // Profit: -$5
            ]
        },
        {
            id: "U5480",
            name: "Brian Tran",
            email: "brian.tran@example.com",
            wallet: 200.00,
            status: "Active",
            gameHistory: [
                { game: "Dice Roll", date: "2025-05-12", result: "Win", bet: 150.00, payout: 300.00 } // Profit: $15
            ]
        },
        {
            id: "U5479",
            name: "Cindy Le",
            email: "cindy.le@example.com",
            wallet: 50.00,
            status: "Banned",
            gameHistory: []
        },
        // Thêm 12 người dùng mới
        {
            id: "U5482",
            name: "David Pham",
            email: "david.pham@example.com",
            wallet: 300.00,
            status: "Active",
            gameHistory: [
                { game: "Crash", date: "2025-05-14", result: "Win", bet: 20.00, payout: 50.00 } // Profit: $30
            ]
        },
        {
            id: "U5483",
            name: "Emma Vu",
            email: "emma.vu@example.com",
            wallet: 250.00,
            status: "Active",
            gameHistory: [
                { game: "Aviator", date: "2025-05-14", result: "Win", bet: 15.00, payout: 40.00 } // Profit: $25
            ]
        },
        {
            id: "U5484",
            name: "Frank Ho",
            email: "frank.ho@example.com",
            wallet: 200.00,
            status: "Active",
            gameHistory: [
                { game: "Dice Roll", date: "2025-05-14", result: "Win", bet: 10.00, payout: 30.00 } // Profit: $20
            ]
        },
        {
            id: "U5485",
            name: "Grace Tran",
            email: "grace.tran@example.com",
            wallet: 150.00,
            status: "Active",
            gameHistory: [
                { game: "Lucky Card Flip", date: "2025-05-14", result: "Win", bet: 5.00, payout: 20.00 } // Profit: $15
            ]
        },
        {
            id: "U5486",
            name: "Henry Nguyen",
            email: "henry.nguyen@example.com",
            wallet: 100.00,
            status: "Active",
            gameHistory: [
                { game: "Lucky Wheel", date: "2025-05-14", result: "Win", bet: 10.00, payout: 30.00 } // Profit: $20
            ]
        },
        {
            id: "U5487",
            name: "Isabella Le",
            email: "isabella.le@example.com",
            wallet: 120.00,
            status: "Active",
            gameHistory: [
                { game: "Plinko", date: "2025-05-14", result: "Win", bet: 10.00, payout: 25.00 } // Profit: $15
            ]
        },
        {
            id: "U5488",
            name: "Jack Dao",
            email: "jack.dao@example.com",
            wallet: 180.00,
            status: "Active",
            gameHistory: [
                { game: "Coin Flip", date: "2025-05-14", result: "Win", bet: 5.00, payout: 15.00 } // Profit: $10
            ]
        },
        {
            id: "U5489",
            name: "Kelly Bui",
            email: "kelly.bui@example.com",
            wallet: 220.00,
            status: "Active",
            gameHistory: [
                { game: "Limbo", date: "2025-05-14", result: "Win", bet: 20.00, payout: 50.00 } // Profit: $30
            ]
        },
        {
            id: "U5490",
            name: "Liam Vo",
            email: "liam.vo@example.com",
            wallet: 270.00,
            status: "Active",
            gameHistory: [
                { game: "Goal", date: "2025-05-14", result: "Win", bet: 15.00, payout: 40.00 } // Profit: $25
            ]
        },
        {
            id: "U5491",
            name: "Mia Phan",
            email: "mia.phan@example.com",
            wallet: 300.00,
            status: "Active",
            gameHistory: [
                { game: "Video Poker", date: "2025-05-14", result: "Win", bet: 10.00, payout: 30.00 } // Profit: $20
            ]
        },
        {
            id: "U5492",
            name: "Noah Dinh",
            email: "noah.dinh@example.com",
            wallet: 190.00,
            status: "Active",
            gameHistory: [
                { game: "Classic Wheel", date: "2025-05-14", result: "Win", bet: 5.00, payout: 20.00 } // Profit: $15
            ]
        },
        {
            id: "U5493",
            name: "Olivia Huynh",
            email: "olivia.huynh@example.com",
            wallet: 260.00,
            status: "Active",
            gameHistory: [
                { game: "Racing", date: "2025-05-14", result: "Win", bet: 10.00, payout: 35.00 } // Profit: $25
            ]
        }
    ];

    let walletTransactions = JSON.parse(localStorage.getItem('walletTransactions')) || [
        {
            id: "WT8765",
            user: "Alice Nguyen",
            email: "alice.nguyen@example.com",
            action: "Deposit",
            amount: 50.00,
            date: "2025-05-12"
        },
        {
            id: "WT8764",
            user: "Brian Tran",
            email: "brian.tran@example.com",
            action: "Withdraw",
            amount: 20.00,
            date: "2025-05-12"
        }
    ];

    let overrides = JSON.parse(localStorage.getItem('overrides')) || [
        {
            id: 1,
            game: "Lucky Card Flip",
            user: "alice.nguyen@example.com",
            result: "Win",
            expiration: "2025-05-20"
        },
        {
            id: 2,
            game: "Dice Roll",
            user: "brian.tran@example.com",
            result: "Lose",
            expiration: "2025-05-18"
        },
        {
            id: 3,
            game: "Crash",
            user: "david.pham@example.com",
            result: "Win",
            expiration: "2025-04-20"
        },
        {
            id: 4,
            game: "Aviator",
            user: "emma.vu@example.com",
            result: "Win",
            expiration: "2025-02-18"
        },
        {
            id: 5,
            game: "Classic Wheel",
            user: "noah.dinh@example.com",
            result: "Win",
            expiration: "2025-04-22"
        },
        {
            id: 6,
            game: "Lucky Wheel",
            user: "henry.nguyen@example.com",
            result: "Win",
            expiration: "2025-02-12"
        },
                {
            id: 7,
            game: "Lucky Card Flip",
            user: "grace.tran@example.com",
            result: "Win",
            expiration: "2025-05-18"
        },
    ];

    let notifications = JSON.parse(localStorage.getItem('notifications')) || [
        { id: 1, title: "New User Registered", message: "A new user has registered.", time: "2025-05-13 10:30 AM" },
        { id: 2, title: "Game Status Changed", message: "Mystery Box has been turned off.", time: "2025-05-13 09:15 AM" }
    ];

    // Toggle Sidebar on PC
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const content = document.querySelector('.content');
    const sidebar = document.querySelector('.sidebar');

    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            content.classList.toggle('sidebar-collapsed');
        });
    }

    // Hamburger Menu on Mobile
    const hamburgerMenuBtn = document.getElementById('hamburger-menu');
    const hamburgerMenuContent = document.getElementById('hamburger-menu-content');
    const closeHamburgerBtn = document.getElementById('close-hamburger');

    if (hamburgerMenuBtn && hamburgerMenuContent && closeHamburgerBtn) {
        hamburgerMenuBtn.addEventListener('click', () => {
            hamburgerMenuContent.classList.remove('hidden');
            sidebar.classList.remove('collapsed');
        });

        closeHamburgerBtn.addEventListener('click', () => {
            hamburgerMenuContent.classList.add('hidden');
            sidebar.classList.add('collapsed');
        });

        hamburgerMenuContent.addEventListener('click', (e) => {
            if (e.target === hamburgerMenuContent) {
                hamburgerMenuContent.classList.add('hidden');
                sidebar.classList.add('collapsed');
            }
        });
    }

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
            pageTitle.textContent = targetPage.charAt(0).toUpperCase() + targetPage.slice(1).replace('-', ' ');
            if (window.innerWidth < 641) {
                hamburgerMenuContent.classList.add('hidden');
                sidebar.classList.add('collapsed');
            }
        });
    });

    // Charts
    const playChart = new Chart(document.getElementById('playChart'), {
        type: 'line',
        data: {
            labels: ['May 6', 'May 7', 'May 8', 'May 9', 'May 10', 'May 11', 'May 12'],
            datasets: [{
                label: 'Game Plays',
                data: [50, 250, 300, 280, 320, 350, 400],
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allow custom height
            layout: {
                padding: {
                    bottom: 20
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 400 + 100, // Dynamic max: highest value (400) + 100
                    ticks: {
                        stepSize: Math.max(50, Math.ceil((400 + 100) / 5)), // Dynamic step size (~5 steps)
                        callback: value => value // No formatting needed for integers
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });

    // Initialize profit chart with top 5 most profitable games
    const profitChartCanvas = document.getElementById('profitChart');
        if (!profitChartCanvas) {
            console.error('profitChart canvas not found');
        } else {
            // Aggregate profit by game from users' gameHistory
            const profitByGame = {};
            users.forEach(user => {
                user.gameHistory.forEach(record => {
                    const gameName = record.game;
                    const profit = (record.payout || 0) - (record.bet || 0); // User profit
                    profitByGame[gameName] = (profitByGame[gameName] || 0) + profit;
                });
            });

            // Convert to array of {game, profit} objects and sort by profit
            let sortedProfits = Object.entries(profitByGame)
                .map(([game, profit]) => ({ game, profit }))
                .sort((a, b) => b.profit - a.profit);

            // Select top 5 games and calculate "Other"
            const top5Profits = sortedProfits.slice(0, 5);
            const otherProfit = sortedProfits.slice(5).reduce((sum, item) => sum + item.profit, 0);
            top5Profits.push({ game: "Other", profit: otherProfit });

            // Extract labels and profits
            const labels = top5Profits.map(item => item.game);
            const profits = top5Profits.map(item => item.profit);

            // Determine dynamic max for y-axis with smaller buffer
            const maxProfit = Math.max(0, ...profits); // Đảm bảo không âm
            const yAxisMax = maxProfit + 50; // Buffer nhỏ hơn, dựa trên hình ảnh max là $162

            // Destroy existing chart if any
            if (profitChartCanvas.chart) {
                profitChartCanvas.chart.destroy();
            }

            // Create bar chart
            profitChartCanvas.chart = new Chart(profitChartCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Profit ($)',
                        data: profits,
                        backgroundColor: 'rgb(59, 130, 246)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Cho phép tùy chỉnh chiều cao
                    layout: {
                        padding: {
                            bottom: 10 // Giảm padding dưới
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: yAxisMax, // Ví dụ: 162 + 50 = 212
                            ticks: {
                                stepSize: Math.max(20, Math.ceil(yAxisMax / 5)), // Bước chia động
                                callback: value => `$${value.toFixed(2)}`
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Game'
                            },
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 0,
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        tooltip: {
                            callbacks: {
                                label: context => `$${context.parsed.y.toFixed(2)}`
                            }
                        }
                    }
                }
            });
        }

    // Populate Tables
    function populateGameTable(filteredGames) {
        const tbody = document.getElementById('game-table-body');
        const paginationContainer = document.getElementById('game-pagination');
        if (!tbody) {
            console.error('game-table-body not found');
            return;
        }

        // Determine items per page based on screen size
        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 8;
        const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('gamePage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        // Get data for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedGames = filteredGames.slice(start, end);

        // Render table rows
        tbody.innerHTML = paginatedGames.length > 0 ? paginatedGames.map(game => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${game.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.description}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${game.status === 'On' ? 'green' : 'red'}-100 text-${game.status === 'On' ? 'green' : 'red'}-800">${game.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.winRate}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.preResult || 'None'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-game" data-id="${game.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-game" data-id="${game.id}"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No games found</td></tr>';

        // Render pagination controls
        if (!paginationContainer) {
            console.warn('game-pagination container not found, skipping pagination');
            return;
        }
        renderPagination(paginationContainer, totalPages, currentPage, page => {
            localStorage.setItem('gamePage', page);
            populateGameTable(filteredGames);
        });
    }

    function populateUserTable(filteredUsers) {
        const tbody = document.getElementById('user-table-body');
        const paginationContainer = document.getElementById('user-pagination');
        if (!tbody) {
            console.error('user-table-body not found');
            return;
        }

        // Determine items per page based on screen size
        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 8;
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('userPage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        // Get data for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedUsers = filteredUsers.slice(start, end);

        // Render table rows
        tbody.innerHTML = paginatedUsers.length > 0 ? paginatedUsers.map(user => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <img src="https://static.vecteezy.com/system/resources/previews/019/465/366/original/3d-user-icon-on-transparent-background-free-png.png" alt="User" class="w-10 h-10 rounded-full ad-res">
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${user.name}</div>
                            <div class="text-xs text-gray-500">User ID: ${user.id}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${user.wallet.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${user.status === 'Active' ? 'green' : 'red'}-100 text-${user.status === 'Active' ? 'green' : 'red'}-800">${user.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-user" data-id="${user.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 mr-3 view-history" data-id="${user.id}"><i class="fas fa-eye"></i></a>
                    <a href="#" class="text-green-600 hover:text-green-900 mr-3 update-wallet" data-id="${user.id}"><i class="fas fa-wallet"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 toggle-ban" data-id="${user.id}"><i class="fas fa-ban"></i></a>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No users found</td></tr>';

        // Render pagination controls
        if (!paginationContainer) {
            console.warn('user-pagination container not found, skipping pagination');
            return;
        }
        renderPagination(paginationContainer, totalPages, currentPage, page => {
            localStorage.setItem('userPage', page);
            populateUserTable(filteredUsers);
        });
    }

    function populateOverrideTable(filteredOverrides) {
        const tbody = document.getElementById('override-table-body');
        const paginationContainer = document.getElementById('override-pagination');
        if (!tbody) {
            console.error('override-table-body not found');
            return;
        }

        // Determine items per page based on screen size
        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 8;
        const totalPages = Math.ceil(filteredOverrides.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('overridePage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        // Get data for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedOverrides = filteredOverrides.slice(start, end);

        // Render table rows
        tbody.innerHTML = paginatedOverrides.length > 0 ? paginatedOverrides.map(override => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.game}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.user}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.result}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.expiration}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-override" data-id="${override.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-override" data-id="${override.id}"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No overrides found</td></tr>';

        // Render pagination controls
        if (!paginationContainer) {
            console.warn('override-pagination container not found, skipping pagination');
            return;
        }
        renderPagination(paginationContainer, totalPages, currentPage, page => {
            localStorage.setItem('overridePage', page);
            populateOverrideTable(filteredOverrides);
        });
    }

    function populateGameHistoryTable(history) {
        const tbody = document.getElementById('game-history-table-body');
        const paginationContainer = document.getElementById('game-history-pagination');
        if (!tbody) {
            console.error('game-history-table-body not found');
            return;
        }

        // Determine items per page based on screen size
        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 8;
        const totalPages = Math.ceil(history.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('gameHistoryPage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        // Get data for the current page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedHistory = history.slice(start, end);

        // Render table rows
        tbody.innerHTML = paginatedHistory.length > 0 ? paginatedHistory.map(record => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.game}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.result}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${record.bet.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${record.payout.toFixed(2)}</td>
            </tr>
        `).join('') : '<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No game history</td></tr>';

        // Render pagination controls
        if (!paginationContainer) {
            console.warn('game-history-pagination container not found, skipping pagination');
            return;
        }
        renderPagination(paginationContainer, totalPages, currentPage, page => {
            localStorage.setItem('gameHistoryPage', page);
            populateGameHistoryTable(history);
        });
    }

    function renderPagination(container, totalPages, currentPage, onPageChange) {
        container.innerHTML = '';
        if (totalPages <= 1) return;

        // Log pagination state for debugging

        const pagination = document.createElement('div');
        pagination.className = 'flex items-center justify-center mt-4 space-x-2';

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.className = `px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`;
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) onPageChange(currentPage - 1);
        });

        // Page tabs (show only previous, current, next)
        const pageTabs = document.createElement('div');
        pageTabs.className = 'flex space-x-1';

        // Calculate the tabs to display
        const tabsToShow = [];
        if (totalPages <= 3) {
            // If 3 or fewer pages, show all
            for (let i = 1; i <= totalPages; i++) {
                tabsToShow.push(i);
            }
        } else {
            // Show previous, current, next
            if (currentPage === 1) {
                tabsToShow.push(1, 2, 3); // [1][2][3]
            } else if (currentPage === totalPages) {
                tabsToShow.push(totalPages - 2, totalPages - 1, totalPages); // [N-2][N-1][N]
            } else {
                tabsToShow.push(currentPage - 1, currentPage, currentPage + 1); // [prev][current][next]
            }
        }

        // Render the tabs
        tabsToShow.forEach(page => {
            const pageButton = document.createElement('button');
            pageButton.className = `px-3 py-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
            pageButton.textContent = page;
            pageButton.addEventListener('click', () => onPageChange(page));
            pageTabs.appendChild(pageButton);
        });

        // Next button
        const nextButton = document.createElement('button');
        nextButton.className = `px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`;
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) onPageChange(currentPage + 1);
        });

        pagination.appendChild(prevButton);
        pagination.appendChild(pageTabs);
        pagination.appendChild(nextButton);
        container.appendChild(pagination);
    }

    // Game Modal
    const addGameModal = document.getElementById('add-game-modal');
    const addGameBtn = document.getElementById('add-game-btn');
    const addGameSave = document.getElementById('add-game-save');
    const addGameCancel = document.getElementById('add-game-cancel');
    const addGameError = document.getElementById('add-game-error');

    let isEditingGame = false;
    let editingGameId = null;

    addGameBtn.addEventListener('click', () => {
        addGameModal.classList.remove('hidden');
        document.getElementById('add-game-name').value = '';
        document.getElementById('add-game-description').value = '';
        document.getElementById('add-game-status').value = 'On';
        document.getElementById('add-game-win-rate').value = '';
        document.getElementById('add-game-pre-result').value = '';
        addGameError.classList.add('hidden');
        isEditingGame = false;
        editingGameId = null;
    });

    addGameCancel.addEventListener('click', () => {
        addGameModal.classList.add('hidden');
    });

    addGameSave.addEventListener('click', () => {
        const name = document.getElementById('add-game-name').value.trim();
        const description = document.getElementById('add-game-description').value.trim();
        const status = document.getElementById('add-game-status').value;
        const winRate = parseInt(document.getElementById('add-game-win-rate').value);
        const preResult = document.getElementById('add-game-pre-result').value;

        if (!name || !description || !status || isNaN(winRate) || winRate < 0 || winRate > 100) {
            addGameError.classList.remove('hidden');
            return;
        }

        if (isEditingGame) {
            const game = games.find(g => g.id === editingGameId);
            game.name = name;
            game.description = description;
            game.status = status;
            game.winRate = winRate;
            game.preResult = preResult;
            notifications.push({
                id: notifications.length + 1,
                title: "Game Updated",
                message: `Game "${name}" has been updated.`,
                time: new Date().toLocaleString()
            });
        } else {
            const newGame = {
                id: games.length ? Math.max(...games.map(g => g.id)) + 1 : 1,
                name,
                description,
                status,
                winRate,
                preResult,
                plays: 0
            };
            games.push(newGame);
            notifications.push({
                id: notifications.length + 1,
                title: "New Game Added",
                message: `Game "${name}" has been added.`,
                time: new Date().toLocaleString()
            });
        }

        localStorage.setItem('games', JSON.stringify(games));
        localStorage.setItem('notifications', JSON.stringify(notifications));
        populateGameTable(games);
        updateDashboardStats();
        updateNotificationBadge();
        addGameModal.classList.add('hidden');
    });

    document.getElementById('game-table-body').addEventListener('click', (e) => {
        if (e.target.closest('.edit-game')) {
            e.preventDefault();
            const id = parseInt(e.target.closest('.edit-game').dataset.id);
            const game = games.find(g => g.id === id);
            document.getElementById('add-game-name').value = game.name;
            document.getElementById('add-game-description').value = game.description;
            document.getElementById('add-game-status').value = game.status;
            document.getElementById('add-game-win-rate').value = game.winRate;
            document.getElementById('add-game-pre-result').value = game.preResult;
            addGameModal.classList.remove('hidden');
            isEditingGame = true;
            editingGameId = id;
        }

        if (e.target.closest('.delete-game')) {
            e.preventDefault();
            const id = parseInt(e.target.closest('.delete-game').dataset.id);
            const game = games.find(g => g.id === id);
            games = games.filter(g => g.id !== id);
            notifications.push({
                id: notifications.length + 1,
                title: "Game Deleted",
                message: `Game "${game.name}" has been deleted.`,
                time: new Date().toLocaleString()
            });
            localStorage.setItem('games', JSON.stringify(games));
            localStorage.setItem('notifications', JSON.stringify(notifications));
            populateGameTable(games);
            updateDashboardStats();
            update部分

            updateNotificationBadge();
        }
    });

    // Game Filters
    document.getElementById('game-search').addEventListener('input', filterGames);
    document.getElementById('game-status-filter').addEventListener('change', filterGames);

    function filterGames() {
        let filteredGames = [...games];
        const search = document.getElementById('game-search').value.toLowerCase();
        const status = document.getElementById('game-status-filter').value;

        if (search) {
            filteredGames = filteredGames.filter(game => game.name.toLowerCase().includes(search));
        }

        if (status) {
            filteredGames = filteredGames.filter(game => game.status === status);
        }

        populateGameTable(filteredGames);
    }

    // User Modal
    const addUserModal = document.getElementById('add-user-modal');
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserSave = document.getElementById('add-user-save');
    const addUserCancel = document.getElementById('add-user-cancel');
    const addUserError = document.getElementById('add-user-error');

    let isEditingUser = false;
    let editingUserId = null;

    addUserBtn.addEventListener('click', () => {
        addUserModal.classList.remove('hidden');
        document.getElementById('add-user-username').value = '';
        document.getElementById('add-user-email').value = '';
        document.getElementById('add-user-wallet').value = '';
        document.getElementById('add-user-status').value = 'Active';
        addUserError.classList.add('hidden');
        isEditingUser = false;
        editingUserId = null;
    });

    addUserCancel.addEventListener('click', () => {
        addUserModal.classList.add('hidden');
    });

    addUserSave.addEventListener('click', () => {
        const username = document.getElementById('add-user-username').value.trim();
        const email = document.getElementById('add-user-email').value.trim();
        const wallet = parseFloat(document.getElementById('add-user-wallet').value);
        const status = document.getElementById('add-user-status').value;

        if (!username || !email || isNaN(wallet) || wallet < 0) {
            addUserError.textContent = 'All fields are required and wallet must be non-negative.';
            addUserError.classList.remove('hidden');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            addUserError.textContent = 'Invalid email format';
            addUserError.classList.remove('hidden');
            return;
        }

        if (isEditingUser) {
            const user = users.find(u => u.id === editingUserId);
            user.name = username;
            user.email = email;
            user.wallet = wallet;
            user.status = status;
            notifications.push({
                id: notifications.length + 1,
                title: "User Updated",
                message: `User "${username}" has been updated.`,
                time: new Date().toLocaleString()
            });
        } else {
            const newUser = {
                id: `U${Math.floor(Math.random() * 10000)}`,
                name: username,
                email,
                wallet,
                status,
                gameHistory: []
            };
            users.push(newUser);
            notifications.push({
                id: notifications.length + 1,
                title: "New User Registered",
                message: `User "${username}" has registered.`,
                time: new Date().toLocaleString()
            });
        }

        localStorage.setItem('platformUsers', JSON.stringify(users));
        localStorage.setItem('notifications', JSON.stringify(notifications));
        populateUserTable(users);
        updateDashboardStats();
        updateNotificationBadge();
        addUserModal.classList.add('hidden');
    });

    // Wallet Update Modal
    const walletUpdateModal = document.getElementById('wallet-update-modal');
    const walletSave = document.getElementById('wallet-save');
    const walletCancel = document.getElementById('wallet-cancel');
    const walletError = document.getElementById('wallet-error');

    let walletUserId = null;

    walletCancel.addEventListener('click', () => {
        walletUpdateModal.classList.add('hidden');
    });

    walletSave.addEventListener('click', () => {
        const action = document.getElementById('wallet-action').value;
        const amount = parseFloat(document.getElementById('wallet-amount').value);

        if (isNaN(amount) || amount <= 0) {
            walletError.classList.remove('hidden');
            return;
        }

        const user = users.find(u => u.id === walletUserId);
        if (action === 'Withdraw' && amount > user.wallet) {
            walletError.textContent = 'Insufficient balance.';
            walletError.classList.remove('hidden');
            return;
        }

        if (action === 'Deposit') {
            user.wallet += amount;
        } else {
            user.wallet -= amount;
        }

        const transaction = {
            id: `WT${Math.floor(Math.random() * 10000)}`,
            user: user.name,
            email: user.email,
            action,
            amount,
            date: new Date().toISOString().split('T')[0]
        };
        walletTransactions.push(transaction);
        notifications.push({
            id: notifications.length + 1,
            title: `Wallet ${action}`,
            message: `${action} of $${amount.toFixed(2)} for user "${user.name}".`,
            time: new Date().toLocaleString()
        });

        localStorage.setItem('platformUsers', JSON.stringify(users));
        localStorage.setItem('walletTransactions', JSON.stringify(walletTransactions));
        localStorage.setItem('notifications', JSON.stringify(notifications));
        populateUserTable(users);
        updateDashboardStats();
        updateNotificationBadge();
        walletUpdateModal.classList.add('hidden');
    });

    // Game History Modal
    const gameHistoryModal = document.getElementById('game-history-modal');
    const gameHistoryClose = document.getElementById('game-history-close');

    gameHistoryClose.addEventListener('click', () => {
        gameHistoryModal.classList.add('hidden');
    });

    // User Table Actions
    document.getElementById('user-table-body').addEventListener('click', (e) => {
        if (e.target.closest('.edit-user')) {
            e.preventDefault();
            const id = e.target.closest('.edit-user').dataset.id;
            const user = users.find(u => u.id === id);
            document.getElementById('add-user-username').value = user.name;
            document.getElementById('add-user-email').value = user.email;
            document.getElementById('add-user-wallet').value = user.wallet;
            document.getElementById('add-user-status').value = user.status;
            addUserModal.classList.remove('hidden');
            isEditingUser = true;
            editingUserId = id;
        }

        if (e.target.closest('.view-history')) {
            e.preventDefault();
            const id = e.target.closest('.view-history').dataset.id;
            const user = users.find(u => u.id === id);
            populateGameHistoryTable(user.gameHistory);
            gameHistoryModal.classList.remove('hidden');
        }

        if (e.target.closest('.update-wallet')) {
            e.preventDefault();
            walletUserId = e.target.closest('.update-wallet').dataset.id;
            document.getElementById('wallet-action').value = 'Deposit';
            document.getElementById('wallet-amount').value = '';
            walletError.classList.add('hidden');
            walletUpdateModal.classList.remove('hidden');
        }

        if (e.target.closest('.toggle-ban')) {
            e.preventDefault();
            const id = e.target.closest('.toggle-ban').dataset.id;
            const user = users.find(u => u.id === id);
            user.status = user.status === 'Active' ? 'Banned' : 'Active';
            notifications.push({
                id: notifications.length + 1,
                title: `User ${user.status === 'Active' ? 'Unbanned' : 'Banned'}`,
                message: `User "${user.name}" has been ${user.status === 'Active' ? 'unbanned' : 'banned'}.`,
                time: new Date().toLocaleString()
            });
            localStorage.setItem('platformUsers', JSON.stringify(users));
            localStorage.setItem('notifications', JSON.stringify(notifications));
            populateUserTable(users);
            updateNotificationBadge();
        }
    });

    // User Filters
    document.getElementById('user-search').addEventListener('input', filterUsers);
    document.getElementById('user-status-fileter').addEventListener('change', filterUsers);

    function filterUsers() {
        let filteredUsers = [...users];
        const search = document.getElementById('user-search').value.toLowerCase();
        const status = document.getElementById('user-status-fileter').value;

        if (search) {
            filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search));
        }

        if (status) {
            filteredUsers = filteredUsers.filter(user => user.status === status);
        }

        populateUserTable(filteredUsers);
    }

    // Manual Override Modal
    const addOverrideModal = document.getElementById('add-override-modal');
    const addOverrideBtn = document.getElementById('add-override-btn');
    const addOverrideSave = document.getElementById('add-override-save');
    const addOverrideCancel = document.getElementById('add-override-cancel');
    const addOverrideError = document.getElementById('add-override-error');

    let isEditingOverride = false;
    let editingOverrideId = null;

    const overrideGameSelect = document.getElementById('add-override-game');
    const overrideUserSelect = document.getElementById('add-override-user-email');

    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game.name;
        option.textContent = game.name;
        overrideGameSelect.appendChild(option);
    });

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.email;
        option.textContent = user.email;
        overrideUserSelect.appendChild(option);
    });

    addOverrideBtn.addEventListener('click', () => {
        addOverrideModal.classList.remove('hidden');
        overrideGameSelect.value = '';
        overrideUserSelect.value = '';
        document.getElementById('add-override-result').value = 'Win';
        document.getElementById('add-override-expiration').value = '';
        addOverrideError.classList.add('hidden');
        isEditingOverride = false;
        editingOverrideId = null;
    });

    addOverrideCancel.addEventListener('click', () => {
        addOverrideModal.classList.add('hidden');
    });

    addOverrideSave.addEventListener('click', () => {
        const game = overrideGameSelect.value;
        const userEmail = overrideUserSelect.value;
        const result = document.getElementById('add-override-result').value;
        const expiration = document.getElementById('add-override-expiration').value;

        if (!game || !userEmail || !result || !expiration) {
            addOverrideError.classList.remove('hidden');
            return;
        }

        if (isEditingOverride) {
            const override = overrides.find(o => o.id === editingOverrideId);
            override.game = game;
            override.user = userEmail;
            override.result = result;
            override.expiration = expiration;
            notifications.push({
                id: notifications.length + 1,
                title: "Override Updated",
                message: `Override for game "${game}" updated.`,
                time: new Date().toLocaleString()
            });
        } else {
            const newOverride = {
                id: overrides.length ? Math.max(...overrides.map(o => o.id)) + 1 : 1,
                game,
                user: userEmail,
                result,
                expiration
            };
            overrides.push(newOverride);
            notifications.push({
                id: notifications.length + 1,
                title: "New Override Added",
                message: `Override for game "${game}" added.`,
                time: new Date().toLocaleString()
            });
        }

        localStorage.setItem('overrides', JSON.stringify(overrides));
        localStorage.setItem('notifications', JSON.stringify(notifications));
        populateOverrideTable(overrides);
        updateNotificationBadge();
        addOverrideModal.classList.add('hidden');
    });

    document.getElementById('override-table-body').addEventListener('click', (e) => {
        if (e.target.closest('.edit-override')) {
            e.preventDefault();
            const id = parseInt(e.target.closest('.edit-override').dataset.id);
            const override = overrides.find(o => o.id === id);
            overrideGameSelect.value = override.game;
            overrideUserSelect.value = override.user;
            document.getElementById('add-override-result').value = override.result;
            document.getElementById('add-override-expiration').value = override.expiration;
            addOverrideModal.classList.remove('hidden');
            isEditingOverride = true;
            editingOverrideId = id;
        }

        if (e.target.closest('.delete-override')) {
            e.preventDefault();
            const id = parseInt(e.target.closest('.delete-override').dataset.id);
            const override = overrides.find(o => o.id === id);
            overrides = overrides.filter(o => o.id !== id);
            notifications.push({
                id: notifications.length + 1,
                title: "Override Deleted",
                message: `Override for game "${override.game}" deleted.`,
                time: new Date().toLocaleString()
            });
            localStorage.setItem('overrides', JSON.stringify(overrides));
            localStorage.setItem('notifications', JSON.stringify(notifications));
            populateOverrideTable(overrides);
            updateNotificationBadge();
        }
    });

    // Notifications
    function updateNotificationBadge() {
        const notificationCount = document.getElementById('notification-count');
        if (!notificationCount) return;
        notificationCount.textContent = notifications.length;
        if (notifications.length > 0) {
            notificationCount.classList.remove('hidden');
        } else {
            notificationCount.classList.add('hidden');
        }
    }

    function populateNotificationContent() {
        const notificationContent = document.getElementById('notification-content');
        if (!notificationContent) return;
        notificationContent.innerHTML = '';
        if (notifications.length === 0) {
            notificationContent.innerHTML = '<p class="px-4 py-2 text-sm text-gray-500">No notifications</p>';
            return;
        }

        notifications.forEach(notification => {
            const div = document.createElement('div');
            div.className = 'px-4 py-2 border-b last:border-b-0 hover:bg-gray-50';
            div.innerHTML = `
                <p class="text-sm font-medium text-gray-900">${notification.title}</p>
                <p class="text-xs text-gray-500">${notification.message}</p>
                <p class="text-xs text-gray-400">${notification.time}</p>
            `;
            notificationContent.appendChild(div);
        });
    }

    const notificationBell = document.getElementById('notification-bell');
    const notificationSubnav = document.getElementById('notification-subnav');

    if (notificationBell && notificationSubnav) {
        notificationBell.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationSubnav.classList.toggle('hidden');
            if (!notificationSubnav.classList.contains('hidden')) {
                populateNotificationContent();
            }
        });
    }

    // Search Functionality
    const headerSearch = document.getElementById('header-search');
    const searchResults = document.getElementById('search-results');
    const searchResultsContent = document.getElementById('search-results-content');
    const noResults = document.getElementById('no-results');

    if (headerSearch) {
        headerSearch.addEventListener('input', () => {
            const query = headerSearch.value.toLowerCase();
            if (!searchResultsContent || !noResults) return;
            searchResultsContent.innerHTML = '';
            noResults.classList.add('hidden');

            if (query) {
                const gameResults = games.filter(g => g.name.toLowerCase().includes(query)).slice(0, 5);
                const userResults = users.filter(u => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)).slice(0, 5);

                if (gameResults.length === 0 && userResults.length === 0) {
                    noResults.classList.remove('hidden');
                } else {
                    gameResults.forEach(game => {
                        const div = document.createElement('div');
                        div.className = 'p-2 hover:bg-gray-100 cursor-pointer';
                        div.innerHTML = `
                            <p class="text-sm font-medium text-gray-900">Game: ${game.name}</p>
                            <p class="text-xs text-gray-500">${game.description}</p>
                        `;
                        div.addEventListener('click', () => {
                            document.getElementById('games').click();
                            document.getElementById('game-search').value = game.name;
                            filterGames();
                            searchResults.classList.add('hidden');
                        });
                        searchResultsContent.appendChild(div);
                    });

                    userResults.forEach(user => {
                        const div = document.createElement('div');
                        div.className = 'p-2 hover:bg-gray-100 cursor-pointer';
                        div.innerHTML = `
                            <p class="text-sm font-medium text-gray-900">User: ${user.name}</p>
                            <p class="text-xs text-gray-500">${user.email}</p>
                        `;
                        div.addEventListener('click', () => {
                            document.getElementById('users').click();
                            document.getElementById('user-search').value = user.name;
                            filterUsers();
                            searchResults.classList.add('hidden');
                        });
                        searchResultsContent.appendChild(div);
                    });
                }

                searchResults.classList.remove('hidden');
            } else {
                searchResults.classList.add('hidden');
            }
        });
    }

    // Close search results and notification subnav when clicking outside
    document.addEventListener('click', (e) => {
        if (searchResults && !searchResults.contains(e.target) && e.target !== headerSearch) {
            searchResults.classList.add('hidden');
        }
        if (notificationSubnav && !notificationSubnav.contains(e.target) && !notificationBell.contains(e.target)) {
            notificationSubnav.classList.add('hidden');
        }
    });

    // Update Dashboard Stats
    function updateDashboardStats() {
        const totalGamesEl = document.querySelector('.bg-white.p-6.rounded-lg.shadow:nth-child(1) p');
        const totalUsersEl = document.querySelector('.bg-white.p-6.rounded-lg.shadow:nth-child(2) p');
        const totalDepositsEl = document.querySelector('.bg-white.p-6.rounded-lg.shadow:nth-child(3) p');
        const totalProfitEl = document.querySelector('.bg-white.p-6.rounded-lg.shadow:nth-child(4) p');

        if (totalGamesEl) totalGamesEl.textContent = games.length;
        if (totalUsersEl) totalUsersEl.textContent = users.length;

        const totalDeposits = walletTransactions.filter(t => t.action === 'Deposit').reduce((sum, t) => sum + t.amount, 0);
        const totalWithdrawals = walletTransactions.filter(t => t.action === 'Withdraw').reduce((sum, t) => sum + t.amount, 0);
        const totalProfit = users.reduce((sum, u) => sum + u.gameHistory.reduce((s, h) => s + (h.payout - h.bet), 0), 0);

        if (totalDepositsEl) totalDepositsEl.textContent = `$${totalDeposits.toFixed(2)}`;
        if (totalProfitEl) totalProfitEl.textContent = `$${totalProfit.toFixed(2)}`;
    }

    // Initialize
    populateGameTable(games);
    populateUserTable(users);
    populateOverrideTable(overrides);
    updateDashboardStats();
    updateNotificationBadge();
});