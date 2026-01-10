import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { StorageUtil } from '@/lib/storage.util';
import { fetchME } from '@/store/auth.atom';
import { Link, useRouter } from '@tanstack/react-router';
import {
	Activity,
	BellDot,
	ChartNetwork,
	HomeIcon,
	LogOutIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useAppConfirm } from './AppConfirm';
import { Button } from './ui/button';

const items = [
	{
		title: 'Dashboard',
		url: `/`,
		icon: HomeIcon,
	},
	{
		title: 'Daily Activity',
		url: `/daily-activity`,
		icon: Activity,
	},
	{
		title: 'Leader Board',
		url: `/leader-borad`,
		icon: ChartNetwork,
	},
	{
		title: 'Reminder Settings',
		url: `/reminder-settings`,
		icon: BellDot,
	},

	// {
	// 	title: 'Organization Settings',
	// 	url: `/organizations/${organizationUID}/organization-settings/`,
	// 	icon: Settings,
	// 	items: [
	// 		{
	// 			title: 'General',
	// 			url: `/organizations/${organizationUID}/organization-settings/general`,
	// 			icon: Settings,
	// 		},
	// 		{
	// 			title: 'Members',
	// 			url: `/organizations/${organizationUID}/organization-settings/members`,
	// 			icon: Users,
	// 		},
	// 		{
	// 			title: 'API Credentials',
	// 			url: `/organizations/${organizationUID}/organization-settings/api-credentials`,
	// 			icon: LockKeyhole,
	// 		},
	// 		{
	// 			title: 'Plan & Features',
	// 			url: `/organizations/${organizationUID}/organization-settings/plan-features`,
	// 			icon: Flower,
	// 		},
	// 		{
	// 			title: 'Setup Meta',
	// 			url: `/organizations/${organizationUID}/organization-settings/setup-meta`,
	// 			icon: Zap,
	// 		},
	// 	],
	// },
];

const AppSidenav = () => {
	const appConfirmHandle = useAppConfirm();
	const router = useRouter();
	const { state } = useSidebar();
	const [, setExpandedItems] = useState<Record<string, boolean>>({});

	const toggleItem = (title: string) => {
		setExpandedItems((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};

	// Add inside AppSidenav before return
	const pathname = router.state.location.pathname;

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<div className='flex items-center gap-2'>
					{state === 'expanded' && (
						<h2 className='font-semibold text-3xl'>🚀ProgressPilot</h2>
					)}
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								// const isExpanded = expandedItems[item.title];
								// const shouldExpand = isExpanded;

								// Check if current item or any subitem is active
								const isActive = pathname === item.url;
								return (
									<div key={item.title}>
										<SidebarMenuItem
											className={isActive ? '!bg-primary !rounded-md' : ''}
										>
											<SidebarMenuButton onClick={() => toggleItem(item.title)}>
												{/* {hasChildren ? (
													<button className='flex items-center w-full'>
														<item.icon size={20} className='!mr-2' />
														<span className='flex-1 text-left'>
															{item.title}
														</span>
														{shouldExpand ? (
															<ChevronDown size={16} />
														) : (
															<ChevronRight size={16} />
														)}
													</button>
												) : ( */}
												<Link to={item.url} className='flex items-center gap-2'>
													<item.icon size={20} className='!mr-2' />
													<span>{item.title}</span>
												</Link>
												{/* )} */}
											</SidebarMenuButton>
										</SidebarMenuItem>
										{/* 
										{hasChildren && shouldExpand && (
											<div className='pl-6'>
												{item?.items?.map((subItem) => {
													const isSubActive = pathname === subItem.url;
													return (
														<SidebarMenuItem
															key={subItem.title}
															className={
																isSubActive
																	? '!bg-primary !rounded-md my-1'
																	: ''
															}
														>
															<SidebarMenuButton asChild>
																<Link to={subItem.url}>
																	<subItem.icon size={20} className='!mr-2' />
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuButton>
														</SidebarMenuItem>
													);
												})}
											</div>
										)} */}
									</div>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<Button
					variant={'destructive'}
					onClick={() => {
						appConfirmHandle.show({
							title: 'Logout',
							onConfirm: async () => {
								StorageUtil.removeItem('token');
								StorageUtil.removeItem('orgUID');
								await fetchME();
								location.href = '/auth/login';
							},
						});
					}}
					className='!cursor-pointer'
				>
					<LogOutIcon />
					Logout
				</Button>
				{/* <DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
							<AvatarFallback>MH</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu> */}
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidenav;
{
	/* <SidebarMenu>
	{items.map((item) => {
		const hasChildren = !!item.items?.length;
		const isExpanded = expandedItems[item.title];

		// Check if current item or any subitem is active
		const isActive =
			pathname === item.url ||
			(item.items && item.items.some((sub) => pathname === sub.url));

		return (
			<div key={item.title}>
				<SidebarMenuItem className={isActive ? 'bg-muted text-primary' : ''}>
					<SidebarMenuButton
						asChild={!hasChildren}
						onClick={() => hasChildren && toggleItem(item.title)}
					>
						{hasChildren ? (
							<button className='flex items-center w-full'>
								<item.icon size={20} className='!mr-2' />
								<span className='flex-1 text-left'>{item.title}</span>
								{isExpanded ? (
									<ChevronDown size={16} />
								) : (
									<ChevronRight size={16} />
								)}
							</button>
						) : (
							<Link to={item.url}>
								<item.icon size={20} className='!mr-2' />
								<span>{item.title}</span>
							</Link>
						)}
					</SidebarMenuButton>
				</SidebarMenuItem>

				{hasChildren && isExpanded && (
					<div className='pl-6'>
						{item?.items?.map((subItem) => {
							const isSubActive = pathname === subItem.url;
							return (
								<SidebarMenuItem
									key={subItem.title}
									className={isSubActive ? 'bg-muted text-primary' : ''}
								>
									<SidebarMenuButton asChild>
										<Link to={subItem.url}>
											<subItem.icon size={20} className='!mr-2' />
											<span>{subItem.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</div>
				)}
			</div>
		);
	})}
</SidebarMenu>; */
}
