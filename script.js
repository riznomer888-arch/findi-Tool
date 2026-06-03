// БАЗА ЗНАНИЙ (КАРТОЧКИ И ИНСТРУМЕНТЫ)
const osintDatabase = [
    { name: "OSINT Framework", description: "Легендарный мировой путеводитель по OSINT. Навигационная карта сотен специализированных сервисов.", category: "utils", tag: "каталог", url: "https://osintframework.com" },
    { name: "CyberChef", description: "Универсальный инструмент для шифрования, кодирования, декомпиляции и парсинга любых типов данных.", category: "utils", tag: "инструмент", url: "https://gchq.github.io/CyberChef" },
    { name: "Глаз Бога (Eye of God)", description: "СНГ бот для комплексного анализа данных по открытым источникам (телефоны, почты, авто).", category: "telegram", tag: "бот", url: "https://t.me/GlazBoga" },
    { name: "Shodan", description: "Поисковая система по сетевым устройствам, серверам, IoT инфраструктуре и открытым портам.", category: "cybersec", tag: "сканер", url: "https://www.shodan.io" },
    { name: "Have I Been Pwned", description: "Анализ компрометации учетных записей. Проверка утечек почты и телефонных номеров.", category: "leaks", tag: "утечки", url: "https://haveibeenpwned.com" },
    { name: "Epieos Email Analyzer", description: "Проверка профилей Google, привязанных календарей, карт и фото по адресу электронной почты.", category: "email", tag: "email", url: "https://epieos.com" },
    { name: "IP-API Detailed", description: "Профессиональный сканер геопозиции, провайдера, ASN и временной зоны целевого IP-адреса.", category: "ip", tag: "ip-geo", url: "https://ip-api.com" },
    { name: "IP Void", description: "Набор утилит для анализа IP: проверка на нахождение в черных списках (blacklist) и DNS-записи.", category: "ip", tag: "безопасность", url: "https://www.ipvoid.com" },
    { name: "Hunter.io", description: "Инструмент для поиска корпоративных адресов электронных почт, привязанных к доменам компаний.", category: "email", tag: "парсинг", url: "https://hunter.io" },
    { name: "Pimeyes", description: "Обратный поиск по лицам по всему индексируемому интернету для деанонимизации.", category: "cybersec", tag: "фото", url: "https://pimeyes.com" },
    { name: "GetContact Web", description: "Анализ телефонных тегов. Позволяет узнать, как номер записан в чужих контактах.", category: "phone", tag: "phone", url: "https://www.getcontact.com" },
    { name: "WhatsMyName", description: "Проверка существования и доступности определенного юзернейма на сотнях веб-платформ.", category: "username", tag: "поисковик", url: "https://whatsmyname.app" }
];

// Элементы DOM
const grid = document.getElementById('database-grid');
const mainSearch = document.getElementById('main-search-input');
const counter = document.getElementById('resource-counter');
const menuItems = document.querySelectorAll('.menu-item');
const categoryTitle = document.getElementById('category-title');
const scanBtn = document.getElementById('start-scan-btn');
const clearBtn = document.getElementById('clear-search-btn');
const linksOutput = document.getElementById('scan-links-output');

let currentCategory = 'all';

// --- ИНТЕЛЛЕКТУАЛЬНЫЙ АВТО-ПРОБИВ (НИК 100 ЛИНКОВ / IP / EMAIL) ---
scanBtn.addEventListener('click', () => {
    const query = mainSearch.value.trim();
    if (!query) {
        alert('Введите данные в строку поиска!');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    let targets = [];

    if (emailRegex.test(query)) {
        // ЕСЛИ ВВЕДЕН EMAIL (ЦЕЛЕВЫЕ ТОЧКИ)
        targets = [
            { name: "Epieos (Google-аккаунт)", url: `https://epieos.com/?q=${query}` },
            { name: "HaveIBeenPwned (Утечки)", url: `https://haveibeenpwned.com/account/${query}` },
            { name: "Hunter.io (Поиск домена)", url: `https://hunter.io/try/email-verifier/${query}` },
            { name: "IntelX (Глобальный архив)", url: `https://intelx.io/?s=${query}` },
            { name: "DeHashed (Слитые пароли)", url: `https://www.dehashed.com/search?query="${query}"` },
            { name: "DNSChecker Email Verify", url: `https://dnschecker.org/email-verify.php?email=${query}` }
        ];
    } else if (ipRegex.test(query)) {
        // ЕСЛИ ВВЕДЕН IP (ЦЕЛЕВЫЕ ТОЧКИ)
        targets = [
            { name: "IP-API (Геолокация)", url: `https://ip-api.com/#${query}` },
            { name: "Shodan (Открытые порты)", url: `https://www.shodan.io/host/${query}` },
            { name: "IPVoid (Репутация и Блэклисты)", url: `https://www.ipvoid.com/ip-blacklist/${query}` },
            { name: "Censys (Анализ хоста)", url: `https://search.censys.io/hosts/${query}` },
            { name: "Whois (Информация о владельце)", url: `https://www.whois.com/whois/${query}` },
            { name: "AbuseIPDB (Жалобы на хакеров)", url: `https://www.abuseipdb.com/check/${query}` }
        ];
    } else {
        // ЕСЛИ ВВЕДЕН НИКНЕЙМ — ПОЛНЫЙ ПАКЕТ ИЗ 100 САЙТОВ
        targets = [
            // Поисковики
            { name: "Google", url: `https://www.google.com/search?q="${query}"` },
            { name: "Яндекс", url: `https://yandex.ru/search/?text="${query}"` },
            { name: "DuckDuckGo", url: `https://duckduckgo.com/?q="${query}"` },
            { name: "Bing", url: `https://www.bing.com/search?q="${query}"` },
            { name: "Yahoo", url: `https://search.yahoo.com/search?p="${query}"` },
            { name: "Baidu", url: `https://www.baidu.com/s?wd=${query}` },
            { name: "AOL Search", url: `https://search.aol.com/aol/search?q=${query}` },
            { name: "Ask.com", url: `https://www.ask.com/web?q=${query}` },
            { name: "Qwant", url: `https://www.qwant.com/?q=${query}` },
            { name: "Ecosia", url: `https://www.ecosia.org/search?q=${query}` },
            // Соцсети и медиа
            { name: "ВКонтакте", url: `https://vk.com/${query}` },
            { name: "Telegram", url: `https://t.me/${query}` },
            { name: "TikTok", url: `https://www.tiktok.com/@${query}` },
            { name: "Reddit", url: `https://www.reddit.com/user/${query}` },
            { name: "X (Twitter)", url: `https://x.com/${query}` },
            { name: "Pinterest", url: `https://www.pinterest.com/${query}` },
            { name: "Instagram", url: `https://www.instagram.com/${query}` },
            { name: "YouTube", url: `https://www.youtube.com/@${query}` },
            { name: "Odnoklassniki", url: `https://ok.ru/${query}` },
            { name: "Habr", url: `https://habr.com/ru/users/${query}` },
            { name: "LiveJournal", url: `https://${query}.livejournal.com` },
            { name: "Tumblr", url: `https://${query}.tumblr.com` },
            { name: "Medium", url: `https://medium.com/@${query}` },
            { name: "Flickr", url: `https://www.flickr.com/photos/${query}` },
            { name: "Vimeo", url: `https://vimeo.com/${query}` },
            { name: "Twitch", url: `https://www.twitch.tv/${query}` },
            { name: "SoundCloud", url: `https://soundcloud.com/${query}` },
            { name: "Bandcamp", url: `https://bandcamp.com/${query}` },
            { name: "Patreon", url: `https://www.patreon.com/${query}` },
            { name: "DeviantArt", url: `https://www.deviantart.com/${query}` },
            // Гейминг
            { name: "Steam ID", url: `https://steamcommunity.com/id/${query}` },
            { name: "Steam Поиск", url: `https://steamcommunity.com/search/users/#text=${query}` },
            { name: "Faceit Finder", url: `https://faceitfinder.com/profile/${query}` },
            { name: "Tracker.gg", url: `https://tracker.gg/multitracker?usernames=${query}` },
            { name: "Op.gg", url: `https://www.op.gg/multisearch?usernames=${query}` },
            { name: "Chess.com", url: `https://www.chess.com/member/${query}` },
            { name: "Lichess", url: `https://lichess.org/@/${query}` },
            { name: "Minecraft (NameMC)", url: `https://namemc.com/search?q=${query}` },
            { name: "Roblox", url: `https://www.roblox.com/search/users?keyword=${query}` },
            { name: "PSNProfiles", url: `https://psnprofiles.com/?psnId=${query}` },
            { name: "Xbox Gamertag", url: `https://gamertag.download/user/${query}` },
            { name: "Apex Tracker", url: `https://apex.tracker.gg/apex/profile/pc/${query}` },
            { name: "Fortnite Tracker", url: `https://fortnitetracker.com/profile/all/${query}` },
            { name: "OSU! Performance", url: `https://osu.ppy.sh/users/${query}` },
            { name: "Exophase", url: `https://www.exophase.com/user/${query}` },
            { name: "Blizzard WoW", url: `https://worldofwarcraft.com/search?q=${query}` },
            { name: "PUBG Op.gg", url: `https://pubg.op.gg/user/${query}` },
            { name: "Riot Games ID", url: `https://skline.gg/search/${query}` },
            { name: "Speedrun.com", url: `https://www.speedrun.com/user/${query}` },
            { name: "Dotabuff", url: `https://www.dotabuff.com/search?q=${query}` },
            // ИТ и кодинг
            { name: "GitHub", url: `https://github.com/${query}` },
            { name: "GitLab", url: `https://gitlab.com/${query}` },
            { name: "Bitbucket", url: `https://bitbucket.org/${query}` },
            { name: "Docker Hub", url: `https://hub.docker.com/u/${query}` },
            { name: "StackOverflow", url: `https://stackoverflow.com/users/story/${query}` },
            { name: "CodePen", url: `https://codepen.io/${query}` },
            { name: "NPM Registry", url: `https://www.npmjs.com/~${query}` },
            { name: "PyPI", url: `https://pypi.org/user/${query}` },
            { name: "Kaggle", url: `https://www.kaggle.com/${query}` },
            { name: "HackerRank", url: `https://www.hackerrank.com/${query}` },
            { name: "LeetCode", url: `https://leetcode.com/${query}` },
            { name: "Repl.it", url: `https://replit.com/@${query}` },
            { name: "SourceForge", url: `https://sourceforge.net/u/${query}` },
            { name: "Codechef", url: `https://www.codechef.com/users/${query}` },
            { name: "Topcoder", url: `https://www.topcoder.com/members/${query}` },
            // Форумы и статьи
            { name: "Disqus", url: `https://disqus.com/by/${query}` },
            { name: "Quora", url: `https://www.quora.com/profile/${query}` },
            { name: "Pikabu", url: `https://pikabu.ru/@${query}` },
            { name: "DTF", url: `https://dtf.ru/u/${query}` },
            { name: "VC.ru", url: `https://vc.ru/u/${query}` },
            { name: "LiveInternet", url: `https://www.liveinternet.ru/users/${query}` },
            { name: "TJournal (Архив)", url: `https://tjournal.ru/u/${query}` },
            { name: "Livejournal Comm", url: `https://users.livejournal.com/${query}` },
            { name: "Foursquare", url: `https://foursquare.com/${query}` },
            { name: "SlideShare", url: `https://www.slideshare.net/${query}` },
            { name: "Scribd", url: `https://www.scribd.com/${query}` },
            { name: "Wattpad", url: `https://www.wattpad.com/user/${query}` },
            { name: "Goodreads", url: `https://www.goodreads.com/${query}` },
            { name: "Instructables", url: `https://www.instructables.com/member/${query}` },
            // Работа и фриланс
            { name: "Behance", url: `https://www.behance.net/${query}` },
            { name: "Dribbble", url: `https://dribbble.com/${query}` },
            { name: "ArtStation", url: `https://www.artstation.com/${query}` },
            { name: "Fiverr", url: `https://www.fiverr.com/${query}` },
            { name: "Freelancer", url: `https://www.freelancer.com/u/${query}` },
            { name: "Upwork", url: `https://www.upwork.com/freelancers/~${query}` },
            { name: "Linktree", url: `https://linktr.ee/${query}` },
            { name: "About.me", url: `https://about.me/${query}` },
            { name: "Crunchbase", url: `https://www.crunchbase.com/person/${query}` },
            { name: "AngelList", url: `https://wellfound.com/u/${query}` },
            // Специализированные OSINT валидаторы бренда
            { name: "Namechk", url: `https://namechk.com/` },
            { name: "Knowem", url: `https://knowem.com/checkusername.php?u=${query}` },
            { name: "Instant User Search", url: `https://instantusername.com/#${query}` },
            { name: "Keybase", url: `https://keybase.io/${query}` },
            { name: "DeHashed", url: `https://www.dehashed.com/search?query="${query}"` },
            { name: "LeakLookup", url: `https://leak-lookup.com/search?type=username&query=${query}` },
            { name: "IntelX", url: `https://intelx.io/?s=${query}` },
            { name: "BreachDirectory", url: `https://breachdirectory.org/?q=${query}` },
            { name: "OpenBugBounty", url: `https://www.openbugbounty.org/researcher/${query}` },
            { name: "Bugcrowd", url: `https://bugcrowd.com/${query}` },
            { name: "HackerOne", url: `https://hackerone.com/${query}` }
        ];
    }

    // Очистка вывода и отрисовка кнопок-ссылок на экране
    linksOutput.innerHTML = '';
    linksOutput.classList.remove('hidden');

    targets.forEach(target => {
        const linkElement = document.createElement('a');
        linkElement.href = target.url;
        linkElement.target = '_blank';
        linkElement.className = 'scan-link';
        linkElement.innerText = `↗ ${target.name}`;
        linksOutput.appendChild(linkElement);
    });

    // Автоматическое открытие вкладок в браузере
    targets.forEach(target => {
        window.open(target.url, '_blank');
    });
});

// Кнопка очистки
clearBtn.addEventListener('click', () => {
    mainSearch.value = '';
    linksOutput.innerHTML = '';
    linksOutput.classList.add('hidden');
    filterDatabase();
});

// --- ЛОГИКА ФИЛЬТРАЦИИ КАРТОЧЕК БАЗЫ ДАННЫХ ---
function renderCards(data) {
    grid.innerHTML = '';
    counter.innerText = `${data.length} ресурсов`;
    
    if (data.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center; padding: 20px; font-size: 12px;">Записей не обнаружено.</p>`;
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'osint-card';
        card.innerHTML = `
            <div class="card-top">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
            </div>
            <div class="card-bottom">
                <span class="tag">${item.tag}</span>
                <a href="${item.url}" target="_blank" class="visit-btn">Открыть</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterDatabase() {
    const searchText = mainSearch.value.toLowerCase();
    const filtered = osintDatabase.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchText) || 
                              item.description.toLowerCase().includes(searchText) ||
                              item.tag.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });
    renderCards(filtered);
}

// Управление кнопками бокового меню
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        menuItems.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.getAttribute('data-category');
        categoryTitle.innerText = e.target.innerText;
        filterDatabase();
    });
});

mainSearch.addEventListener('input', filterDatabase);

// Запуск системы
renderCards(osintDatabase);
