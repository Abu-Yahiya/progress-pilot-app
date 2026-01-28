import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { User } from '@/gql/graphql';
import { authApi } from '@/pages/auth/~module/api/auth.api';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import {
	Activity,
	BarChart3,
	Bell,
	ChevronDown,
	FileText,
	LogOut,
	Menu,
	MonitorCog,
	Rocket,
	Settings,
	Trophy,
} from 'lucide-react';
import { useState } from 'react';
import { ModeToggler } from './ModeToggler';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
	{ icon: BarChart3, label: 'Dashboard', href: '/' },
	{ icon: Activity, label: 'Daily Activity', href: '/daily-activity' },
	{ icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
	{ icon: FileText, label: 'Reports', href: '/reports' },
	{ icon: MonitorCog, label: 'Activity Settings', href: '/activity-settings' },
];

interface AppNavigationProps {
	user?: User;
}

export default function AppNavigation({ user }: AppNavigationProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	const { triggerLogout } = authApi();

	const isActive = (href: string) => location.pathname === href;

	return (
		<header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border'>
			<div className='container mx-auto px-4 h-16 flex items-center justify-between'>
				<div className='flex items-center gap-8'>
					<Link to='/' className='flex items-center gap-2'>
						<div className='w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-deep flex items-center justify-center'>
							<Rocket className='w-5 h-5 text-primary-foreground' />
						</div>
						<span className='!text-foreground font-display font-bold text-lg'>
							Progress Pilot
						</span>
					</Link>

					{/* Desktop Navigation */}
					<nav className='hidden xl:flex items-center gap-1'>
						{navItems.map((item) => (
							<Link
								key={item.label}
								to={item.href}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									isActive(item.href)
										? 'bg-primary/10 text-primary'
										: 'text-muted-foreground hover:text-foreground hover:bg-secondary'
								}`}
							>
								<item.icon className='w-4 h-4' />
								{item.label}
							</Link>
						))}
					</nav>
				</div>

				<div className='flex items-center gap-2'>
					<ModeToggler />

					<Button variant='ghost' size='icon' className='relative h-9 w-9'>
						<Bell className='text-primary w-4 h-4' />
						<span className='absolute top-2 right-2 w-2 h-2 bg-warning rounded-full' />
					</Button>

					{/* Desktop User Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className='hidden md:flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary transition-colors'>
								<Avatar className='w-8 h-8'>
									<AvatarImage src={user?.avatar!} />
									<AvatarFallback className='bg-primary/10 text-primary font-medium text-sm'>
										{user
											?.name!.split(' ')
											.map((n) => n[0])
											.join('')}
									</AvatarFallback>
								</Avatar>
								<ChevronDown className='w-4 h-4 text-muted-foreground' />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-56'>
							<div className='px-3 py-2'>
								<p className='font-medium'>{user?.name}</p>
								<p className='text-sm text-muted-foreground'>{user?.email}</p>
							</div>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Settings className='w-4 h-4 mr-2' />
								Settings
							</DropdownMenuItem>
							<DropdownMenuItem
								className='text-destructive'
								onClick={() => {
									triggerLogout();
									navigate({ to: '/' });
								}}
							>
								<LogOut className='w-4 h-4 mr-2' />
								Sign out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Mobile Menu Button */}
					<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
						<SheetTrigger asChild>
							<Button variant='ghost' size='icon' className='md:hidden'>
								<Menu className='w-5 h-5' />
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='w-80 p-0'>
							<div className='flex flex-col h-full'>
								{/* Mobile Header */}
								<div className='p-4 border-b border-border flex items-center gap-3'>
									<Avatar className='w-10 h-10'>
										<AvatarImage src={user?.avatar!} />
										<AvatarFallback className='bg-primary/10 text-primary font-medium'>
											{user
												?.name!.split(' ')
												.map((n) => n[0])
												.join('')}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className='font-medium'>{user?.name}</p>
										<p className='text-sm text-muted-foreground'>
											{user?.email}
										</p>
									</div>
								</div>

								{/* Mobile Navigation */}
								<nav className='flex-1 p-4 space-y-1'>
									{navItems.map((item) => (
										<Link
											key={item.label}
											to={item.href}
											onClick={() => setMobileOpen(false)}
											className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
												isActive(item.href)
													? 'bg-primary/10 text-primary'
													: 'text-muted-foreground hover:text-foreground hover:bg-secondary'
											}`}
										>
											<item.icon className='w-5 h-5' />
											{item.label}
										</Link>
									))}
								</nav>

								{/* Mobile Footer */}
								<div className='p-4 border-t border-border space-y-1'>
									<button className='flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary w-full transition-colors'>
										<Settings className='w-5 h-5' />
										Settings
									</button>
									<button
										onClick={triggerLogout}
										className='flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-colors'
									>
										<LogOut className='w-5 h-5' />
										Sign out
									</button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
