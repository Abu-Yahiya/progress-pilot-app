import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { DailyActivity } from '@/gql/graphql';
import { useDailyActivities } from '@/hooks/useDailyActivities';
import { progressAtom } from '@/store/progress.atom';
import { DialogTitle } from '@radix-ui/react-dialog';
import { createLazyFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Calendar, Plus, Sparkles } from 'lucide-react';
import ActivityAccordionList from './~module/components/ActivityAccordionList';
import DailyActivityForm from './~module/components/DailyActivityForm';
import DailySummary from './~module/components/DailySummary';

export const Route = createLazyFileRoute('/_app/daily-activity/')({
	component: RouteComponent,
});

function RouteComponent() {
	const {
		activities,
		editingActivity,
		isFormOpen,
		addActivity,
		updateActivity,
		deleteActivity,
		openEditForm,
		openNewForm,
		closeForm,
		isLoadingActivities,
	} = useDailyActivities();

	const [progress] = useAtom(progressAtom);

	const categorySummaries = [
		{
			name: 'একাডেমিক',
			completed: progress?.academicAchivedPercentage,
			color: 'bg-emerald-400',
		},
		{
			name: 'ইবাদাহ',
			completed: progress?.ebadahAchivedPercentage,
			color: 'bg-pink-deep',
		},
		{
			name: 'এক্সারসাইজ',
			completed: progress?.exerciseAchivedPercentage,
			color: 'bg-amber-deep',
		},
		{
			name: 'টাস্ক',
			completed: progress?.taskAchivedPercentage,
			color: 'bg-teal-deep',
		},
	];

	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className='space-y-5'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'
			>
				<div>
					<div className='flex items-center gap-3 mb-2'>
						<div className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-deep flex items-center justify-center'>
							<Sparkles className='w-6 h-6 text-white' />
						</div>
						<div>
							<h1 className='font-display text-2xl md:text-3xl font-bold text-foreground'>
								Daily Activities
							</h1>
							<p className='text-muted-foreground text-sm flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								{today}
							</p>
						</div>
					</div>
				</div>
			</motion.div>
			<DailySummary categories={categorySummaries} streak={12} />
			{/* Section Header */}
			<div className='flex items-center justify-between mb-6'>
				<div>
					<h2 className='text-xl font-display font-semibold text-foreground'>
						Monthly Activities
					</h2>

					<p className='text-sm text-muted-foreground font-bangla'>
						{activities?.length} records
					</p>
				</div>
				<Button
					variant='hero'
					className='self-start md:self-auto bg-gradient-to-br from-primary to-deep'
					onClick={openNewForm}
				>
					<Plus className='w-4 h-4 mr-2' />
					Add Activity
				</Button>
			</div>
			{/* Activity List */}
			<ActivityAccordionList
				// @ts-ignore
				activities={activities as DailyActivity[]}
				onEdit={openEditForm}
				onDelete={deleteActivity}
				actionBtn={
					<Button
						variant='hero'
						className='mt-5 self-start md:self-auto bg-gradient-to-br from-primary to-deep'
						onClick={openNewForm}
					>
						<Plus className='w-4 h-4 mr-2' />
						Add Activity
					</Button>
				}
			/>
			{isLoadingActivities && (
				<>
					{new Array(10).fill(10).map((_, idx) => (
						<Skeleton key={idx} className='my-2 h-20' />
					))}
				</>
			)}
			{/* Form Dialog */}
			<Dialog open={isFormOpen} onOpenChange={(open) => !open && closeForm()}>
				<DialogContent className='!max-w-7xl !max-h-[80vh] overflow-y-auto bg-background border-border'>
					<DialogHeader>
						<DialogTitle className='font-display text-xl text-foreground'>
							{editingActivity ? 'Update Activity' : 'Add New Activity'}
							<span className='block text-sm font-normal text-muted-foreground mt-1'>
								{'Track your progress everyday'}
							</span>
						</DialogTitle>
					</DialogHeader>
					<DailyActivityForm
						onSubmit={addActivity}
						onEditSubmit={updateActivity}
						onCancel={closeForm}
						initialData={editingActivity || undefined}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
