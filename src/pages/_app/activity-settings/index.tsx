import { ActivitySettings } from '@/gql/graphql';
import { gqlRequest } from '@/lib/api-client';
import { userAtom } from '@/store/auth.atom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import toast from 'react-hot-toast';
import DailyActivityTargetForm from './~module/components/ActivityTargetForm';
import {
	Create_Activity_Target_Settings,
	My_Activity_Target_Settings,
	Update_Activity_Target_Settings,
} from './~module/gql-query/query.gql';

export const Route = createFileRoute('/_app/activity-settings/')({
	component: RouteComponent,
});

function RouteComponent() {
	const [session] = useAtom(userAtom);

	// target settings
	const { data: targetSettings } = useQuery({
		queryKey: ['my-activity-settings'],
		queryFn: () =>
			gqlRequest<{ myActivitySetting: ActivitySettings }>({
				query: My_Activity_Target_Settings,
				variables: {
					orgUid: import.meta.env.VITE_APP_ORG_UID,
					userId: session?.user?._id,
				},
			}),
	});

	// add activity target settings
	const addActivitySettings = useMutation({
		mutationFn: (payload: any) =>
			gqlRequest({
				query: Create_Activity_Target_Settings,
				variables: {
					payload: {
						...payload,
						user: session?.user?._id,
						orgUID: import.meta.env.VITE_APP_ORG_UID,
					},
				},
			}),
		onSuccess() {
			toast.success('Settings has been saved.');
		},
	});

	// update added target settings
	const updateActivitySettings = useMutation({
		mutationFn: (payload: any) =>
			gqlRequest({
				query: Update_Activity_Target_Settings,
				variables: {
					payload: {
						...payload,
						_id: targetSettings?.myActivitySetting?._id,
					},
					userId: session?.user?._id,
					orgUid: import.meta.env.VITE_APP_ORG_UID,
				},
			}),
		onSuccess() {
			toast.success('Settings has been saved.');
		},
	});

	// handle submit form
	const handleSubmitForm = (payload: any) => {
		console.log(payload);

		if (targetSettings?.myActivitySetting?._id) {
			updateActivitySettings.mutate(payload);
		} else {
			addActivitySettings.mutate(payload);
		}
	};

	return (
		<div className='space-y-5'>
			<div>
				<DailyActivityTargetForm
					onSubmit={handleSubmitForm}
					isLoading={
						addActivitySettings.isPending || updateActivitySettings.isPending
					}
					initialData={targetSettings?.myActivitySetting!}
				/>
			</div>{' '}
		</div>
	);
}
