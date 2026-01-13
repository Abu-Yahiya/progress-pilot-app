import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { Award, Medal, Trophy } from 'lucide-react';

const leaderboardData = [
	{
		rank: 1,
		name: 'Sarah Chen',
		avatar: '',
		hours: 42,
		streak: 28,
		badge: 'gold' as const,
	},
	{
		rank: 2,
		name: 'Mike Rodriguez',
		avatar: '',
		hours: 38,
		streak: 21,
		badge: 'silver' as const,
	},
	{
		rank: 3,
		name: 'Alex Johnson',
		avatar: '',
		hours: 35,
		streak: 12,
		badge: 'bronze' as const,
		isCurrentUser: true,
	},
	{
		rank: 4,
		name: 'Emma Wilson',
		avatar: '',
		hours: 32,
		streak: 14,
	},
	{
		rank: 5,
		name: 'James Lee',
		avatar: '',
		hours: 29,
		streak: 9,
	},
];

const badgeIcons = {
	gold: Trophy,
	silver: Medal,
	bronze: Award,
};

const badgeColors = {
	gold: 'text-gold bg-gold/10',
	silver: 'text-silver bg-silver/10',
	bronze: 'text-bronze bg-bronze/10',
};

export default function LeaderboardWidget() {
	return (
		<Card variant='elevated' className='h-full'>
			<CardHeader className='pb-3'>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-lg flex items-center gap-2'>
						<Trophy className='w-5 h-5 text-gold' />
						Leaderboard
					</CardTitle>
					<Link to='/'>
						<Button variant='ghost' size='sm' className='text-xs'>
							View All
						</Button>
					</Link>
				</div>
			</CardHeader>
			<CardContent className='space-y-3'>
				{leaderboardData.map((user) => {
					const BadgeIcon = user.badge ? badgeIcons[user.badge] : null;
					// const isTop3 = user.rank <= 3;

					return (
						<div
							key={user.name}
							className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
								user.isCurrentUser
									? 'bg-primary/5 border border-primary/20'
									: 'hover:bg-secondary/50'
							}`}
						>
							<div className='flex items-center justify-center w-6'>
								{BadgeIcon ? (
									<div
										className={`w-6 h-6 rounded-full ${
											badgeColors[user.badge!]
										} flex items-center justify-center`}
									>
										<BadgeIcon className='w-3.5 h-3.5' />
									</div>
								) : (
									<span className='text-sm font-medium text-muted-foreground'>
										{user.rank}
									</span>
								)}
							</div>

							<Avatar className='w-8 h-8'>
								<AvatarImage src={user.avatar} />
								<AvatarFallback className='text-xs font-medium bg-secondary'>
									{user.name
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</AvatarFallback>
							</Avatar>

							<div className='flex-1 min-w-0'>
								<p
									className={`text-sm font-medium truncate ${
										user.isCurrentUser ? 'text-primary' : ''
									}`}
								>
									{user.name}
									{user.isCurrentUser && (
										<span className='text-xs ml-1'>(You)</span>
									)}
								</p>
								<p className='text-xs text-muted-foreground'>
									{user.streak} day streak
								</p>
							</div>

							<div className='text-right'>
								<p className='text-sm font-semibold'>{user.hours}h</p>
								<p className='text-xs text-muted-foreground'>this week</p>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
