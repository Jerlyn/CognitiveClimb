// Cognitive Climb - Game Logic with Modern UI Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Game state
    const gameState = {
        currentScreen: 'start-screen',
        level: 1,
        score: 0,
        selectedOption: null,
        currentCategory: 'Information',
        masteredPrinciples: [],
        totalProblems: 0,
        currentProblemIndex: 0
    };

    // Constants
    const POINTS_PER_CORRECT_ANSWER = 100;
    const POINTS_PER_LEVEL = 50;
    const LEVELS_PER_CATEGORY = 5;

    // Cognitive Biases and Design Principles Database
    const principles = [
        // Information Category (1-20)
        {
            id: 1,
            name: "Hick's Law",
            description: "More options leads to harder decisions",
            category: "Information",
            icon: "fa-list-ol"
        },
        {
            id: 2,
            name: "Confirmation Bias",
            description: "People look for evidence that confirms what they think",
            category: "Information",
            icon: "fa-check-circle"
        },
        {
            id: 3,
            name: "Priming",
            description: "Previous stimuli influence users' decision",
            category: "Information",
            icon: "fa-lightbulb"
        },
        {
            id: 4,
            name: "Cognitive Load",
            description: "Total amount of mental effort that is required to complete a task",
            category: "Information",
            icon: "fa-brain"
        },
        {
            id: 5,
            name: "Anchoring Bias",
            description: "Users rely heavily on the first piece of information they see",
            category: "Information",
            icon: "fa-anchor"
        },
        {
            id: 6,
            name: "Nudge",
            description: "Subtle hints can affect users' decisions",
            category: "Information",
            icon: "fa-hand-point-right"
        },
        {
            id: 7,
            name: "Progressive Disclosure",
            description: "Users are less overwhelmed if they're exposed to complex features later",
            category: "Information",
            icon: "fa-layer-group"
        },
        {
            id: 8,
            name: "Fitts's Law",
            description: "Large and close elements are easier to interact with",
            category: "Information",
            icon: "fa-mouse-pointer"
        },
        {
            id: 9,
            name: "Attentional Bias",
            description: "Users' thoughts filter what they pay attention to",
            category: "Information",
            icon: "fa-eye"
        },
        {
            id: 10,
            name: "Empathy Gap",
            description: "People underestimate how much emotions influence user behaviors",
            category: "Information",
            icon: "fa-heart"
        },
        // Adding more Information principles (11-20)
        {
            id: 11,
            name: "Visual Anchors",
            description: "Elements used to guide users' eyes",
            category: "Information",
            icon: "fa-map-marker-alt"
        },
        {
            id: 12,
            name: "Von Restorff Effect",
            description: "People notice items that stand out more",
            category: "Information",
            icon: "fa-star"
        },
        {
            id: 13,
            name: "Visual Hierarchy",
            description: "The order in which people perceive what they see",
            category: "Information",
            icon: "fa-sort"
        },
        {
            id: 14,
            name: "Selective Attention",
            description: "People filter out things from their environment when in focus",
            category: "Information",
            icon: "fa-filter"
        },
        {
            id: 15,
            name: "Survivorship Bias",
            description: "People neglect things that don't make it past a selection process",
            category: "Information",
            icon: "fa-life-ring"
        },
        {
            id: 16,
            name: "Banner Blindness",
            description: "Users tune out the stuff they get repeatedly exposed to",
            category: "Information",
            icon: "fa-low-vision"
        },
        {
            id: 17,
            name: "Juxtaposition",
            description: "Elements that are close and similar are perceived as a single unit",
            category: "Information",
            icon: "fa-object-group"
        },
        {
            id: 18,
            name: "Signifiers",
            description: "Elements that communicate what they will do",
            category: "Information",
            icon: "fa-sign"
        },
        {
            id: 19,
            name: "Contrast",
            description: "Users' attention is drawn to higher visual weights",
            category: "Information",
            icon: "fa-adjust"
        },
        {
            id: 20,
            name: "External Trigger",
            description: "When the information on what to do next is within the prompt itself",
            category: "Information",
            icon: "fa-bell"
        },
        
        // Meaning Category (30-45) - Simple subset
        {
            id: 30,
            name: "Social Proof",
            description: "Users adapt their behaviors based on what others do",
            category: "Meaning",
            icon: "fa-users"
        },
        {
            id: 31,
            name: "Scarcity",
            description: "People value things more when they're in limited supply",
            category: "Meaning",
            icon: "fa-hourglass-half"
        },
        {
            id: 32,
            name: "Curiosity Gap",
            description: "Users have a desire to seek out missing information",
            category: "Meaning",
            icon: "fa-question-circle"
        },
        
        // Time Category (62-70) - Simple subset
        {
            id: 62,
            name: "Labor Illusion",
            description: "People value things more when they see the work behind them",
            category: "Time",
            icon: "fa-cogs"
        },
        {
            id: 63,
            name: "Default Bias",
            description: "Users tend not to change an established behavior",
            category: "Time",
            icon: "fa-check-square"
        },
        
        // Memory Category (90-106) - Simple subset
        {
            id: 90,
            name: "Provide Exit Points",
            description: "Invite users to leave your app at the right moment",
            category: "Memory",
            icon: "fa-door-open"
        },
        {
            id: 91,
            name: "Peak-End Rule",
            description: "People judge an experience by its peak and how it ends",
            category: "Memory",
            icon: "fa-mountain"
        },
        {
            id: 95,
            name: "Chunking",
            description: "People remember grouped information better",
            category: "Memory",
            icon: "fa-th-large"
        }
    ];

    // Game problems database
    const problems = [
        // Information Category Problems
        {
            id: 1,
            title: "Overwhelming Dropdown Menu",
            description: "Your e-commerce app has a navigation menu with 25 different categories. Users are abandoning the site after clicking through the menu. What principle best explains this issue?",
            correctAnswer: 1, // Hick's Law
            category: "Information",
            difficulty: 1,
            options: [1, 4, 7, 16] // Hick's Law, Cognitive Load, Progressive Disclosure, Banner Blindness
        },
        {
            id: 2,
            title: "User Ignoring Warning Messages",
            description: "You've placed important warning messages at the top of your website, but analytics show users are ignoring them. What principle best explains this behavior?",
            correctAnswer: 16, // Banner Blindness
            category: "Information",
            difficulty: 1,
            options: [9, 14, 16, 19] // Attentional Bias, Selective Attention, Banner Blindness, Contrast
        },
        {
            id: 3,
            title: "Ineffective Button Placement",
            description: "Users are struggling to find and tap the 'Submit' button in your mobile app. The button is small and positioned in the upper corner of the screen. Which principle would help understand this issue?",
            correctAnswer: 8, // Fitts's Law
            category: "Information",
            difficulty: 1,
            options: [8, 13, 18, 19] // Fitts's Law, Visual Hierarchy, Signifiers, Contrast
        },
        {
            id: 4,
            title: "Form Abandonment",
            description: "Users are abandoning your registration form halfway through completion. The form has 15 fields shown all at once. Which principle would help improve this?",
            correctAnswer: 7, // Progressive Disclosure
            category: "Information",
            difficulty: 2,
            options: [4, 7, 17, 20] // Cognitive Load, Progressive Disclosure, Juxtaposition, External Trigger
        },
        {
            id: 5,
            title: "Influencing User Choice",
            description: "You want to ethically guide users toward choosing the more environmentally friendly shipping option. Which principle would be most appropriate to apply?",
            correctAnswer: 6, // Nudge
            category: "Information",
            difficulty: 2,
            options: [2, 5, 6, 20] // Confirmation Bias, Anchoring Bias, Nudge, External Trigger
        },
        
        // Meaning Category Problems
        {
            id: 6,
            title: "Product Popularity",
            description: "Your e-commerce site needs to increase sales of certain products. Showing how many people have purchased an item recently would leverage which principle?",
            correctAnswer: 30, // Social Proof
            category: "Meaning",
            difficulty: 1,
            options: [30, 31, 32, 2] // Social Proof, Scarcity, Curiosity Gap, Confirmation Bias
        },
        
        // Time Category Problems
        {
            id: 7,
            title: "Premium Defaults",
            description: "Your SaaS product pre-selects the premium plan in the pricing page. Despite being more expensive, most users don't change this selection. Which principle explains this?",
            correctAnswer: 63, // Default Bias
            category: "Time",
            difficulty: 1,
            options: [62, 63, 5, 6] // Labor Illusion, Default Bias, Anchoring Bias, Nudge
        },
        
        // Memory Category Problems
        {
            id: 8,
            title: "Memorable Experience",
            description: "Your hotel booking app focuses on creating an excellent checkout experience and sends a pleasant confirmation email. Which principle does this leverage?",
            correctAnswer: 91, // Peak-End Rule
            category: "Memory",
            difficulty: 1,
            options: [90, 91, 95, 19] // Provide Exit Points, Peak-End Rule, Chunking, Contrast
        }
    ];

    // Map category names to FontAwesome icons
    const categoryIcons = {
        'Information': 'fa-info-circle',
        'Meaning': 'fa-lightbulb',
        'Time': 'fa-clock',
        'Memory': 'fa-brain'
    };

    // DOM Elements - Screens
    const screens = {
        start: document.getElementById('start-screen'),
        howToPlay: document.getElementById('how-to-play-screen'),
        game: document.getElementById('game-screen'),
        feedback: document.getElementById('feedback-screen'),
        levelComplete: document.getElementById('level-complete-screen'),
        gameOver: document.getElementById('game-over-screen')
    };

    // Game Screen Elements
    const levelNumberEl = document.getElementById('level-number');
    const categoryEl = document.getElementById('category');
    const scoreEl = document.getElementById('score');
    const progressBarEl = document.getElementById('progress-bar');
    const problemTitleEl = document.getElementById('problem-title');
    const problemDescriptionEl = document.getElementById('problem-description');
    const optionsContainerEl = document.getElementById('options');
    const submitAnswerBtn = document.getElementById('submit-answer');

    // Feedback Screen Elements
    const feedbackTitleEl = document.getElementById('feedback-title');
    const feedbackMessageEl = document.getElementById('feedback-message');
    const principleNameEl = document.getElementById('principle-name');
    const principleDescriptionEl = document.getElementById('principle-description');
    const principleCategoryEl = document.getElementById('principle-category');

    // Level Complete Screen Elements
    const levelScoreEl = document.getElementById('level-score');
    const principlesMasteredEl = document.getElementById('principles-mastered');
    const categoryProgressEl = document.getElementById('category-progress');

    // Game Over Screen Elements
    const finalLevelEl = document.getElementById('final-level');
    const finalScoreEl = document.getElementById('final-score');
    const masteredPrinciplesEl = document.getElementById('mastered-principles');

    // Event Listeners - Start Screen
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('how-to-play-button').addEventListener('click', () => showScreen('howToPlay'));
    
    // How to Play Screen
    document.getElementById('back-to-start').addEventListener('click', () => showScreen('start'));
    
    // Game Screen - Control buttons in the header
    document.getElementById('restart-game').addEventListener('click', restartGame);
    document.getElementById('quit-to-menu').addEventListener('click', () => showScreen('start'));
    submitAnswerBtn.addEventListener('click', submitAnswer);
    
    // Feedback Screen
    document.getElementById('continue-button').addEventListener('click', continueToNextProblem);
    document.getElementById('feedback-quit').addEventListener('click', () => showScreen('start'));
    
    // Level Complete Screen
    document.getElementById('next-level-button').addEventListener('click', startNextLevel);
    document.getElementById('level-menu-button').addEventListener('click', () => showScreen('start'));
    
    // Game Over Screen
    document.getElementById('play-again-button').addEventListener('click', () => {
        resetGameState();
        showScreen('start');
    });
    document.getElementById('share-button').addEventListener('click', shareResults);

    // Setup for principle detail modal
    setupPrincipleDetails();

    // Function to show a screen
    function showScreen(screenId) {
        // Hide all screens
        Object.values(screens).forEach(screen => {
            if (screen) {
                screen.classList.add('hidden');
            }
        });
        
        // Show the requested screen
        if (screens[screenId]) {
            screens[screenId].classList.remove('hidden');
            gameState.currentScreen = screenId;
            
            // Add a subtle fade-in animation
            screens[screenId].style.opacity = '0';
            setTimeout(() => {
                screens[screenId].style.opacity = '1';
                screens[screenId].style.transition = 'opacity 0.3s ease';
            }, 10);
        }
    }

    // Function to start the game
    function startGame() {
        resetGameState();
        loadProblem();
        showScreen('game');
        
        // Add animation to the game header
        const gameHeader = document.getElementById('game-header');
        if (gameHeader) {
            gameHeader.style.transform = 'translateY(-20px)';
            gameHeader.style.opacity = '0';
            setTimeout(() => {
                gameHeader.style.transform = 'translateY(0)';
                gameHeader.style.opacity = '1';
                gameHeader.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            }, 100);
        }
    }

    // Function to restart the game
    function restartGame() {
        resetGameState();
        loadProblem();
        updateProgressBar();
        showScreen('game');
    }

    // Function to reset the game state
    function resetGameState() {
        gameState.level = 1;
        gameState.score = 0;
        gameState.currentCategory = 'Information';
        gameState.masteredPrinciples = [];
        gameState.totalProblems = problems.filter(p => p.category === gameState.currentCategory).length;
        gameState.currentProblemIndex = 0;
        updateHUD();
    }

    // Function to update the HUD
    function updateHUD() {
        if (levelNumberEl) {
            levelNumberEl.textContent = `Level ${gameState.level}`;
        }
        if (categoryEl) {
            categoryEl.innerHTML = `<i class="fas ${categoryIcons[gameState.currentCategory]}"></i> ${gameState.currentCategory}`;
        }
        if (scoreEl) {
            scoreEl.textContent = gameState.score;
        }
        updateProgressBar();
    }
    
    // Function to update the progress bar
    function updateProgressBar() {
        if (progressBarEl) {
            const categoryProblems = problems.filter(p => p.category === gameState.currentCategory);
            const progress = (gameState.level - 1) % categoryProblems.length / categoryProblems.length * 100;
            progressBarEl.style.width = `${progress}%`;
        }
    }

    // Function to load a problem
    function loadProblem() {
        // Get problems for current category and level
        const categoryProblems = problems.filter(p => p.category === gameState.currentCategory);
        gameState.totalProblems = categoryProblems.length;
        
        // Use modulo to cycle through problems if we have more levels than problems
        const problemIndex = (gameState.level - 1) % categoryProblems.length;
        gameState.currentProblemIndex = problemIndex;
        const currentProblem = categoryProblems[problemIndex];
        
        if (!currentProblem) {
            console.error('No problem found for current level and category');
            return;
        }
        
        // Update problem display
        if (problemTitleEl) {
            problemTitleEl.innerHTML = `<i class="fas fa-tasks"></i> ${currentProblem.title}`;
        }
        if (problemDescriptionEl) {
            problemDescriptionEl.textContent = currentProblem.description;
        }
        
        // Generate options
        if (optionsContainerEl) {
            optionsContainerEl.innerHTML = '';
            
            currentProblem.options.forEach(optionId => {
                const principle = principles.find(p => p.id === optionId);
                if (!principle) return;
                
                const optionItem = document.createElement('div');
                optionItem.className = 'option-item';
                optionItem.setAttribute('role', 'radio');
                optionItem.setAttribute('aria-checked', 'false');
                optionItem.setAttribute('tabindex', '0');
                optionItem.dataset.optionId = optionId;
                
                const optionRadio = document.createElement('input');
                optionRadio.type = 'radio';
                optionRadio.name = 'principle-option';
                optionRadio.value = optionId;
                optionRadio.className = 'option-radio';
                optionRadio.id = `option-${optionId}`;
                
                const optionName = document.createElement('span');
                optionName.className = 'option-name';
                
                // Add icon to option if available
                if (principle.icon) {
                    optionName.innerHTML = `<i class="fas ${principle.icon}"></i> ${principle.name}`;
                } else {
                    optionName.textContent = principle.name;
                }
                
                const optionDescription = document.createElement('span');
                optionDescription.className = 'option-description';
                optionDescription.textContent = principle.description;
                
                optionItem.appendChild(optionRadio);
                optionItem.appendChild(optionName);
                optionItem.appendChild(optionDescription);
                
                optionItem.addEventListener('click', () => selectOption(optionId, optionItem));
                optionItem.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectOption(optionId, optionItem);
                    }
                });
                
                optionsContainerEl.appendChild(optionItem);
                
                // Add a staggered animation effect to options
                optionItem.style.opacity = '0';
                optionItem.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    optionItem.style.opacity = '1';
                    optionItem.style.transform = 'translateY(0)';
                    optionItem.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                }, 100 + (optionsContainerEl.children.length * 50));
            });
        }
        
        // Reset selected option
        gameState.selectedOption = null;
        if (submitAnswerBtn) {
            submitAnswerBtn.disabled = true;
        }
        
        // Update progress bar
        updateProgressBar();
    }
    
    // Function to select an option
    function selectOption(optionId, optionItem) {
        // Remove selected class from all options
        const allOptions = document.querySelectorAll('.option-item');
        allOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-checked', 'false');
        });
        
        // Add selected class to clicked option
        optionItem.classList.add('selected');
        optionItem.setAttribute('aria-checked', 'true');
        
        // Update game state
        gameState.selectedOption = optionId;
        
        // Enable submit button
        if (submitAnswerBtn) {
            submitAnswerBtn.disabled = false;
            
            // Add pulse animation to submit button
            submitAnswerBtn.classList.add('pulse');
            setTimeout(() => {
                submitAnswerBtn.classList.remove('pulse');
            }, 500);
        }
    }
    
    // Function to submit an answer
    function submitAnswer() {
        if (gameState.selectedOption === null) {
            return; // No option selected
        }
        
        const currentProblemIndex = (gameState.level - 1) % problems.filter(p => p.category === gameState.currentCategory).length;
        const currentProblem = problems.filter(p => p.category === gameState.currentCategory)[currentProblemIndex];
        
        const isCorrect = currentProblem.correctAnswer === gameState.selectedOption;
        
        // Show feedback
        showFeedback(isCorrect, currentProblem.correctAnswer);
    }
    
    // Function to show feedback
    function showFeedback(isCorrect, correctPrincipleId) {
        const feedbackScreen = screens.feedback;
        const correctPrinciple = principles.find(p => p.id === correctPrincipleId);
        
        if (!feedbackScreen || !correctPrinciple) return;
        
        // Update feedback content
        feedbackScreen.classList.remove('correct', 'incorrect');
        
        if (isCorrect) {
            feedbackScreen.classList.add('correct');
            if (feedbackTitleEl) {
                feedbackTitleEl.innerHTML = '<i class="fas fa-check-circle"></i> Correct!';
            }
            if (feedbackMessageEl) {
                feedbackMessageEl.textContent = "That's the right principle!";
            }
            
            // Add points
            gameState.score += POINTS_PER_CORRECT_ANSWER;
            
            // Add to mastered principles if not already mastered
            if (!gameState.masteredPrinciples.includes(correctPrincipleId)) {
                gameState.masteredPrinciples.push(correctPrincipleId);
            }
        } else {
            feedbackScreen.classList.add('incorrect');
            if (feedbackTitleEl) {
                feedbackTitleEl.innerHTML = '<i class="fas fa-times-circle"></i> Not Quite Right';
            }
            if (feedbackMessageEl) {
                feedbackMessageEl.textContent = "Let's learn about the correct principle:";
            }
        }
        
        // Display principle details
        if (principleNameEl) {
            if (correctPrinciple.icon) {
                principleNameEl.innerHTML = `<i class="fas ${correctPrinciple.icon}"></i> ${correctPrinciple.name}`;
            } else {
                principleNameEl.textContent = correctPrinciple.name;
            }
        }
        
        if (principleDescriptionEl) {
            principleDescriptionEl.textContent = correctPrinciple.description;
        }
        
        if (principleCategoryEl) {
            principleCategoryEl.innerHTML = `<i class="fas ${categoryIcons[correctPrinciple.category]}"></i> Category: ${correctPrinciple.category}`;
        }
        
        showScreen('feedback');
    }
    
    // Function to continue to the next problem
    function continueToNextProblem() {
        // Check if level should be completed
        const categoryProblemsCount = problems.filter(p => p.category === gameState.currentCategory).length;
        
        // If we've completed all unique problems in this category or reached LEVELS_PER_CATEGORY
        if (gameState.level % LEVELS_PER_CATEGORY === 0 || 
            gameState.masteredPrinciples.length >= categoryProblemsCount) {
            completeLevel();
        } else {
            // Move to next problem in current level
            gameState.level++;
            gameState.score += POINTS_PER_LEVEL; // Bonus for progressing
            updateHUD();
            loadProblem();
            showScreen('game');
        }
    }
    
    // Function to complete a level
    function completeLevel() {
        // Update level complete screen
        const levelScore = gameState.score;
        const categoryPrinciplesCount = principles.filter(p => p.category === gameState.currentCategory).length;
        const masteredCount = gameState.masteredPrinciples.filter(id => {
            const principle = principles.find(p => p.id === id);
            return principle && principle.category === gameState.currentCategory;
        }).length;
        
        if (levelScoreEl) {
            levelScoreEl.textContent = levelScore;
        }
        if (principlesMasteredEl) {
            principlesMasteredEl.textContent = masteredCount;
        }
        if (categoryProgressEl) {
            categoryProgressEl.textContent = `You've mastered ${masteredCount}/${categoryPrinciplesCount} ${gameState.currentCategory} principles`;
        }
        
        showScreen('levelComplete');
        
        // Add celebration confetti animation
        addConfetti();
    }
    
    // Function to start the next level
    function startNextLevel() {
        // Change category if we've completed all problems in current category
        const categories = ['Information', 'Meaning', 'Time', 'Memory'];
        const currentCategoryIndex = categories.indexOf(gameState.currentCategory);
        
        if (currentCategoryIndex < categories.length - 1) {
            // Move to next category
            gameState.currentCategory = categories[currentCategoryIndex + 1];
            gameState.level = 1;
        } else {
            // Game over - completed all categories
            endGame();
            return;
        }
        
        updateHUD();
        loadProblem();
        showScreen('game');
    }
    
    // Function to end the game
    function endGame() {
        // Update game over screen
        if (finalLevelEl) {
            finalLevelEl.textContent = gameState.level;
        }
        if (finalScoreEl) {
            finalScoreEl.textContent = gameState.score;
        }
        
        // Display mastered principles
        if (masteredPrinciplesEl) {
            // Clear existing content
            masteredPrinciplesEl.innerHTML = '';
            
            // Group mastered principles by category
            const principlesByCategory = {};
            gameState.masteredPrinciples.forEach(id => {
                const principle = principles.find(p => p.id === id);
                if (!principle) return;
                
                if (!principlesByCategory[principle.category]) {
                    principlesByCategory[principle.category] = [];
                }
                
                principlesByCategory[principle.category].push(principle);
            });
            
            // Create category headers and list items
            for (const category in principlesByCategory) {
                // Create a category header
                const categoryHeader = document.createElement('h4');
                categoryHeader.innerHTML = `<i class="fas ${categoryIcons[category]}"></i> ${category}`;
                categoryHeader.className = 'category-header';
                masteredPrinciplesEl.appendChild(categoryHeader);
                
                // Add principles for this category directly under the header
                principlesByCategory[category].forEach(principle => {
                    const li = document.createElement('li');
                    li.setAttribute('tabindex', '0');
                    li.setAttribute('data-principle-id', principle.id);
                    
                    if (principle.icon) {
                        li.innerHTML = `<i class="fas fa-check"></i> <span class="principle-name">${principle.name}</span>`;
                    } else {
                        li.innerHTML = `<i class="fas fa-check"></i> <span class="principle-name">${principle.name}</span>`;
                    }
                    masteredPrinciplesEl.appendChild(li);
                });
            }
            
            // Setup click handlers for the newly created principle items
            setupPrincipleDetails();
        }
        
        showScreen('gameOver');
        
        // Add more extensive celebration animation
        addConfetti(200);
    }
    
    // Function to add confetti celebration
    function addConfetti(particleCount = 100) {
        const confettiColors = [
            '#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0',
            '#43aa8b', '#f94144', '#90be6d', '#f9c74f', '#277da1'
        ];
        
        // Create confetti pieces
        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Randomize confetti properties
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 10 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            
            // Add some random shapes
            const shape = Math.floor(Math.random() * 3);
            if (shape === 0) {
                // Square (default)
            } else if (shape === 1) {
                // Circle
                confetti.style.borderRadius = '50%';
            } else {
                // Triangle
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = Math.random() * 5 + 5 + 'px solid transparent';
                confetti.style.borderRight = Math.random() * 5 + 5 + 'px solid transparent';
                confetti.style.borderBottom = Math.random() * 10 + 10 + 'px solid ' + 
                                            confettiColors[Math.floor(Math.random() * confettiColors.length)];
            }
            
            document.body.appendChild(confetti);
            
            // Remove after animation completes
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Function to share results
    function shareResults() {
        const text = `I scored ${gameState.score} points in Cognitive Climb! I mastered ${gameState.masteredPrinciples.length} design principles!`;
        
        // Try to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'My Cognitive Climb Score',
                text: text,
                url: window.location.href,
            })
            .catch(error => {
                showToast('Share failed: ' + error);
            });
        } else {
            // Fallback - copy to clipboard
            const tempInput = document.createElement('input');
            document.body.appendChild(tempInput);
            tempInput.value = text;
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            showToast('Results copied to clipboard! Share with your friends.');
        }
    }
    
    // Function to show a toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // Set up principle detail modal functionality
    function setupPrincipleDetails() {
        // Check if the elements exist on the page
        const principleItems = document.querySelectorAll('#mastered-principles li');
        const principleModal = document.getElementById('principle-detail-modal');
        
        if (!principleModal) return;
        
        const modalClose = principleModal.querySelector('.principle-modal-close');
        
        // Show modal when clicking on a principle
        principleItems.forEach(item => {
            item.addEventListener('click', function() {
                const principleId = this.dataset.principleId;
                showPrincipleDetails(principleId);
            });
            
            // Also handle keyboard interaction
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const principleId = this.dataset.principleId;
                    showPrincipleDetails(principleId);
                }
            });
        });
        
        // Close modal when clicking close button
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                principleModal.classList.remove('show');
            });
        }
        
        // Close modal when clicking outside
        principleModal.addEventListener('click', function(e) {
            if (e.target === principleModal) {
                principleModal.classList.remove('show');
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && principleModal.classList.contains('show')) {
                principleModal.classList.remove('show');
            }
        });
    }
    
    // Function to show principle details
    function showPrincipleDetails(principleId) {
        const principle = principles.find(p => p.id === parseInt(principleId));
        const principleModal = document.getElementById('principle-detail-modal');
        
        if (!principle || !principleModal) return;
        
        // Update modal content
        const modalTitle = principleModal.querySelector('.principle-modal-title');
        const modalDescription = principleModal.querySelector('.principle-modal-description');
        const modalCategory = principleModal.querySelector('.principle-modal-category');
        
        if (modalTitle) {
            if (principle.icon) {
                modalTitle.innerHTML = `<i class="fas ${principle.icon}"></i> ${principle.name}`;
            } else {
                modalTitle.textContent = principle.name;
            }
        }
        
        if (modalDescription) {
            modalDescription.textContent = principle.description;
        }
        
        if (modalCategory) {
            modalCategory.innerHTML = `<i class="fas ${categoryIcons[principle.category]}"></i> ${principle.category}`;
        }
        
        // Show the modal
        principleModal.classList.add('show');
    }
    
    // Function to handle category info click
    function initCategoryInfo() {
        const categoryEl = document.getElementById('category');
        if (categoryEl) {
            categoryEl.addEventListener('click', function() {
                const currentCategory = gameState.currentCategory;
                showToast(`You're in the ${currentCategory} category! Master these principles to progress.`);
            });
        }
    }
    
    // Initialize the game
    function init() {
        // Set initial screen
        showScreen('start');
        
        // Initialize category info interaction
        initCategoryInfo();
    }
    
    // Start the game
    init();
});