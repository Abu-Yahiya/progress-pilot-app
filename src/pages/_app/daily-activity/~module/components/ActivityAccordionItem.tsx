import { useAppConfirm } from '@/components/AppConfirm';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DailyActivity } from '@/gql/graphql';
import { format } from 'date-fns';
import {
	BookOpen,
	Dumbbell,
	Edit,
	Heart,
	LayoutGrid,
	Moon,
	Sun,
	Trash2,
} from 'lucide-react';
import { FC } from 'react';
import ActivityPortionItemCard from './ActivityPortionItemCard';

interface ActivityCardProps {
	activity: DailyActivity;
	onEdit: (activity: DailyActivity) => void;
	onDelete: any;
}

const ActivityAccordionItem: FC<ActivityCardProps> = ({
	activity,
	onEdit,
	onDelete,
}) => {
	const { show } = useAppConfirm();
	const formattedDate = activity.createdAt
		? format(new Date(activity.createdAt), 'EEEE, dd MMMM yyyy')
		: 'Invalid Date';

	const totalNamaj =
		(activity.ebadah?.namajWithJamath || 0) +
		(activity.ebadah?.extraNamaj || 0);
	// const totalJikir =
	// 	(activity.jikirAjkar?.istigfar || 0) +
	// 	(activity.jikirAjkar?.durudYunus || 0) +
	// 	(activity.jikirAjkar?.durud || 0) +
	// 	(activity.jikirAjkar?.doaTawhid || 0);
	const totalExercise =
		(activity.exercise?.pushUp || 0) +
		(activity.exercise?.squats || 0) +
		(activity.exercise?.seatUp || 0) +
		(activity.exercise?.jumpingJack || 0);

	// const taskItems = ['Propgress Pilot Learning Module Done'].map(
	// 	([data, index]) => ({ index })
	// );
	const exerciseItems = Object?.entries(activity?.exercise! ?? {})?.map(
		([key, value]) => ({
			key,
			label: exerciseLabels[key] || key,
			value,
			icon: exerciseIcons[key],
		})
	);
	const taskItems = activity?.it_task?.map((task, idx) => ({
		key: idx,
		label: <span className='!text-xs'>{task?.title?.slice(0, 50)}</span>,
		value: task?.progressScore,
		icon: LayoutGrid,
		status: task?.status,
	}));

	// Convert data to items for ActivityCard
	const ebadahItems = Object?.entries(activity?.ebadah! ?? {})?.map(
		([key, value]) => ({
			key,
			label: ebadahLabels[key] || key,
			value,
			icon: ebadahIcons[key],
		})
	);

	const jikirItems = Object?.entries(activity?.jikirAjkar! ?? {})?.map(
		([key, value]) => ({
			key,
			label: jikirLabels[key] || key,
			value,
			icon: Heart,
		})
	);

	return (
		<AccordionItem
			value={activity?._id!}
			className='border border-border/80 !cursor-pointer rounded-xl overflow-hidden shadow-soft mb-3 bg-card'
		>
			<AccordionTrigger className='px-4 py-4 hover:no-underline hover:bg-secondary/20 transition-colors'>
				<div className='flex items-center justify-between w-full pr-4'>
					<div className='flex items-center gap-4'>
						<div className='bg-gradient-to-br from-primary to-deep w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-soft'>
							<BookOpen className='w-5 h-5 text-primary-foreground' />
						</div>
						<div className='text-left'>
							<h3 className='font-display text-md font-semibold text-foreground'>
								{formattedDate}
							</h3>
							<div className='hidden md:flex items-center gap-2 mt-1'>
								<Badge
									variant='outline'
									className='text-xs bg-primary/10 text-primary border-primary/20'
								>
									Namaj: {totalNamaj}
								</Badge>
								<Badge
									variant='outline'
									className='text-xs bg-accent/10 text-accent border-accent/20'
								>
									Exercise: {totalExercise}
								</Badge>
								<Badge
									variant='outline'
									className='text-xs bg-deep/10 text-deep-glow  border-deep/20'
								>
									Task: {activity?.it_task?.length ?? 0}
								</Badge>
							</div>
						</div>
					</div>
					<div
						className='flex items-center gap-2'
						onClick={(e) => e.stopPropagation()}
					>
						<Button
							// variant='icon'
							size='icon'
							onClick={() => onEdit(activity)}
							className='bg-gradient-to-br from-primary to-deep h-8 w-8'
						>
							<Edit className='w-4 h-4' />
						</Button>
						<Button
							// variant='icon'
							size='icon'
							onClick={() =>
								show({
									title: 'Are you sure to delete activity ?',
									onConfirm() {
										onDelete.mutate(activity?._id!);
									},
								})
							}
							className='bg-gradient-to-br from-primary to-deep h-8 w-8 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive'
						>
							<Trash2 className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className='px-5 pb-5'>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 pt-2'>
					<ActivityPortionItemCard
						title='আমল এবং ইখলাস'
						icon={Moon}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-primary via-indigo-deep to-deep'
						items={ebadahItems!}
						delay={0.1}
					/>

					{/* Jikir Ajkar Card */}
					<ActivityPortionItemCard
						title='আজকার'
						icon={Heart}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-pink-deep via-rose-deep to-red-medium'
						items={jikirItems}
						delay={0.2}
					/>

					{/* Exercise Card */}
					<ActivityPortionItemCard
						title='এক্সারসাইজ'
						icon={Dumbbell}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-orange-deep via-amber-deep to-yellow-medium'
						// @ts-ignore
						items={exerciseItems!}
						delay={0.3}
					/>

					{/* it task */}
					<ActivityPortionItemCard
						title='আইটি টাস্ক'
						icon={LayoutGrid}
						iconColor='bg-white/20 text-white'
						// @ts-ignore
						items={taskItems}
						bgGradient='bg-gradient-to-r from-emerald-deep-1 via-emerald-deep-2 to-teal-deep'
						delay={0.3}
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default ActivityAccordionItem;

// Icons for specific activities
const ebadahIcons: Record<string, any> = {
	namajWithJamath: Moon,
	extraNamaj: Moon,
	ishraq: Sun,
	tahajjud: Moon,
	tilwat: BookOpen,
	hadith: BookOpen,
	readingBook: BookOpen,
	waqiyah: BookOpen,
	mulk: BookOpen,
	translation: BookOpen,
};

const exerciseIcons: Record<string, any> = {
	pushUp: Dumbbell,
	squats: Dumbbell,
	seatUp: Dumbbell,
	running: Dumbbell,
	jumpingJack: Dumbbell,
	plank: Dumbbell,
	dumbbleCurl: Dumbbell,
	others: Dumbbell,
};

// Label mappings
const ebadahLabels: Record<string, string> = {
	namajWithJamath: 'জামাতে নামাজ',
	extraNamaj: 'নফল নামাজ',
	ishraq: 'ইশরাক নামাজ',
	tahajjud: 'তাহাজ্জুদ নামাজ',
	tilwat: 'কোরআন তেলাওয়াত',
	translation: 'কোরআন অনুবাদ',
	hadith: 'হাদিস',
	readingBook: 'বই পড়া',
	waqiyah: 'সূরা ওয়াকিয়া',
	mulk: 'সূরা মুলক',
};

const jikirLabels: Record<string, string> = {
	istigfar: 'ইস্তিগফার',
	durudYunus: 'দুরুদে ইউনুস',
	durud: 'দুরূদ শরীফ',
	doaTawhid: 'জিকরুত তাওহীদ',
};

const exerciseLabels: Record<string, string> = {
	pushUp: 'পুশ আপ',
	squats: 'স্কোয়াটস',
	seatUp: 'সিট আপ',
	running: 'রানিং (কিমি)',
	jumpingJack: 'জাম্পিং জ্যাক',
	plank: 'প্ল্যাঙ্ক (মিনিট)',
	dumbbleCurl: 'ডাম্বেল কার্লস',
	others: 'অন্যান্য',
};
