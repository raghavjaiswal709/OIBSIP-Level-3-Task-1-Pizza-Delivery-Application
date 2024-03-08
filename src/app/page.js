import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Hero from '../components/layout/Hero'
import HomeMenu from '../components/layout/HomeMenu'
import SectionHeaders from '../components/layout/SectionHeaders'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
<>
    {/* <Header /> */}
    <Hero />
    <HomeMenu />
    <section>
      <SectionHeaders subHeader={'Our Story'} mainHeader={'About us'}/>
      <p className='max-w-2xl mx-auto my-10 text-center'>
      We're passionate about crafting delicious pizzas using fresh, high-quality ingredients. From classic favorites to unique gourmet creations, we have a pie for every craving. We hand-toss our dough daily and bake in a traditional brick oven for an authentic, crispy crust. Come experience the taste of real pizza!
      </p>

      <p className='max-w-2xl mx-auto my-10 text-center'>

      We love pizza! Made daily with fresh ingredients, our menu offers classic & gourmet options. Hand-tossed dough & a brick oven create an authentic, crispy crust. Come taste the difference!      </p>
    </section>
    <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +91 8709411890 <br></br>
          raghavjaiswal0000@gmail.com
          </a>
        </div>
      </section>
      {/* <Footer /> */}
</> 
 )
}
