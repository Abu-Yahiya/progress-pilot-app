import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatsCardProps {
	title: string;
	value: string;
	icon: LucideIcon;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	progress?: number;
	color: 'primary' | 'accent' | 'gold' | 'success' | 'warning';
}

const colorStyles = {
	primary: {
		icon: 'bg-primary/10 text-primary',
		text: 'text-primary',
	},
	accent: {
		icon: 'bg-accent/10 text-accent',
		text: 'text-accent',
	},
	gold: {
		icon: 'bg-gold/10 text-gold',
		text: 'text-gold',
	},
	success: {
		icon: 'bg-success/10 text-success',
		text: 'text-success',
	},
	warning: {
		icon: 'bg-warning/10 text-warning',
		text: 'text-warning',
	},
};

export default function StatsCard({
	title,
	value,
	icon: Icon,
	trend,
	progress,
	color,
}: StatsCardProps) {
	const styles = colorStyles[color];

	return (
		<Card
			variant='elevated'
			className='hover:shadow-lg transition-all duration-300'
		>
			<CardContent className='p-5'>
				<div className='flex items-start justify-between mb-3'>
					<div
						className={`w-10 h-10 rounded-xl ${styles.icon} flex items-center justify-center`}
					>
						<Icon className='w-5 h-5' />
					</div>
					{trend && (
						<div
							className={`flex items-center gap-1 text-sm ${
								trend.isPositive ? 'text-success' : 'text-destructive'
							}`}
						>
							{trend.isPositive ? (
								<TrendingUp className='w-3.5 h-3.5' />
							) : (
								<TrendingDown className='w-3.5 h-3.5' />
							)}
							<span>{trend.value}%</span>
						</div>
					)}
				</div>
				<div className='space-y-1'>
					<p className='text-sm text-muted-foreground'>{title}</p>
					<p className={`font-display text-2xl font-bold ${styles.text}`}>
						{value}
					</p>
				</div>
				{progress !== undefined && (
					<div className='mt-3'>
						<Progress value={progress} className='h-2' />
					</div>
				)}
			</CardContent>
		</Card>
	);
}
