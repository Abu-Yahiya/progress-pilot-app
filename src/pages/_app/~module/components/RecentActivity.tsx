import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Clock, FileText, Target, Trophy } from 'lucide-react';

const activities = [
	{
		id: 1,
		type: 'learning',
		title: 'Completed React Hooks Module',
		description: '3.5 hours of focused learning',
		time: '2 hours ago',
		icon: BookOpen,
		color: 'bg-primary/10 text-primary',
	},
	{
		id: 2,
		type: 'achievement',
		title: "Earned 'Week Warrior' Badge",
		description: 'Logged 20+ hours this week',
		time: '5 hours ago',
		icon: Trophy,
		color: 'bg-gold/10 text-gold',
	},
	{
		id: 3,
		type: 'report',
		title: 'Weekly Report Submitted',
		description: 'Summary of learning progress',
		time: '1 day ago',
		icon: FileText,
		color: 'bg-accent/10 text-accent',
	},
	{
		id: 4,
		type: 'streak',
		title: '12-Day Streak Achieved',
		description: 'Consistent daily learning',
		time: '1 day ago',
		icon: Target,
		color: 'bg-success/10 text-success',
	},
	{
		id: 5,
		type: 'learning',
		title: 'Started TypeScript Advanced Course',
		description: '1.5 hours of learning',
		time: '2 days ago',
		icon: BookOpen,
		color: 'bg-primary/10 text-primary',
	},
];

const typeLabels: Record<
	string,
	{ label: string; variant: 'default' | 'secondary' | 'outline' }
> = {
	learning: { label: 'Learning', variant: 'default' },
	achievement: { label: 'Achievement', variant: 'secondary' },
	report: { label: 'Report', variant: 'outline' },
	streak: { label: 'Streak', variant: 'secondary' },
};

export default function RecentActivity() {
	return (
		<Card variant='elevated'>
			<CardHeader className='pb-3'>
				<CardTitle className='text-lg flex items-center gap-2'>
					<Clock className='w-5 h-5 text-muted-foreground' />
					Recent Activity
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='space-y-4'>
					{activities.map((activity) => (
						<div
							key={activity.id}
							className='flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors'
						>
							<div
								className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center shrink-0`}
							>
								<activity.icon className='w-5 h-5' />
							</div>
							<div className='flex-1 min-w-0'>
								<div className='flex items-center gap-2 mb-1'>
									<p className='font-medium text-sm truncate'>
										{activity.title}
									</p>
									<Badge
										variant={typeLabels[activity.type].variant}
										className='text-xs shrink-0'
									>
										{typeLabels[activity.type].label}
									</Badge>
								</div>
								<p className='text-sm text-muted-foreground'>
									{activity.description}
								</p>
							</div>
							<p className='text-xs text-muted-foreground shrink-0'>
								{activity.time}
							</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
