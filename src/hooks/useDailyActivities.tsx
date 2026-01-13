import { DailyActivityPagination, SortType } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { DailyActivity } from '@/pages/_app/daily-activity/~module/components/types';
import {
	All_Daily_Activities_Query,
	Create_Daily_Activity_Mutation,
} from '@/pages/_app/daily-activity/~module/gql-query/query';
import { DailyActivityFormSchema } from '@/pages/_app/daily-activity/~module/validationSchema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export const useDailyActivities = () => {
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
					userId: import.meta.env.VITE_APP_USER_ID,
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

	const addActivity = useCallback(
		(data: DailyActivityFormSchema, onAfterSuccess: CallableFunction) => {
			useMutation({
				mutationFn: () =>
					gqlRequest({
						query: Create_Daily_Activity_Mutation,
						variables: { payload: data },
					}),
				onSuccess: () => {
					toast.success('Daily activity created successfully');
					onRefetchActivities();
					onAfterSuccess();
				},
				onError: () => toast.error('Failed to create daily activity'),
			});

			setIsFormOpen(false);
			toast.success('নতুন কার্যকলাপ সংরক্ষণ করা হয়েছে।');
		},
		[]
	);

	const updateActivity = useCallback(() => {
		if (!editingActivity) return;

		onRefetchActivities();

		setEditingActivity(null);
		setIsFormOpen(false);
		toast.success('কার্যকলাপ আপডেট করা হয়েছে।');
	}, [editingActivity]);

	const deleteActivity = useCallback(() => {
		onRefetchActivities();
		toast.error('কার্যকলাপ সফলভাবে মুছে ফেলা হয়েছে।');
	}, []);

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
		updateActivity,
		deleteActivity,
		openEditForm,
		openNewForm,
		closeForm,
	};
};
