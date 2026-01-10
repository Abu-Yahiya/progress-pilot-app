import { gql } from '@/lib/api-client';

export const Registration_User_Mutation = gql`
	mutation Registration($input: RegistrationUserInput!) {
		registration(input: $input) {
			isSuccess
			message
			data
		}
	}
`;

export const Login_User_Mutation = gql`
	mutation Login($payload: LoginInput!) {
		login(payload: $payload) {
			data
		}
	}
`;

export const Login_User_Details_Query = gql`
	query User($input: CommonMatchInput!) {
		user(input: $input) {
			_id
			name
			email
			phone
			avatar
			role
		}
	}
`;
