document.addEventListener('DOMContentLoaded', () => {
    // Hard-coded admin account
    const adminAccount = {
        username: "admin",
        password: "admin"
    };

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const dashboard = document.querySelector('.flex.h-screen');
    if (dashboard) {
        dashboard.style.display = isLoggedIn ? 'flex' : 'none';
    }

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

    if (usernameInput && passwordInput && togglePasswordBtn) {
        usernameInput.value = adminAccount.username;
        passwordInput.value = adminAccount.password;

        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.innerHTML = `<i class="fas fa-${isPassword ? 'eye-slash' : 'eye'}"></i>`;
        });
    }

    // Login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
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
    }

    // Logout
    const header = document.querySelector('header .flex.items-center:last-child');
    if (header) {
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
    }

    // Update admin name
    const updateAdminName = () => {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const adminNameSpan = document.querySelector('.ad-name');
        if (adminNameSpan) {
            adminNameSpan.textContent = user.username || 'Admin';
        }
    };
    updateAdminName();

    // Override configurations for game-specific fields
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
        },
    };

    // Data Initialization
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

    let gameOverrides = JSON.parse(localStorage.getItem('gameOverrides')) || [
        { id: 1, game: "Lucky Card Flip", description: "Flip one of three cards to reveal a hidden reward", fields: { result: "Win", details: "Card 1" }, expiration: "2025-05-20" },
        { id: 2, game: "Dice Roll", description: "Guess the result of a dice roll from 1 to 6", fields: { result: "Lose", details: "4" }, expiration: "2025-05-18" },
        { id: 3, game: "Lucky Wheel", description: "Spin the wheel and win based on the landed segment", fields: { result: "Win", details: "Segment 1" }, expiration: "2025-05-22" },
        { id: 4, game: "Slot Machine", description: "Classic 3-row slot with randomized symbols and combinations", fields: { result: "Win", details: "Cherries" }, expiration: "2025-05-19" },
        { id: 5, game: "Mystery Box", description: "Open a random box for a chance to win valuable prize", fields: { result: "Lose", details: "Box 2" }, expiration: "2025-05-21" },
        { id: 6, game: "Plinko", description: "Drop a ball through a peg board to land in a random reward slot", fields: { result: "Win", details: "Center" }, expiration: "2025-05-20" },
        { id: 7, game: "Mine", description: "Choose safe tiles on a grid without hitting mines", fields: { result: "Win", details: "Safe" }, expiration: "2025-05-18" },
        { id: 8, game: "Crash", description: "Bet and cash out before the rising multiplier crashes", fields: { result: "Win", multiplier: "100x", crashTime: "3.25s" }, expiration: "2025-05-19" },
        { id: 9, game: "Jackpot Ladder", description: "Climb the reward ladder — the longer you play, the bigger the jackpot", fields: { result: "Lose", level: "2", jumpHeight: "2.5m" }, expiration: "2025-05-20" },
        { id: 10, game: "Aviator", description: "Bet on a plane's ascent and cash out before it crashes", fields: { result: "Win", multiplier: "50x", takeoffTime: "2.7s" }, expiration: "2025-05-18" },
        { id: 11, game: "Higher or Lower", description: "Predict whether the next number will be higher or lower", fields: { result: "Win", number: "8" }, expiration: "2025-05-21" },
        { id: 12, game: "Number Guess", description: "Guess a number from 1–10; correct guesses win big", fields: { result: "Lose", guess: "6" }, expiration: "2025-05-19" },
        { id: 13, game: "Coin Flip", description: "Simple heads-or-tails coin toss betting game", fields: { result: "Win", side: "Heads" }, expiration: "2025-05-20" },
        { id: 14, game: "Color Guess", description: "Guess which color will appear next", fields: { result: "Win", color: "Red" }, expiration: "2025-05-18" },
        { id: 15, game: "Limbo", description: "Bet on a multiplier and cash out before the number drops", fields: { result: "Win", targetMultiplier: "100x", delay: "1.2s" }, expiration: "2025-05-19" },
        { id: 16, game: "Goal", description: "Shoot the ball and avoid the goalkeeper to score", fields: { result: "Win", position: "Left", keeperAction: "Dive Right" }, expiration: "2025-05-20" },
        { id: 17, game: "Space Max", description: "Navigate a spaceship to pass checkpoints and collect rewards", fields: { result: "Win", checkpoint: "1", boostPower: "3x" }, expiration: "2025-05-21" },
        { id: 18, game: "Racing", description: "Bet on animated cars and win if your pick finishes first", fields: { result: "Win", winner: "Car 1", speed: "120km/h" }, expiration: "2025-05-19" },
        { id: 19, game: "Video Poker", description: "Play a quick 5-card poker game against probability", fields: { result: "Win", hand: "Four of a Kind" }, expiration: "2025-05-20" },
        { id: 20, game: "Classic Wheel", description: "Spin a wheel with fixed win segments", fields: { result: "Win", segment: "Segment 1" }, expiration: "2025-05-22" }
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

    if (toggleSidebarBtn && sidebar && content) {
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
            const targetPageElement = document.getElementById(`${targetPage}-page`);
            if (targetPageElement) {
                targetPageElement.classList.remove('hidden');
            }
            if (pageTitle) {
                pageTitle.textContent = targetPage.charAt(0).toUpperCase() + targetPage.slice(1).replace('-', ' ');
            }
            if (window.innerWidth < 641 && hamburgerMenuContent) {
                hamburgerMenuContent.classList.add('hidden');
                sidebar.classList.add('collapsed');
            }
        });
    });

    // Charts
    const playChartCanvas = document.getElementById('playChart');
    if (playChartCanvas) {
        const playChart = new Chart(playChartCanvas, {
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
    }

    // Profit Chart
    const profitChartCanvas = document.getElementById('profitChart');
    if (profitChartCanvas) {
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

    // Update Dashboard Stats
    function updateDashboardStats() {
        const totalGames = document.querySelector('#dashboard-page .p-x-5:nth-child(1) p');
        const totalUsers = document.querySelector('#dashboard-page .p-x-5:nth-child(2) p');
        const totalDeposits = document.querySelector('#dashboard-page .p-x-5:nth-child(3) p');
        const totalProfit = document.querySelector('#dashboard-page .p-x-5:nth-child(4) p');
        const usersOnline = document.querySelector('#dashboard-page .p-x-5:nth-child(5) p');

        if (totalGames) totalGames.textContent = games.length;
        if (totalUsers) totalUsers.textContent = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;
        if (totalDeposits) {
            totalDeposits.textContent = `$${walletTransactions
                .filter(t => t.action === 'Deposit')
                .reduce((sum, t) => sum + t.amount, 0)}`;
        }
        if (totalProfit) {
            totalProfit.textContent = `$${users
                .flatMap(u => u.gameHistory)
                .reduce((sum, g) => sum + (g.payout - g.bet), 0)}`;
        }
        if (usersOnline) usersOnline.textContent = Math.floor(Math.random() * (1200 - 800 + 1)) + 800;
    }
    updateDashboardStats();

    // Populate Game Logs Table
    function populateGameLogsTable(gameName) {
        const tbody = document.getElementById('game-logs-table-body');
        if (!tbody) {
            console.error('Element with ID game-logs-table-body not found');
            return;
        }

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

    // Populate Game Table (Fixed to handle gameOverrides)
    function populateGameTable(filteredGameOverrides = gameOverrides) {
        const tbody = document.getElementById('game-table-body');
        const paginationContainer = document.getElementById('game-pagination');
        if (!tbody) {
            console.error('Element with ID game-table-body not found');
            return;
        }

        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 7;
        const totalPages = Math.ceil(filteredGameOverrides.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('gamePage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedGameOverrides = filteredGameOverrides.slice(start, end);

        tbody.innerHTML = paginatedGameOverrides.length > 0 ? paginatedGameOverrides.map(override => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.game}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.fields?.result || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.fields ? Object.entries(override.fields).filter(([key, val]) => key !== 'result').map(([_, val]) => val).join(', ') : 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${override.expiration || 'N/A'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-game" data-id="${override.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-gray-600 hover:text-gray-900 mr-3 view-game-logs" data-game="${override.game}"><i class="fas fa-eye"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-game" data-id="${override.id}"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">No games found</td></tr>';

        if (paginationContainer) {
            renderPagination(paginationContainer, totalPages, currentPage, page => {
                localStorage.setItem('gamePage', page);
                populateGameTable(filteredGameOverrides);
            });
        }
    }

    // Populate User Table
    function populateUserTable(filteredUsers = users) {
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

        if (paginationContainer) {
            renderPagination(paginationContainer, totalPages, currentPage, page => {
                localStorage.setItem('userPage', page);
                populateUserTable(filteredUsers);
            });
        }
    }

    // Populate Override Table (Handles games data for Manual Override)
    function populateOverrideTable(filteredGames = games) {
        const tbody = document.getElementById('override-table-body');
        const paginationContainer = document.getElementById('override-pagination');
        if (!tbody) {
            console.error('Element with ID override-table-body not found');
            return;
        }

        const isMobile = window.innerWidth <= 640;
        const itemsPerPage = isMobile ? 5 : 7;
        const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
        let currentPage = parseInt(localStorage.getItem('overridePage')) || 1;
        if (currentPage < 1 || currentPage > totalPages) currentPage = totalPages > 0 ? 1 : 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedGames = filteredGames.slice(start, end);

        tbody.innerHTML = paginatedGames.length > 0 ? paginatedGames.map(game => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.description}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.status}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${game.winRate}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" class="text-blue-600 hover:text-blue-900 mr-3 edit-override" data-id="${game.id}"><i class="fas fa-edit"></i></a>
                    <a href="#" class="text-red-600 hover:text-red-900 delete-override" data-id="${game.id}"><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `).join('') : '<tr><td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">No overrides found</td></tr>';

        if (paginationContainer) {
            renderPagination(paginationContainer, totalPages, currentPage, page => {
                localStorage.setItem('overridePage', page);
                populateOverrideTable(filteredGames);
            });
        }
    }

    // Render Dynamic Fields for Game Modal
    function renderDynamicFields(gameName, containerId, fieldsData = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Element with ID ${containerId} not found`);
            return;
        }

        container.innerHTML = '';
        const config = overrideConfigs[gameName] || { fields: [] };
        config.fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'mb-4';
            div.innerHTML = `
                <label class="block text-sm font-medium text-gray-700 mb-1">${field.label}</label>
                ${field.type === 'select' ? `
                    <select id="${containerId}-${field.name}" class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">${field.placeholder || 'Select'}</option>
                        ${field.options.map(opt => `<option value="${opt}" ${fieldsData[field.name] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                    </select>
                ` : `
                    <input type="text" id="${containerId}-${field.name}" class="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="${field.placeholder || ''}" value="${fieldsData[field.name] || ''}">
                `}
            `;
            container.appendChild(div);
        });
    }

    // Populate Modal Fields for Add/Edit Override
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
            userSelect.value = override.user || '';
            renderDynamicFields(override.game, dynamicFieldsContainer, override.fields || {});
            expirationInput.value = override.expiration;
        } else {
            const firstGame = Object.keys(overrideConfigs)[0];
            gameSelect.value = firstGame || '';
            userSelect.value = '';
            expirationInput.value = '';
            if (firstGame) {
                renderDynamicFields(firstGame, dynamicFieldsContainer);
            } else {
                dynamicFieldsContainer.innerHTML = '<p class="text-sm text-gray-500">No games available to configure.</p>';
            }
        }

        gameSelect.removeEventListener('change', renderDynamicFields);
        gameSelect.addEventListener('change', () => {
            renderDynamicFields(gameSelect.value, dynamicFieldsContainer);
        });
    }

    // Render Pagination
    function renderPagination(container, totalPages, currentPage, onPageChange) {
        if (!container) return;
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

// Game Modal (Updated to include user selection from users data)
const addGameModal = document.getElementById('add-game-modal');
const addGameBtn = document.getElementById('add-game-btn');
const addGameSave = document.getElementById('add-game-save');
const addGameCancel = document.getElementById('add-game-cancel');
const addGameError = document.getElementById('add-game-error');
const addGameName = document.getElementById('add-game-name');
const addGameDescription = document.getElementById('add-game-description');
const addGameExpiration = document.getElementById('add-game-expiration');
const addGameUser = document.getElementById('add-game-user-email');

if (addGameBtn) {
    addGameBtn.addEventListener('click', () => {
        if (addGameName) {
            addGameName.innerHTML = '<option value="">Select Game</option>' + games.map(g => `<option value="${g.name}">${g.name}</option>`).join('');
            addGameName.value = '';
        }
        if (addGameDescription) addGameDescription.value = '';
        if (addGameExpiration) addGameExpiration.value = '';
        if (addGameUser) {
            addGameUser.innerHTML = '<option value="">Select User</option>' + users.map(u => `<option value="${u.email}">${u.email} (${u.name})</option>`).join('');
            addGameUser.value = ''; // Default to "Select User"
        } else {
            console.error('Element with ID add-game-user-email not found');
        }
        renderDynamicFields('', 'add-game-dynamic-fields');
        if (addGameModal) addGameModal.classList.remove('hidden');
        if (addGameError) addGameError.classList.add('hidden');
        addGameModal.dataset.mode = 'add';
    });
}

    if (addGameName) {
        addGameName.addEventListener('change', () => {
            const selectedGame = games.find(g => g.name === addGameName.value);
            if (addGameDescription) {
                addGameDescription.value = selectedGame ? selectedGame.description : '';
            }
            renderDynamicFields(addGameName.value, 'add-game-dynamic-fields');
        });
    }

    if (addGameSave) {
        addGameSave.addEventListener('click', () => {
            const gameName = addGameName.value;
            const description = addGameDescription.value.trim();
            const expiration = addGameExpiration.value;
            const userEmail = addGameUser.value;
            const config = overrideConfigs[gameName] || { fields: [] };
            const fields = {};
            let isValid = gameName && expiration && description && userEmail;

            config.fields.forEach(field => {
                const input = document.getElementById(`add-game-dynamic-fields-${field.name}`);
                if (input) {
                    fields[field.name] = input.value;
                    if (!input.value) isValid = false;
                }
            });

            if (!isValid) {
                if (addGameError) addGameError.classList.remove('hidden');
                return;
            }

            const mode = addGameModal.dataset.mode;
            if (mode === 'add') {
                const newOverride = {
                    id: gameOverrides.length ? Math.max(...gameOverrides.map(o => o.id)) + 1 : 1,
                    game: gameName,
                    description,
                    fields,
                    expiration,
                    user: userEmail
                };
                gameOverrides.push(newOverride);
                notifications.push({
                    id: notifications.length + 1,
                    title: "New Game Override Added",
                    message: `Override for "${gameName}" for user "${userEmail}" has been added.`,
                    time: new Date().toLocaleString()
                });
            } else {
                const id = parseInt(addGameModal.dataset.id);
                const override = gameOverrides.find(o => o.id === id);
                if (override) {
                    override.game = gameName;
                    override.description = description;
                    override.fields = fields;
                    override.expiration = expiration;
                    override.user = userEmail;
                    notifications.push({
                        id: notifications.length + 1,
                        title: "Game Override Updated",
                        message: `Override for "${gameName}" for user "${userEmail}" has been updated.`,
                        time: new Date().toLocaleString()
                    });
                }
            }

            localStorage.setItem('gameOverrides', JSON.stringify(gameOverrides));
            localStorage.setItem('notifications', JSON.stringify(notifications));
            if (addGameModal) addGameModal.classList.add('hidden');
            if (addGameError) addGameError.classList.add('hidden');
            populateGameTable();
            updateDashboardStats();
            updateNotificationBadge();
        });
    }

    if (addGameCancel) {
        addGameCancel.addEventListener('click', () => {
            if (addGameModal) addGameModal.classList.add('hidden');
            if (addGameError) addGameError.classList.add('hidden');
        });
    }

    // Game Logs Modal
    const gameLogsModal = document.getElementById('game-logs-modal');
    const gameLogsClose = document.getElementById('game-logs-close');

    if (gameLogsClose) {
        gameLogsClose.addEventListener('click', () => {
            if (gameLogsModal) gameLogsModal.classList.add('hidden');
        });
    }

    // Game Table Actions
    const gameTableBody = document.getElementById('game-table-body');
    if (gameTableBody) {
        gameTableBody.addEventListener('click', (e) => {
            if (e.target.closest('.edit-game')) {
                e.preventDefault();
                const id = parseInt(e.target.closest('.edit-game').dataset.id);
                const override = gameOverrides.find(o => o.id === id);
                if (override) {
                    if (addGameName) {
                        addGameName.innerHTML = '<option value="">Select Game</option>' + games.map(g => `<option value="${g.name}">${g.name}</option>`).join('');
                        addGameName.value = override.game;
                    }
                    if (addGameDescription) addGameDescription.value = override.description;
                    if (addGameExpiration) addGameExpiration.value = override.expiration;
                    if (addGameUser) {
                        addGameUser.innerHTML = '<option value="">Select User</option>' + users.map(u => `<option value="${u.email}">${u.email} (${u.name})</option>`).join('');
                        addGameUser.value = ''; // Default to "Select User" instead of override.user
                    } else {
                        console.error('Element with ID add-game-user-email not found');
                    }
                    renderDynamicFields(override.game, 'add-game-dynamic-fields', override.fields);
                    if (addGameModal) {
                        addGameModal.classList.remove('hidden');
                        addGameModal.dataset.mode = 'edit';
                        addGameModal.dataset.id = id;
                    }
                }
            }

            if (e.target.closest('.delete-game')) {
                e.preventDefault();
                const id = parseInt(e.target.closest('.delete-game').dataset.id);
                const override = gameOverrides.find(o => o.id === id);
                gameOverrides = gameOverrides.filter(o => o.id !== id);
                if (override) {
                    notifications.push({
                        id: notifications.length + 1,
                        title: "Game Override Deleted",
                        message: `Override for "${override.game}" for user "${override.user}" has been deleted.`,
                        time: new Date().toLocaleString()
                    });
                }
                localStorage.setItem('gameOverrides', JSON.stringify(gameOverrides));
                localStorage.setItem('notifications', JSON.stringify(notifications));
                populateGameTable();
                updateDashboardStats();
                updateNotificationBadge();
            }

            if (e.target.closest('.view-game-logs')) {
                e.preventDefault();
                const gameName = e.target.closest('.view-game-logs').dataset.game;
                const userEmail = e.target.closest('.view-game-logs').dataset.user;
                populateGameLogsTable(gameName, userEmail);
                const gameLogsModal = document.getElementById('game-logs-modal');
                if (gameLogsModal) gameLogsModal.classList.remove('hidden');
            }
        });
    }

    // Game Filters
    const gameSearch = document.getElementById('game-search');
    const gameStatusFilter = document.getElementById('game-status-filter');

    function filterGames() {
        let filteredGameOverrides = [...gameOverrides];
        const search = gameSearch?.value.toLowerCase() || '';
        const status = gameStatusFilter?.value || '';

        if (search) {
            filteredGameOverrides = filteredGameOverrides.filter(override => override.game.toLowerCase().includes(search));
        }

        if (status) {
            filteredGameOverrides = filteredGameOverrides.filter(override => override.fields?.result === status);
        }

        populateGameTable(filteredGameOverrides);
    }

    if (gameSearch) gameSearch.addEventListener('input', filterGames);
    if (gameStatusFilter) gameStatusFilter.addEventListener('change', filterGames);

    // User Modal
    const addUserModal = document.getElementById('add-user-modal');
    const addUserBtn = document.getElementById('add-user-btn');
    const addUserSave = document.getElementById('add-user-save');
    const addUserCancel = document.getElementById('add-user-cancel');
    const addUserError = document.getElementById('add-user-error');

    let isEditingUser = false;
    let editingUserId = null;

    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            if (addUserModal) addUserModal.classList.remove('hidden');
            document.getElementById('add-user-username').value = '';
            document.getElementById('add-user-email').value = '';
            document.getElementById('add-user-wallet').value = '';
            document.getElementById('add-user-status').value = 'Active';
            if (addUserError) addUserError.classList.add('hidden');
            isEditingUser = false;
            editingUserId = null;
        });
    }

    if (addUserCancel) {
        addUserCancel.addEventListener('click', () => {
            if (addUserModal) addUserModal.classList.add('hidden');
        });
    }

    if (addUserSave) {
        addUserSave.addEventListener('click', () => {
            const username = document.getElementById('add-user-username').value.trim();
            const email = document.getElementById('add-user-email').value.trim();
            const wallet = parseFloat(document.getElementById('add-user-wallet').value);
            const status = document.getElementById('add-user-status').value;

            if (!username || !email || isNaN(wallet) || wallet < 0) {
                if (addUserError) {
                    addUserError.textContent = 'All fields are required and wallet must be non-negative.';
                    addUserError.classList.remove('hidden');
                }
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                if (addUserError) {
                    addUserError.textContent = 'Invalid email format';
                    addUserError.classList.remove('hidden');
                }
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
            populateUserTable();
            updateDashboardStats();
            updateNotificationBadge();
            if (addUserModal) addUserModal.classList.add('hidden');
        });
    }

    // Wallet Update Modal
    const walletUpdateModal = document.getElementById('wallet-update-modal');
    const walletSave = document.getElementById('wallet-save');
    const walletCancel = document.getElementById('wallet-cancel');
    const walletError = document.getElementById('wallet-error');

    let walletUserId = null;

    if (walletCancel) {
        walletCancel.addEventListener('click', () => {
            if (walletUpdateModal) walletUpdateModal.classList.add('hidden');
        });
    }

    if (walletSave) {
        walletSave.addEventListener('click', () => {
            const action = document.getElementById('wallet-action').value;
            const amount = parseFloat(document.getElementById('wallet-amount').value);

            if (isNaN(amount) || amount <= 0) {
                if (walletError) walletError.classList.remove('hidden');
                return;
            }

            const user = users.find(u => u.id === walletUserId);
            if (action === 'Withdraw' && amount > user.wallet) {
                if (walletError) {
                    walletError.textContent = 'Insufficient balance.';
                    walletError.classList.remove('hidden');
                }
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
            populateUserTable();
            updateDashboardStats();
            updateNotificationBadge();
            if (walletUpdateModal) walletUpdateModal.classList.add('hidden');
        });
    }

    // Game History Modal
    const gameHistoryModal = document.getElementById('game-history-modal');
    const gameHistoryClose = document.getElementById('game-history-close');

    if (gameHistoryClose) {
        gameHistoryClose.addEventListener('click', () => {
            if (gameHistoryModal) gameHistoryModal.classList.add('hidden');
        });
    }

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
    const userTableBody = document.getElementById('user-table-body');
    if (userTableBody) {
        userTableBody.addEventListener('click', (e) => {
            if (e.target.closest('.edit-user')) {
                e.preventDefault();
                const id = e.target.closest('.edit-user').dataset.id;
                const user = users.find(u => u.id === id);
                document.getElementById('add-user-username').value = user.name;
                document.getElementById('add-user-email').value = user.email;
                document.getElementById('add-user-wallet').value = user.wallet;
                document.getElementById('add-user-status').value = user.status;
                if (addUserModal) addUserModal.classList.remove('hidden');
                isEditingUser = true;
                editingUserId = id;
            }

            if (e.target.closest('.view-history')) {
                e.preventDefault();
                const id = e.target.closest('.view-history').dataset.id;
                const user = users.find(u => u.id === id);
                populateGameHistoryTable(user.gameHistory);
                if (gameHistoryModal) gameHistoryModal.classList.remove('hidden');
            }

            if (e.target.closest('.update-wallet')) {
                e.preventDefault();
                walletUserId = e.target.closest('.update-wallet').dataset.id;
                document.getElementById('wallet-action').value = 'Deposit';
                document.getElementById('wallet-amount').value = '';
                if (walletError) walletError.classList.add('hidden');
                if (walletUpdateModal) walletUpdateModal.classList.remove('hidden');
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
                populateUserTable();
                updateDashboardStats();
                updateNotificationBadge();
            }
        });
    }

    // Override Modal
    const addOverrideModal = document.getElementById('add-override-modal');
    const addOverrideBtn = document.getElementById('add-override-btn');
    const addOverrideSave = document.getElementById('add-override-save');
    const addOverrideCancel = document.getElementById('add-override-cancel');
    const addOverrideError = document.getElementById('add-override-error');

    if (addOverrideBtn) {
        addOverrideBtn.addEventListener('click', () => {
            populateModalFields();
            if (addOverrideModal) addOverrideModal.classList.remove('hidden');
            addOverrideModal.dataset.mode = 'add';
            if (addOverrideError) addOverrideError.classList.add('hidden');
        });
    }

    if (addOverrideCancel) {
        addOverrideCancel.addEventListener('click', () => {
            if (addOverrideModal) addOverrideModal.classList.add('hidden');
            if (addOverrideError) addOverrideError.classList.add('hidden');
        });
    }

    if (addOverrideSave) {
        addOverrideSave.addEventListener('click', () => {
            const game = document.getElementById('add-override-game').value;
            const userEmail = document.getElementById('add-override-user-email').value;
            const expiration = document.getElementById('add-override-expiration').value;
            const config = overrideConfigs[game] || { fields: [] };
            const fields = {};
            let isValid = game && expiration;

            config.fields.forEach(field => {
                const input = document.getElementById(`add-override-dynamic-fields-${field.name}`);
                if (input) {
                    fields[field.name] = input.value;
                    if (!input.value) isValid = false;
                }
            });

            if (!isValid) {
                if (addOverrideError) addOverrideError.classList.remove('hidden');
                return;
            }

            const mode = addOverrideModal.dataset.mode;
            if (mode === 'add') {
                const newOverride = {
                    id: overrides.length ? Math.max(...overrides.map(o => o.id)) + 1 : 1,
                    game,
                    user: userEmail,
                    fields,
                    expiration
                };
                overrides.push(newOverride);
                notifications.push({
                    id: notifications.length + 1,
                    title: "New Override Added",
                    message: `Override for "${game}" has been added.`,
                    time: new Date().toLocaleString()
                });
            } else {
                const id = parseInt(addOverrideModal.dataset.id);
                const override = overrides.find(o => o.id === id);
                if (override) {
                    override.game = game;
                    override.user = userEmail;
                    override.fields = fields;
                    override.expiration = expiration;
                    notifications.push({
                        id: notifications.length + 1,
                        title: "Override Updated",
                        message: `Override for "${game}" has been updated.`,
                        time: new Date().toLocaleString()
                    });
                }
            }

            localStorage.setItem('overrides', JSON.stringify(overrides));
            localStorage.setItem('notifications', JSON.stringify(notifications));
            if (addOverrideModal) addOverrideModal.classList.add('hidden');
            if (addOverrideError) addOverrideError.classList.add('hidden');
            populateOverrideTable();
            updateDashboardStats();
            updateNotificationBadge();
        });
    }

    // Override Table Actions
    const overrideTableBody = document.getElementById('override-table-body');
    if (overrideTableBody) {
        overrideTableBody.addEventListener('click', (e) => {
            if (e.target.closest('.edit-override')) {
                e.preventDefault();
                const id = parseInt(e.target.closest('.edit-override').dataset.id);
                const game = games.find(g => g.id === id);
                if (game) {
                    document.getElementById('add-override-game').value = game.name;
                    document.getElementById('add-override-description').value = game.description;
                    document.getElementById('add-override-status').value = game.status;
                    document.getElementById('add-override-winrate').value = game.winRate;
                    if (addOverrideModal) {
                        addOverrideModal.classList.remove('hidden');
                        addOverrideModal.dataset.mode = 'edit';
                        addOverrideModal.dataset.id = id;
                    }
                }
            }

            if (e.target.closest('.delete-override')) {
                e.preventDefault();
                const id = parseInt(e.target.closest('.delete-override').dataset.id);
                const game = games.find(g => g.id === id);
                games = games.filter(g => g.id !== id);
                if (game) {
                    notifications.push({
                        id: notifications.length + 1,
                        title: "Game Override Deleted",
                        message: `Override for "${game.name}" has been deleted.`,
                        time: new Date().toLocaleString()
                    });
                }
                localStorage.setItem('games', JSON.stringify(games));
                localStorage.setItem('notifications', JSON.stringify(notifications));
                populateOverrideTable();
                updateDashboardStats();
                updateNotificationBadge();
            }
        });
    }

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

        notifications.length = 0;
        localStorage.setItem('notifications', JSON.stringify(notifications));
        updateNotificationBadge();

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

    // User Filters
    const userSearch = document.getElementById('user-search');
    const userStatusFilter = document.getElementById('user-status-filter');

    function filterUsers() {
        let filteredUsers = [...users];
        const search = userSearch?.value.toLowerCase() || '';
        const status = userStatusFilter?.value || '';

        if (search) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search)
            );
        }

        if (status) {
            filteredUsers = filteredUsers.filter(user => user.status === status);
        }

        populateUserTable(filteredUsers);
    }

    if (userSearch) userSearch.addEventListener('input', filterUsers);
    if (userStatusFilter) userStatusFilter.addEventListener('change', filterUsers);

    // Override Filters
    const overrideSearch = document.getElementById('override-search');
    const overrideStatusFilter = document.getElementById('override-status-filter');

    function filterOverrides() {
        let filteredGames = [...games];
        const search = overrideSearch?.value.toLowerCase() || '';
        const status = overrideStatusFilter?.value || '';

        if (search) {
            filteredGames = filteredGames.filter(game => game.name.toLowerCase().includes(search));
        }

        if (status) {
            filteredGames = filteredGames.filter(game => game.status === status);
        }

        populateOverrideTable(filteredGames);
    }

    if (overrideSearch) overrideSearch.addEventListener('input', filterOverrides);
    if (overrideStatusFilter) overrideStatusFilter.addEventListener('change', filterOverrides);

    // Initialize
    populateGameTable(gameOverrides);
    populateUserTable(users);
    populateOverrideTable(games);
    updateNotificationBadge();
});