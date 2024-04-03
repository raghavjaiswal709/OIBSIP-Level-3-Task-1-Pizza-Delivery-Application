import { useContext } from 'react';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({ product }) {
  const { removeCartProduct } = useContext(CartContext);

  const handleRemove = () => {
    removeCartProduct(product.id); // Ensure product.id is the correct product identifier
    removeProductFromLocalStorage(product.id);
  };
  
  
  

  const removeProductFromLocalStorage = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId); // Compare with product ID
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt='' />
      </div>
      <div className="grow text-gray-100">
        <h3 className="font-semibold">
          {product.name}
        </h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-200">
            {product.extras.map(extra => (
              <div key={extra.name}>{extra.name} ₹{extra.price}</div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold  text-gray-100">
        ₹{cartProductPrice(product)}
      </div>
      <div className="ml-2">
        <button
          type="button"
          onClick={handleRemove}
          className="p-2 text-gray-100">
          <Trash />
        </button>
      </div>
    </div>
  );
}
