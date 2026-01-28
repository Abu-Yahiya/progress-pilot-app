import StatsCard from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import { userAtom } from '@/store/auth.atom';
import { createLazyFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Calendar, Clock, Plus, Target, Trophy } from 'lucide-react';
import LeaderboardWidget from './~module/components/LeaderboardWidgets';
import LearningChart from './~module/components/LinearCahrt';
import RecentActivity from './~module/components/RecentActivity';

export const Route = createLazyFileRoute('/_app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [user] = useAtom(userAtom);

	return (
		<div className='min-h-screen'>
			{/* Main Content */}
			<div className='pb-12'>
				<div className='container mx-auto'>
					{/* Welcome Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'
					>
						<div>
							<h1 className='text-foreground font-display text-3xl font-bold mb-1'>
								Welcome back, {user.user?.name.split(' ')[0]}! 👋
							</h1>
							<p className='text-muted-foreground'>
								You're on a {user.user?.role}-day streak! Keep up the great
								work.
							</p>
						</div>
						<Button className='!bg-gradient-to-br !from-primary !to-deep '>
							<Plus className='w-4 h-4' />
							Log Learning
						</Button>
					</motion.div>

					{/* Stats Grid */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'
					>
						<StatsCard
							title='Current Streak'
							value={`12 days`}
							icon={Target}
							trend={{ value: 15, isPositive: true }}
							color='primary'
						/>
						<StatsCard
							title='Leaderboard Rank'
							value={`#12`}
							icon={Trophy}
							trend={{ value: 2, isPositive: true }}
							color='gold'
						/>
						<StatsCard
							title='Total Hours'
							value={'12'}
							icon={Clock}
							trend={{ value: 8, isPositive: true }}
							color='accent'
						/>
						<StatsCard
							title='Weekly Goal'
							value={`12h`}
							icon={Calendar}
							progress={12 * 100}
							color='success'
						/>
					</motion.div>

					{/* Charts and Widgets Grid */}
					<div className='grid lg:grid-cols-3 gap-6'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='lg:col-span-2 min-w-0 overflow-hidden'
						>
							<LearningChart />
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='min-w-0 overflow-hidden'
						>
							<LeaderboardWidget />
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className='lg:col-span-3 min-w-0 overflow-hidden'
						>
							<RecentActivity />
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
