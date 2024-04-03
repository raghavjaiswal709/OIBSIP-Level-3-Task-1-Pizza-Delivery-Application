import Right from "@/components/icons/Right";
import Image from "next/image";
import "../layout/hero.css"

export default function Hero() {
  return (
    <section className="hero md:mt-14">
      <div className="py-8 md:py-12">
        <div className="flex gap-6 flex-col">
      <h1 className="text-6xl text-gray-100 font-bold 	"> Feeling craving for the perfect slice?</h1>
      <p className="subheading text-gray-100">Order mouthwatering <span className="spansubtitle"> Pizzas </span> online for delivery or pickup.</p>
      </div>
        <div className="flex gap-4 mt-16 text-sm">
          <button className="flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-100 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden ml-32 md:block">
        <Image src={'/pizzahome.svg'} layout={'fill'} objectFit={'contain'} alt={'pizza'} className="scale-110" />
      </div>
    </section>
  );
}