import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { MonitorCog, Save } from 'lucide-react';

export const Route = createFileRoute('/_app/activity-settings/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className='space-y-5'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'
			>
				<div>
					<div className='flex items-center gap-3 mb-2'>
						<div className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-deep flex items-center justify-center'>
							<MonitorCog className='w-6 h-6 text-white' />
						</div>
						<div>
							<h1 className='font-display text-2xl md:text-3xl font-bold text-foreground'>
								Activity Settings
							</h1>
						</div>
					</div>
				</div>
				<Button
					variant='hero'
					className='self-start md:self-auto bg-gradient-to-br from-primary to-deep'
					// onClick={openNewForm}
				>
					<Save className='w-4 h-4 mr-2' />
					Save Settings
				</Button>
			</motion.div>
		</div>
	);
}
