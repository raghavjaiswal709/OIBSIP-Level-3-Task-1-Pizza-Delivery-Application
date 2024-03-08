import pizza1img from "../../../public/pizza1.svg"
import "./menuItem.css"

import Image from "next/image";

export default function MenuItem() {
    return(
        <div className="bg-background cardcss p-4 rounded-lg text-center group ">
            <div className="text-center">
            <Image className="max-h-auto max-h-54 block mx-auto" src={pizza1img} alt="pizza image" />

            </div>
                    <h4 className="font-semibold text-xl my-2">Peperoni Pizza</h4>
                    <p className="text-gray-600 text-sm"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  </p>
                    <button className="bg-primary mt-4 text-white rounded-full px-4 py-2"> Add to cart ₹399 </button>
                    
                </div>
    )
}