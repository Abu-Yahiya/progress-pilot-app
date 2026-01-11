import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const data = [
	{ day: 'Mon', hours: 2.5 },
	{ day: 'Tue', hours: 3.2 },
	{ day: 'Wed', hours: 1.8 },
	{ day: 'Thu', hours: 4.1 },
	{ day: 'Fri', hours: 2.9 },
	{ day: 'Sat', hours: 3.5 },
	{ day: 'Sun', hours: 2.0 },
];

export default function LearningChart() {
	return (
		<Card variant='elevated'>
			<CardHeader className='pb-2'>
				<CardTitle className='text-lg'>Learning Activity</CardTitle>
				<p className='text-sm text-muted-foreground'>
					Hours spent learning this week
				</p>
			</CardHeader>
			<CardContent>
				<div className='h-[280px] w-full'>
					<ResponsiveContainer width='100%' height='100%'>
						<AreaChart
							data={data}
							margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
						>
							<defs>
								<linearGradient id='colorHours' x1='0' y1='0' x2='0' y2='1'>
									<stop
										offset='5%'
										stopColor='hsl(234, 89%, 54%)'
										stopOpacity={0.3}
									/>
									<stop
										offset='95%'
										stopColor='hsl(234, 89%, 54%)'
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray='3 3'
								vertical={false}
								stroke='hsl(var(--border))'
							/>
							<XAxis
								dataKey='day'
								axisLine={false}
								tickLine={false}
								tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
							/>
							<YAxis
								axisLine={false}
								tickLine={false}
								tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
								// @ts-ignore
								tickFormatter={'(12) => `12h`'}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: 'hsl(var(--card))',
									border: '1px solid hsl(var(--border))',
									borderRadius: '8px',
									boxShadow: 'var(--shadow-md)',
								}}
								labelStyle={{
									color: 'hsl(var(--foreground))',
									fontWeight: 600,
								}}
								// @ts-ignore
								formatter={(value: number) => [`12 hours`, 'Learning']}
							/>
							<Area
								type='monotone'
								dataKey='hours'
								stroke='hsl(234, 89%, 54%)'
								strokeWidth={2}
								fill='url(#colorHours)'
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	);
}
