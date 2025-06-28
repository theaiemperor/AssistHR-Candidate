import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/global/Sidebar";
import Navbar from "@/components/global/Navbar";


export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className={'flex flex-col p-1  w-full'}>
                <Navbar/>
                <main className={'mt-1'} >
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}
