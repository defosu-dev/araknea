import {
    BookOpen,
    Lock,
    Wallet,
    Users,
    CalendarDays,
    Tag,
    Globe,
    Layers,
    Download,
    Search,
    Mail,
    Github,
} from "lucide-react";

const IconTelegram = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
    </svg>
);

const WebLogo = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle
            cx="14"
            cy="14"
            r="13"
            stroke="#d97706"
            strokeWidth="1"
            strokeOpacity="0.6"
        />
        <circle
            cx="14"
            cy="14"
            r="8"
            stroke="#d97706"
            strokeWidth="0.75"
            strokeOpacity="0.4"
        />
        <circle
            cx="14"
            cy="14"
            r="3.5"
            stroke="#d97706"
            strokeWidth="0.75"
            strokeOpacity="0.3"
        />
        <line
            x1="14"
            y1="1"
            x2="14"
            y2="27"
            stroke="#d97706"
            strokeWidth="0.75"
            strokeOpacity="0.35"
        />
        <line
            x1="1"
            y1="14"
            x2="27"
            y2="14"
            stroke="#d97706"
            strokeWidth="0.75"
            strokeOpacity="0.35"
        />
        <line
            x1="3.1"
            y1="3.1"
            x2="24.9"
            y2="24.9"
            stroke="#d97706"
            strokeWidth="0.75"
            strokeOpacity="0.35"
        />
        <line
            x1="24.9"
            y1="3.1"
            x2="3.1"
            y2="24.9"
            stroke="#d97706"
            strokeWidth="0.75"
            strokeOpacity="0.35"
        />
        <circle cx="14" cy="14" r="1.5" fill="#d97706" fillOpacity="0.8" />
    </svg>
);

const liteFeatures = [
    {
        icon: <BookOpen className="w-4 h-4" />,
        label: "Читалка замість каналу",
        desc: "Список глав, прогрес, закладки. Читачі завжди знають де зупинились.",
    },
    {
        icon: <Lock className="w-4 h-4" />,
        label: "Ранній доступ автоматично",
        desc: "Підключили Patreon або Boosty і підписники бачать закриті глави самі.",
    },
    {
        icon: <Wallet className="w-4 h-4" />,
        label: "Гроші залишаються вашими",
        desc: "Платформа не бере комісію. Patreon і Boosty повністю ваші.",
    },
    {
        icon: <Users className="w-4 h-4" />,
        label: "Ролі в команді",
        desc: "Перекладач, редактор, адмін — кожен бачить лише своє.",
    },
    {
        icon: <CalendarDays className="w-4 h-4" />,
        label: "Розклад виходу",
        desc: "Поставте дату і глава вийде сама. Без будильника о півночі.",
    },
    {
        icon: <Tag className="w-4 h-4" />,
        label: "Ваш бренд",
        desc: "Свій домен, свій бот. Читачі знають, чий це проект.",
    },
];

const platformFeatures = [
    {
        icon: <Search className="w-4 h-4" />,
        label: "Єдиний каталог",
        desc: "Читачі знаходять твори і бачать всі доступні переклади в одному місці.",
    },
    {
        icon: <Layers className="w-4 h-4" />,
        label: "Кілька перекладів",
        desc: "Різні команди, різні стилі і темп. Читач обирає той що підходить.",
    },
    {
        icon: <Globe className="w-4 h-4" />,
        label: "Мультимовний UI",
        desc: "Платформа говорить мовою читача. Контент може бути будь-якою мовою.",
    },
    {
        icon: <Lock className="w-4 h-4" />,
        label: "Єдиний акаунт",
        desc: "Прив'язав Patreon один раз і отримав доступ до контенту всіх команд.",
    },
    {
        icon: <Download className="w-4 h-4" />,
        label: "Офлайн читання",
        desc: "PWA з кешуванням. Глави читаються без інтернету.",
    },
    {
        icon: <Users className="w-4 h-4" />,
        label: "Discoverability",
        desc: "Команди знаходять нову аудиторію. Читачі знаходять нові твори.",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen text-zinc-300 p-4 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto border border-zinc-800">
                {/* ── Header ── */}
                <header className="grid grid-cols-2 md:grid-cols-3 border-b border-zinc-800">
                    <div className="col-span-1 p-6 md:p-8 border-r border-zinc-800 flex items-center gap-3">
                        <WebLogo />
                        <div>
                            <div className="text-base font-bold tracking-tighter text-white">
                                ARAKNEA
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-0.5">
                                Stories beyond chat.
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex col-span-1 items-center px-8 border-r border-zinc-800">
                        <p className="text-xs text-zinc-500 leading-5">
                            Платформа для команд перекладачів манґи, ранобе і
                            коміксів
                        </p>
                    </div>
                    <div className="col-span-1 p-6 md:p-8 flex flex-col items-end justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                                Pre-release
                            </span>
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-600 text-right mt-2">
                            2026
                        </div>
                    </div>
                </header>

                {/* ── Hero ── */}
                <section className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-800">
                    <div className="md:col-span-8 p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-zinc-800">
                        <h1 className="text-5xl lg:text-8xl font-medium text-white tracking-tighter mb-8 leading-[0.9]">
                            Не канал.
                            <br />
                            <span className="text-amber-500">Платформа.</span>
                        </h1>
                        <p className="text-base text-zinc-400 leading-8 max-w-xl">
                            Araknea — інфраструктура з відкритим кодом для
                            команд що перекладають манґу, ранобе і комікси.
                            Повноцінна читалка, автоматичний ранній доступ і
                            командна робота прямо у Telegram, без зміни звичок
                            вашої аудиторії.
                        </p>
                    </div>
                    <div className="md:col-span-4 p-8 md:p-10 flex flex-col gap-8">
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                                Для кого
                            </div>
                            <ul className="space-y-2">
                                {[
                                    "Команди перекладачів у Telegram",
                                    "Проекти з Patreon / Boosty підпискою",
                                    "Читачі манґи, ранобе, коміксів",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2 text-sm text-zinc-500"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-amber-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                                Проблема
                            </div>
                            <ul className="space-y-2">
                                {[
                                    "Глави тонуть у стрічці каналу",
                                    "Ранній доступ перевіряється вручну",
                                    "Немає навігації і прогресу читання",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2 text-sm text-zinc-500"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ── Araknea Lite ── */}
                <section className="border-b border-zinc-800">
                    <div className="flex items-center gap-4 px-8 md:px-12 py-4 border-b border-zinc-800">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                            Araknea Lite
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                            Single-tenant · Для вашої команди
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-800">
                        <div className="md:col-span-5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800">
                            <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 leading-snug">
                                Платформа під брендом вашої команди
                            </h2>
                            <p className="text-sm text-zinc-500 leading-7">
                                Окремий деплой для кожної команди. Ваша назва,
                                ваш Telegram-бот, ваш домен. Читачі відкривають
                                контент через бота як завжди, але замість каналу
                                отримують повноцінну читалку.
                            </p>
                        </div>
                        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {liteFeatures.map((f, i) => (
                                <div
                                    key={i}
                                    className="p-6 border-b border-r border-zinc-800 last:border-r-0 hover:bg-zinc-900/60 transition-colors group cursor-default"
                                >
                                    <div className="text-amber-600/70 group-hover:text-amber-500 transition-colors mb-4">
                                        {f.icon}
                                    </div>
                                    <p className="text-sm font-medium text-zinc-200 mb-2">
                                        {f.label}
                                    </p>
                                    <p className="text-xs leading-5 text-zinc-400">
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Araknea Platform ── */}
                <section className="border-b border-zinc-800">
                    <div className="flex items-center gap-4 px-8 md:px-12 py-4 border-b border-zinc-800">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            Araknea Platform
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                            Multi-tenant · Відкрита екосистема
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-800">
                        <div className="md:col-span-5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800">
                            <h2 className="text-2xl sm:text-3xl font-light text-white mb-4 leading-snug">
                                Єдиний каталог для читачів і команд
                            </h2>
                            <p className="text-sm text-zinc-500 leading-7">
                                Централізована платформа де читачі знаходять
                                твори і обирають між перекладами від різних
                                команд. Будується на тій самій кодовій базі що й
                                Lite, без переписування.
                            </p>
                        </div>
                        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {platformFeatures.map((f, i) => (
                                <div
                                    key={i}
                                    className="p-6 border-b border-r border-zinc-800 last:border-r-0 hover:bg-zinc-900/60 transition-colors group cursor-default"
                                >
                                    <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors mb-4">
                                        {f.icon}
                                    </div>
                                    <p className="text-sm font-medium text-zinc-200 mb-2">
                                        {f.label}
                                    </p>
                                    <p className="text-xs leading-5 text-zinc-400">
                                        {f.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Stack ── */}
                <section className="grid grid-cols-2 sm:grid-cols-4 border-b border-zinc-800">
                    {[
                        { label: "Frontend", val: "Next.js 15" },
                        { label: "Database", val: "PostgreSQL" },
                        { label: "Auth", val: "NextAuth.js" },
                        { label: "License", val: "Open Source" },
                    ].map((s, i) => (
                        <div
                            key={s.label}
                            className={`p-6 md:p-8 ${i < 3 ? "border-r border-zinc-800" : ""}`}
                        >
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                                {s.label}
                            </div>
                            <div className="text-sm font-mono text-zinc-400">
                                {s.val}
                            </div>
                        </div>
                    ))}
                </section>

                {/* ── Footer ── */}
                <footer>
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                        <div className="p-6 md:p-8 sm:border-r border-b sm:border-b-0 border-zinc-800">
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">
                                Розробник
                            </div>
                            <div className="text-sm text-zinc-300 font-medium">
                                MimiruLabs
                            </div>
                            <div className="text-xs text-zinc-600 mt-1">
                                defosu-dev
                            </div>
                        </div>
                        <div className="p-6 md:p-8 sm:border-r border-b sm:border-b-0 border-zinc-800">
                            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">
                                Контакти
                            </div>
                            <div className="space-y-3">
                                <a
                                    href="mailto:mimirulabs@gmail.com"
                                    className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white transition-colors group"
                                >
                                    <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </span>
                                    mimirulabs@gmail.com
                                </a>
                                <a
                                    href="https://t.me/morrikgan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white transition-colors group"
                                >
                                    <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                        <IconTelegram />
                                    </span>
                                    @morrikgan
                                </a>
                                <a
                                    href="https://github.com/defosu-dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-sm text-zinc-400 hover:text-white transition-colors group"
                                >
                                    <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                        <Github className="w-4 h-4" />
                                    </span>
                                    defosu-dev
                                </a>
                            </div>
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-between gap-4">
                            <span className="text-xs italic text-zinc-500">
                                Araknea — stories beyond chat.
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                                © 2026 MimiruLabs
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
