'use client'

import { useProfile } from '@/components/UseProfile'
import UserTabs from '../../components/layout/Tabs'
import EditableImage from '@/components/layout/EditableImage';
import { useEffect, useState } from 'react';
import { resolve } from 'path';
import { rejects } from 'assert';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Right from '../../components/icons/Right';

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([])
    const {loading, data} = useProfile();
    useEffect(() =>{
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    },[])

    

    if(loading){
        return 'Loading User Info...';
    }

    if(!data.admin){
        return 'not an admin.'
    }
    return(
        <section className='mt-8 max-w-md mx-auto'>
            <UserTabs isAdmin={true} />

            <div className='mt-8 w-auto'>
            <Link className='button' href={'/menu-items/new'}>Create new Menu Item
            <Right />
            </Link>
            </div>
        </section>
    )
}