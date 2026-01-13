import React, { PropsWithChildren } from 'react';
import AppNavigation from './AppNavigation';
import { SidebarInset, SidebarProvider } from './ui/sidebar';

const DashboardScaffold: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<SidebarProvider defaultOpen={true}>
				<SidebarInset>
					<AppNavigation />
					<div className='container mx-auto max-w-8xl py-8 space-y-5 min-h-screen bg-background  mt-15 flex flex-col flex-1 p-4 gap-4'>
						<>{children}</>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
};

export default DashboardScaffold;
