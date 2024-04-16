"use client";
import { useRouter } from 'next/navigation';

import React from 'react'
import { useSession } from "next-auth/react";
import DocsEditor from '@/components/DocsEditor';
import { SidebarDrawer } from '@/components/SidebarDrawer';



const Page = () => {
    const router = useRouter();

  const {status, data} = useSession();

    if (status != "authenticated" && status != "loading") {
        router.push("/sign-in");
    }
    return (
    <div>
      <SidebarDrawer urll="docsnote"/>
      <DocsEditor/>
    </div>
  )
}

export default Page
