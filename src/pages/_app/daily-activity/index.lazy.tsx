import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
	DailyActivity,
	EbadahInputDto,
	ExerciseInputDto,
	JikirInputDto,
} from '@/gql/graphql';
import { useDailyActivities } from '@/hooks/useDailyActivities';
import { DialogTitle } from '@radix-ui/react-dialog';
import { createLazyFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Calendar, Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import ActivityAccordionList from './~module/components/ActivityAccordionList';
import DailyActivityForm from './~module/components/DailyActivityForm';
import DailySummary from './~module/components/DailySummary';

export const Route = createLazyFileRoute('/_app/daily-activity/')({
	component: RouteComponent,
});

function RouteComponent() {
	// console.log(data?.activitiesByOrgAndUser?.__typename);
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

	// const handleSubmit = addActivity;

	// State for activities
	const [ebadah] = useState<EbadahInputDto>({
		namajWithJamath: null,
		extraNamaj: null,
		tilwat: null,
		hadith: null,
		readingBook: null,
		translation: null,
	});

	const [jikirAjkar] = useState<JikirInputDto>({
		istigfar: null,
		durudYunus: null,
		durud: 0,
		doaTawhid: null,
	});
	const [exercise] = useState<ExerciseInputDto>({
		pushUp: 0,
		squats: null,
		seatUp: null,
		running: null,
		jumpingJack: null,
		plank: null,
		dumbbleCurl: null,
		others: null,
	});

	const [tasks] = useState<any[]>([
		{
			id: '1',
			title: 'Complete project documentation',
			description: 'Write API docs',
			progressScore: 75,
		},
		{
			id: '2',
			title: 'Review pull requests',
			description: 'Code review for team',
			progressScore: 0,
		},
		{
			id: '3',
			title: 'Study React patterns',
			description: '',
			progressScore: 30,
		},
	]);

	// Calculate summaries for DailySummary
	const getCompletedCount = (
		data: EbadahInputDto | JikirInputDto | ExerciseInputDto,
		// @ts-ignore
	) => Object.values(data).filter((v) => v !== null && v > 0).length;

	const categorySummaries = [
		{
			name: 'Ebadah',
			completed: getCompletedCount(ebadah),
			total: Object.keys(ebadah).length,
			color: 'bg-emerald-400',
		},
		{
			name: 'Jikir',
			completed: getCompletedCount(jikirAjkar),
			total: Object.keys(jikirAjkar).length,
			color: 'bg-pink-400',
		},
		{
			name: 'Exercise',
			completed: getCompletedCount(exercise),
			total: Object.keys(exercise).length,
			color: 'bg-orange-400',
		},
		{
			name: 'Tasks',
			completed: tasks.filter((t) => t.progressScore === 100).length,
			total: tasks.length,
			color: 'bg-slate-300',
		},
	];

	const overallProgress = Math.round(
		categorySummaries.reduce(
			(acc, cat) => acc + (cat.completed / cat.total) * 100,
			0,
		) / categorySummaries.length,
	);

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
				<Button
					variant='hero'
					className='self-start md:self-auto bg-gradient-to-br from-primary to-deep'
					onClick={openNewForm}
				>
					<Plus className='w-4 h-4 mr-2' />
					Add Activity
				</Button>
			</motion.div>
			<DailySummary
				categories={categorySummaries}
				streak={12}
				overallProgress={overallProgress}
			/>
			{/* Section Header */}
			<div className='flex items-center justify-between mb-6'>
				<div>
					<h2 className='text-xl font-display font-semibold text-foreground'>
						Monthly Activities
					</h2>
					<p className='text-sm text-muted-foreground'>All Activities</p>
				</div>
				<p className='text-sm text-muted-foreground font-bangla'>
					{activities?.length} records
				</p>
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
