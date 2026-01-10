import React, { PropsWithChildren } from 'react';
import AppSidenav from './AppSideNav';
import { ModeToggler } from './ModeToggler';
import { Separator } from './ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './ui/sidebar';

const DashboardScaffold: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<SidebarProvider defaultOpen={true}>
				<AppSidenav />
				<SidebarInset>
					<header className='dark:bg-[#172031] bg-[#FBFBFB] border-b !py-8 flex h-20 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 pr-4'>
						<div className='flex items-center px-4 gap-2'>
							<SidebarTrigger className='-ml-1 text-2xl' />
							<Separator orientation='vertical' className='h-4 mr-2' />
						</div>

						<div className='flex pt-0 items-center gap-2'>
							<ModeToggler />{' '}
						</div>
					</header>
					<div className='flex flex-col flex-1 p-4 gap-4'>
						<>{children}</>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
};

export default DashboardScaffold;
