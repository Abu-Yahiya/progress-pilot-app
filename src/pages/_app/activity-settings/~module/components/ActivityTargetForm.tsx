import FormField from '@/components/common/FormField';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ActivitySettings } from '@/gql/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import {
	BookOpen,
	Dumbbell,
	Heart,
	Loader2,
	MonitorCog,
	Save,
} from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DailyTargetActivityFormSchema } from '../validation.form.schema';

interface DailyActivityTargetFormProps {
	onSubmit: any;
	initialData?: ActivitySettings;
	isLoading: boolean;
}

const DailyActivityTargetForm = ({
	initialData,
	onSubmit,
	isLoading,
}: DailyActivityTargetFormProps) => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<any>({
		// @ts-ignore
		resolver: yupResolver(DailyTargetActivityFormSchema),
		defaultValues: {
			ebadahTarget: {
				namajWithJamath: initialData?.ebadahTarget?.namajWithJamath! ?? null,
				extraNamaj: initialData?.ebadahTarget?.extraNamaj ?? 0,
				tilwat: {
					count: initialData?.ebadahTarget?.tilwat?.count ?? 0,
					type: initialData?.ebadahTarget?.tilwat?.type!,
					description: initialData?.ebadahTarget?.tilwat?.description!,
				},
				hadith: initialData?.ebadahTarget?.hadith ?? 0,
				readingBook: {
					count: initialData?.ebadahTarget?.readingBook?.count ?? 0,
					description: initialData?.ebadahTarget?.readingBook?.description!,
				},
				translation: {
					count: initialData?.ebadahTarget?.translation?.count ?? 0,
					type: initialData?.ebadahTarget?.translation?.type!,
					description: initialData?.ebadahTarget?.translation?.description!,
				},
				tafsir: {
					count: initialData?.ebadahTarget?.tafsir?.count ?? 0,
					description: initialData?.ebadahTarget?.tafsir?.description!,
				},
			},
			jikirAjkarTarget: {
				istigfar: initialData?.jikirAjkarTarget?.istigfar ?? 0,
				durudYunus: initialData?.jikirAjkarTarget?.durudYunus ?? 0,
				durud: initialData?.jikirAjkarTarget?.durud ?? 0,
				doaTawhid: initialData?.jikirAjkarTarget?.doaTawhid ?? 0,
				ishraq: initialData?.jikirAjkarTarget?.ishraq ?? false,
				tahajjud: initialData?.jikirAjkarTarget?.tahajjud ?? false,
				waqiyah: initialData?.jikirAjkarTarget?.waqiyah ?? false,
				mulk: initialData?.jikirAjkarTarget?.mulk ?? false,
				kahf: initialData?.jikirAjkarTarget?.kahf ?? false,
			},
			exerciseTarget: {
				pushUp: initialData?.exerciseTarget?.pushUp ?? 0,
				squats: initialData?.exerciseTarget?.squats ?? 0,
				seatUp: initialData?.exerciseTarget?.seatUp ?? 0,
				running: initialData?.exerciseTarget?.running ?? 0,
				jumpingJack: initialData?.exerciseTarget?.jumpingJack ?? 0,
				plank: initialData?.exerciseTarget?.plank ?? 0,
				dumbbleCurl: initialData?.exerciseTarget?.dumbbleCurl ?? 0,
			},
		},
	});

	useEffect(() => {
		setValue('ebadahTarget', initialData?.ebadahTarget);
		setValue('jikirAjkarTarget', initialData?.jikirAjkarTarget);
		setValue('exerciseTarget', initialData?.exerciseTarget);
	}, [initialData]);

	const handleSubmitActivity = (value: any) => {
		onSubmit(value);
	};

	return (
		<form onSubmit={handleSubmit(handleSubmitActivity)} className='space-y-6'>
			{/* {JSON.stringify(errors, null, 2)} */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex flex-wrap items-center justify-between gap-4 mb-6'
			>
				<div>
					<div className='flex items-center gap-3 mb-2'>
						<div className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-deep flex items-center justify-center'>
							<MonitorCog className='w-6 h-6 text-white' />
						</div>
						<div>
							<h1 className='font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground'>
								Daily Target
							</h1>
						</div>
					</div>
				</div>
				<Button
					variant='hero'
					className='self-start md:self-auto bg-gradient-to-br from-primary to-deep'
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader2 className='animate-spin' />
					) : (
						<Save className='w-4 h-4' />
					)}
					{isLoading ? 'Saving...' : 'Save'}
				</Button>
			</motion.div>
			<Accordion
				type='single'
				defaultValue={'amal-section'}
				className='space-y-3'
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
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
										একাডেমিক
									</h3>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className='px-5 pb-5'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								<FormField
									name='ebadahTarget.namajWithJamath'
									label='Namaj with Jamath'
									labelBn='জামাতে নামাজ'
									type='number'
									register={register}
									errors={errors}
									required
									placeholder='0-5'
									max={5}
								/>

								<FormField
									name='ebadahTarget.extraNamaj'
									label='Extra Namaj'
									labelBn='নফল নামাজ'
									type='number'
									register={register}
									errors={errors}
									placeholder='রাকাত সংখ্যা'
								/>
								<FormField
									name='ebadahTarget.hadith'
									label='Hadith'
									labelBn='হাদিস পড়া'
									type='number'
									register={register}
									errors={errors}
									placeholder='সংখ্যা'
								/>
							</div>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-4'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-3 py-4 rounded-md bg-primary/20'>
									<FormField
										name='ebadahTarget.tilwat.count'
										label='Tilawat'
										labelBn='তিলাওয়াত'
										type='number'
										register={register}
										errors={errors}
										placeholder='কত পৃষ্ঠা ?'
									/>
									<FormField
										name='ebadahTarget.tilwat.type'
										label='Ayah/Page/Para'
										labelBn='আয়াহ/পেজ/পারা'
										type='options'
										options={[
											{
												label: 'Ayah',
												value: 'Ayah',
											},
											{ label: 'Page', value: 'Page' },
											{
												label: 'Para',
												value: 'Para',
											},
										]}
										register={register}
										errors={errors}
										placeholder='আয়াহ/পেজ/পারা'
									/>
								</div>
								<div className='grid grid-cols-1 gap-4 px-3 py-4 rounded-md bg-primary/20'>
									<FormField
										name='ebadahTarget.tafsir.count'
										label='Tafsir'
										labelBn='তাফসীর'
										type='number'
										register={register}
										errors={errors}
										placeholder='কত পৃষ্ঠা ?'
									/>
								</div>
							</div>
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-4'>
								<div className='grid grid-cols-1 gap-4 px-3 py-4 rounded-md bg-primary/20'>
									<FormField
										name='ebadahTarget.readingBook.count'
										label='Reading Book'
										labelBn='বই পড়া'
										type='number'
										register={register}
										errors={errors}
										placeholder='কত পৃষ্ঠা ?'
									/>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-3 py-4 rounded-md bg-primary/20'>
									<FormField
										name='ebadahTarget.translation.count'
										label='Translation'
										labelBn='কোরআন অনুবাদ'
										type='number'
										register={register}
										errors={errors}
										placeholder='কত পৃষ্ঠা ?'
									/>
									<FormField
										name='ebadahTarget.translation.type'
										label='Ayah/Page/Para'
										labelBn='আয়াহ/পেজ/পারা'
										type='options'
										options={[
											{
												label: 'Ayah',
												value: 'Ayah',
											},
											{ label: 'Page', value: 'Page' },
											{
												label: 'Para',
												value: 'Para',
											},
										]}
										register={register}
										errors={errors}
										placeholder='আয়াহ/পেজ/পারা'
									/>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{' '}
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
										ইবাদাহ
									</h3>
								</div>
							</div>
						</AccordionTrigger>
						<AccordionContent className='px-5 pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
							<FormField
								name='jikirAjkarTarget.istigfar'
								label='Istigfar'
								labelBn='ইস্তেগফার'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='jikirAjkarTarget.durudYunus'
								label='Durud Yunus'
								labelBn='দুরুদে ইউনুস'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='jikirAjkarTarget.durud'
								label='Durud Sharif'
								labelBn='দুরুদ শরীফ'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='jikirAjkarTarget.doaTawhid'
								label='Doa Tawhid'
								labelBn='দোয়া তাওহীদ'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='jikirAjkarTarget.ishraq'
								label='Ishraq'
								labelBn='ইশরাক'
								type='boolean'
								register={register}
								errors={errors}
								watch={watch as any}
								setValue={setValue as any}
							/>
							<FormField
								name='jikirAjkarTarget.tahajjud'
								label='Tahajjud'
								labelBn='তাহাজ্জুদ'
								type='boolean'
								register={register}
								errors={errors}
								watch={watch as any}
								setValue={setValue as any}
							/>
							<FormField
								name='jikirAjkarTarget.waqiyah'
								label='Surah Waqiyah'
								labelBn='সূরা ওয়াকিয়াহ'
								type='boolean'
								register={register}
								errors={errors}
								watch={watch as any}
								setValue={setValue as any}
							/>
							<FormField
								name='jikirAjkarTarget.mulk'
								label='Surah Mulk'
								labelBn='সূরা মুলক'
								type='boolean'
								register={register}
								errors={errors}
								watch={watch as any}
								setValue={setValue as any}
							/>
							<FormField
								name='jikirAjkarTarget.kahf'
								label='Surah Kahf'
								labelBn='সূরা কাহ্ফ '
								type='boolean'
								register={register}
								errors={errors}
								watch={watch as any}
								setValue={setValue as any}
							/>
						</AccordionContent>
					</AccordionItem>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{' '}
					<AccordionItem
						value={'exerciseTarget-section'}
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
								name='exerciseTarget.pushUp'
								label='Push Ups'
								labelBn='পুশ আপ'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='exerciseTarget.squats'
								label='Squats'
								labelBn='স্কোয়াট'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='exerciseTarget.seatUp'
								label='Sit Ups'
								labelBn='সিট আপ'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='exerciseTarget.running'
								label='Running (km)'
								labelBn='দৌড় (কিমি)'
								type='number'
								register={register}
								errors={errors}
								placeholder='কিমি'
							/>
							<FormField
								name='exerciseTarget.jumpingJack'
								label='Jumping Jacks'
								labelBn='জাম্পিং জ্যাক'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
							<FormField
								name='exerciseTarget.plank'
								label='Plank (secs)'
								labelBn='প্ল্যাংক (সেকেন্ড)'
								type='number'
								register={register}
								errors={errors}
								placeholder='সেকেন্ড'
							/>
							<FormField
								name='exerciseTarget.dumbbleCurl'
								label='Dumbbell Curls'
								labelBn='ডাম্বেল কার্ল'
								type='number'
								register={register}
								errors={errors}
								placeholder='সংখ্যা'
							/>
						</AccordionContent>
					</AccordionItem>
				</motion.div>
			</Accordion>

			{/* Submit Buttons */}
			{/* <div className='flex justify-end gap-3 pt-4'>
				<Button
					type='submit'
					// variant='primary'
					disabled={onSubmit.isPending}
					className='gap-2'
				>
					{onSubmit.isPending ? (
						<Loader2 className='animate-spin' />
					) : (
						<Save className='w-4 h-4' />
					)}
					{onSubmit.isPending ? 'Saving...' : 'Save'}
				</Button>
			</div> */}
		</form>
	);
};

export default DailyActivityTargetForm;
