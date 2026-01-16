import { gqlRequest } from '@/lib/api-client';
import { User } from '@/types/userType';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { LoginFormStateType } from '../../login';
import {
	Login_User_Details_Query,
	Login_User_Mutation,
	Registration_User_Mutation,
} from '../gql-query/query.gql';

export const authApi = (onRedirect?: CallableFunction) => {
	// register mutation
	const registrationMutation = useMutation({
		mutationFn: (payload: any) =>
			gqlRequest({
				query: Registration_User_Mutation,
				variables: { input: payload },
			}),
		onSuccess: () => {
			toast.success('Registration success. Please login');
			onRedirect?.();
		},
		onError: (error) => {
			toast.error(error?.message);
		},
	});

	// login mutation
	const loginMutation = useMutation({
		mutationFn: (payload: LoginFormStateType) =>
			gqlRequest({
				query: Login_User_Mutation,
				variables: { payload },
			}),
		onSuccess: (res: any) => {
			localStorage.setItem('token', res?.login?.data?.token);
			toast.success('Login has been success.');
			onRedirect?.();
		},
		onError: (error) => {
			toast.error(error?.message);
		},
	});

	// logout
	const triggerLogout = () => {
		console.log('object');
		localStorage.removeItem('token');
		localStorage.removeItem('orgUID');
	};

	const loggedInUserDetails = useQuery({
		queryKey: ['logged-in-user'],
		queryFn: async () => {
			const res = await gqlRequest<{
				user: User | null;
			}>({
				query: Login_User_Details_Query,
			});
			return res?.user;
		},
	});
	return {
		loginMutation,
		loggedInUserDetails,
		registrationMutation,
		triggerLogout,
	};
};
