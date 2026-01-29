import { Button } from '@/components/ui/button';
import { ClipboardList, Plus } from 'lucide-react';

interface EmptyTaskStateProps {
	onAddTask: () => void;
}

const EmptyTaskState = ({ onAddTask }: EmptyTaskStateProps) => {
	return (
		<div className='flex flex-col items-center justify-center py-16 px-4 animate-fade-in'>
			<div className='relative mb-6'>
				<div className='w-24 h-24 rounded-full bg-gradient-to-br from-primary to-deep flex items-center justify-center animate-float'>
					<ClipboardList className='w-12 h-12 text-white' />
				</div>
				<div className='absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background border-border border-1 flex items-center justify-center shadow-button'>
					<Plus className='w-4 h-4 text-foreground' />
				</div>
			</div>

			<h3 className='text-xl font-semibold text-foreground mb-2'>
				No tasks yet
			</h3>
			<p className='text-muted-foreground text-center max-w-xs mb-8'>
				Start organizing your day by adding your first task
			</p>

			<Button
				onClick={onAddTask}
				size='lg'
				className='shadow-button hover:shadow-button-hover transition-all duration-300 gap-2'
			>
				<Plus className='w-5 h-5' />
				Add Task
			</Button>
		</div>
	);
};

export default EmptyTaskState;
