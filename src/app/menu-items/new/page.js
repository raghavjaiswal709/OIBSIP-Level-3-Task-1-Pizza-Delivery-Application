'use client'
import { useProfile } from '../../../components/UseProfile';
import UserTabs from '../../../components/layout/Tabs';
import EditableImage from '@/components/layout/EditableImage';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Left from '../../../components/icons/Left';
import {redirect} from "next/navigation";

export default function NewMenuItemPage() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const {loading, data } = useProfile();
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        const data = { image, name, description, basePrice };

        const savingPromise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this tasty Item',
            success: 'Saved',
            error: 'error in saving Item',
        });

        setRedirectToItems(true);
    }

    // if(loading){
    //     return 'Loading User info...';
    // }

    // if(!data.admin){
    //     return 'Not an Admin';
    // }

    if (redirectToItems) {
        return redirect('/menu-items')
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className='max-w-md mx-auto mt-8'>
                <Link href={'/menu-items'} className='button'>
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className='mt-8 max-w-md mx-auto '>
                <div className='flex items-start gap-4'>
                    <div className='max-w-[200px]'>
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className='grow'>
                        <label>Item Name</label>
                        <input value={name} onChange={ev => setName(ev.target.value)} type='text'></input>
                        <label>Description</label>
                        <input value={description} onChange={ev => setDescription(ev.target.value)} type='text'></input>
                        <label>Base Price</label>
                        <input value={basePrice} onChange={ev => setBasePrice(ev.target.value)} type='text'></input>
                        <button type='submit'>Save</button>
                    </div>
                </div>
            </form>
        </section>
    );
}
