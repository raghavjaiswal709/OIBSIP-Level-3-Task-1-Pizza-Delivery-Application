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
import Image from 'next/image';

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
            <div>
                <h2 className='text-sm text-gray-500 mt-8'>Edit menu Items:</h2>
                <div className='grid grid-cols-3 gap-2'>
                {menuItems?.length > 0 && menuItems.map(item =>(
                    <Link href={'/menu-items/edit/'+item._id} className='bg-[#8b8b8b] rounded-lg p-4'>
                        <div className='relative'>
                        <Image className='rounded-md' src={item.image} alt={''} width={200} height={200} />
                        </div>
                       <div className='text-center'>
                        {item.name}
                        </div>
                    </Link>
                    ))}
                </div>
                
                
            </div>
        </section>
    )
}