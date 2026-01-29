import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { progressAtom } from '@/store/progress.atom';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Flame } from 'lucide-react';

interface CategorySummary {
	name: string;
	completed: number;
	color: string;
}

interface DailySummaryProps {
	categories: CategorySummary[];
	streak: number;
}

export default function DailySummary({
	categories,
	streak,
}: DailySummaryProps) {
	const [progress] = useAtom(progressAtom);

	// comment as progress
	const getMotivationalMessage = (score: number) => {
		if (score === 100) return "🎉 Perfect day! You're amazing!";
		if (score >= 75) return '🔥 Almost there! Keep pushing!';
		if (score >= 50) return '💪 Great progress! Stay focused!';
		if (score >= 25) return "🚀 Good start! You've got this!";
		return '✨ Begin your journey today!';
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='mb-8'
		>
			<Card className='overflow-hidden border-0 shadow-xl bg-gradient-to-br from-primary via-primary/90 to-deep'>
				<CardContent className='p-6'>
					<div className='flex flex-col lg:flex-row lg:items-center gap-6'>
						{/* Overall progress circle */}
						<div className='flex items-center gap-6'>
							<div className='relative'>
								<svg className='w-24 h-24 -rotate-90'>
									<circle
										cx='48'
										cy='48'
										r='40'
										className='fill-none stroke-white/20'
										strokeWidth='8'
									/>
									<motion.circle
										cx='48'
										cy='48'
										r='40'
										className='fill-none stroke-white'
										strokeWidth='8'
										strokeLinecap='round'
										strokeDasharray={`${progress?.todaysTotalAchivedPercentage * 2.51} 251`}
										initial={{ strokeDasharray: '0 251' }}
										animate={{
											strokeDasharray: `${progress?.todaysTotalAchivedPercentage * 2.51} 251`,
										}}
										transition={{ duration: 1, delay: 0.3 }}
									/>
								</svg>
								<div className='absolute inset-0 flex items-center justify-center'>
									<span className='text-2xl font-bold text-white'>
										{progress?.todaysTotalAchivedPercentage}%
									</span>
								</div>
							</div>

							<div>
								<h2 className='font-display text-xl font-bold text-white mb-1'>
									Today's Progress
								</h2>
								<p className='text-white/80 text-sm'>
									{getMotivationalMessage(
										progress?.todaysTotalAchivedPercentage,
									)}
								</p>
							</div>
						</div>

						{/* Category breakdown */}
						<div className='flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3'>
							{categories.map((category, index) => {
								return (
									<motion.div
										key={category.name}
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.2 + index * 0.1 }}
										className='bg-white/10 backdrop-blur-sm rounded-xl p-3'
									>
										<p className='text-white/70 text-sm mb-1 truncate'>
											{category.name}
										</p>
										<p className='text-white font-semibold text-lg'>
											{category.completed}%
										</p>
										<div className='mt-2 h-1.5 bg-white/20 rounded-full overflow-hidden'>
											<motion.div
												className={cn('h-full rounded-full', category.color)}
												initial={{ width: 0 }}
												animate={{ width: `${category.completed}%` }}
												transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
											/>
										</div>
									</motion.div>
								);
							})}
						</div>

						{/* Streak badge */}
						<div className='flex items-center gap-4'>
							<div className='bg-orange/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3'>
								<div className='w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center'>
									<Flame className='w-6 h-6 text-orange-400' />
								</div>
								<div>
									<p className='text-white/70 text-xs'>Streak</p>
									<p className='text-white font-bold text-2xl'>{streak} days</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
