import {SidebarProvider} from "@/components/ui/sidebar"
import {AppSidebar} from "@/components/global/Sidebar";
import Navbar from "@/components/global/Navbar";
import AuthWrapper from "@/components/global/AuthWrapper";


export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <AuthWrapper>
            <SidebarProvider>
                <AppSidebar/>
                <div className={'flex flex-col w-full'}>
                    <Navbar/>
                    <main className={'h-screen max-h-full py-1 overflow-hidden'}>
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </AuthWrapper>
    )
}
