import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

export interface IProgressScoreStore {
	todaysTotalAchivedPercentage: number;
	academicAchivedPercentage: number;
	ebadahAchivedPercentage: number;
	exerciseAchivedPercentage: number;
	taskAchivedPercentage: number;
}
export const progressAtom = atomWithImmer<IProgressScoreStore>({
	todaysTotalAchivedPercentage: 0,
	academicAchivedPercentage: 0,
	ebadahAchivedPercentage: 0,
	exerciseAchivedPercentage: 0,
	taskAchivedPercentage: 0,
});

export function useProgress() {
	const [progress, setProgress] = useAtom(progressAtom);
	return [progress, setProgress] as const;
}
