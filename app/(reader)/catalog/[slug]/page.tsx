"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
    Star,
    Globe,
    Bookmark,
    BookmarkCheck,
    Lock,
    ChevronDown,
    ChevronUp,
    Play,
    Check,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
    Clock,
    BookOpen,
    Eye,
    Calendar,
    Users,
    ArrowLeft,
    Search,
    X,
    List,
} from "lucide-react";
import { WebLogo } from "@/components/web-logo";

const mockWork = {
    name: "Solo Leveling — A Very Long Title That Might Wrap to Multiple Lines",
    slug: "solo-leveling",
    altNames: [
        "나 혼자만 레벨업",
        "Only I Level Up",
        "I Alone Level Up",
        "Ore Dake Level Up na Ken",
    ],
    genres: ["Action", "Fantasy", "Adventure"],
    tags: ["Dungeon", "Hunter", "System", "Overpowered MC"],
    description:
        "In a world where hunters battle deadly monsters to protect humanity, Sung Jin-Woo, the weakest hunter, discovers a mysterious system that grants him unlimited growth. Forced to fight in the most dangerous dungeons, he slowly rises from the bottom, unlocking abilities no one else possesses. A gripping story of power, sacrifice, and the will to survive.",
    rating: 4.8,
    views: 125000,
    firstChapterDate: "Jan 2024",
    totalChaptersOriginal: 180,
    lastGlobalUpdate: "3 days ago",
    originalStatus: "Completed",
    translations: [
        { id: 1, name: "Team A", lang: "EN", chapters: 180, status: "Ongoing" },
        {
            id: 2,
            name: "Team B",
            lang: "EN",
            chapters: 120,
            status: "Completed",
        },
        { id: 3, name: "Team C", lang: "UA", chapters: 45, status: "Ongoing" },
        { id: 4, name: "Team D", lang: "RU", chapters: 92, status: "Hiatus" },
        { id: 5, name: "Team E", lang: "DE", chapters: 30, status: "Dropped" },
        { id: 6, name: "Team F", lang: "FR", chapters: 67, status: "Ongoing" },
        { id: 7, name: "Team G", lang: "ES", chapters: 12, status: "Ongoing" },
        { id: 8, name: "Team H", lang: "IT", chapters: 8, status: "Hiatus" },
    ],
};

const PAGE_SIZE = 10;

const makeChapters = (translationId: number, totalChapters: number) =>
    Array.from({ length: totalChapters }).map((_, i) => {
        const num = totalChapters - i;
        return {
            id: `${translationId}-${num}`,
            title: `Chapter ${num}`,
            date:
                i === 0
                    ? "Today"
                    : i < 3
                      ? `${i + 1} days ago`
                      : `${Math.floor(i * 1.5)} days ago`,
            access: i < 3 ? "early" : i < 6 ? "scheduled" : "free",
            number: num,
        };
    });

const AccessBadge = ({ access }: { access: string }) => {
    if (access === "early")
        return (
            <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-amber-500/90 border border-amber-500/25 px-2 py-0.5">
                <Lock className="w-2.5 h-2.5" /> Early
            </span>
        );
    if (access === "scheduled")
        return (
            <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 border border-zinc-700/50 px-2 py-0.5">
                <Clock className="w-2.5 h-2.5" /> Scheduled
            </span>
        );
    return null;
};

const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
        Ongoing: "text-amber-400 border-amber-400/30",
        Completed: "text-green-500 border-green-500/30",
        Hiatus: "text-orange-500 border-orange-500/30",
        Dropped: "text-red-500 border-red-500/30",
    };
    return (
        <span
            className={`text-[9px] font-mono uppercase border px-1.5 py-0.5 ${colors[status] || "text-zinc-500 border-zinc-700"}`}
        >
            {status}
        </span>
    );
};

export default function TitlePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const [translation, setTranslation] = useState(mockWork.translations[0]);
    const [order, setOrder] = useState<"desc" | "asc">("desc");
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [page, setPage] = useState(1);
    const [lastRead, setLastRead] = useState<number | null>(180);
    const [readChapters, setReadChapters] = useState<number[]>([180, 179, 178]);
    const [activeTab, setActiveTab] = useState<"chapters" | "comments">(
        "chapters",
    );
    const [jump, setJump] = useState("");
    const [bookmarked, setBookmarked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const allChapters = useMemo(() => {
        return makeChapters(translation.id, translation.chapters).sort(
            (a, b) =>
                order === "desc" ? b.number - a.number : a.number - b.number,
        );
    }, [translation, order]);

    const totalPages = Math.ceil(allChapters.length / PAGE_SIZE);
    const chapters = allChapters.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE,
    );

    const handleJump = () => {
        const num = parseInt(jump);
        if (!num) return;
        const index = allChapters.findIndex((c) => c.number === num);
        if (index !== -1) {
            setPage(Math.floor(index / PAGE_SIZE) + 1);
            setJump("");
        }
    };

    const markRead = (chNum: number) => {
        setLastRead(chNum);
        setReadChapters((prev) => [...new Set([...prev, chNum])]);
    };

    const filteredTranslations = useMemo(() => {
        if (!searchQuery) return mockWork.translations;
        const q = searchQuery.toLowerCase();
        return mockWork.translations.filter(
            (t) =>
                t.name.toLowerCase().includes(q) ||
                t.lang.toLowerCase().includes(q),
        );
    }, [searchQuery]);

    const selectTranslation = (t: (typeof mockWork.translations)[0]) => {
        setTranslation(t);
        setPage(1);
        const newLastRead = t.chapters;
        setLastRead(newLastRead);
        setReadChapters([]);
        setIsModalOpen(false);
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen text-zinc-300 p-4 md:p-10 font-sans">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #18181b;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #52525b;
                }
                .modal-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .modal-scrollbar::-webkit-scrollbar-track {
                    background: #18181b;
                }
                .modal-scrollbar::-webkit-scrollbar-thumb {
                    background: #3f3f46;
                    border-radius: 4px;
                }
            `}</style>

            <div className="max-w-6xl mx-auto border border-zinc-800">
                {/* Header з Breadcrumb */}
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
                        <div className="flex items-center gap-2 text-xs">
                            <button
                                onClick={() => router.push("/catalog")}
                                className="text-zinc-500 hover:text-amber-400 transition-colors flex items-center gap-1"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                Catalog
                            </button>
                            <span className="text-zinc-700">/</span>
                            <span className="text-zinc-300 truncate max-w-50">
                                {mockWork.name.length > 30
                                    ? mockWork.name.slice(0, 27) + "..."
                                    : mockWork.name}
                            </span>
                        </div>
                    </div>
                    <div className="col-span-1 p-6 md:p-8 flex flex-col items-end justify-between">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                                Pre-release
                            </span>
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-zinc-600 text-right mt-2">
                            Catalog
                        </div>
                    </div>
                </header>

                {/* Main Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 border-b border-zinc-800">
                    {/* Left column */}
                    <div className="md:col-span-4 p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col gap-4 h-full">
                        <div className="w-full aspect-2/3 bg-linear-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col items-center justify-center gap-3 text-zinc-600">
                            <BookOpen className="w-12 h-12 opacity-30" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-700">
                                No cover
                            </span>
                        </div>
                        <button
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest px-3 py-2 border transition-colors cursor-pointer ${
                                bookmarked
                                    ? "border-amber-500/50 text-amber-500 bg-amber-500/10"
                                    : "border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-500"
                            }`}
                        >
                            {bookmarked ? (
                                <BookmarkCheck className="w-3.5 h-3.5" />
                            ) : (
                                <Bookmark className="w-3.5 h-3.5" />
                            )}
                            {bookmarked ? "Saved" : "Save"}
                        </button>
                        <div className="mt-2 pt-4 border-t border-zinc-800/50 space-y-3">
                            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                                <Eye className="w-3 h-3" />
                                <span>
                                    {new Intl.NumberFormat("en-US").format(
                                        mockWork.views,
                                    )}{" "}
                                    views
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                                <Calendar className="w-3 h-3" />
                                <span>
                                    Started: {mockWork.firstChapterDate}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                                <Users className="w-3 h-3" />
                                <span>Active team: {translation.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="md:col-span-8 flex flex-col">
                        <div className="p-6 md:p-8 border-b border-zinc-800">
                            <h1 className="text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight wrap-break-words whitespace-normal">
                                {mockWork.name}
                            </h1>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-zinc-800">
                            {[
                                {
                                    label: "Rating",
                                    content: (
                                        <div className="flex items-center gap-1.5 text-white text-sm">
                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            {mockWork.rating}
                                        </div>
                                    ),
                                },
                                {
                                    label: "Original",
                                    content: (
                                        <span className="text-sm font-mono text-green-500">
                                            {mockWork.originalStatus}
                                        </span>
                                    ),
                                },
                                {
                                    label: "Total chapters",
                                    content: (
                                        <span className="text-sm font-mono text-white">
                                            {mockWork.totalChaptersOriginal}
                                        </span>
                                    ),
                                },
                                {
                                    label: "Last update",
                                    content: (
                                        <span className="text-sm font-mono text-zinc-300">
                                            {mockWork.lastGlobalUpdate}
                                        </span>
                                    ),
                                },
                            ].map((m, i) => (
                                <div
                                    key={m.label}
                                    className={`p-4 md:p-5 ${i < 3 ? "border-r border-zinc-800" : ""}`}
                                >
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">
                                        {m.label}
                                    </div>
                                    {m.content}
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="p-6 md:p-8 border-b border-zinc-800">
                            <p className="text-sm text-zinc-400 leading-7">
                                {showFullDesc
                                    ? mockWork.description
                                    : mockWork.description.slice(0, 220) +
                                      "..."}
                            </p>
                            <button
                                onClick={() => setShowFullDesc(!showFullDesc)}
                                className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-amber-500/80 hover:text-amber-400 mt-3 transition-colors cursor-pointer"
                            >
                                {showFullDesc ? (
                                    <>
                                        <ChevronUp className="w-3 h-3" /> Show
                                        less
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-3 h-3" /> Read
                                        more
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Tags + Alt names */}
                        <div className="p-6 md:p-8 flex flex-col gap-4">
                            <div>
                                <span className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-600">
                                    Genres ({mockWork.genres.length})
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {mockWork.genres.map((g) => (
                                        <span
                                            key={g}
                                            className="text-[10px] font-mono uppercase tracking-wider border border-zinc-700 px-2 py-0.5 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer"
                                        >
                                            {g}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-600">
                                    Tags ({mockWork.tags.length})
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {mockWork.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono uppercase tracking-wider border border-zinc-800 px-2 py-0.5 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors cursor-pointer"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <span className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-600">
                                    Alternative names (
                                    {mockWork.altNames.length})
                                </span>
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {mockWork.altNames.map((n) => (
                                        <button
                                            key={n}
                                            onClick={() =>
                                                navigator.clipboard.writeText(n)
                                            }
                                            title="Copy"
                                            className="text-[11px] border border-zinc-800 px-2 py-0.5 text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-zinc-800">
                    {[
                        { key: "chapters", label: "Chapters" },
                        { key: "comments", label: "Comments" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() =>
                                setActiveTab(tab.key as "chapters" | "comments")
                            }
                            className={`px-6 py-3.5 text-xs font-mono uppercase tracking-widest cursor-pointer transition-colors ${
                                activeTab === tab.key
                                    ? "text-white border-b-2 border-amber-500 -mb-px"
                                    : "text-zinc-600 hover:text-zinc-400"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === "chapters" && (
                    <>
                        {lastRead && (
                            <div className="px-6 md:px-8 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-amber-500/5 border-l-2 border-l-amber-500/60">
                                <div className="flex items-center gap-3">
                                    <Play className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    <span className="text-xs text-zinc-400">
                                        Continue ·{" "}
                                        <span className="text-zinc-300">
                                            {translation.name}
                                        </span>{" "}
                                        · Chapter {lastRead}
                                    </span>
                                </div>
                                <button
                                    onClick={() =>
                                        router.push(`/read/${slug}/${lastRead}`)
                                    }
                                    className="text-xs font-mono uppercase tracking-widest text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                                >
                                    Read →
                                </button>
                            </div>
                        )}

                        {/* Controls: Translation selector + jump/sort */}
                        <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 px-6 md:px-8 py-4 flex flex-col gap-3">
                            <div className="overflow-x-auto pb-2 -mb-2 custom-scrollbar">
                                <div className="flex gap-2 min-w-max">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                                    >
                                        <List className="w-3 h-3" />
                                        All · {mockWork.translations.length}
                                    </button>
                                    {mockWork.translations
                                        .slice(0, 6)
                                        .map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() => {
                                                    setTranslation(t);
                                                    setPage(1);
                                                    setLastRead(t.chapters);
                                                    setReadChapters([]);
                                                }}
                                                className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider border transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                                                    translation.id === t.id
                                                        ? "border-amber-500/50 text-amber-500 bg-amber-500/8"
                                                        : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                                                }`}
                                            >
                                                {t.name} · {t.lang} ·{" "}
                                                {t.chapters} ch
                                                <StatusBadge
                                                    status={t.status}
                                                />
                                            </button>
                                        ))}
                                    {mockWork.translations.length > 6 && (
                                        <span className="text-[10px] text-zinc-600 self-center">
                                            +{mockWork.translations.length - 6}{" "}
                                            more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 mt-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        value={jump}
                                        onChange={(e) =>
                                            setJump(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" && handleJump()
                                        }
                                        placeholder="Ch #"
                                        className="w-20 px-2.5 py-1.5 text-xs font-mono bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                                    />
                                    <button
                                        onClick={handleJump}
                                        className="text-[11px] font-mono uppercase tracking-wider border border-zinc-800 px-3 py-1.5 text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
                                    >
                                        Go
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        setOrder(
                                            order === "desc" ? "asc" : "desc",
                                        );
                                        setPage(1);
                                    }}
                                    className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider border border-zinc-800 px-3 py-1.5 text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer"
                                >
                                    {order === "desc" ? (
                                        <>
                                            <ChevronDown className="w-3 h-3" />{" "}
                                            Newest
                                        </>
                                    ) : (
                                        <>
                                            <ChevronUp className="w-3 h-3" />{" "}
                                            Oldest
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Chapter list */}
                        <div className="divide-y divide-zinc-800/70">
                            {chapters.map((ch) => {
                                const isCurrent = ch.number === lastRead;
                                const isRead = readChapters.includes(ch.number);
                                return (
                                    <div
                                        key={ch.id}
                                        onClick={() =>
                                            router.push(
                                                `/read/${slug}/${ch.number}`,
                                            )
                                        }
                                        className={`px-6 md:px-8 py-4 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                                            isCurrent
                                                ? "bg-zinc-900/50 border-l-2 border-l-amber-500/50"
                                                : "hover:bg-zinc-900/30 border-l-2 border-l-transparent"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    markRead(ch.number);
                                                }}
                                                className="w-5 h-5 flex items-center justify-center shrink-0 cursor-pointer"
                                            >
                                                {isCurrent ? (
                                                    <Play className="w-3 h-3 text-amber-500 fill-amber-500" />
                                                ) : isRead ? (
                                                    <Check className="w-3 h-3 text-zinc-600" />
                                                ) : (
                                                    <div className="w-2 h-2 border border-zinc-700 rounded-full" />
                                                )}
                                            </button>
                                            <div className="min-w-0">
                                                <p
                                                    className={`text-sm truncate ${isRead && !isCurrent ? "text-zinc-600" : "text-zinc-200"}`}
                                                >
                                                    {ch.title}
                                                </p>
                                                <p className="text-[11px] font-mono text-zinc-600 mt-0.5">
                                                    {ch.date}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            <AccessBadge access={ch.access} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-zinc-800">
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setPage(1)}
                                    disabled={page === 1}
                                    className="p-1.5 text-zinc-600 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronsLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() =>
                                        setPage(Math.max(1, page - 1))
                                    }
                                    disabled={page === 1}
                                    className="p-1.5 text-zinc-600 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-[11px] font-mono text-zinc-500">
                                {page} / {totalPages}
                            </span>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() =>
                                        setPage(Math.min(totalPages, page + 1))
                                    }
                                    disabled={page === totalPages}
                                    className="p-1.5 text-zinc-600 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setPage(totalPages)}
                                    disabled={page === totalPages}
                                    className="p-1.5 text-zinc-600 hover:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <ChevronsRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "comments" && (
                    <div className="p-8 text-zinc-600 text-sm font-mono">
                        Comments — coming soon.
                    </div>
                )}
            </div>

            {/* Modal Portal */}
            {isModalOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <div
                            className="bg-zinc-950 border border-zinc-800 w-full max-w-md mx-4 rounded-sm shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                                <h3 className="text-sm font-mono uppercase tracking-wider text-white">
                                    All translations
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 border-b border-zinc-800">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                                    <input
                                        type="text"
                                        placeholder="Search by team or language..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full bg-zinc-900 border border-zinc-800 pl-8 pr-3 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
                                    />
                                </div>
                            </div>
                            <div className="max-h-96 overflow-y-auto modal-scrollbar">
                                {filteredTranslations.length === 0 ? (
                                    <div className="p-8 text-center text-xs text-zinc-500">
                                        No translations found
                                    </div>
                                ) : (
                                    <div className="divide-y divide-zinc-800/50">
                                        {filteredTranslations.map((t) => (
                                            <button
                                                key={t.id}
                                                onClick={() =>
                                                    selectTranslation(t)
                                                }
                                                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-zinc-900/50 transition-colors ${
                                                    translation.id === t.id
                                                        ? "bg-amber-500/5 border-l-2 border-l-amber-500"
                                                        : ""
                                                }`}
                                            >
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-zinc-200">
                                                            {t.name}
                                                        </span>
                                                        <StatusBadge
                                                            status={t.status}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                                                        <Globe className="w-3 h-3" />
                                                        {t.lang}
                                                        <span className="text-zinc-600">
                                                            •
                                                        </span>
                                                        {t.chapters} chapters
                                                    </div>
                                                </div>
                                                {translation.id === t.id && (
                                                    <span className="text-amber-500 text-[10px] font-mono">
                                                        Active
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
