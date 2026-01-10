import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from './providers/ThemeProvider';

export function ModeToggler() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			onClick={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
			variant='outline'
			size='icon'
		>
			{theme === 'dark' ? (
				<Sun className='h-[1.2rem] w-[1.2rem] transition-all' />
			) : (
				<Moon className='h-[1.2rem] w-[1.2rem] transition-all' />
			)}
		</Button>
	);
}
