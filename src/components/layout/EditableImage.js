import Image from "next/image";
import toast from "react-hot-toast";


export default function EditableImage({link,setLink}){
    async function handleFileChange(ev) {
        const files = ev.target.files;
        if (files?.length === 1) {
          const data = new FormData();
          data.set("file", files[0]);
    
          await toast.promise(
            fetch("/api/upload", {
              method: "POST",
              body: data,
            }).then((response) => {
              if (response.ok) {
                return response.json().then((link) => {
                  setLink(link);
                });
              }
              throw new Error("Something went wrong");
            }),
            {
              loading: "Uploading",
              success: "Upload Complete",
              error: "Upload error",
            }
          );
        }
      }
      return(
        <>
        {link && (
              <Image
                src={link}
                className="rounded-lg mb-2"
                width={425}
                height={425}
                alt="profile photo"
              ></Image>
            )}
            {!link && (
                <div className="bg-gray-200 p-4 text-gray-500 mb-4 rounded-lg">
                    No Image 
                </div>
            )}
            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block border rounded-lg p-2 text-center border-gray-700 cursor-pointer">
                Edit
              </span>
            </label></>
      )
    
}