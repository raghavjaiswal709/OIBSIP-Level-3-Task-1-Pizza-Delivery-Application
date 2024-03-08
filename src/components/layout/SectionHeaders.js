import "./homeMenu.css"

export default function SectionHeaders({subHeader,mainHeader}){
    return(
        <>
        <div className="checkoutMenus">
            <h3 className=" text-gray-600 text-4xl font-semibold">{subHeader}</h3>
            <h2 className="text-primary font-bold menu text-4xl">{mainHeader}</h2>
            </div>
            </>
    )
}