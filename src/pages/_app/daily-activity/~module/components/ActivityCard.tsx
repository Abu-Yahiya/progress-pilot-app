import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
	BookOpen,
	Check,
	Dumbbell,
	Edit,
	Heart,
	Moon,
	Sun,
	Trash2,
	X,
} from 'lucide-react';
import { useState } from 'react';
import ActivityPortionItemCard from './ActivityPortionItemCard';
import { DailyActivity } from './types';

interface ActivityCardProps {
	activity: DailyActivity;
	onEdit: (activity: DailyActivity) => void;
	onDelete: (id: string) => void;
}

const StatItem = ({
	label,
	labelBn,
	value,
	isBoolean = false,
}: {
	label: string;
	labelBn: string;
	value: any;
	isBoolean?: boolean;
}) => {
	if (value === undefined || value === null || value === '' || value === 0)
		return null;

	return (
		<div className='flex items-center justify-between py-2 px-3 dark:bg-muted bg-primary/10 rounded-lg'>
			<span className='text-sm text-muted-foreground'>
				{label} <span className='font-bangla'>({labelBn})</span>
			</span>
			{isBoolean ? (
				value ? (
					<Check className='w-4 h-4 text-primary' />
				) : (
					<X className='w-4 h-4 text-muted-foreground' />
				)
			) : (
				<span className='font-semibold text-foreground'>{value}</span>
			)}
		</div>
	);
};

const ActivityCard = ({ activity, onEdit, onDelete }: ActivityCardProps) => {
	const formattedDate = activity.createdAt
		? format(new Date(activity.createdAt), 'EEEE, dd MMMM yyyy')
		: 'Invalid Date';

	const totalNamaj =
		(activity.ebadah?.namajWithJamath || 0) +
		(activity.ebadah?.extraNamaj || 0);
	const totalJikir =
		(activity.jikirAjkar?.istigfar || 0) +
		(activity.jikirAjkar?.durudYunus || 0) +
		(activity.jikirAjkar?.durud || 0) +
		(activity.jikirAjkar?.doaTawhid || 0);
	const totalExercise =
		(activity.exercise?.pushUp || 0) +
		(activity.exercise?.squats || 0) +
		(activity.exercise?.seatUp || 0) +
		(activity.exercise?.jumpingJack || 0);

	// State for activities
	const [ebadah, setEbadah] = useState<EbadahData>({
		namajWithJamath: null,
		extraNamaj: 1,
		ishraq: null,
		tahajjud: null,
		tilwat: null,
		hadith: null,
		readingBook: null,
		waqiyah: null,
		mulk: null,
		translation: null,
	});

	const [jikirAjkar] = useState<JikirAjkarData>({
		istigfar: null,
		durudYunus: null,
		durud: 5,
		doaTawhid: null,
	});
	const [exercise] = useState<any>({
		pushUp: 5,
		squats: null,
		seatUp: null,
		running: null,
		jumpingJack: null,
		plank: null,
		dumbbleCurl: null,
		others: null,
	});
	const exerciseItems = Object.entries(exercise).map(([key, value]) => ({
		key,
		label: exerciseLabels[key] || key,
		value,
		icon: exerciseIcons[key],
	}));

	// Convert data to items for ActivityCard
	const ebadahItems = Object.entries(ebadah).map(([key, value]) => ({
		key,
		label: ebadahLabels[key] || key,
		value,
		icon: ebadahIcons[key],
	}));

	const jikirItems = Object.entries(jikirAjkar).map(([key, value]) => ({
		key,
		label: jikirLabels[key] || key,
		value,
		icon: Heart,
	}));

	return (
		<AccordionItem
			value={activity._id}
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
									নামাজ: {totalNamaj}
								</Badge>
								<Badge
									variant='outline'
									className='text-xs bg-accent/10 text-accent border-accent/20'
								>
									জিকির: {totalJikir}
								</Badge>
								<Badge
									variant='outline'
									className='text-xs bg-deep/10 text-deep-glow  border-deep/20'
								>
									ব্যায়াম: {totalExercise}
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
							onClick={() => onDelete(activity._id)}
							className='bg-gradient-to-br from-primary to-deep h-8 w-8 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive'
						>
							<Trash2 className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className='px-5 pb-5'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-2'>
					<ActivityPortionItemCard
						title='Ebadah'
						icon={Moon}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500'
						items={ebadahItems}
						delay={0.1}
					/>

					{/* Jikir Ajkar Card */}
					<ActivityPortionItemCard
						title='Jikir Ajkar'
						icon={Heart}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-pink-600 via-rose-500 to-red-400'
						items={jikirItems}
						delay={0.2}
					/>

					{/* Exercise Card */}
					<ActivityPortionItemCard
						title='Exercise'
						icon={Dumbbell}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400'
						// @ts-ignore
						items={exerciseItems}
						delay={0.3}
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default ActivityCard;
// Activity data types
interface EbadahData {
	namajWithJamath: number | null;
	extraNamaj: number | null;
	ishraq: number | null;
	tahajjud: number | null;
	tilwat: number | null;
	hadith: number | null;
	readingBook: number | null;
	waqiyah: number | null;
	mulk: number | null;
	translation: number | null;
}

interface JikirAjkarData {
	istigfar: number | null;
	durudYunus: number | null;
	durud: number | null;
	doaTawhid: number | null;
}

interface ExerciseData {
	pushUp: number | null;
	squats: number | null;
	seatUp: number | null;
	running: number | null;
	jumpingJack: number | null;
	plank: number | null;
	dumbbleCurl: number | null;
	others: number | null;
}

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
	namajWithJamath: 'Namaj with Jamath',
	extraNamaj: 'Extra Namaj',
	ishraq: 'Ishraq Prayer',
	tahajjud: 'Tahajjud Prayer',
	tilwat: 'Quran Tilawat',
	hadith: 'Hadith Reading',
	readingBook: 'Islamic Book',
	waqiyah: 'Surah Waqiyah',
	mulk: 'Surah Mulk',
	translation: 'Quran Translation',
};

const jikirLabels: Record<string, string> = {
	istigfar: 'Istigfar',
	durudYunus: 'Durud Yunus',
	durud: 'Durud Sharif',
	doaTawhid: 'Doa Tawhid',
};

const exerciseLabels: Record<string, string> = {
	pushUp: 'Push Ups',
	squats: 'Squats',
	seatUp: 'Sit Ups',
	running: 'Running (min)',
	jumpingJack: 'Jumping Jacks',
	plank: 'Plank (min)',
	dumbbleCurl: 'Dumbbell Curls',
	others: 'Other Exercises',
};
