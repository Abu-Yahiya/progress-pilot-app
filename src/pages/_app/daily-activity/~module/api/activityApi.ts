import { CreateDailyActivityDto } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import toast from 'react-hot-toast';
import { Create_Daily_Activity_Mutation } from '../gql-query/query';

export const activityApi = (onSuccess?: CallableFunction) => {
	const [session] = useAtom(userAtom);

	const createDailyActivity = useMutation({
		mutationFn: (payload: CreateDailyActivityDto) =>
			gqlRequest({
				query: Create_Daily_Activity_Mutation,
				variables: {
					payload: {
						...payload,
						orgUID: import.meta.env.VITE_APP_ORG_UID,
						user: session?.user?._id,
					},
				},
			}),
		onSuccess: () => {
			toast.success('Daily activity created successfully');
			onSuccess?.();
		},
		onError: () => toast.error('Failed to create daily activity'),
	});

	// const DailyActivity = useMutation({
	// 	mutationFn: (payload: DailyActivity) =>
	// 		gqlRequest({
	// 			query: Update_Daily_Activity_Mutation,
	// 			variables: {
	// 				payload: payload,
	// 				orgUid: import.meta.env.VITE_APP_ORG_UID,
	// 				userId: session?.user?._id,
	// 			},
	// 		}),

	// 	onSuccess: () => {
	// 		toast.success('Activity update has been success');
	// 		onSuccess?.();
	// 	},
	// 	onError: () => toast.error('Failed to update activity'),
	// });

	// const removeExpense = useMutation({
	// 	mutationFn: (id: string) =>
	// 		gqlRequest({
	// 			query: Remove_Expense_Mutation,
	// 			variables: {
	// 				input: {
	// 					key: '_id',
	// 					operator: 'eq',
	// 					value: id,
	// 				},
	// 			},
	// 		}),

	// 	onSuccess: () => {
	// 		onSuccess?.();
	// 		toast.success('Expense removed successfully!');
	// 	},
	// 	onError: () => {
	// 		toast.error('Failed to remove expense!');
	// 	},
	// });

	return {
		createDailyActivity,
		// removeExpense,
	};
};

// interface ExpenseApiPayloadType extends ExpenseFormStateType {
// 	_id?: string;
// 	orgUID: string;
// 	creator: string;
// 	statement?: string;
// }
