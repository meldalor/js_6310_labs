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
                --dark-accent: #2d56ac;
                --dark-link: #64b5f6;
                --dark-border: #333333;
            }

            html.dark-mode {
                background-color: var(--dark-bg-primary) !important;
                color: var(--dark-text-primary) !important;
            }
            .dark-mode #page_wrapper {
                background-color: var(--dark-bg-secondary) !important;
                color: var(--dark-text-primary) !important;
            }

            /* Header / Menu*/
            .dark-mode header {
                background-color: var(--dark-bg-secondary) !important;
            }
            .dark-mode .menu {
                background-color: var(--dark-bg-secondary) !important;
            }
            .dark-mode .menu-list {
                background-color: var(--dark-accent);
            }
            .dark-mode .menu-list a {
                color: var(--dark-text-primary) !important;
            }
            .dark-mode .menu-list a:hover {
                background-color: var(--dark-bg-tertiary) !important;
                color: var(--dark-accent) !important;
            }

            /* сontent boxes */
            .dark-mode .main_slider_holder,
            .dark-mode .news_box,
            .dark-mode .events_box,
            .dark-mode .institutes_slider_box,
            .dark-mode .research_box,
            .dark-mode .welcome_box {
                background: var(--dark-bg-secondary) !important;
            }

            .dark-mode .research_box .tab_items {
                background: transparent !important;
            }
            .dark-mode .institutes_slider_box {
                background: var(--dark-bg-tertiary) !important;
            }
            .dark-mode .inst-slide {
                background-color: var(--dark-border);
            }
            .dark-mode .news_box.samples .item .pic:before,
            .dark-mode .box_items .item .desc {
                border-color: var(--dark-border) !important;
            }
            .dark-mode .box_items .item:hover .desc {
                border-color: transparent !important;
            }
            .dark-mode .welcome_box .list .item .desc,
            .dark-mode .welcome_box .list .item:hover .desc {
                border-color: var(--dark-border) !important;
            }
            .dark-mode .events_box .list .item .desc:before {
                border-color: var(--dark-border);
            }
            .dark-mode .events_box .list .item:hover .desc:before {
                border-color: var(--dark-accent) !important;
            }
            .dark-mode .box_items .item:hover,
            .dark-mode .welcome_box .list .item:hover {
                border-color: var(--dark-accent) !important;
            }

            .dark-mode .events_items .item{
                background-color: transparent !important;
            }

            /* Descriptions & Text */
            .dark-mode .desc {
                background-color: inherit !important;
            }
            .dark-mode .tabs .desc {
                background: rgba(0, 0, 0, 0.4) !important;
            }
            .dark-mode .desc p,
            .dark-mode h1,
            .dark-mode h2,
            .dark-mode h3 {
                color: var(--dark-text-primary) !important;
            }
            .dark-mode .kai_page p {
                color: var(--dark-text-secondary) !important;
            }

            .dark-mode .events_items .item .desc .date, .dark-mode .events_items .item .desc .time {
                color: var(--dark-text-primary) !important;
            }

            .dark-mode .alert {
                background-color: var(--dark-border) !important;
                border-color: var(--dark-border) !important;
                text-shadow: none !important;
            }
            

            /* Links */
            .dark-mode a {
                color: var(--dark-link) !important;
            }
            .dark-mode a:hover {
                color: white !important;
            }

            /* Buttons */
            .dark-mode .kai-btn,
            .dark-mode .kai-btn-block {
                background-color: var(--dark-bg-secondary) !important;
                color: var(--dark-accent) !important;
                border-color: var(--dark-accent) !important;
            }
            .dark-mode .kai-btn:hover,
            .dark-mode .kai-btn-block:hover {
                background-color: var(--dark-accent) !important;
                color: white !important;
            }

            .dark-mode #btns .slick-disabled {
                background-color: transparent !important;
                color: var(--dark-border) !important;
                border-color: var(--dark-border) !important;
            }
            
            .dark-mode .research_box .tab_items .nav a {
                background-color: transparent;
                border-color: var(--dark-accent);
            }
            .dark-mode .research_box .tab_items .nav a.active {
                background-color: var(--dark-accent);
            }

            .dark-mode .research_box .tab_items .nav a:hover {
                background-color: var(--dark-accent) !important;
            }

            /* Footer */
            .dark-mode footer {
                border-top: 1px solid var(--dark-border) !important;
            }

            /* Forms */
            .dark-mode .search_text {
                background-color: var(--dark-bg-tertiary) !important;
                color: var(--dark-text-primary) !important;
                border: 1px solid var(--dark-border) !important;
            }
            .dark-mode input,
            .dark-mode select,
            .dark-mode textarea {
                background-color: var(--dark-bg-tertiary) !important;
                color: var(--dark-text-primary) !important;
                border: 1px solid var(--dark-border) !important;
            }

            /* Slick Carousel */
            .dark-mode .slick-dots li button {
                background-color: var(--dark-text-secondary) !important;
            }
            .dark-mode .slick-dots .slick-active button {
                background-color: var(--dark-accent) !important;
            }

            /* AUI Portlet & Breadcrumb */
            .dark-mode .portlet {
                background-color: transparent !important;
            }
            .dark-mode .portlet {
                background: none !important;
            }
            .dark-mode header .menu ul li .sub,
            .dark-mode header .menu .menu-list > li:hover > a,
            .dark-mode header .menu .menu-list > li.open {
                background: var(--dark-bg-tertiary) !important; 
            }
            .dark-mode .breadcrumb {
                background-color: var(--dark-bg-tertiary);
            }

            .dark-mode .portlet-journal-content .portlet-title {
                background-color: transparent !important;
            }

            /* Layouts */
            .dark-mode .layouts li {
                background-color: transparent !important;
            }
            .dark-mode .layouts li.selected,
            .layouts li.selected li {
            }
            .dark-mode .layouts li.selected li {
                border-color: var(--dark-bg-tertiary);
            }
            .dark-mode .layouts > li > a:hover,
            .dark-mode .layouts > li > a:focus {
                background-color: var(--dark-bg-tertiary);
            }
            .layouts.level-1 > li.selected,
            .layouts.all-levels > li.selected {
                border: none !important;
            }

            .dark-mode .table-striped tbody>tr:nth-child(odd)>td, .dark-mode .table-striped tbody>tr:nth-child(odd)>th,
            .dark-mode .table td, .dark-mode .table thead th {
                background-color: var(--dark-bg-tertiary) !important;
                border-color: var(--dark-border);
            }

            .dark-mode .table {
                border-color: var(--dark-border);
            }
        `; 
        
        // Проверяем, не добавлены ли уже стили
        if (!document.getElementById('dark-mode-styles')) {     
            const styleSheet = document.createElement('style');
            styleSheet.id = 'dark-mode-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('kai-dark-mode', 'enabled');
        updateButtonState(true);
    }
    
    // Функция отключения темной темы
    function removeDarkMode() {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('kai-dark-mode', 'disabled');
        updateButtonState(false);
    }
    
    // Функция переключения темы
    function toggleDarkMode() {
        if (document.documentElement.classList.contains('dark-mode')) {
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
        button.textContent = document.documentElement.classList.contains('dark-mode') ? '☀️' : '🌙';
        button.title = document.documentElement.classList.contains('dark-mode') ? 'Светлый режим' : 'Темный режим';
        
        Object.assign(button.style, {
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: document.documentElement.classList.contains('dark-mode') ? '#2a2a2a' : '#4285f4',
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
        
        //быстрофикс для авторизованных пользователей
        const elements = document.querySelectorAll('span');
        elements.forEach(element => {
            if (element.textContent.includes('Отображение сетевого контента')) {
            element.style.display = 'none';
    }
  });       
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