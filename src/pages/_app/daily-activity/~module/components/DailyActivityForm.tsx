import { Button } from '@/components/ui/button';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { DailyActivity } from '@/gql/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	BookOpen,
	Dumbbell,
	Heart,
	LayoutGrid,
	Loader2,
	Plus,
	Save,
	X,
} from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
	DailyActivityFormSchema,
	dailyActivitySchema,
} from '../validationSchema';
import EmptyTaskState from './EmptyTaskState';
import FormField from './FormField';

interface DailyActivityFormProps {
	onSubmit: any;
	onEditSubmit: any;
	onCancel?: () => void;
	initialData?: DailyActivity;
}

const DailyActivityForm = ({
	onCancel,
	initialData,
	onEditSubmit,
	onSubmit,
}: DailyActivityFormProps) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		control,
	} = useForm<DailyActivityFormSchema>({
		// @ts-ignore
		resolver: yupResolver(dailyActivitySchema),
		defaultValues: {
			ebadah: {
				namajWithJamath: initialData?.ebadah?.namajWithJamath! ?? null,
				extraNamaj: initialData?.ebadah?.extraNamaj ?? 0,
				ishraq: initialData?.ebadah?.ishraq ?? false,
				tahajjud: initialData?.ebadah?.tahajjud ?? false,
				tilwat: initialData?.ebadah?.tilwat ?? '',
				hadith: initialData?.ebadah?.hadith ?? 0,
				readingBook: initialData?.ebadah?.readingBook ?? '',
				waqiyah: initialData?.ebadah?.waqiyah ?? false,
				mulk: initialData?.ebadah?.mulk ?? false,
				translation: initialData?.ebadah?.translation ?? '',
			},
			jikirAjkar: {
				istigfar: initialData?.jikirAjkar?.istigfar ?? 0,
				durudYunus: initialData?.jikirAjkar?.durudYunus ?? 0,
				durud: initialData?.jikirAjkar?.durud ?? 0,
				doaTawhid: initialData?.jikirAjkar?.doaTawhid ?? 0,
			},
			exercise: {
				pushUp: initialData?.exercise?.pushUp ?? 0,
				squats: initialData?.exercise?.squats ?? 0,
				seatUp: initialData?.exercise?.seatUp ?? 0,
				running: initialData?.exercise?.running ?? 0,
				jumpingJack: initialData?.exercise?.jumpingJack ?? 0,
				plank: initialData?.exercise?.plank ?? 0,
				dumbbleCurl: initialData?.exercise?.dumbbleCurl ?? 0,
				others: initialData?.exercise?.others ?? '',
			},
			it_task: initialData?.it_task?.map((task) => ({
				title: task?.title ?? '',
				description: task?.description ?? '',
				progressScore: task?.progressScore ?? 0,
			})),
		},
	});

	const { append, remove, fields } = useFieldArray({
		name: 'it_task',
		control,
	});

	const handleSubmitActivity = (value: any) => {
		if (initialData?.ebadah?.namajWithJamath) {
			onEditSubmit.mutate({ ...value, _id: initialData?._id });
			console.log('object');
		} else {
			onSubmit.mutate(value);
		}
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitActivity)} className='space-y-6'>
			<Accordion
				type='single'
				collapsible
				defaultValue={'amal-section'}
				className='space-y-3'
			>
				<AccordionItem
					value={'amal-section'}
					className='bg-card rounded-xl px-2 shadow-card border border-border/50 animate-fade-in'
				>
					<AccordionTrigger className='px-4 hover:no-underline hover:bg-secondary/20 transition-colors'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-deep flex items-center justify-center text-primary-foreground'>
								<BookOpen className='w-5 h-5' />
							</div>
							<div>
								<h3 className='font-display text-lg font-semibold text-foreground'>
									আমল-ইখলাস
								</h3>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className='px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<FormField
							name='ebadah.namajWithJamath'
							label='Namaj with Jamath'
							labelBn='জামাতে নামাজ'
							type='number'
							register={register}
							errors={errors}
							required
							placeholder='0-5'
						/>
						<FormField
							name='ebadah.extraNamaj'
							label='Extra Namaj'
							labelBn='নফল নামাজ'
							type='number'
							register={register}
							errors={errors}
							placeholder='রাকাত সংখ্যা'
						/>
						<FormField
							name='ebadah.hadith'
							label='Hadith'
							labelBn='হাদিস পড়া'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='ebadah.ishraq'
							label='Ishraq'
							labelBn='ইশরাক'
							type='boolean'
							register={register}
							errors={errors}
							watch={watch as any}
							setValue={setValue as any}
						/>
						<FormField
							name='ebadah.tahajjud'
							label='Tahajjud'
							labelBn='তাহাজ্জুদ'
							type='boolean'
							register={register}
							errors={errors}
							watch={watch as any}
							setValue={setValue as any}
						/>
						<FormField
							name='ebadah.waqiyah'
							label='Surah Waqiyah'
							labelBn='সূরা ওয়াকিয়াহ'
							type='boolean'
							register={register}
							errors={errors}
							watch={watch as any}
							setValue={setValue as any}
						/>
						<FormField
							name='ebadah.mulk'
							label='Surah Mulk'
							labelBn='সূরা মুলক'
							type='boolean'
							register={register}
							errors={errors}
							watch={watch as any}
							setValue={setValue as any}
						/>
						<FormField
							name='ebadah.tilwat'
							label='Tilawat'
							labelBn='তিলাওয়াত'
							type='text'
							register={register}
							errors={errors}
							placeholder='সূরা/পারা নাম'
						/>
						<FormField
							name='ebadah.readingBook'
							label='Reading Book'
							labelBn='কিতাব পড়া'
							type='text'
							register={register}
							errors={errors}
							placeholder='বইয়ের নাম'
						/>
						<FormField
							name='ebadah.translation'
							label='Translation'
							labelBn='তরজমা'
							type='textarea'
							register={register}
							errors={errors}
							placeholder='আয়াত তরজমা বা নোট...'
						/>
					</AccordionContent>{' '}
				</AccordionItem>

				<AccordionItem
					value={'jikir-section'}
					className='bg-card rounded-xl px-2 shadow-card border border-border/50 animate-fade-in'
				>
					<AccordionTrigger className='px-4 hover:no-underline hover:bg-secondary/20 transition-colors'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-deep flex items-center justify-center text-primary-foreground'>
								<Heart className='w-5 h-5' />
							</div>
							<div>
								<h3 className='font-display text-lg font-semibold text-foreground'>
									জিকির ও আযকার
								</h3>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className='px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<FormField
							name='jikirAjkar.istigfar'
							label='Istigfar'
							labelBn='ইস্তেগফার'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='jikirAjkar.durudYunus'
							label='Durud Yunus'
							labelBn='দুরুদে ইউনুস'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='jikirAjkar.durud'
							label='Durud Sharif'
							labelBn='দুরুদ শরীফ'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='jikirAjkar.doaTawhid'
							label='Doa Tawhid'
							labelBn='দোয়া তাওহীদ'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem
					value={'exercise-section'}
					className='bg-card rounded-xl px-2 shadow-card border border-border/50 animate-fade-in'
				>
					<AccordionTrigger className='px-4 hover:no-underline hover:bg-secondary/20 transition-colors'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-deep flex items-center justify-center text-primary-foreground'>
								<Dumbbell className='w-5 h-5' />
							</div>
							<div>
								<h3 className='font-display text-lg font-semibold text-foreground'>
									এক্সারসাইজ
								</h3>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent className='px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						<FormField
							name='exercise.pushUp'
							label='Push Ups'
							labelBn='পুশ আপ'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='exercise.squats'
							label='Squats'
							labelBn='স্কোয়াট'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='exercise.seatUp'
							label='Sit Ups'
							labelBn='সিট আপ'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='exercise.running'
							label='Running (km)'
							labelBn='দৌড় (কিমি)'
							type='number'
							register={register}
							errors={errors}
							placeholder='কিমি'
						/>
						<FormField
							name='exercise.jumpingJack'
							label='Jumping Jacks'
							labelBn='জাম্পিং জ্যাক'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='exercise.plank'
							label='Plank (secs)'
							labelBn='প্ল্যাংক (সেকেন্ড)'
							type='number'
							register={register}
							errors={errors}
							placeholder='সেকেন্ড'
						/>
						<FormField
							name='exercise.dumbbleCurl'
							label='Dumbbell Curls'
							labelBn='ডাম্বেল কার্ল'
							type='number'
							register={register}
							errors={errors}
							placeholder='সংখ্যা'
						/>
						<FormField
							name='exercise.others'
							label='Others'
							labelBn='অন্যান্য'
							type='textarea'
							register={register}
							errors={errors}
							placeholder='অন্যান্য ব্যায়াম...'
						/>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem
					value={'task-section'}
					className='bg-card rounded-xl px-2 shadow-card border border-border/50 animate-fade-in'
				>
					<AccordionTrigger className='px-4 hover:no-underline hover:bg-secondary/20 transition-colors'>
						<div className='flex items-center gap-3'>
							<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-deep flex items-center justify-center text-primary-foreground'>
								<LayoutGrid className='w-5 h-5' />
							</div>
							<div>
								<h3 className='font-display text-lg font-semibold text-foreground'>
									টাস্ক
								</h3>
							</div>
						</div>{' '}
					</AccordionTrigger>
					<AccordionContent className='px-5 space-y-3'>
						{fields?.length ? (
							<>
								{fields?.map((_, idx) => (
									<div
										key={idx}
										className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-background px-4 py-5 rounded-md'
									>
										<FormField
											name={`it_task.${idx}.title`}
											label='Title'
											labelBn='টাইটেল'
											type='text'
											register={register}
											errors={errors}
											placeholder='টাইটেল'
										/>
										<FormField
											name={`it_task.${idx}.progressScore`}
											label='Progress Score'
											labelBn='প্রগ্রেস স্কোর'
											type='number'
											register={register}
											errors={errors}
											placeholder='সংখ্যা'
										/>
										<FormField
											name={`it_task.${idx}.description`}
											label='Description'
											labelBn='বিস্তারিত'
											type='textarea'
											register={register}
											errors={errors}
											placeholder='বিস্তারিত'
										/>
										<Button variant={'destructive'} onClick={() => remove(idx)}>
											Remove
										</Button>
									</div>
								))}
							</>
						) : (
							<EmptyTaskState
								onAddTask={() =>
									append({
										title: '',
										description: '',
										progressScore: 0,
									})
								}
							/>
						)}
					</AccordionContent>
					{fields?.length ? (
						<Button
							onClick={() =>
								append({
									title: '',
									description: '',
									progressScore: 0,
								})
							}
							className='flex mt-0 ml-5 mt-2'
						>
							<Plus /> Add Task
						</Button>
					) : null}
				</AccordionItem>
			</Accordion>

			{/* Submit Buttons */}
			<div className='flex justify-end gap-3 pt-4'>
				{onCancel && (
					<Button
						type='button'
						variant='destructive'
						onClick={onCancel}
						className='gap-2'
					>
						<X className='w-4 h-4' />
						বাতিল
					</Button>
				)}
				<Button
					type='submit'
					// variant='primary'
					disabled={onSubmit.isPending}
					className='gap-2'
				>
					{onSubmit.isPending || onEditSubmit.isPending ? (
						<Loader2 className='animate-spin' />
					) : (
						<Save className='w-4 h-4' />
					)}
					{onSubmit.isPending || onEditSubmit.isPending ? 'Saving...' : 'Save'}
				</Button>
			</div>
		</form>
	);
};

export default DailyActivityForm;
