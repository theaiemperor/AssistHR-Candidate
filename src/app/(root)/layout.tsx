import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/global/Sidebar";
import Navbar from "@/components/global/Navbar";


export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className={'flex flex-col w-full'}>
                <Navbar/>
                <main className={'h-screen max-h-full py-1 overflow-hidden'} >
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
