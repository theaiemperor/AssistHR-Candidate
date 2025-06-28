"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import {sidebarMenu} from "@/components/global/Sidebar/sidebarMenu";
import {UserIcon} from "lucide-react";
import ToggleSidebar from "@/components/global/Sidebar/ToggleSidebar";
import Link from "next/link";
import {usePathname} from "next/navigation";


export function AppSidebar() {

    const pathname = usePathname()

    return (
        <Sidebar variant={'floating'} collapsible={'icon'}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarMenu.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                                        <Link href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === '/profile'}>
                            <Link href={'/profile'}>
                                <UserIcon/>
                                <span>Arman</span>
                            </Link>
                        </SidebarMenuButton>
                        <SidebarContent className={'mt-2'}>
                            <ToggleSidebar/>
                        </SidebarContent>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
