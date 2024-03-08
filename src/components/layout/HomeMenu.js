import "./homeMenu.css"
import pizza1img from "../../../public/pizza1.svg"
import Image from "next/image"
import MenuItem from "../menu/MenuItem"
import SectionHeaders from "./SectionHeaders"

export default function HomeMenu() {
    return(
        <div className="maincontainer">
            <SectionHeaders subHeader={'Checkout'} 
            mainHeader={'Menu'}
            />
          

            <div className="grid grid-cols-4 mt-10 gap-7">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </div>
        
    )
}