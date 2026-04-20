// ===== КОНФИГУРАЦИЯ И КОНСТАНТЫ =====

const PERIODS = {
    WWI: { start: 1914, end: 1918, name: 'Первая мировая война' },
    INTERWAR: { start: 1919, end: 1938, name: 'Межвоенный период' },
    WWII: { start: 1939, end: 1945, name: 'Вторая мировая война' },
    COLDWAR: { start: 1946, end: 1991, name: 'Холодная война' },
    MODERN: { start: 1992, end: 2014, name: 'Современность' }
};

let gameState = {
    year: 1914,
    economy: 50,
    army: 50,
    stability: 50,
    diplomacy: 50,
    isGameOver: false,
    isGameStarted: false
};

const events = {
    WWI: [
        {
            title: '⚔️ Объявление войны',
            description: 'Соседняя держава объявила войну. Ваша страна в опасности. Как вы поступите?',
            context: 'Начало Первой мировой войны (1914). Необходимо принять решение о вступлении в конфликт.',
            choices: [
                {
                    text: '🎖️ Вступить в войну на стороне сильного союзника',
                    effects: { economy: -15, army: 20, stability: -10, diplomacy: 10 }
                },
                {
                    text: '🛡️ Остаться нейтральным и развивать оборону',
                    effects: { economy: -5, army: 10, stability: 10, diplomacy: -5 }
                },
                {
                    text: '💰 Продавать оружие обеим сторонам конфликта',
                    effects: { economy: 20, army: 0, stability: -5, diplomacy: -15 }
                }
            ]
        },
        {
            title: '📉 Экономический кризис',
            description: 'Война истощает экономику страны. Фабрики остановлены, рабочие на фронте. Голод грозит городам.',
            context: 'Военное время требует радикальных экономических мер.',
            choices: [
                {
                    text: '👷 Привлечь женщин и подростков на фабрики',
                    effects: { economy: 15, stability: -10, army: -5 }
                },
                {
                    text: '📋 Полное государственное управление экономикой',
                    effects: { economy: 10, stability: -15, diplomacy: -10 }
                },
                {
                    text: '🤝 Договориться о торговле с нейтральными странами',
                    effects: { economy: 5, stability: 10, diplomacy: 15 }
                }
            ]
        },
        {
            title: '🔥 Революционные волнения',
            description: 'Беженцы и мобилизованные солдаты создают волнения. На улицах города протесты и забастовки.',
            context: 'Социальные волнения угрожают внутренней стабильности государства.',
            choices: [
                {
                    text: '🚨 Жёсткие меры подавления беспорядков',
                    effects: { stability: 15, diplomacy: -20, economy: -10 }
                },
                {
                    text: '🏥 Открыть центры помощи беженцам и интеграции',
                    effects: { stability: 5, diplomacy: 10, economy: -5 }
                },
                {
                    text: '📢 Пропаганда единства вокруг войны',
                    effects: { stability: 10, diplomacy: -10, economy: 0 }
                }
            ]
        }
    ],
    INTERWAR: [
        {
            title: '✍️ Версальский договор',
            description: 'После войны нужно решить, как участвовать в международном соглашении. Условия очень тяжелые для вашей страны.',
            context: 'Мир перестраивается после ужасов войны. Ваша позиция будет ключевой.',
            choices: [
                {
                    text: '✍️ Подписать договор со всеми условиями',
                    effects: { diplomacy: 15, economy: -20, stability: -10 }
                },
                {
                    text: '💪 Отказаться и усилить вооружение',
                    effects: { army: 15, diplomacy: -20, economy: -15 }
                },
                {
                    text: '🤝 Переговорить и достичь компромисса',
                    effects: { diplomacy: 10, economy: -5, stability: 5 }
                }
            ]
        },
        {
            title: '💥 Великая депрессия (1929)',
            description: 'Мировая экономика на грани краха! Банки закрываются, фабрики стоят, люди теряют работу. Безработица растёт угрожающе.',
            context: 'Это самый суровый экономический кризис в истории. Нужно спасать страну.',
            choices: [
                {
                    text: '💰 Кейнсианская экономика - затраты на общественные работы',
                    effects: { economy: 15, stability: 10, diplomacy: -5 }
                },
                {
                    text: '🏭 Государственное управление и плановая экономика',
                    effects: { economy: 10, stability: -10, diplomacy: -15 }
                },
                {
                    text: '🤑 Невмешательство - доверить рынку',
                    effects: { economy: -10, stability: -15, diplomacy: 5 }
                }
            ]
        },
        {
            title: '🌟 Политические движения',
            description: 'Радикальные политические течения набирают огромную популярность. Люди ищут сильного лидера. Демократия находится в кризисе.',
            context: 'Выбор между демократией и авторитаризмом определит судьбу нации на десятилетия.',
            choices: [
                {
                    text: '🎩 Укрепить демократию и парламент',
                    effects: { stability: 5, diplomacy: 15, army: -5 }
                },
                {
                    text: '👑 Установить авторитарное правление',
                    effects: { stability: 15, diplomacy: -15, economy: -10 }
                },
                {
                    text: '⚖️ Установить военное правление',
                    effects: { stability: 10, army: 15, diplomacy: -20 }
                }
            ]
        }
    ],
    WWII: [
        {
            title: '⚔️ Вторая мировая война',
            description: 'Две великие державы сражаются за мировое господство. Война охватила весь континент. Вы должны выбрать сторону.',
            context: 'Это решение определит судьбу вашей страны на ближайшие десятилетия.',
            choices: [
                {
                    text: '⚔️ Присоединиться к первой коалиции',
                    effects: { army: 25, economy: -20, stability: -15 }
                },
                {
                    text: '⚔️ Присоединиться ко второй коалиции',
                    effects: { army: 25, economy: -20, stability: -15 }
                },
                {
                    text: '🏴 Остаться нейтральным и выжить',
                    effects: { army: -10, economy: 10, stability: 10, diplomacy: -20 }
                }
            ]
        },
        {
            title: '🛡️ Оккупация',
            description: 'Мощный сосед требует вашего полного подчинения. Он готов вторгнуться. Ваша армия не может выиграть против такой силы.',
            context: 'Это критический момент. Следующее решение может означать жизнь или смерть миллионов.',
            choices: [
                {
                    text: '🛡️ Приготовиться к войне, собрать весь боевой потенциал',
                    effects: { army: 20, economy: -25, stability: -10 }
                },
                {
                    text: '🏳️ Капитулировать и сохранить жизни',
                    effects: { stability: -20, diplomacy: -20, economy: -5 }
                },
                {
                    text: '🕵️ Организовать подпольное сопротивление',
                    effects: { stability: 5, diplomacy: 15, army: -10 }
                }
            ]
        },
        {
            title: '⚖️ Моральный выбор',
            description: 'Правительство требует участия в сомнительных операциях. Генералы восстают против приказов. Мораль против приказов.',
            context: 'История будет помнить ваш выбор. Что выберет ваше правительство?',
            choices: [
                {
                    text: '❌ Отказаться и скрыться в подполье',
                    effects: { stability: -15, diplomacy: 15, army: -15 }
                },
                {
                    text: '✅ Выполнить приказы без возражений',
                    effects: { stability: 10, army: 5, diplomacy: -30 }
                },
                {
                    text: '⚖️ Обнародовать преступления союзникам',
                    effects: { stability: -20, diplomacy: 25, army: -10 }
                }
            ]
        }
    ],
    COLDWAR: [
        {
            title: '❄️ Холодная война',
            description: 'Война закончилась, но м��р разделяется на два враждующих блока. Каждому нужны верные союзники. Выбор определит будущее.',
            context: 'Выбор блока будет ключевым для вашей страны на 45 лет.',
            choices: [
                {
                    text: '🌐 Присоединиться к западному блоку',
                    effects: { diplomacy: 20, economy: 10, stability: -5 }
                },
                {
                    text: '🔴 Присоединиться к восточному блоку',
                    effects: { stability: 10, army: 10, economy: -10 }
                },
                {
                    text: '🤝 Остаться неприсоединившимся',
                    effects: { diplomacy: 15, economy: 5, stability: -15 }
                }
            ]
        },
        {
            title: '🚀 Гонка вооружений',
            description: 'Соперник увеличивает военный бюджет в 10 раз. Экономика требует инвестиций, армия требует ядерного оружия. Как балансировать?',
            context: 'Балансирование между ружьями и маслом. Выбор повлияет на благосостояние народа.',
            choices: [
                {
                    text: '🎖️ Максимальные военные расходы и ядерное оружие',
                    effects: { army: 20, economy: -20, stability: -10 }
                },
                {
                    text: '💰 Вложить в экономику и качество жизни народа',
                    effects: { economy: 15, stability: 10, army: -10 }
                },
                {
                    text: '⚖️ Сбалансированный подход',
                    effects: { army: 5, economy: 5, stability: 5 }
                }
            ]
        },
        {
            title: '🔬 Техническая революция',
            description: 'Компьютеры, интернет, биотехнологии - вторая промышленная революция разворачивается. Кто будет лидером этой революции?',
            context: 'Инвестиции в науку и образование откроют двери в будущее.',
            choices: [
                {
                    text: '🔬 Массивные инвестиции в науку и исследования',
                    effects: { economy: 20, stability: 15, army: -5 }
                },
                {
                    text: '🎓 Реформа образования и развитие человеческих ресурсов',
                    effects: { economy: 15, stability: 10, diplomacy: 10 }
                },
                {
                    text: '🤖 Компьютеризация и автоматизация производства',
                    effects: { economy: 25, stability: -10, army: 5 }
                }
            ]
        }
    ],
    MODERN: [
        {
            title: '🌍 Глобализация',
            description: 'Холодная война закончилась. Мир становится более открытым. Глобализация создаёт невиданные возможности и новые угрозы.',
            context: 'Как ваша страна будет участвовать в новом глобальном мире?',
            choices: [
                {
                    text: '🌍 Активно участвовать в глобализации',
                    effects: { economy: 20, diplomacy: 15, stability: -10 }
                },
                {
                    text: '🛡️ Защитить национальные интересы и традиции',
                    effects: { stability: 15, economy: -10, diplomacy: -15 }
                },
                {
                    text: '⚖️ Избирательное участие в глобализации',
                    effects: { economy: 10, stability: 5, diplomacy: 5 }
                }
            ]
        },
        {
            title: '🌐 Терроризм и конфликты',
            description: 'Новые угрозы возникают в разных уголках мира. Терроризм и региональные конфликты требуют ответа. Должна ли ваша страна участвовать?',
            context: 'Безопасность требует действий, но военные интервенции опасны.',
            choices: [
                {
                    text: '🎖️ Активное военное участие в коалициях',
                    effects: { army: 15, stability: -15, diplomacy: -10 }
                },
                {
                    text: '🛡️ Укрепить внутреннюю безопасность и оборону',
                    effects: { stability: 15, army: 10, economy: -10 }
                },
                {
                    text: '🤝 Международное сотрудничество в разведке',
                    effects: { diplomacy: 20, stability: 5, economy: 5 }
                }
            ]
        },
        {
            title: '💥 Финансовый кризис 2008',
            description: 'Мировая экономика рушится. Банки падают один за другим. Безработица достигает 25%. Общество находится на грани восстания.',
            context: 'Выбор: спасать финансовый сектор или помогать простому народу?',
            choices: [
                {
                    text: '💰 Спасить финансовый сектор мегайинвестициями',
                    effects: { economy: 10, stability: -20, diplomacy: -10 }
                },
                {
                    text: '👥 Помощь населению и социальные программы',
                    effects: { stability: 15, economy: -5, diplomacy: 10 }
                },
                {
                    text: '⚖️ Реформа финансовой системы',
                    effects: { economy: 15, stability: 10, diplomacy: 5 }
                }
            ]
        }
    ]
};

function getCurrentPeriod(year) {
    for (const [key, period] of Object.entries(PERIODS)) {
        if (year >= period.start && year <= period.end) {
            return key;
        }
    }
    return 'MODERN';
}

function getRandomEvent(state) {
    const period = getCurrentPeriod(state.year);
    const periodEvents = events[period];
    
    if (!periodEvents || periodEvents.length === 0) {
        return generateFallbackEvent(state);
    }
    
    const randomIndex = Math.floor(Math.random() * periodEvents.length);
    return JSON.parse(JSON.stringify(periodEvents[randomIndex]));
}

function generateFallbackEvent(state) {
    return {
        title: '❓ Неопределённые времена',
        description: 'История переходит в неизведанное. Вы должны принять решение о будущем нации.',
        context: 'Год: ' + state.year,
        choices: [
            {
                text: '📈 Инвестировать в экономику и инфраструктуру',
                effects: { economy: 10, stability: 5 }
            },
            {
                text: '🎖️ Укрепить армию и оборону',
                effects: { army: 10, stability: -5 }
            },
            {
                text: '🤝 Развивать дипломатические отношения',
                effects: { diplomacy: 10, stability: 5 }
            }
        ]
    };
}

function applyEffects(state, effects) {
    state.economy = Math.max(0, Math.min(100, state.economy + (effects.economy || 0)));
    state.army = Math.max(0, Math.min(100, state.army + (effects.army || 0)));
    state.stability = Math.max(0, Math.min(100, state.stability + (effects.stability || 0)));
    state.diplomacy = Math.max(0, Math.min(100, state.diplomacy + (effects.diplomacy || 0)));
    state.year += 1;
}

function checkGameOver(state) {
    return (
        state.economy === 0 ||
        state.army === 0 ||
        state.stability === 0 ||
        state.diplomacy === 0 ||
        state.year > 2014
    );
}

function getGameOverReason(state) {
    if (state.economy === 0) return 'Экономический коллапс - страна обанкротилась!';
    if (state.army === 0) return 'Военное поражение - армия полностью разгромлена!';
    if (state.stability === 0) return 'Революция - государство пало!';
    if (state.diplomacy === 0) return 'Дипломатическая изоляция - все страны против вас!';
    if (state.year > 2014) return 'Вы провели страну через 100 лет истории!';
    return 'Игра окончена';
}

function updateUI() {
    document.getElementById('yearDisplay').textContent = gameState.year;
    document.getElementById('economyValue').textContent = gameState.economy;
    document.getElementById('armyValue').textContent = gameState.army;
    document.getElementById('stabilityValue').textContent = gameState.stability;
    document.getElementById('diplomacyValue').textContent = gameState.diplomacy;
    
    updateStatBar('economyBar', gameState.economy);
    updateStatBar('armyBar', gameState.army);
    updateStatBar('stabilityBar', gameState.stability);
    updateStatBar('diplomacyBar', gameState.diplomacy);
}

function updateStatBar(barId, value) {
    const bar = document.getElementById(barId);
    bar.style.width = value + '%';
    
    bar.classList.remove('warning', 'danger');
    if (value <= 15) {
        bar.classList.add('danger');
    } else if (value <= 35) {
        bar.classList.add('warning');
    }
}

function displayEvent(event) {
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventText').textContent = event.description;
    document.getElementById('eventContext').textContent = event.context;
    
    for (let i = 0; i < 3; i++) {
        const button = document.getElementById('choice' + (i + 1));
        const choice = event.choices[i];
        button.textContent = choice.text;
        button.onclick = function() { makeChoice(i, event); };
        button.disabled = false;
    }
}

function makeChoice(choiceIndex, event) {
    const choice = event.choices[choiceIndex];
    
    document.querySelectorAll('.choice-btn').forEach(function(btn) {
        btn.disabled = true;
    });
    
    applyEffects(gameState, choice.effects);
    
    setTimeout(function() {
        updateUI();
        
        if (checkGameOver(gameState)) {
            endGame();
        } else {
            const nextEvent = getRandomEvent(gameState);
            displayEvent(nextEvent);
        }
    }, 600);
}

function endGame() {
    gameState.isGameOver = true;
    
    const reason = getGameOverReason(gameState);
    
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('gameOverScreen').classList.add('active');
    
    document.getElementById('gameOverMessage').textContent = reason;
    
    const finalStatsDiv = document.getElementById('finalStats');
    finalStatsDiv.innerHTML = '<p><span>Последний год:</span> <span>' + gameState.year + '</span></p><p><span>Экономика:</span> <span>' + gameState.economy + '</span></p><p><span>Армия:</span> <span>' + gameState.army + '</span></p><p><span>Стабильность:</span> <span>' + gameState.stability + '</span></p><p><span>Дипломатия:</span> <span>' + gameState.diplomacy + '</span></p>';
}

function startNewGame() {
    gameState = {
        year: 1914,
        economy: 50,
        army: 50,
        stability: 50,
        diplomacy: 50,
        isGameOver: false,
        isGameStarted: true
    };
    
    document.getElementById('mainMenu').classList.remove('active');
    document.getElementById('gameScreen').style.display = 'flex';
    document.getElementById('gameOverScreen').classList.remove('active');
    
    updateUI();
    
    const firstEvent = getRandomEvent(gameState);
    displayEvent(firstEvent);
}

function restartGame() {
    document.getElementById('mainMenu').classList.add('active');
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('gameOverScreen').classList.remove('active');
    
    gameState = {
        year: 1914,
        economy: 50,
        army: 50,
        stability: 50,
        diplomacy: 50,
        isGameOver: false,
        isGameStarted: false
    };
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startBtn').addEventListener('click', startNewGame);
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    
    console.log('Игра загружена');
});
