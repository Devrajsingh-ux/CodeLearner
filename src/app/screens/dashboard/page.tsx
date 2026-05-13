"use client";

import {
	ArrowRight,
	Award,
	Brain,
	CheckCircle2,
	ChevronRight,
	Clock,
	Flame,
	Medal,
	Play,
	Radar,
	Sparkles,
	Star,
	Target,
	TrendingUp,
	Trophy,
	Zap,
	LayoutDashboard,
	BookOpen,
	Code2,
	Users,
	Settings,
	Bell,
	Search,
	LogOut,
	Menu,
	X
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { ProgressBar } from "@/ui/components/ProgressBar";
import { getTechColor, TechIcon } from "@/ui/components/TechIcon";
import { useAuth } from "@/context/AuthContext";
import { ALL_ACHIEVEMENTS } from "@/data/achievements";
import { cn, formatNumber } from "@/lib/utils";
import type { Track } from "@/types";
import type { Enrollment, DailyActivity, UserStreak } from "@/types";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function useCountUp(target: number, duration = 900) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		const startAt = performance.now();
		let raf = 0;

		const tick = (now: number) => {
			const elapsed = now - startAt;
			const progress = Math.min(1, elapsed / duration);
			const eased = 1 - (1 - progress) ** 3;
			setValue(Math.round(target * eased));
			if (progress < 1) raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, duration]);

	return value;
}

function AnimatedNumber({
	value,
	compact = false,
}: {
	value: number;
	compact?: boolean;
}) {
	const counted = useCountUp(value);
	return <>{compact ? formatNumber(counted) : counted.toLocaleString()}</>;
}

function QuestRing({ completed, total }: { completed: number; total: number }) {
	const ratio = total > 0 ? completed / total : 0;
	const radius = 22;
	const circumference = 2 * Math.PI * radius;
	const filled = circumference * ratio;

	return (
		<svg
			viewBox="0 0 56 56"
			className="h-14 w-14 drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
			role="img"
			aria-label={`Daily goals ${Math.round(ratio * 100)} percent completed`}
		>
			<circle
				cx="28"
				cy="28"
				r={radius}
				className="fill-none stroke-white/5"
				strokeWidth="6"
			/>
			<circle
				cx="28"
				cy="28"
				r={radius}
				className="fill-none stroke-violet-500 transition-all duration-700 ease-out"
				strokeWidth="6"
				strokeLinecap="round"
				strokeDasharray={`${filled} ${circumference - filled}`}
				transform="rotate(-90 28 28)"
			/>
			<text
				x="28"
				y="31"
				textAnchor="middle"
				className="fill-white text-[10px] font-bold tracking-tighter"
			>
				{Math.round(ratio * 100)}%
			</text>
		</svg>
	);
}

export default function DashboardPage() {
	const { user, isLoading, logout } = useAuth();
	const router = useRouter();
	const pathname = usePathname();

	const [isHydrated, setIsHydrated] = useState(false);
	const [catalog, setCatalog] = useState<Track[]>([]);
	const [coursesLoading, setCoursesLoading] = useState(true);
	const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
	const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
	const [activityData, setActivityData] = useState<{
		activities: DailyActivity[];
		streak: UserStreak | null;
		stats: { xpThisWeek: number; minutesToday: number };
	} | null>(null);
	const [leaderboard, setLeaderboard] = useState<any[]>([]);
	const [leaderboardLoading, setLeaderboardLoading] = useState(true);
	const [questData, setQuestData] = useState<{
		quests: any[];
		stats: { completed: number; total: number; xpEarned: number; date: string };
	} | null>(null);
	const [questsLoading, setQuestsLoading] = useState(true);
  
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (!isLoading && !user) router.replace("/");
	}, [isLoading, router, user]);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		let cancelled = false;

		async function loadCourses() {
			setCoursesLoading(true);
			try {
				const res = await fetch("/api/courses", { cache: "no-store" });
				const json = await res.json();
				if (!cancelled && res.ok) {
					setCatalog(Array.isArray(json.courses) ? json.courses : []);
				}
			} catch {
				if (!cancelled) setCatalog([]);
			} finally {
				if (!cancelled) setCoursesLoading(false);
			}
		}

		loadCourses();
		return () => {
			cancelled = true;
		};
	}, []);

	// Fetch user enrollments
	useEffect(() => {
		if (!user) return;

		let cancelled = false;

		async function loadEnrollments() {
			setEnrollmentsLoading(true);
			try {
				const res = await fetch("/api/enroll", { cache: "no-store" });
				const json = await res.json();
				if (!cancelled && res.ok) {
					setEnrollments(Array.isArray(json.enrollments) ? json.enrollments : []);
				}
			} catch {
				if (!cancelled) setEnrollments([]);
			} finally {
				if (!cancelled) setEnrollmentsLoading(false);
			}
		}

		loadEnrollments();
		return () => {
			cancelled = true;
		};
	}, [user]);

	// Fetch user activity data
	useEffect(() => {
		if (!user) return;

		let cancelled = false;

		async function loadActivity() {
			try {
				const res = await fetch("/api/activity?days=7", { cache: "no-store" });
				const json = await res.json();
				if (!cancelled && res.ok) {
					setActivityData(json);
				}
			} catch {
				if (!cancelled) setActivityData(null);
			}
		}

		loadActivity();
		return () => {
			cancelled = true;
		};
	}, [user]);

	// Fetch leaderboard data
	useEffect(() => {
		if (!user) return;

		let cancelled = false;

		async function loadLeaderboard() {
			setLeaderboardLoading(true);
			try {
				const res = await fetch("/api/leaderboard", { cache: "no-store" });
				const json = await res.json();
				if (!cancelled && res.ok) {
					setLeaderboard(json.leaderboard || []);
				}
			} catch {
				if (!cancelled) setLeaderboard([]);
			} finally {
				if (!cancelled) setLeaderboardLoading(false);
			}
		}

		loadLeaderboard();
		return () => {
			cancelled = true;
		};
	}, [user]);

	// Fetch quest data
	useEffect(() => {
		if (!user) return;

		let cancelled = false;

		async function loadQuests() {
			setQuestsLoading(true);
			try {
				const res = await fetch("/api/quests", { cache: "no-store" });
				const json = await res.json();
				if (!cancelled && res.ok) {
					setQuestData(json);
				}
			} catch {
				if (!cancelled) setQuestData(null);
			} finally {
				if (!cancelled) setQuestsLoading(false);
			}
		}

		loadQuests();
		return () => {
			cancelled = true;
		};
	}, [user]);

	const profile =
		user ??
		({
			id: "",
			name: "Learner",
			email: "",
			username: "",
			role: "student",
			xp: 0,
			level: 1,
			streak: 0,
		} as const);

	const continueTracks = useMemo(() => {
		if (catalog.length === 0 || enrollments.length === 0) return [];

		const enrolled = catalog.filter(course =>
			enrollments.some(e => e.courseId === course.id || e.courseSlug === course.slug)
		);

		return enrolled.sort((a, b) => {
			const enrollA = enrollments.find(e => e.courseId === a.id || e.courseSlug === a.slug);
			const enrollB = enrollments.find(e => e.courseId === b.id || e.courseSlug === b.slug);

			if (!enrollA || !enrollB) return 0;

			return new Date(enrollB.lastAccessedAt).getTime() - new Date(enrollA.lastAccessedAt).getTime();
		}).slice(0, 4);
	}, [catalog, enrollments]);

	const recommendedTracks = useMemo(() => {
		if (catalog.length === 0) return [];
		return [...catalog]
			.sort(
				(a, b) =>
					(b.rating || 0) - (a.rating || 0) ||
					(b.enrolledCount || 0) - (a.enrolledCount || 0),
			)
			.slice(0, 8);
	}, [catalog]);

	const progressByCourse = useMemo(() => {
		const map = new Map<string, number>();

		enrollments.forEach((enrollment) => {
			map.set(enrollment.courseId, enrollment.percentComplete || 0);
			if (enrollment.courseSlug) {
				map.set(enrollment.courseSlug, enrollment.percentComplete || 0);
			}
		});

		return map;
	}, [enrollments]);

	const completedCourses = continueTracks.filter(
		(track) => (progressByCourse.get(track.id) ?? 0) >= 90,
	).length;

	const problemsSolved = useMemo(() => {
		if (!activityData) return 0;
		return activityData.activities.reduce((sum, activity) => sum + (activity.problemsSolved || 0), 0);
	}, [activityData]);

	const realXpToday = activityData && activityData.stats.minutesToday > 0 ?
		activityData.activities
			.filter(a => a.date === new Date().toISOString().split('T')[0])
			.reduce((sum, activity) => sum + (activity.xpEarned || 0), 0) : 0;

	const realXpThisWeek = activityData?.stats.xpThisWeek || 0;

	const minutesToday = activityData?.stats.minutesToday || 0;

	const dailyQuest = questData ? {
		completed: questData.stats.completed,
		total: questData.stats.total,
		xp: questData.stats.xpEarned,
	} : {
		completed: 0,
		total: 3, 
		xp: 0,
	};

	const firstName = profile.name.split(" ")[0] || "Coder";
	const xpToNext = profile.level * 100;

	const realStreak = activityData?.streak?.currentStreak ?? profile.streak;

	const statCards = [
		{
			icon: Flame,
			label: "Streak Days",
			value: realStreak,
			suffix: "",
			accent: "#f59e0b",
			bg: "bg-amber-500/10",
			border: "border-amber-500/20",
		},
		{
			icon: Trophy,
			label: "Total XP",
			value: profile.xp,
			suffix: "",
			accent: "#8b5cf6",
			bg: "bg-violet-500/10",
			border: "border-violet-500/20",
		},
		{
			icon: Zap,
			label: "Current Level",
			value: profile.level,
			suffix: "",
			accent: "#06b6d4",
			bg: "bg-cyan-500/10",
			border: "border-cyan-500/20",
		},
		{
			icon: Brain,
			label: "Problems Solved",
			value: problemsSolved,
			suffix: "",
			accent: "#10b981",
			bg: "bg-emerald-500/10",
			border: "border-emerald-500/20",
		},
	];

	const heatmapValues = useMemo(() => {
		if (!activityData) {
			return WEEK_DAYS.map(() => 0);
		}

		const today = new Date();
		const activities = activityData.activities;

		return WEEK_DAYS.map((_, i) => {
			const date = new Date(today);
			date.setDate(today.getDate() - (6 - i));
			const dateString = date.toISOString().split('T')[0];

			const dayActivity = activities.find(activity => activity.date === dateString);
			if (!dayActivity) return 0;

			const xp = dayActivity.xpEarned || 0;
			if (xp >= 60) return 4;
			if (xp >= 40) return 3;
			if (xp >= 20) return 2;
			if (xp > 0) return 1;
			return 0;
		});
	}, [activityData]);

	const achievementContext = {
		xp: profile.xp,
		level: profile.level,
		streak: realStreak,
		enrolledCoursesCount: continueTracks.length,
		completedLessonsCount: continueTracks.reduce((acc, track) => {
			const enrollment = enrollments.find(e => e.courseId === track.id || e.courseSlug === track.slug);
			return acc + (enrollment?.completedLessons || 0);
		}, 0),
		solvedProblemsCount: problemsSolved,
		hasGithub: false,
		hasTwitter: false,
		hasLinkedin: false,
	};

	const achievements = ALL_ACHIEVEMENTS.map((item) => ({
		...item,
		earned: item.isEarned(achievementContext),
	}));
	const recentBadges = achievements.filter((a) => a.earned).slice(0, 3);

	const NAVIGATION = [
		{ name: "Dashboard", href: "/screens/dashboard", icon: LayoutDashboard },
		{ name: "Learning Paths", href: "/screens/learn", icon: BookOpen },
		{ name: "Practice", href: "/screens/problems", icon: Code2 },
		{ name: "Community", href: "/community", icon: Users },
	];

	if (isLoading || !user) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-[#09090b]">
				<div className="flex flex-col items-center gap-4">
					<div className="relative flex h-12 w-12 items-center justify-center">
						<div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
						<Sparkles className="h-5 w-5 text-violet-400 animate-pulse" />
					</div>
					<p className="text-sm font-medium text-zinc-400 tracking-wide">Initializing Workspace...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-violet-500/30">
			{/* Background Ambient Effects */}
			<div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
				<div className="absolute top-[-10%] left-[-10%] h-[40vw] w-[40vw] rounded-full bg-violet-600/10 blur-[120px]" />
				<div className="absolute top-[40%] right-[-5%] h-[30vw] w-[30vw] rounded-full bg-cyan-600/10 blur-[100px]" />
				<div className="absolute bottom-[-10%] left-[20%] h-[35vw] w-[35vw] rounded-full bg-amber-600/5 blur-[120px]" />
			</div>

			{/* Desktop Sidebar */}
			<aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-black/20 backdrop-blur-xl z-20">
				<div className="flex h-20 items-center px-8">
					<Link href="/" className="flex items-center gap-3 group">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
							<Code2 className="h-5 w-5 text-white" />
						</div>
						<span className="text-xl font-bold tracking-tight text-white">CodeLearner</span>
					</Link>
				</div>

				<div className="flex-1 px-4 py-8 space-y-1">
					<p className="px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Menu</p>
					{NAVIGATION.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									"flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
									isActive
										? "bg-violet-500/10 text-violet-300 relative"
										: "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
								)}
							>
								{isActive && (
									<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-500 rounded-r-full" />
								)}
								<item.icon className={cn("h-5 w-5", isActive ? "text-violet-400" : "text-zinc-500")} />
								{item.name}
							</Link>
						);
					})}
				</div>

				<div className="p-4 border-t border-white/5">
					<button 
						onClick={() => logout()}
						className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all hover:bg-red-500/10 hover:text-red-400"
					>
						<LogOut className="h-5 w-5" />
						Sign Out
					</button>
				</div>
			</aside>

			{/* Mobile Header & Nav */}
			<div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl z-50 flex items-center justify-between px-4">
				<Link href="/" className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-indigo-600">
						<Code2 className="h-4 w-4 text-white" />
					</div>
					<span className="font-bold text-white">CodeLearner</span>
				</Link>
				<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-400 hover:text-white">
					{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
				</button>
			</div>

			{mobileMenuOpen && (
				<div className="lg:hidden fixed inset-0 top-16 bg-black/95 z-40 p-4">
					<div className="flex flex-col gap-2">
						{NAVIGATION.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setMobileMenuOpen(false)}
								className={cn(
									"flex items-center gap-3 rounded-xl px-4 py-3 font-medium",
									pathname === item.href ? "bg-violet-500/10 text-violet-300" : "text-zinc-400"
								)}
							>
								<item.icon className="h-5 w-5" />
								{item.name}
							</Link>
						))}
					</div>
				</div>
			)}

			{/* Main Content */}
			<main className="flex-1 relative w-full lg:max-w-[calc(100vw-18rem)] overflow-y-auto overflow-x-hidden pt-16 lg:pt-0">
        
				{/* Top Header */}
				<header className="sticky top-0 z-30 hidden lg:flex h-20 items-center justify-between px-8 backdrop-blur-md bg-[#09090b]/60 border-b border-transparent transition-all">
					<div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96 focus-within:border-violet-500/50 focus-within:bg-white/10 transition-all">
						<Search className="h-4 w-4 text-zinc-400" />
						<input 
							type="text" 
							placeholder="Search courses, problems..." 
							className="bg-transparent border-none outline-none text-sm w-full text-zinc-200 placeholder:text-zinc-500"
						/>
					</div>
					<div className="flex items-center gap-6">
						<button className="relative text-zinc-400 hover:text-white transition-colors">
							<Bell className="h-5 w-5" />
							<span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-violet-500 ring-2 ring-[#09090b]" />
						</button>
						<div className="flex items-center gap-3 pl-6 border-l border-white/10">
							<div className="text-right hidden md:block">
								<p className="text-sm font-semibold text-white">{user.name}</p>
								<p className="text-xs text-zinc-400 capitalize">{user.role}</p>
							</div>
							<Avatar
								initials={user.avatar ?? user.name.slice(0, 2).toUpperCase()}
								size="md"
								className="ring-2 ring-white/10 hover:ring-violet-500/50 transition-all cursor-pointer"
							/>
						</div>
					</div>
				</header>

				<div className="p-4 sm:p-8 space-y-8 max-w-7xl mx-auto pb-24">
          
					{/* Welcome Banner */}
					<div className={cn(
						"relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-zinc-900/80 to-black/80 p-8 sm:p-10 shadow-2xl",
						isHydrated ? "animate-fade-in" : "opacity-0"
					)}>
						<div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-violet-600/20 to-transparent pointer-events-none" />
						<div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
            
						<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
							<div className="max-w-2xl">
								<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-4">
									<Sparkles className="h-3.5 w-3.5 text-amber-400" />
									Your workspace is ready
								</div>
								<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
									Welcome back, <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">{firstName}</span>
								</h1>
								<p className="text-lg text-zinc-400 mb-6 leading-relaxed">
									You're on a <strong className="text-amber-400">{realStreak}-day learning streak</strong>. Keep up the momentum and conquer your daily goals today!
								</p>
								<div className="flex flex-wrap gap-4">
									<Link href={continueTracks[0] ? `/screens/learn/${continueTracks[0].slug}` : "/screens/learn"}>
										<Button size="lg" className="bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]">
											<Play className="h-4 w-4 mr-2" /> Resume Learning
										</Button>
									</Link>
									<Link href="/screens/problems">
										<Button size="lg" variant="secondary" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white">
											<Code2 className="h-4 w-4 mr-2" /> Practice Problems
										</Button>
									</Link>
								</div>
							</div>
              
							{/* Daily Quest Highlight in Banner */}
							<div className="hidden lg:flex flex-col items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-w-[200px]">
								<h3 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">Daily Quest</h3>
								<QuestRing completed={dailyQuest.completed} total={dailyQuest.total} />
								<p className="mt-4 text-sm text-zinc-400 text-center">
									<span className="text-white font-bold">{dailyQuest.completed}/{dailyQuest.total}</span> completed
								</p>
								<p className="text-xs text-amber-400 mt-1">+{dailyQuest.xp} XP Earned</p>
							</div>
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{statCards.map((stat, idx) => (
							<div 
								key={stat.label}
								className={cn(
									"group relative overflow-hidden rounded-2xl border bg-black/20 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1",
									stat.border,
									isHydrated ? "animate-fade-in" : "opacity-0"
								)}
								style={{ animationDelay: `${idx * 100}ms` }}
							>
								<div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div className="relative z-10">
									<div className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl mb-4", stat.bg)}>
										<stat.icon className="h-5 w-5" style={{ color: stat.accent }} />
									</div>
									<p className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
										<AnimatedNumber value={stat.value} compact />
									</p>
									<p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
								</div>
							</div>
						))}
					</div>

					{/* Main Content Grid (2 Columns) */}
					<div className="grid lg:grid-cols-3 gap-8">
            
							{/* Left Column (Wider) */}
						<div className="lg:col-span-2 space-y-8">
              
							{/* Continue Learning */}
							<section>
								<div className="flex items-center justify-between mb-5">
									<h2 className="text-xl font-bold text-white flex items-center gap-2">
										<BookOpen className="h-5 w-5 text-violet-400" /> Continue Learning
									</h2>
									<Link href="/screens/learn" className="text-sm font-medium text-zinc-400 hover:text-violet-400 transition-colors flex items-center gap-1">
										View all <ArrowRight className="h-4 w-4" />
									</Link>
								</div>

								{coursesLoading || enrollmentsLoading ? (
									<div className="grid sm:grid-cols-2 gap-4">
										{[1, 2].map((i) => (
											<div key={i} className="h-36 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
										))}
									</div>
								) : continueTracks.length === 0 ? (
									<div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center flex flex-col items-center">
										<div className="h-12 w-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
											<Target className="h-6 w-6 text-violet-400" />
										</div>
										<p className="text-lg font-semibold text-white mb-2">No active courses</p>
										<p className="text-zinc-400 mb-6 max-w-sm">Start your journey by enrolling in a new learning track today.</p>
											<Link href="/screens/learn">
											<Button className="bg-white text-black hover:bg-zinc-200">Browse Catalog</Button>
										</Link>
									</div>
								) : (
									<div className="grid sm:grid-cols-2 gap-4">
										{continueTracks.slice(0, 4).map((track, idx) => {
											const pct = progressByCourse.get(track.id) ?? progressByCourse.get(track.slug) ?? 0;
											const enrollment = enrollments.find(e => e.courseId === track.id || e.courseSlug === track.slug);
											const lessonsDone = enrollment?.completedLessons ?? Math.round((pct / 100) * track.lessonsCount);
                      
											return (
														<Link key={track.id} href={`/screens/learn/${track.slug}`} className="group block">
													<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 transition-all duration-300 hover:border-violet-500/50 hover:bg-black/60 hover:shadow-lg hover:shadow-violet-500/10">
														<div className="flex items-start justify-between mb-4">
															<div className="flex items-center gap-3">
																<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-white/10 group-hover:border-violet-500/30 transition-colors">
																	<TechIcon slug={track.slug} size={24} />
																</div>
																<div>
																	<h3 className="font-semibold text-white line-clamp-1">{track.title}</h3>
																	<p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
																		<Clock className="h-3 w-3" /> {track.duration}
																	</p>
																</div>
															</div>
															<div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-violet-500 group-hover:text-white transition-all">
																<Play className="h-4 w-4 translate-x-0.5" />
															</div>
														</div>
                            
														<div>
															<div className="flex justify-between text-xs mb-2">
																<span className="text-zinc-400">{lessonsDone} / {track.lessonsCount} lessons</span>
																<span className="font-medium text-violet-300">{pct}%</span>
															</div>
															<div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
																<div 
																	className="h-full bg-linear-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out" 
																	style={{ width: `${pct}%` }} 
																/>
															</div>
														</div>
													</div>
												</Link>
											);
										})}
									</div>
								)}
							</section>

							{/* Activity Heatmap & Recent Activity */}
							<section className="grid sm:grid-cols-2 gap-4">
								{/* Heatmap */}
								<div className="rounded-2xl border border-white/10 bg-black/20 p-6">
									<h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
										<TrendingUp className="h-4 w-4 text-emerald-400" /> Activity Heatmap
									</h2>
									<div className="flex justify-between items-end gap-2 h-32 mb-4">
										{WEEK_DAYS.map((day, i) => {
											const intensity = heatmapValues[i];
											const heightMap = ['h-2', 'h-8', 'h-16', 'h-24', 'h-32'];
											const colorMap = [
												'bg-white/5', 
												'bg-emerald-500/20 hover:bg-emerald-500/30', 
												'bg-emerald-500/50 hover:bg-emerald-500/60', 
												'bg-emerald-500/80 hover:bg-emerald-500/90', 
												'bg-emerald-400 hover:bg-emerald-300'
											];
                      
											return (
												<div key={day} className="flex flex-col items-center flex-1 group">
													<div className="w-full px-1 mb-2 relative flex justify-center">
														{/* Tooltip */}
														<div className="absolute -top-8 bg-black border border-white/10 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
															{intensity === 0 ? 'No activity' : 'Active'}
														</div>
														<div className={cn(
															"w-full rounded-t-sm transition-all duration-300 ease-out", 
															heightMap[intensity], 
															colorMap[intensity]
														)} />
													</div>
													<span className="text-[10px] text-zinc-500 font-medium uppercase">{day}</span>
												</div>
											);
										})}
									</div>
									<div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
										<p className="text-xs text-zinc-400">Current Week</p>
										<p className="text-sm font-medium text-emerald-400">+{realXpThisWeek} XP gained</p>
									</div>
								</div>

								{/* Level Progress */}
								<div className="rounded-2xl border border-white/10 bg-black/20 p-6 flex flex-col justify-between">
									<div>
										<h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
											<Medal className="h-4 w-4 text-amber-400" /> Level Progress
										</h2>
										<div className="flex items-center justify-center mb-6">
											<div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-linear-to-b from-amber-500/20 to-transparent border border-amber-500/30">
												<span className="text-3xl font-black text-amber-400">{profile.level}</span>
												<div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider">
													Level
												</div>
											</div>
										</div>
									</div>
                  
									<div>
										<div className="flex justify-between text-xs mb-2">
											<span className="text-zinc-400">XP Progress</span>
											<span className="font-medium text-white">{formatNumber(user.xp)} / {formatNumber(xpToNext)} XP</span>
										</div>
										<ProgressBar value={user.xp} max={xpToNext} color="amber" size="md" />
										<p className="text-xs text-center text-zinc-500 mt-4">
											Earn <strong className="text-zinc-300">{Math.max(0, xpToNext - user.xp)} XP</strong> more to reach Level {profile.level + 1}
										</p>
									</div>
								</div>
							</section>

						</div>

						{/* Right Column (Sidebar-ish) */}
						<div className="space-y-6">
              
							{/* Daily Quests */}
							<div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
								<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
									<Target className="h-4 w-4 text-violet-400" /> Today's Quests
								</h3>
                
								<div className="space-y-3">
									{questsLoading ? (
										[1, 2, 3].map(i => (
											<div key={i} className="h-12 bg-white/5 rounded-xl border border-white/5 animate-pulse" />
										))
									) : questData?.quests && questData.quests.length > 0 ? (
										questData.quests.map((quest) => (
											<div key={quest.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
												<div className="flex items-center gap-3">
													<div className={cn(
														"h-5 w-5 rounded-full flex items-center justify-center border",
														quest.completed ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "border-zinc-600"
													)}>
														{quest.completed && <CheckCircle2 className="h-3.5 w-3.5" />}
													</div>
													<span className={cn("text-sm", quest.completed ? "text-zinc-400 line-through" : "text-zinc-200")}>
														{quest.label}
													</span>
												</div>
												<span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-1 rounded-md">
													+{quest.xp}
												</span>
											</div>
										))
									) : (
										<p className="text-sm text-zinc-500 text-center py-4">No quests available today.</p>
									)}
								</div>
							</div>

							{/* Leaderboard Snippet */}
							<div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
										<Radar className="h-4 w-4 text-cyan-400" /> Leaderboard
									</h3>
									<Link href="/community" className="text-xs text-violet-400 hover:text-violet-300">Full Ranking</Link>
								</div>
                
								<div className="space-y-2">
									{leaderboardLoading ? (
										[1, 2, 3, 4, 5].map(i => (
											<div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
										))
									) : leaderboard.length === 0 ? (
										<p className="text-sm text-zinc-500 text-center py-4">No rankings yet.</p>
									) : (
										leaderboard.slice(0, 5).map((entry, idx) => (
											<div key={entry.rank} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
												<div className="flex items-center gap-3">
													<span className={cn(
														"w-5 text-center text-xs font-bold",
														idx === 0 ? "text-amber-400" : idx === 1 ? "text-zinc-300" : idx === 2 ? "text-amber-600" : "text-zinc-600"
													)}>
														{entry.rank}
													</span>
													<Avatar size="sm" initials={entry.name.slice(0, 2).toUpperCase()} className="h-6 w-6 text-[10px]" />
													<span className={cn("text-sm font-medium", entry.name === profile.name ? "text-violet-400" : "text-zinc-200")}>
														{entry.name}
													</span>
												</div>
												<span className="text-xs font-semibold text-zinc-400">{formatNumber(entry.xp)} XP</span>
											</div>
										))
									)}
								</div>
							</div>

							{/* Achievements */}
							<div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
								<h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
									<Award className="h-4 w-4 text-pink-400" /> Recent Badges
								</h3>
                
								<div className="grid grid-cols-3 gap-3">
									{recentBadges.length > 0 ? (
										recentBadges.map((badge) => {
											const Icon = badge.icon;
											return (
												<div key={badge.id} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer relative">
													<div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
													<div className="h-10 w-10 rounded-full flex items-center justify-center relative" style={{ backgroundColor: `${badge.color}20` }}>
														<div className="absolute inset-0 rounded-full blur-sm" style={{ backgroundColor: `${badge.color}40` }} />
														<Icon className="h-5 w-5 relative z-10" style={{ color: badge.color }} />
													</div>
													<span className="text-[10px] text-center font-medium text-zinc-300 leading-tight">
														{badge.title}
													</span>
												</div>
											)
										})
									) : (
										<div className="col-span-3 text-center py-4">
											<p className="text-sm text-zinc-500">No badges earned yet.</p>
										</div>
									)}
								</div>
							</div>

						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
