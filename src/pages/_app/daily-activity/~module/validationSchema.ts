import * as yup from 'yup';

export const dailyActivitySchema = yup.object().shape({
	ebadah: yup.object().shape({
		namajWithJamath: yup
			.number()
			.min(1)
			.max(5)
			.required()
			.label('জামাতে নামাজ'),
		extraNamaj: yup.number().min(0).nullable().label('Nafal নামাজ'),
		ishraq: yup.boolean().label('Ishraq'),
		tahajjud: yup.boolean().label('Tahajjud'),
		tilwat: yup.string().label('Tilwat'),
		hadith: yup.number().min(0).nullable().label('Hadith'),
		readingBook: yup.string().label('Book reading'),
		waqiyah: yup.boolean(),
		mulk: yup.boolean(),
		translation: yup.string().label('Translation'),
	}),
	jikirAjkar: yup.object().shape({
		istigfar: yup.number().min(0).nullable().label('Istigfar'),
		durudYunus: yup.number().min(0).nullable().label('Durude Yunus'),
		durud: yup.number().min(0).nullable().label('Durud'),
		doaTawhid: yup.number().min(0).nullable('Doay Tawhid'),
	}),
	exercise: yup.object().shape({
		pushUp: yup.number().min(0).nullable().label('Pushup'),
		squats: yup.number().min(0).nullable().label('Squats'),
		seatUp: yup.number().min(0).nullable().label('SeatUp'),
		running: yup.number().min(0).nullable().label('Runnig'),
		jumpingJack: yup.number().min(0).nullable().label('Jumping Jack'),
		plank: yup.number().min(0).nullable().label('Plank'),
		dumbbleCurl: yup.number().min(0).nullable().label('Dummble curl'),
		others: yup.string(),
	}),
	it: yup
		.array()
		.of(
			yup.object({
				title: yup.string().optional().label('Title'),
				description: yup.string().optional().label('Description'),
				progressScore: yup.number().required().label('Progress score'),
			})
		)
		.optional()
		.label('IT works'),
});

export type DailyActivityFormSchema = yup.InferType<typeof dailyActivitySchema>;
