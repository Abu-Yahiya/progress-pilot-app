import {
	DailyActivity,
	DailyActivityPagination,
	SortType,
} from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import {
	All_Daily_Activities_Query,
	Create_Daily_Activity_Mutation,
	Remove_Daily_Activity_Mutation,
	Update_Daily_Activity_Mutation,
} from '@/pages/_app/daily-activity/~module/gql-query/query';
import { DailyActivityFormSchema } from '@/pages/_app/daily-activity/~module/validationSchema';
import { userAtom } from '@/store/auth.atom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export const useDailyActivities = () => {
	const [session] = useAtom(userAtom);

	const {
		data,
		isLoading,
		refetch: onRefetchActivities,
	} = useQuery<{
		activitiesByOrgAndUser: DailyActivityPagination;
	}>({
		queryKey: ['all-activities'],
		queryFn: () =>
			gqlRequest<{
				activitiesByOrgAndUser: DailyActivityPagination;
			}>({
				query: All_Daily_Activities_Query,
				variables: {
					orgUid: import.meta.env.VITE_APP_ORG_UID,
					userId: session?.user?._id,
					input: {
						sort: SortType.Desc,
						sortBy: 'createdAt',
					},
				},
			}),
	});

	// const [activities, setActivities] =
	// 	useState<DailyActivity[]>(initialActivities);
	const [editingActivity, setEditingActivity] = useState<DailyActivity | null>(
		null
	);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const addActivity = useMutation({
		mutationFn: (data: DailyActivityFormSchema) =>
			gqlRequest({
				query: Create_Daily_Activity_Mutation,
				variables: {
					payload: {
						...data,
						orgUID: import.meta.env.VITE_APP_ORG_UID,
						user: session?.user?._id,
					},
				},
			}),
		onSuccess: () => {
			onRefetchActivities();
			setIsFormOpen(false);
			toast.success('Daily activity created successfully');
		},
		onError: () => toast.error('Failed to create daily activity'),
	});

	const updateActivity = useMutation({
		mutationFn: (data: DailyActivity) =>
			gqlRequest({
				query: Update_Daily_Activity_Mutation,
				variables: {
					payload: data,
					orgUid: import.meta.env.VITE_APP_ORG_UID,
					userId: session?.user?._id,
				},
			}),
		onSuccess: () => {
			onRefetchActivities();
			toast.success('Daily activity updated successfully');
			setEditingActivity(null);
			setIsFormOpen(false);
		},
		onError: () => toast.error('Failed to update daily activity'),
	});

	const deleteActivity = useMutation({
		mutationFn: (id: string) =>
			gqlRequest({
				query: Remove_Daily_Activity_Mutation,
				variables: {
					id,
				},
			}),
		onSuccess: () => {
			onRefetchActivities();
			toast.success('Daily activity deleted successfully');
			setIsFormOpen(false);
		},
		onError: () => toast.error('Failed to delete daily activity'),
	});

	const openEditForm = useCallback((activity: DailyActivity) => {
		setEditingActivity(activity);
		setIsFormOpen(true);
	}, []);

	const openNewForm = useCallback(() => {
		setEditingActivity(null);
		setIsFormOpen(true);
	}, []);

	const closeForm = useCallback(() => {
		setEditingActivity(null);
		setIsFormOpen(false);
	}, []);

	return {
		activities: data?.activitiesByOrgAndUser?.nodes!,
		isLoadingActivities: isLoading,
		editingActivity,
		isFormOpen,
		addActivity,
		updateActivity: updateActivity,
		deleteActivity,
		openEditForm,
		openNewForm,
		closeForm,
	};
};
