import * as yup from 'yup';

export const DailyTargetActivityFormSchema = yup.object().shape({
	ebadahTarget: yup
		.object()
		.shape({
			namajWithJamath: yup
				.number()
				.min(1)
				.max(5)
				.required('This field is required')
				.label('জামাতে নামাজ'),
			extraNamaj: yup.number().min(0).nullable().label('Nafal নামাজ'),

			tilwat: yup
				.object()
				.shape({
					count: yup.number().nullable().optional().label('Count'),
					type: yup.string().nullable().optional().label('Ayah/Page/Para'),
				})
				.nullable()
				.optional(),
			hadith: yup.number().min(0).nullable().label('Hadith'),
			readingBook: yup
				.object()
				.shape({
					count: yup.number().nullable().optional().label('Page'),
				})
				.nullable()
				.optional(),

			translation: yup
				.object()
				.shape({
					count: yup.number().nullable().optional().label('Count'),
					type: yup.string().nullable().optional().label('Ayah/Page/Para'),
				})
				.nullable()
				.optional(),
			tafsir: yup
				.object()
				.shape({
					count: yup.number().nullable().optional().label('Count'),
				})
				.nullable()
				.optional(),
		})
		.nullable()
		.optional(),
	jikirAjkarTarget: yup
		.object()
		.shape({
			istigfar: yup.number().min(0).nullable().label('Istigfar'),
			durudYunus: yup.number().min(0).nullable().label('Durude Yunus'),
			durud: yup.number().min(0).nullable().label('Durud'),
			doaTawhid: yup.number().min(0).nullable('Doay Tawhid'),
			ishraq: yup.boolean().nullable().optional().label('Ishraq'),
			tahajjud: yup.boolean().nullable().optional().label('Tahajjud'),
			waqiyah: yup.boolean().nullable().optional(),
			mulk: yup.boolean().nullable().optional(),
			kahf: yup.boolean().nullable().optional(),
		})
		.nullable()
		.optional(),
	exerciseTarget: yup
		.object()
		.shape({
			pushUp: yup.number().min(0).nullable().label('Pushup'),
			squats: yup.number().min(0).nullable().label('Squats'),
			seatUp: yup.number().min(0).nullable().label('SeatUp'),
			running: yup.number().min(0).nullable().label('Runnig'),
			jumpingJack: yup.number().min(0).nullable().label('Jumping Jack'),
			plank: yup.number().min(0).nullable().label('Plank'),
			dumbbleCurl: yup.number().min(0).nullable().label('Dummble curl'),
		})
		.nullable()
		.optional(),
});

export type DailyTargetActivityFormSchemaType = yup.InferType<
	typeof DailyTargetActivityFormSchema
>;
