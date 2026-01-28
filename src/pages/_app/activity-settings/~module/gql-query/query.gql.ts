import { gql } from '@/lib/api-client';

export const Create_Activity_Target_Settings = gql`
	mutation CreateActivitySettings($payload: CreateActivitySettingsDto!) {
		createActivitySettings(payload: $payload) {
			_id
		}
	}
`;
export const Update_Activity_Target_Settings = gql`
	mutation UpdateActivitySetting(
		$payload: UpdateActivitySettingsInputDto!
		$orgUid: String!
		$userId: String!
	) {
		updateActivitySetting(payload: $payload, orgUID: $orgUid, userId: $userId)
	}
`;

export const My_Activity_Target_Settings = gql`
	query Query($orgUid: String!, $userId: String!) {
		myActivitySetting(orgUID: $orgUid, userId: $userId) {
			_id
			orgUID
			ebadahTarget {
				namajWithJamath
				extraNamaj
				tilwat {
					count
					type
					description
				}
				readingBook {
					count
					type
					description
				}
				tafsir {
					count
					type
					description
				}
				translation {
					count
					type
					description
				}
				hadith
			}
			jikirAjkarTarget {
				istigfar
				durudYunus
				durud
				doaTawhid
				ishraq
				tahajjud
				waqiyah
				mulk
				kahf
			}
			exerciseTarget {
				pushUp
				squats
				seatUp
				running
				jumpingJack
				plank
				dumbbleCurl
			}
			createdAt
			updatedAt
		}
	}
`;
