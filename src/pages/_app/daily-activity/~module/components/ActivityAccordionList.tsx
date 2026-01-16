import { Accordion } from '@/components/ui/accordion';
import { DailyActivity } from '@/gql/graphql';
import { CalendarDays } from 'lucide-react';
import { ReactNode } from 'react';
import ActivityAccordionItem from './ActivityAccordionItem';

interface ActivityListProps {
	activities: DailyActivity[];
	onEdit: (activity: DailyActivity) => void;
	onDelete: any;
	actionBtn: ReactNode;
}

const ActivityAccordionList = ({
	activities,
	onEdit,
	onDelete,
	actionBtn,
}: ActivityListProps) => {
	if (activities?.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center py-16 px-4 bg-card rounded-xl border border-border/50 shadow-soft'>
				<div className='w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4'>
					<CalendarDays className='w-10 h-10 text-muted-foreground' />
				</div>
				<h3 className='text-lg font-display font-semibold text-foreground mb-2'>
					No activity found
				</h3>
				<p className='text-muted-foreground text-center font-bangla'>
					Please add activity record for tracking your progress
				</p>

				{actionBtn}
			</div>
		);
	}

	return (
		<div className='space-y-2'>
			<Accordion
				type='single'
				collapsible
				defaultValue={activities?.[0]?._id!}
				className='space-y-0'
			>
				{activities?.map((activity, index) => (
					<div
						key={index}
						className='animate-fade-in'
						style={{ animationDelay: `${index * 0.05}s` }}
					>
						<ActivityAccordionItem
							activity={activity as DailyActivity}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					</div>
				))}
			</Accordion>
		</div>
	);
};

export default ActivityAccordionList;
