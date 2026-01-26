import { gql } from '@/lib/api-client';

export const All_Daily_Activities_Query = gql`
	query ActivitiesByOrgAndUser(
		$orgUid: String!
		$userId: String!
		$input: ActivityListQueryDto
	) {
		activitiesByOrgAndUser(orgUID: $orgUid, userId: $userId, input: $input) {
			nodes {
				_id
				orgUID
				ebadah {
					namajWithJamath
					extraNamaj
					ishraq
					kahf
					tahajjud
					tilwat {
						count
						description
						type
					}
					hadith
					readingBook {
						count
						description
						type
					}
					waqiyah
					mulk
					translation {
						count
						description
						type
					}
					tafsir {
						count
						description
						type
					}
				}
				jikirAjkar {
					istigfar
					durudYunus
					durud
					doaTawhid
				}
				exercise {
					pushUp
					squats
					seatUp
					running
					jumpingJack
					plank
					dumbbleCurl
					others
				}
				it_task {
					title
					description
					progressScore
					status
				}
				createdAt
				updatedAt
			}
		}
	}
`;

export const Create_Daily_Activity_Mutation = gql`
	mutation CreateActivity($payload: CreateDailyActivityDto!) {
		createActivity(payload: $payload) {
			_id
		}
	}
`;

export const Update_Daily_Activity_Mutation = gql`
	mutation UpdateActivity(
		$payload: UpdateDailyActivityInputDto!
		$orgUid: String!
		$userId: String!
	) {
		updateActivity(payload: $payload, orgUID: $orgUid, userId: $userId)
	}
`;

export const Remove_Daily_Activity_Mutation = gql`
	mutation RemoveActivity($id: String!) {
		removeActivity(_id: $id) {
			_id
		}
	}
`;
