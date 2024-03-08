import Image from "next/image";
import pizzahomeimage from '../../../public/pizzahome.svg';
import "./hero.css"
import Link from "next/link";
import Right from "../icons/Right";
export default function Hero(){
    return(
        <>
        <div className="flex items-center justify-between max-w-7xl mx-auto container ">
            <div className=" heroheadingdiv">
         <h1 className="text-6xl text-gray-900 font-bold 	"> Feeling craving for the perfect slice?</h1>
         <p className="subheading">Order mouthwatering <span className="spansubtitle"> Pizzas </span> online for delivery or pickup.</p>
         <div className="herobuttondiv">
         <button className="orderbut flex gap-2 items-center rounded-full">Order Now <Right />  </button>
         <button className=" lernbutt flex gap-2 items-center ">Learn More <Right /> </button>
         </div>
         </div>
         <Image src={pizzahomeimage} />
         </div>
        </>
    )
}