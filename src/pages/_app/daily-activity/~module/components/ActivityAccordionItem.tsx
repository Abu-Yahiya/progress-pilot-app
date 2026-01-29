import { useAppConfirm } from '@/components/AppConfirm';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActivitySettings, DailyActivity } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { My_Activity_Target_Settings } from '@/pages/_app/activity-settings/~module/gql-query/query.gql';
import { userAtom } from '@/store/auth.atom';
import { progressAtom } from '@/store/progress.atom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import {
	BookOpen,
	BookOpenText,
	Dumbbell,
	Edit,
	Heart,
	LayoutGrid,
	Moon,
	NotebookPen,
	ShieldCheck,
	Sun,
	SunMoon,
	Trash2,
} from 'lucide-react';
import { FC, useEffect } from 'react';
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
	const [, setProgress] = useAtom(progressAtom);

	const { show } = useAppConfirm();
	const [session] = useAtom(userAtom);

	const formattedDate = activity.createdAt
		? format(new Date(activity.createdAt), 'EEEE, dd MMMM yyyy')
		: 'Invalid Date';

	const { data: targetSettings } = useQuery({
		queryKey: ['my-activity-settings-in-activity-page'],
		queryFn: async () => {
			const res = await gqlRequest<{ myActivitySetting: ActivitySettings }>({
				query: My_Activity_Target_Settings,
				variables: {
					orgUid: import.meta.env.VITE_APP_ORG_UID,
					userId: session?.user?._id,
				},
			});
			return res?.myActivitySetting;
		},
	});

	// helpers
	const getValue = (value: any) => value?.count ?? value ?? 0;
	const getTarget = (target: any) => target?.count ?? target ?? 0;
	const calcAchievement = (value: number, target: number) =>
		target > 0 ? (100 / target) * value : 0;

	// academic percantage
	let academicTotalPercentage = 0;

	Object.entries(activity?.ebadah ?? {}).map(([key, rawValue]) => {
		const value = getValue(rawValue);
		// @ts-ignore
		const target = getTarget(targetSettings?.ebadahTarget?.[key]!);

		return (academicTotalPercentage =
			academicTotalPercentage + calcAchievement(value, target));
	});

	const academicAchivementPercentage = Math.ceil(
		(100 / 700) * academicTotalPercentage,
	);

	// ebadah percentage
	let ebadahTotalPercentage = 0;

	Object.entries(activity?.jikirAjkar ?? {}).map(([key, rawValue]) => {
		const value = getValue(rawValue);
		// @ts-ignore
		const target = getTarget(targetSettings?.jikirAjkarTarget?.[key]!);

		return (ebadahTotalPercentage =
			ebadahTotalPercentage + calcAchievement(value, target));
	});

	const ebadahAchivementPercentage = Math.ceil(
		(100 / 800) * ebadahTotalPercentage,
	);

	// exercise percentage
	let exerciseTotalPercentage = 0;

	Object.entries(activity?.exercise ?? {}).map(([key, rawValue]) => {
		const value = getValue(rawValue);
		// @ts-ignore
		const target = getTarget(targetSettings?.exerciseTarget?.[key]!);

		return (exerciseTotalPercentage =
			exerciseTotalPercentage + calcAchievement(value, target));
	});

	const exerciseAchivementPercentage = Math.ceil(
		(100 / 600) * exerciseTotalPercentage,
	);

	// task percentage
	let taskTotalPercentage = 0;

	activity?.it_task?.map((task) => {
		return (taskTotalPercentage = taskTotalPercentage + task?.progressScore!);
	});

	const taskAchivementPercentage =
		(100 / (100 * activity?.it_task?.length!)) * taskTotalPercentage || 0;

	// set to store
	useEffect(() => {
		setProgress({
			academicAchivedPercentage: academicAchivementPercentage,
			ebadahAchivedPercentage: ebadahAchivementPercentage,
			exerciseAchivedPercentage: exerciseAchivementPercentage,
			taskAchivedPercentage: taskAchivementPercentage,
			todaysTotalAchivedPercentage:
				(100 / 400) *
				(academicAchivementPercentage +
					ebadahAchivementPercentage +
					exerciseAchivementPercentage +
					taskAchivementPercentage),
		});
	}, [
		academicAchivementPercentage,
		ebadahAchivementPercentage,
		exerciseAchivementPercentage,
		taskAchivementPercentage,
	]);

	// items
	const ebadahItems = Object?.entries(activity?.ebadah! ?? {})?.map(
		([key, value]) => ({
			key,
			label: ebadahLabels[key] || key,
			// @ts-ignore
			value: value?.count ?? value,
			target:
				// @ts-ignore
				targetSettings?.ebadahTarget?.[key]?.count ??
				// @ts-ignore
				targetSettings?.ebadahTarget?.[key] | 0,
			icon: ebadahIcons[key],
		}),
	);

	const jikirItems = Object?.entries(activity?.jikirAjkar! ?? {})?.map(
		([key, value]) => ({
			key,
			label: jikirLabels[key] || key,
			value,
			// @ts-ignore
			target: targetSettings?.jikirAjkarTarget?.[key],
			icon: jikrIcons[key],
		}),
	);

	const exerciseItems = Object?.entries(activity?.exercise! ?? {})?.map(
		([key, value]) => ({
			key,
			label: exerciseLabels[key] || key,
			value,
			// @ts-ignore
			target: targetSettings?.exerciseTarget?.[key],
			icon: exerciseIcons[key],
		}),
	);
	const taskItems = activity?.it_task?.map((task, idx) => ({
		key: idx,
		label: <span className='!text-xs'>{task?.title?.slice(0, 50)}</span>,
		value: task?.progressScore,
		icon: LayoutGrid,
		status: task?.status,
	}));

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
						<div className='text-left space-y-3'>
							<h3 className='font-display text-md font-semibold text-foreground'>
								{formattedDate}
							</h3>
							<div className='hidden md:flex items-center gap-2 mt-1'>
								<Badge
									variant='outline'
									className='text-sm bg-primary/10 text-primary border-primary/20'
								>
									একাডেমিক : {academicAchivementPercentage}%
								</Badge>
								<Badge
									variant='outline'
									className='text-sm bg-pink-deep/10 text-pink-deep border-pink-deep/20'
								>
									ইবাদাহ: {ebadahAchivementPercentage}%
								</Badge>
								<Badge
									variant='outline'
									className='text-sm bg-orange-deep/10 text-orange-deep  border-orange-deep/20'
								>
									এক্সারসাইজ: {exerciseAchivementPercentage} %
								</Badge>
								<Badge
									variant='outline'
									className='text-sm bg-teal-deep/10 text-teal-deep  border-teal-deep/20'
								>
									টাস্ক: {taskAchivementPercentage} %
								</Badge>
							</div>
						</div>
					</div>
					<div
						className='flex items-center gap-2'
						onClick={(e) => e.stopPropagation()}
					>
						<Button
							variant='accent'
							size='icon'
							onClick={() => onEdit(activity)}
							className='h-8 w-8'
						>
							<Edit className='w-4 h-4' />
						</Button>
						<Button
							variant='destructive'
							size='icon'
							onClick={() =>
								show({
									title: 'Are you sure to delete activity ?',
									onConfirm() {
										onDelete.mutate(activity?._id!);
									},
								})
							}
							className='h-8 w-8 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive'
						>
							<Trash2 className='w-4 h-4' />
						</Button>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className='px-5 pb-5'>
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 pt-2'>
					<ActivityPortionItemCard
						title='একাডেমিক'
						icon={NotebookPen}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-primary via-indigo-deep to-deep'
						items={ebadahItems}
						delay={0.1}
						achivedPercentage={academicAchivementPercentage}
					/>

					{/* Jikir Ajkar Card */}
					<ActivityPortionItemCard
						title='ইবাদাহ'
						icon={Heart}
						iconColor='bg-white/20 text-white'
						bgGradient='bg-gradient-to-r from-pink-deep via-rose-deep to-red-medium'
						items={jikirItems}
						delay={0.2}
						achivedPercentage={ebadahAchivementPercentage}
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
						achivedPercentage={exerciseAchivementPercentage}
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
						achivedPercentage={taskAchivementPercentage}
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
	kajaNamaj: Moon,
	extraNamaj: Moon,
	tilwat: BookOpenText,
	hadith: BookOpenText,
	readingBook: BookOpen,
	translation: BookOpenText,
	tafsir: BookOpenText,
};
const jikrIcons: Record<string, any> = {
	istigfar: Heart,
	durudYunus: Heart,
	durud: Heart,
	doaTawhid: Heart,
	ishraq: Sun,
	tahajjud: SunMoon,
	waqiyah: BookOpenText,
	mulk: BookOpenText,
	kahf: ShieldCheck,
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
	kajaNamaj: 'কাজা নামাজ',
	extraNamaj: 'নফল নামাজ',
	tilwat: 'কোরআন তেলাওয়াত',
	translation: 'কোরআন অনুবাদ',
	hadith: 'হাদিস',
	readingBook: 'বই পড়া',
	tafsir: 'তাফসীর',
};

const jikirLabels: Record<string, string> = {
	istigfar: 'ইস্তিগফার',
	durudYunus: 'দুরুদে ইউনুস',
	durud: 'দুরূদ শরীফ',
	doaTawhid: 'জিকরুত তাওহীদ',
	ishraq: 'ইশরাক নামাজ',
	tahajjud: 'তাহাজ্জুদ নামাজ',
	waqiyah: 'সূরা ওয়াকিয়া',
	mulk: 'সূরা মুলক',
	kahf: 'সূরা কাহ্ফ',
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
