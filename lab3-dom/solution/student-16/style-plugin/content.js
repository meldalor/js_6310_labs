'use strict'

function initDarkMode() {
    // Проверяем сохраненное состояние темы
    const savedTheme = localStorage.getItem('kai-dark-mode');
    if (savedTheme === 'enabled') {
        applyDarkMode();
    }

    // Функция применения темной темы
    function applyDarkMode() {
        const styles = `
            :root {
                --dark-bg-primary: #121212;
                --dark-bg-secondary: #1e1e1e;
                --dark-bg-tertiary: #2a2a2a;
                --dark-text-primary: #e0e0e0;
                --dark-text-secondary: #b0b0b0;
                --dark-accent: #4a7c7e;
                --dark-link: #64b5f6;
                --dark-border: #333333;
            }
            
            body.dark-mode {
                background-color: var(--dark-bg-primary) !important;
                color: var(--dark-text-primary) !important;
            }
            
            .dark-mode #page_wrapper {
                background-color: var(--dark-bg-primary) !important;
                color: var(--dark-text-primary) !important;
            }
            
            .dark-mode header {
                background-color: var(--dark-bg-secondary) !important;
                border-bottom: 1px solid var(--dark-border) !important;
            }
            
            .dark-mode .menu {
                background-color: var(--dark-bg-secondary) !important;
            }
            
            .dark-mode .menu-list a {
                color: var(--dark-text-primary) !important;
            }
            
            .dark-mode .menu-list a:hover {
                background-color: var(--dark-bg-tertiary) !important;
                color: var(--dark-accent) !important;
            }
            
            .dark-mode .main_slider_holder,
            .dark-mode .news_box,
            .dark-mode .events_box,
            .dark-mode .institutes_slider_box,
            .dark-mode .research_box,
            .dark-mode .welcome_box {
                background: var(--dark-bg-secondary) !important;
            }
            
            .dark-mode .item {
                background-color: var(--dark-bg-tertiary) !important;
                border: 1px solid var(--dark-border) !important;
            }
            
            .dark-mode .item:hover {
                background-color: #353535 !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
            }
            
            .dark-mode .desc p,
            .dark-mode h1,
            .dark-mode h2,
            .dark-mode h3 {
                color: var(--dark-text-primary) !important;
            }
            
            .dark-mode a {
                color: var(--dark-link) !important;
            }
            
            .dark-mode a:hover {
                color: var(--dark-accent) !important;
            }
            
            .dark-mode .kai-btn,
            .dark-mode .kai-btn-block {
                background-color: var(--dark-accent) !important;
                color: white !important;
                border: none !important;
            }
            
            .dark-mode .kai-btn:hover,
            .dark-mode .kai-btn-block:hover {
                background-color: #5a8c8e !important;
            }
            
            .dark-mode footer {
                background-color: var(--dark-bg-secondary) !important;
                border-top: 1px solid var(--dark-border) !important;
            }
            
            .dark-mode .search_text {
                background-color: var(--dark-bg-tertiary) !important;
                color: var(--dark-text-primary) !important;
                border: 1px solid var(--dark-border) !important;
            }
            
            .dark-mode .slick-dots li button {
                background-color: var(--dark-text-secondary) !important;
            }
            
            .dark-mode .slick-dots .slick-active button {
                background-color: var(--dark-accent) !important;
            }
            
            .dark-mode input,
            .dark-mode select,
            .dark-mode textarea {
                background-color: var(--dark-bg-tertiary) !important;
                color: var(--dark-text-primary) !important;
                border: 1px solid var(--dark-border) !important;
            }
            
            .dark-mode .portlet-content {
                background-color: transparent !important;
            }
            
            .dark-mode img {
                opacity: 0.9;
            }
            
            .dark-mode img:hover {
                opacity: 1;
            }
        `;
        
        // Проверяем, не добавлены ли уже стили
        if (!document.getElementById('dark-mode-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'dark-mode-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.classList.add('dark-mode');
        localStorage.setItem('kai-dark-mode', 'enabled');
        updateButtonState(true);
    }
    
    // Функция отключения темной темы
    function removeDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('kai-dark-mode', 'disabled');
        updateButtonState(false);
    }
    
    // Функция переключения темы
    function toggleDarkMode() {
        if (document.body.classList.contains('dark-mode')) {
            removeDarkMode();
        } else {
            applyDarkMode();
        }
    }
    
    // Обновление состояния кнопки
    function updateButtonState(isDark) {
        const button = document.getElementById('dark-mode-toggle-btn');
        if (button) {
            button.textContent = isDark ? '☀️' : '🌙';
            button.title = isDark ? 'Светлый режим' : 'Темный режим';
            button.style.backgroundColor = isDark ? '#2a2a2a' : '#4285f4';
        }
    }
    
    // Создание кнопки переключения
    function createToggleButton() {
        if (document.getElementById('dark-mode-toggle-btn')) {
            return;
        }
        
        const buttonContainer = document.querySelector('.box_links');
        if (!buttonContainer) {
            setTimeout(createToggleButton, 1000);
            return;
        }
        
        const button = document.createElement('div');
        button.id = 'dark-mode-toggle-btn';
        button.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        button.title = document.body.classList.contains('dark-mode') ? 'Светлый режим' : 'Темный режим';
        
        Object.assign(button.style, {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: document.body.classList.contains('dark-mode') ? '#2a2a2a' : '#4285f4',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            margin: '0 0 0 10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            float: 'left',
            transition: 'all 0.3s ease'
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('click', toggleDarkMode);
        
        buttonContainer.appendChild(button);
    }
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createToggleButton);
    } else {
        createToggleButton();
    }
}

// Запуск расширения
initDarkMode();