import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check, LucideIcon, X } from 'lucide-react';

interface ActivityItem {
	key: string;
	label: string;
	value: any;
	icon?: LucideIcon;
	target?: number | string;
	status?: string;
}

interface ActivityCardProps {
	title: string;
	icon: LucideIcon;
	iconColor: string;
	bgGradient: string;
	items: ActivityItem[];
	delay?: number;
	achivedPercentage: number;
}

export default function ActivityPortionItemCard({
	title,
	icon: Icon,
	iconColor,
	bgGradient,
	items,
	delay = 0,
	achivedPercentage,
}: ActivityCardProps) {
	const completedCount = items.filter(
		(item) => item.value !== null && item.value > 0,
	).length;
	const totalCount = items.length;
	const progressPercent = Math.round((completedCount / totalCount) * 100);

	console.log(items);
	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.95 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.4, delay }}
		>
			<Card className='overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group'>
				{/* Header with gradient */}
				<div className={cn('p-4 relative overflow-hidden', bgGradient)}>
					<div className='absolute inset-0 bg-black/5 dark:bg-black/20' />
					<div className='relative flex items-center justify-between'>
						<div className='flex items-center gap-3'>
							<div
								className={cn(
									'w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm',
									iconColor,
								)}
							>
								<Icon className='w-6 h-6' />
							</div>
							<div>
								<h3 className='font-display text-lg font-bold text-white'>
									{title}
								</h3>
								<p className='text-white/80 text-sm'>
									{completedCount}/{totalCount} completed
								</p>
							</div>
						</div>
						<div className='flex items-center gap-2'>
							<div className='text-right'>
								<span className='text-2xl font-bold text-white'>
									{achivedPercentage || 0}%
								</span>
							</div>
						</div>
					</div>
					{/* Progress bar */}
					<div className='mt-4 h-2 bg-white/20 rounded-full overflow-hidden relative'>
						<motion.div
							className='h-full bg-white rounded-full'
							initial={{ width: 0 }}
							animate={{ width: `${achivedPercentage}%` }}
							transition={{ duration: 0.8, delay: delay + 0.2 }}
						/>
					</div>
				</div>

				{/* Activity items */}
				<CardContent className='p-4 space-y-2 dark:bg-dimmed-bg'>
					{items?.map((item, index) => {
						const ItemIcon = item.icon;
						const isCompleted = item.value !== null && item.value > 0;

						return (
							<motion.div
								key={item.key}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: delay + 0.1 + index * 0.03 }}
								className={cn(
									'p-3 rounded-xl transition-all duration-200',
									isCompleted
										? 'bg-success/10 border border-success/20'
										: 'bg-secondary hover:bg-secondary border border-transparent',
								)}
							>
								<div className='flex items-center justify-between '>
									<div className='flex items-center gap-4'>
										<>
											{ItemIcon && (
												<div
													className={cn(
														'w-8 h-8 rounded-lg flex items-center justify-center',
														isCompleted
															? 'bg-success/20 text-success'
															: 'bg-muted text-muted-foreground',
													)}
												>
													<ItemIcon className='w-4 h-4' />
												</div>
											)}
										</>
										<span
											className={cn(
												'font-medium text-sm',
												isCompleted
													? 'text-foreground'
													: 'text-muted-foreground',
											)}
										>
											{item?.label}
										</span>
									</div>

									<div className='flex items-center gap-2'>
										{/* Counter controls */}

										{title !== 'আইটি টাস্ক' && (
											<>
												{item?.value !== undefined &&
													typeof item.value === 'number' && (
														<div className='flex items-center gap-1 bg-background rounded-lg border p-1'>
															<span
																className={cn(
																	'p-2 text-center font-semibold text-sm',
																	isCompleted
																		? 'text-success'
																		: 'text-muted-foreground',
																)}
															>
																{`${item.value} / ${item?.target}` || 0}
															</span>
														</div>
													)}
											</>
										)}
										{/* Check mark */}
										{title !== 'আইটি টাস্ক' && (
											<button
												// onClick={() => handleToggle(item.key, item.value)}

												className={cn(
													'w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
													isCompleted
														? 'bg-success text-white'
														: 'bg-destructive text-primary-foreground',
												)}
											>
												{isCompleted ? (
													<Check className='w-4 h-4' />
												) : (
													<X className='w-4 h-4' />
												)}
											</button>
										)}
									</div>
								</div>
								{title === 'আইটি টাস্ক' && (
									<div className='space-y-3 mt-2'>
										<div className='flex justify-between items-center'>
											<Badge
												variant='outline'
												className='text-xs bg-primary/10 text-primary border-primary/20'
											>
												{item?.status}
											</Badge>
											<span>{item?.value ?? 0}%</span>
										</div>
										<div className='h-2 bg-teal-deep/15 rounded-full overflow-hidden relative'>
											<motion.div
												className='h-full bg-teal-deep rounded-full'
												initial={{ width: 0 }}
												animate={{ width: `${item?.value}%` }}
												transition={{ duration: 0.8, delay: delay + 0.2 }}
											/>
										</div>
									</div>
								)}
							</motion.div>
						);
					})}
				</CardContent>
			</Card>
		</motion.div>
	);
}
