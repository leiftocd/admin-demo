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

    usernameInput.value = adminAccount.username;
    passwordInput.value = adminAccount.password;

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

    const isMobile = window.innerWidth < 641;
    logoutBtn.innerHTML = isMobile 
        ? '<i class="fas fa-sign-out-alt"></i>' 
        : '<i class="fas fa-sign-out-alt mr-1"></i> Logout';

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

    const overrideConfigs = {
        "Lucky Card Flip": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "details", type: "select", label: "Details", options: ["Card 1", "Card 2", "Card 3"], default: "Card 1", placeholder: "Select card" }
            ]
        },
        "Dice Roll": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "details", type: "select", label: "Dice Value", options: ["1", "2", "3", "4", "5", "6"], default: "6", placeholder: "Select value" }
            ]
        },
        "Lucky Wheel": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "details", type: "select", label: "Segment", options: ["Segment 1", "Segment 2", "Segment 3"], default: "Segment 1", placeholder: "Select segment" }
            ]
        },
        "Slot Machine": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "details", type: "select", label: "Combination", options: ["Triple 7s", "Double Bars", "Cherries"], default: "Cherries", placeholder: "Select combination" }
            ]
        },
        "Mystery Box": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "details", type: "select", label: "Box", options: ["Box 1", "Box 2", "Box 3"], default: "Box 1", placeholder: "Select box" }
            ]
        },
        "Plinko": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "details", type: "select", label: "Slot", options: ["Left", "Center", "Right"], default: "Left", placeholder: "Select slot" }
            ]
        },
        "Mine": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "details", type: "select", label: "Tile Type", options: ["Safe", "Bonus", "Jackpot"], default: "Safe", placeholder: "Select tile" }
            ]
        },
        "Crash": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "multiplier", type: "text", label: "Multiplier", placeholder: "e.g., 100x", default: "100x" },
                { name: "crashTime", type: "text", label: "Crash Time", placeholder: "e.g., 3.25s", default: "3.25s" }
            ]
        },
        "Jackpot Ladder": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "level", type: "select", label: "Level", options: ["1", "2", "3"], default: "1", placeholder: "Select level" },
                { name: "jumpHeight", type: "text", label: "Jump Height", placeholder: "e.g., 2.5m", default: "2.5m" }
            ]
        },
        "Aviator": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "multiplier", type: "text", label: "Multiplier", placeholder: "e.g., 50x", default: "50x" },
                { name: "takeoffTime", type: "text", label: "Takeoff Time", placeholder: "e.g., 2.7s", default: "2.7s" }
            ]
        },
        "Higher or Lower": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "number", type: "select", label: "Next Number", options: ["7", "8", "9"], default: "7", placeholder: "Select number" }
            ]
        },
        "Number Guess": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "guess", type: "select", label: "Guessed Number", options: ["5", "6", "7"], default: "5", placeholder: "Select number" }
            ]
        },
        "Coin Flip": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "side", type: "select", label: "Side", options: ["Heads", "Tails"], default: "Heads", placeholder: "Select side" }
            ]
        },
        "Color Guess": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "color", type: "select", label: "Color", options: ["Red", "Blue", "Green"], default: "Red", placeholder: "Select color" }
            ]
        },
        "Limbo": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "targetMultiplier", type: "text", label: "Target Multiplier", placeholder: "e.g., 100x", default: "100x" },
                { name: "delay", type: "text", label: "Trigger Delay", placeholder: "e.g., 1.2s", default: "1.2s" }
            ]
        },
        "Goal": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "position", type: "select", label: "Goal Position", options: ["Left", "Right", "Center"], default: "Left", placeholder: "Select position" },
                { name: "keeperAction", type: "select", label: "Goalkeeper Action", options: ["Dive Left", "Dive Right", "Stand Still"], default: "Dive Left", placeholder: "Select action" }
            ]
        },
        "Space Max": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "checkpoint", type: "select", label: "Checkpoint", options: ["1", "2", "3"], default: "1", placeholder: "Select checkpoint" },
                { name: "boostPower", type: "text", label: "Boost Power", placeholder: "e.g., 3x", default: "3x" }
            ]
        },
        "Racing": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "winner", type: "select", label: "Winning Car", options: ["Car 1", "Car 2", "Car 3"], default: "Car 1", placeholder: "Select winner" },
                { name: "speed", type: "text", label: "Speed", placeholder: "e.g., 120km/h", default: "120km/h" }
            ]
        },
        "Video Poker": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "hand", type: "select", label: "Poker Hand", options: ["Royal Flush", "Straight Flush", "Four of a Kind"], default: "Four of a Kind", placeholder: "Select hand" }
            ]
        },
        "Classic Wheel": {
            fields: [
                { name: "result", type: "select", label: "Result", options: ["Win", "Lose"], default: "Win" },
                { name: "segment", type: "select", label: "Segment", options: ["Segment 1", "Segment 2", "Segment 3"], default: "Segment 1", placeholder: "Select segment" }
            ]
        }
    };

    // Data
    let games = JSON.parse(localStorage.getItem('games')) || [
        { id: 1, name: "Lucky Card Flip", description: "Flip one of three cards to reveal a hidden reward", status: "On", winRate: 55, plays: 1200 },
        { id: 2, name: "Dice Roll", description: "Guess the result of a dice roll from 1 to 6", status: "On", winRate: 60, plays: 800 },
        { id: 3, name: "Lucky Wheel", description: "Spin the wheel and win based on the landed segment", status: "On", winRate: 45, plays: 1500 },
        { id: 4, name: "Slot Machine", description: "Classic 3-row slot with randomized symbols and combinations", status: "On", winRate: 50, plays: 1000 },
        { id: 5, name: "Mystery Box", description: "Open a random box for a chance to win valuable prize", status: "Off", winRate: 40, plays: 300 },
        { id: 6, name: "Plinko", description: "Drop a ball through a peg board to land in a random reward slot", status: "On", winRate: 52, plays: 900 },
        { id: 7, name: "Mine", description: "Choose safe tiles on a grid without hitting mines", status: "On", winRate: 48, plays: 600 },
        { id: 8, name: "Crash", description: "Bet and cash out before the rising multiplier crashes", status: "On", winRate: 65, plays: 1800 },
        { id: 9, name: "Jackpot Ladder", description: "Climb the reward ladder — the longer you play, the bigger the jackpot", status: "On", winRate: 42, plays: 400 },
        { id: 10, name: "Aviator", description: "Bet on a plane's ascent and cash out before it crashes", status: "On", winRate: 58, plays: 1100 },
        { id: 11, name: "Higher or Lower", description: "Predict whether the next number will be higher or lower", status: "On", winRate: 50, plays: 700 },
        { id: 12, name: "Number Guess", description: "Guess a number from 1–10; correct guesses win big", status: "Off", winRate: 38, plays: 200 },
        { id: 13, name: "Coin Flip", description: "Simple heads-or-tails coin toss betting game", status: "On", winRate: 55, plays: 1300 },
        { id: 14, name: "Color Guess", description: "Guess which color will appear next", status: "On", winRate: 47, plays: 500 },
        { id: 15, name: "Limbo", description: "Bet on a multiplier and cash out before the number drops", status: "On", winRate: 60, plays: 950 },
        { id: 16, name: "Goal", description: "Shoot the ball and avoid the goalkeeper to score", status: "On", winRate: 53, plays: 850 },
        { id: 17, name: "Space Max", description: "Navigate a spaceship to pass checkpoints and collect rewards", status: "On", winRate: 49, plays: 650 },
        { id: 18, name: "Racing", description: "Bet on animated cars and win if your pick finishes first", status: "On", winRate: 46, plays: 1400 },
        { id: 19, name: "Video Poker", description: "Play a quick 5-card poker game against probability", status: "On", winRate: 51, plays: 750 },
        { id: 20, name: "Classic Wheel", description: "Spin a wheel with fixed win segments", status: "On", winRate: 54, plays: 1600 }
    ];

    let users = JSON.parse(localStorage.getItem('platformUsers')) || [
        { id: "U5481", name: "Alice Nguyen", email: "alice.nguyen@example.com", wallet: 10000, status: "Active", gameHistory: [{ game: "Lucky Card Flip", date: "2025-05-12", result: "Win", bet: 10000, payout: 20000 }, { game: "Slot Machine", date: "2025-05-11", result: "Lose", bet: 5000, payout: 0 }] },
        { id: "U5480", name: "Brian Tran", email: "brian.tran@example.com", wallet: 20000, status: "Active", gameHistory: [{ game: "Dice Roll", date: "2025-05-12", result: "Win", bet: 15000, payout: 30000 }] },
        { id: "U5479", name: "Cindy Le", email: "cindy.le@example.com", wallet: 5000, status: "Banned", gameHistory: [] },
        { id: "U5482", name: "David Pham", email: "david.pham@example.com", wallet: 30000, status: "Active", gameHistory: [{ game: "Crash", date: "2025-05-14", result: "Win", bet: 2000, payout: 5000 }] },
        { id: "U5483", name: "Emma Vu", email: "emma.vu@example.com", wallet: 25000, status: "Active", gameHistory: [{ game: "Aviator", date: "2025-05-14", result: "Win", bet: 1500, payout: 4000 }] },
        { id: "U5484", name: "Frank Ho", email: "frank.ho@example.com", wallet: 20000, status: "Active", gameHistory: [{ game: "Dice Roll", date: "2025-05-14", result: "Win", bet: 1000, payout: 3000 }] },
        { id: "U5485", name: "Grace Tran", email: "grace.tran@example.com", wallet: 15000, status: "Active", gameHistory: [{ game: "Lucky Card Flip", date: "2025-05-14", result: "Win", bet: 500, payout: 2000 }] },
        { id: "U5486", name: "Henry Nguyen", email: "henry.nguyen@example.com", wallet: 10000, status: "Active", gameHistory: [{ game: "Lucky Wheel", date: "2025-05-14", result: "Win", bet: 1000, payout: 3000 }] },
        { id: "U5487", name: "Isabella Le", email: "isabella.le@example.com", wallet: 12000, status: "Active", gameHistory: [{ game: "Plinko", date: "2025-05-14", result: "Win", bet: 1000, payout: 2500 }] },
        { id: "U5488", name: "Jack Dao", email: "jack.dao@example.com", wallet: 18000, status: "Active", gameHistory: [{ game: "Coin Flip", date: "2025-05-14", result: "Win", bet: 500, payout: 1500 }] },
        { id: "U5489", name: "Kelly Bui", email: "kelly.bui@example.com", wallet: 20020, status: "Active", gameHistory: [{ game: "Limbo", date: "2025-05-14", result: "Win", bet: 2000, payout: 5000 }] },
        { id: "U5490", name: "Liam Vo", email: "liam.vo@example.com", wallet: 27000, status: "Active", gameHistory: [{ game: "Goal", date: "2025-05-14", result: "Win", bet: 1500, payout: 4000 }] },
        { id: "U5491", name: "Mia Phan", email: "mia.phan@example.com", wallet: 30000, status: "Active", gameHistory: [{ game: "Video Poker", date: "2025-05-14", result: "Win", bet: 1000, payout: 3000 }] },
        { id: "U5492", name: "Noah Dinh", email: "noah.dinh@example.com", wallet: 19000, status: "Active", gameHistory: [{ game: "Classic Wheel", date: "2025-05-14", result: "Win", bet: 500, payout: 2000 }] },
        { id: "U5493", name: "Olivia Huynh", email: "olivia.huynh@example.com", wallet: 26000, status: "Active", gameHistory: [{ game: "Racing", date: "2025-05-14", result: "Win", bet: 1000, payout: 3500 }] }
    ];

    let walletTransactions = JSON.parse(localStorage.getItem('walletTransactions')) || [
        { id: "WT8765", user: "Alice Nguyen", email: "alice.nguyen@example.com", action: "Deposit", amount: 5000, date: "2025-05-12" },
        { id: "WT8764", user: "Brian Tran", email: "brian.tran@example.com", action: "Withdraw", amount: 2000, date: "2025-05-12" }
    ];

    let overrides = JSON.parse(localStorage.getItem('overrides')) || [
        { id: 1, game: "Lucky Card Flip", user: "alice.nguyen@example.com", fields: { result: "Win", details: "Set card 1" }, expiration: "2025-05-20" },
        { id: 2, game: "Dice Roll", user: "brian.tran@example.com", fields: { result: "Lose", details: "Set roll to 4" }, expiration: "2025-05-18" },
        { id: 3, game: "Crash", user: "david.pham@example.com", fields: { result: "Win", details: "100x" }, expiration: "2025-04-20" },
        { id: 4, game: "Aviator", user: "emma.vu@example.com", fields: { result: "Win", details: "50x" }, expiration: "2025-02-18" },
        { id: 5, game: "Classic Wheel", user: "noah.dinh@example.com", fields: { result: "Win", details: "Segment 1" }, expiration: "2025-04-22" },
        { id: 6, game: "Lucky Wheel", user: "henry.nguyen@example.com", fields: { result: "Win", details: "Land on" }, expiration: "2025-02-12" },
        { id: 7, game: "Lucky Card Flip", user: "grace.tran@example.com", fields: { result: "Win", details: "Set card 2" }, expiration: "2025-05-18" }
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
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 20
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 400 + 100,
                    ticks: {
                        stepSize: Math.max(50, Math.ceil((400 + 100) / 5)),
                        callback: value => value
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
        const profitByGame = {};
        users.forEach(user => {
            user.gameHistory.forEach(record => {
                const gameName = record.game;
                const profit = (record.payout || 0) - (record.bet || 0);
                profitByGame[gameName] = (profitByGame[gameName] || 0) + profit;
            });
        });

        let sortedProfits = Object.entries(profitByGame)
            .map(([game, profit]) => ({ game, profit }))
            .sort((a, b) => b.profit - a.profit);

        const top5Profits = sortedProfits.slice(0, 5);
        const otherProfit = sortedProfits.slice(5).reduce((sum, item) => sum + item.profit, 0);
        top5Profits.push({ game: "Other", profit: otherProfit });

        const labels = top5Profits.map(item => item.game);
        const profits = top5Profits.map(item => item.profit);

        const maxProfit = Math.max(0, ...profits);
        const yAxisMax = maxProfit + 2000;

        if (profitChartCanvas.chart) {
            profitChartCanvas.chart.destroy();
        }

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
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        bottom: 10,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: yAxisMax,
                        ticks: {
                            stepSize: Math.max(20, Math.ceil(yAxisMax / 5)),
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

    function updateDashboardStats() {
        const totalGames = document.querySelector('#dashboard-page .p-x-5:nth-child(1) p');
        const totalUsers = document.querySelector('#dashboard-page .p-x-5:nth-child(2) p');
        const totalDeposits = document.querySelector('#dashboard-page .p-x-5:nth-child(3) p');
        const totalProfit = document.querySelector('#dashboard-page .p-x-5:nth-child(4) p');
        const usersOnline = document.querySelector('#dashboard-page .p-x-5:nth-child(5) p');

        totalGames.textContent = games.length;
        
        totalUsers.textContent = users.length;
        
        totalUsers.textContent = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000; // Fake 5000-10000 users

        totalDeposits.textContent = `$${walletTransactions
        .filter(t => t.action === 'Deposit')
        .reduce((sum, t) => sum + t.amount, 0)}`;
        totalProfit.textContent = `$${users
        .flatMap(u => u.gameHistory)
        .reduce((sum, g) => sum + (g.payout - g.bet), 0)}`;
        
        usersOnline.textContent = Math.floor(Math.random() * (1200 - 800 + 1)) + 800; // Fake 800-1200 
    }
    updateDashboardStats();
    // Display game play history in the modal
    function populateGameLogsTable(gameName) {
        const tbody = document.getElementById('game-logs-table-body');
        if (!tbody) {
            console.error('Element with ID game-logs-table-body not found');
            return;
        }

        // Collect play history from all users, filtering by game name
        const gameLogs = users
            .flatMap(user => user.gameHistory
                .filter(record => record.game === gameName)
                .map(record => ({
                    email: user.email,
                    result: record.result,
                    bet: record.bet,
                    payout: record.payout,
                    date: record.date
                }))
            );

        // Render the table content
        tbody.innerHTML = gameLogs.length > 0 ? gameLogs.map(log => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${log.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${log.result}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${log.bet}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${log.payout}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${log.date}</td>
            </tr>
        `).join('') : '<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No play logs found for this game</td></tr>';
    }
    // Update populateGameTable to include the View button
    function populateGameTable(filteredGames) {
        const tbody = document.getElementById('game-table-body');
        const paginationContainer = document.getElementById('game-pagination');
        if (!tbody) {
            console.error('Element with ID game-table-body not found');
            return;
        }

        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 7;
        const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('gamePage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedGames = filteredGames.slice(start, end);

        // Render the games table with a View button in the Actions column
        tbody.innerHTML = paginatedGames.length > 0 ? paginatedGames.map(game => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${game.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.description}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${game.status === 'On' ? 'green' : 'red'}-100 text-${game.status === 'On' ? 'green' : 'red'}-800">${game.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.winRate}%</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-game" data-id="${game.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 mr-3 view-game-logs" data-id="${game.id}"><i class="fas fa-eye"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-game" data-id="${game.id}"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No games found</td></tr>';

        if (!paginationContainer) {
            console.warn('Element with ID game-pagination not found, skipping pagination');
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

        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 7;
        const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('userPage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedUsers = filteredUsers.slice(start, end);

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
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${user.wallet % 1 === 0 ? user.wallet.toFixed(0) : user.wallet.toFixed(2)}</td>
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

        if (!paginationContainer) {
            console.warn('user-pagination container not found, skipping pagination');
            return;
        }
        renderPagination(paginationContainer, totalPages, currentPage, page => {
            localStorage.setItem('userPage', page);
            populateUserTable(filteredUsers);
        });
    }

    // Populate Override Table
    function populateOverrideTable(filteredOverrides) {
        const tbody = document.getElementById('override-table-body');
        const paginationContainer = document.getElementById('override-pagination');
        if (!tbody) {
            console.error('override-table-body not found');
            return;
        }

        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 8;
        const totalPages = Math.ceil(filteredOverrides.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('overridePage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedOverrides = filteredOverrides.slice(start, end);

        tbody.innerHTML = paginatedOverrides.length > 0 ? paginatedOverrides.map(override => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.game}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.user}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.fields?.result || ''}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.fields?.details || ''}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.expiration}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-override" data-id="${override.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-override" data-id="${override.id}"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No overrides found</td></tr>';

        if (!paginationContainer) {
            console.warn('override-pagination container not found, skipping pagination');
            return;
        }
        renderPagination(paginationContainer, totalPages, currentPage, page => {
            localStorage.setItem('overridePage', page);
            populateOverrideTable(filteredOverrides);
        });
    }

    // Render dynamic fields in modal
    function renderDynamicFields(gameName, container, existingValues = {}) {
    if (!container) {
        console.error('Dynamic fields container not found');
        return;
    }
    container.innerHTML = '';
    if (!gameName || !overrideConfigs[gameName]) {
        console.warn(`No override config found for game: ${gameName}`);
        return;
    }

    overrideConfigs[gameName].fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'mb-4';
        const label = document.createElement('label');
        label.className = 'block text-sm font-medium text-gray-700 mb-1';
        label.setAttribute('for', `add-override-${field.name}`);
        label.textContent = field.label;
        div.appendChild(label);

        let input;
        if (field.type === 'select') {
            input = document.createElement('select');
            input.className = 'border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500';
            input.id = `add-override-${field.name}`;
            input.name = field.name;
            input.innerHTML = `<option value="">Select ${field.label}</option>` +
                field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
            input.value = existingValues[field.name] || field.default || '';
        } else if (field.type === 'text') {
            input = document.createElement('input');
            input.type = 'text';
            input.className = 'border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500';
            input.id = `add-override-${field.name}`;
            input.name = field.name;
            input.placeholder = field.placeholder || '';
            input.value = existingValues[field.name] || field.default || '';
        }
        div.appendChild(input);
        container.appendChild(div);
    });
}

    // Populate modal fields for add/edit
    function populateModalFields(override = null) {
    const gameSelect = document.getElementById('add-override-game');
    const userSelect = document.getElementById('add-override-user-email');
    const dynamicFieldsContainer = document.getElementById('add-override-dynamic-fields');
    const expirationInput = document.getElementById('add-override-expiration');

    if (!gameSelect || !userSelect || !dynamicFieldsContainer || !expirationInput) {
        console.error('One or more modal elements not found');
        return;
    }

    if (override) {
        gameSelect.value = override.game;
        userSelect.value = override.user;
        renderDynamicFields(override.game, dynamicFieldsContainer, override.fields || {});
        expirationInput.value = override.expiration;
    } else {
        // Chọn game đầu tiên làm mặc định
        const firstGame = Object.keys(overrideConfigs)[0]; // Lấy game đầu tiên từ overrideConfigs
        gameSelect.value = firstGame || '';
        userSelect.value = '';
        expirationInput.value = '';
        if (firstGame) {
            renderDynamicFields(firstGame, dynamicFieldsContainer);
        } else {
            dynamicFieldsContainer.innerHTML = '<p class="text-sm text-gray-500">No games available to configure.</p>';
        }
    }

    // Update dynamic fields when game changes
    gameSelect.removeEventListener('change', renderDynamicFields);
    gameSelect.addEventListener('change', () => {
        renderDynamicFields(gameSelect.value, dynamicFieldsContainer);
    });
}

    function renderPagination(container, totalPages, currentPage, onPageChange) {
        container.innerHTML = '';
        if (totalPages <= 1) return;

        const pagination = document.createElement('div');
        pagination.className = 'flex items-center justify-center mt-4 space-x-2';

        const prevButton = document.createElement('button');
        prevButton.className = `px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`;
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) onPageChange(currentPage - 1);
        });

        const pageTabs = document.createElement('div');
        pageTabs.className = 'flex space-x-1';

        const tabsToShow = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) tabsToShow.push(i);
        } else {
            if (currentPage === 1) tabsToShow.push(1, 2, 3);
            else if (currentPage === totalPages) tabsToShow.push(totalPages - 2, totalPages - 1, totalPages);
            else tabsToShow.push(currentPage - 1, currentPage, currentPage + 1);
        }

        tabsToShow.forEach(page => {
            const pageButton = document.createElement('button');
            pageButton.className = `px-3 py-1 rounded-lg ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;
            pageButton.textContent = page;
            pageButton.addEventListener('click', () => onPageChange(page));
            pageTabs.appendChild(pageButton);
        });

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
        console.log('Click detected in game-table-body', e.target); // Debug click events

        if (e.target.closest('.edit-game')) {
            e.preventDefault();
            const id = parseInt(e.target.closest('.edit-game').dataset.id);
            console.log('Editing game with ID:', id); // Debug edit action
            const game = games.find(g => g.id === id);
            document.getElementById('add-game-name').value = game.name;
            document.getElementById('add-game-description').value = game.description;
            document.getElementById('add-game-status').value = game.status;
            document.getElementById('add-game-win-rate').value = game.winRate;
            addGameModal.classList.remove('hidden');
            isEditingGame = true;
            editingGameId = id;
        }

        if (e.target.closest('.delete-game')) {
            e.preventDefault();
            const id = parseInt(e.target.closest('.delete-game').dataset.id);
            console.log('Deleting game with ID:', id); // Debug delete action
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
            updateNotificationBadge();
        }

        if (e.target.closest('.view-game-logs')) {
            e.preventDefault();
            const id = parseInt(e.target.closest('.view-game-logs').dataset.id);
            console.log('Viewing logs for game with ID:', id); // Debug view action
            const game = games.find(g => g.id === id);
            if (game) {
                console.log('Game found:', game); // Debug game object
                populateGameLogsTable(game.name);
                const gameLogsModal = document.getElementById('game-logs-modal');
                if (gameLogsModal) {
                    gameLogsModal.classList.remove('hidden');
                    console.log('Game logs modal should now be visible'); // Debug modal visibility
                } else {
                    console.error('Element with ID game-logs-modal not found');
                }
            } else {
                console.error('Game not found with ID:', id);
            }
        }
    });
    // Handle closing the game-logs-modal
    const gameLogsModal = document.getElementById('game-logs-modal');
    const gameLogsClose = document.getElementById('game-logs-close');

    if (gameLogsClose) {
        gameLogsClose.addEventListener('click', () => {
            console.log('Closing game logs modal'); // Debug close action
            gameLogsModal.classList.add('hidden');
        });
    } else {
        console.error('Element with ID game-logs-close not found');
    }
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
    function populateGameHistoryTable(gameHistory) {
        const tbody = document.getElementById('game-history-table-body');
        if (!tbody) {
            console.error('game-history-table-body not found');
            return;
        }

        tbody.innerHTML = gameHistory.length > 0 ? gameHistory.map(record => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.game}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.result}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${record.bet}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${record.payout}</td>
            </tr>
        `).join('') : '<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No game history found</td></tr>';
    }
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

    overrideGameSelect.innerHTML = '<option value="">Select Game</option>';
    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game.name;
        option.textContent = game.name;
        overrideGameSelect.appendChild(option);
    });

    overrideUserSelect.innerHTML = '<option value="">Select User</option>';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.email;
        option.textContent = user.email;
        overrideUserSelect.appendChild(option);
    });

    addOverrideBtn.addEventListener('click', () => {
        addOverrideModal.classList.remove('hidden');
        populateModalFields();
        addOverrideError.classList.add('hidden');
        isEditingOverride = false;
        editingOverrideId = null;
    });

    addOverrideCancel.addEventListener('click', () => {
        addOverrideModal.classList.add('hidden');
    });

    addOverrideSave.addEventListener('click', () => {
        const game = overrideGameSelect.value;
        const user = overrideUserSelect.value;
        const expiration = document.getElementById('add-override-expiration').value;
        const dynamicFieldsContainer = document.getElementById('add-override-dynamic-fields');

        if (!game || !user || !expiration) {
            addOverrideError.classList.remove('hidden');
            return;
        }

        const fields = {};
        const inputs = dynamicFieldsContainer.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!fields[input.name]) fields[input.name] = [];
                if (input.checked) fields[input.name].push(input.value);
            } else if (input.multiple) {
                fields[input.name] = Array.from(input.selectedOptions).map(opt => opt.value);
            } else {
                fields[input.name] = input.value;
            }
        });

        const requiredFields = overrideConfigs[game]?.fields.map(f => f.name) || [];
        if (requiredFields.some(field => !fields[field] || (Array.isArray(fields[field]) && fields[field].length === 0))) {
            addOverrideError.classList.remove('hidden');
            return;
        }

        if (isEditingOverride) {
            const override = overrides.find(o => o.id === editingOverrideId);
            override.game = game;
            override.user = user;
            override.fields = fields;
            override.expiration = expiration;
            notifications.push({
                id: notifications.length + 1,
                title: "Override Updated",
                message: `Override for "${game}" and "${user}" has been updated.`,
                time: new Date().toLocaleString()
            });
        } else {
            const newOverride = {
                id: overrides.length ? Math.max(...overrides.map(o => o.id)) + 1 : 1,
                game,
                user,
                fields,
                expiration
            };
            overrides.push(newOverride);
            notifications.push({
                id: notifications.length + 1,
                title: "New Override Added",
                message: `Override for "${game}" and "${user}" has been added.`,
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
        e.preventDefault();
        const editButton = e.target.closest('.edit-override');
        const deleteButton = e.target.closest('.delete-override');

        if (editButton) {
            const id = parseInt(editButton.dataset.id);
            const override = overrides.find(o => o.id === id);
            if (override) {
                addOverrideModal.classList.remove('hidden');
                populateModalFields(override);
                isEditingOverride = true;
                editingOverrideId = id;
                addOverrideError.classList.add('hidden');
            }
        }

        if (deleteButton) {
            const id = parseInt(deleteButton.dataset.id);
            const override = overrides.find(o => o.id === id);
            overrides = overrides.filter(o => o.id !== id);
            notifications.push({
                id: notifications.length + 1,
                title: "Override Deleted",
                message: `Override for "${override.game}" and "${override.user}" has been deleted.`,
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
        notificationCount.textContent = notifications.length;
        notificationCount.classList.toggle('hidden', notifications.length === 0);
    }

    const notificationBell = document.getElementById('notification-bell');
    const notificationSubnav = document.getElementById('notification-subnav');
    const notificationContent = document.getElementById('notification-content');

    notificationBell.addEventListener('click', () => {
        notificationSubnav.classList.toggle('hidden');
        // Hiển thị danh sách thông báo
        notificationContent.innerHTML = notifications.length > 0 ? `
            <div class="p-3 border-b">
                <button id="clear-notifications" class="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm">Clear All</button>
            </div>
            ${notifications.map(n => `
                <div class="p-3 border-b last:border-b-0">
                    <div class="text-sm font-medium text-gray-900">${n.title}</div>
                    <div class="text-xs text-gray-500">${n.message}</div>
                    <div class="text-xs text-gray-400">${n.time}</div>
                </div>
            `).join('')}
        ` : '<div class="p-3 text-sm text-gray-500">No notifications</div>';

        // Đặt số thông báo về 0 (đánh dấu đã xem)
        notifications.length = 0;
        localStorage.setItem('notifications', JSON.stringify(notifications));
        updateNotificationBadge();

        // Thêm sự kiện cho nút Clear All
        const clearNotificationsBtn = document.getElementById('clear-notifications');
        if (clearNotificationsBtn) {
            clearNotificationsBtn.addEventListener('click', () => {
                notifications = [];
                localStorage.setItem('notifications', JSON.stringify(notifications));
                notificationContent.innerHTML = '<div class="p-3 text-sm text-gray-500">No notifications</div>';
                updateNotificationBadge();
                notificationSubnav.classList.add('hidden');
            });
        }
    });

    // Search Functionality
    const headerSearch = document.getElementById('header-search');
    const searchResults = document.getElementById('search-results');
    const searchResultsContent = document.getElementById('search-results-content');
    const noResults = document.getElementById('no-results');

    headerSearch.addEventListener('input', () => {
        const query = headerSearch.value.toLowerCase();
        if (!query) {
            searchResults.classList.add('hidden');
            return;
        }

        const results = [
            ...games.filter(g => g.name.toLowerCase().includes(query)).map(g => ({ type: 'Game', name: g.name, id: g.id })),
            ...users.filter(u => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)).map(u => ({ type: 'User', name: u.name, id: u.id }))
        ];

        searchResultsContent.innerHTML = results.length > 0 ? results.map(r => `
            <div class="p-2 hover:bg-gray-100 cursor-pointer search-result" data-type="${r.type.toLowerCase()}" data-id="${r.id}">
                <div class="text-sm font-medium text-gray-900">${r.name}</div>
                <div class="text-xs text-gray-500">${r.type}</div>
            </div>
        `).join('') : '';
        noResults.classList.toggle('hidden', results.length > 0);
        searchResults.classList.remove('hidden');
    });

    searchResults.addEventListener('click', (e) => {
        const result = e.target.closest('.search-result');
        if (!result) return;

        const type = result.dataset.type;
        const id = result.dataset.id;

        if (type === 'game') {
            const game = games.find(g => g.id === parseInt(id));
            document.getElementById('add-game-name').value = game.name;
            document.getElementById('add-game-description').value = game.description;
            document.getElementById('add-game-status').value = game.status;
            document.getElementById('add-game-win-rate').value = game.winRate;
            addGameModal.classList.remove('hidden');
            isEditingGame = true;
            editingGameId = id;
            navLinks.forEach(l => l.classList.remove('active-nav', 'bg-gray-700', 'text-gray-100'));
            document.querySelector('a[href="#games"]').classList.add('active-nav', 'bg-gray-700', 'text-gray-100');
            pages.forEach(page => page.classList.add('hidden'));
            document.getElementById('games-page').classList.remove('hidden');
            pageTitle.textContent = 'Games';
        } else if (type === 'user') {
            const user = users.find(u => u.id === id);
            document.getElementById('add-user-username').value = user.name;
            document.getElementById('add-user-email').value = user.email;
            document.getElementById('add-user-wallet').value = user.wallet;
            document.getElementById('add-user-status').value = user.status;
            addUserModal.classList.remove('hidden');
            isEditingUser = true;
            editingUserId = id;
            navLinks.forEach(l => l.classList.remove('active-nav', 'bg-gray-700', 'text-gray-100'));
            document.querySelector('a[href="#users"]').classList.add('active-nav', 'bg-gray-700', 'text-gray-100');
            pages.forEach(page => page.classList.add('hidden'));
            document.getElementById('users-page').classList.remove('hidden');
            pageTitle.textContent = 'Users';
        }
        searchResults.classList.add('hidden');
        headerSearch.value = '';
    });

    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && e.target !== headerSearch) {
            searchResults.classList.add('hidden');
        }
    });

    // Initialize tables
    populateGameTable(games);
    populateUserTable(users);
    populateOverrideTable(overrides);
    updateNotificationBadge();
});