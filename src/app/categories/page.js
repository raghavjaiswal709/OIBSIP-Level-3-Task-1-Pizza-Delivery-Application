'use client'
import UserTabs from "@/components/layout/Tabs";
import { useEffect, useState } from "react";

export default function CategoriesPage(){

    //fetching wether the user is admin or not
    const [isAdmin, setIsAdmin]=useState(false);
    useEffect(() =>{
        fetch('api/profile').then(response =>{
            response.json().then(data =>{
                setIsAdmin(data.admin)
            })
        })
    },[]);

    if(!isAdmin){
        return 'not an admin'
    }

    return(
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            Categories
        </section>
    )
}