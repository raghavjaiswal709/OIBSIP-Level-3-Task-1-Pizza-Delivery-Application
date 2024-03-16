'use client'
import UserTabs from "@/components/layout/Tabs";
import { useEffect, useState } from "react";
import {useProfile} from '../../components/UseProfile'
import toast from "react-hot-toast";



export default function CategoriesPage(){

        const {loading:profileLoading , data:ProfileData } = useProfile();
        const [categories, setCategories] = useState([])
        const [categoryName, setCategoryName] = useState("");
        const [editedCategory, setEditedCategory]= useState(null);

        useEffect(() => {
            fetchCategories();
        }, [])

        function fetchCategories(){
            fetch('/api/categories').then(res => {
                res.json().then(categories => {
                    setCategories(categories)
                })
            })
        }

        function handleCategorySubmit(ev){
            ev.preventDefault();
            const creationPromise = new Promise(async(resolve, reject) => {
                const data = {name: categoryName};
                if (editedCategory){
                    data._id = editedCategory._id;
                }
            const response = await fetch('api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers:{'Content-type': 'application/json'}, 
                body:JSON.stringify(data) 
            });
            setCategoryName('')
            fetchCategories()
            setEditedCategory(null)

            if(response.ok) resolve()
            else reject();
        });

        toast.promise(creationPromise,{
            loading: editedCategory ? 'Updating Category...' : 'Creating your new Category..',
            success: editedCategory ? 'Category updated' : 'Category Created',
            error: editedCategory ? 'Error in updating category' : 'Error in creating category'
        })
        }

        if(profileLoading){
            return 'Loading User Info...';
        }

        if(!ProfileData.admin){
            return 'Not an admin..'
        }

    return(
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit }>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                    <label>
                        {editedCategory ? 'Update Category': 'New category name'}
                        {editedCategory && (
                            <>:<b>{editedCategory.name}</b></>
                        )}
                    </label>
                <input type="text" value={categoryName} onChange={ev => setCategoryName(ev.target.value)}></input>
                    </div>
                    <div className="pb-[5.5px]">
                        <button  className="" type="submit">
                            {editedCategory? 'Update' : 'Create'}
                            </button>
                    </div>
                </div>
                
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Edit Categories</h2>
                {categories?.length > 0 && categories.map(c =>(
                    <button onClick={()=> {setEditedCategory(c), setCategoryName(c.name)}} className="bg-gray-200 rounded-lg p-2 px-4 flex gap-1 cursor-pointer mb-2">
                        <span>{c.name}</span>
                    </button>
                ))}
            </div>
             
        </section>
    )
}