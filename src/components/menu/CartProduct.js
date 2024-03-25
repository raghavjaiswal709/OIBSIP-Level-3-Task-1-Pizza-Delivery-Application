import { useContext } from 'react';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({ product }) {
  const { removeCartProduct } = useContext(CartContext);

  const handleRemove = () => {
    removeCartProduct(product); // Remove from context
    removeProductFromLocalStorage(product.id); // Remove from local storage
  };

  const removeProductFromLocalStorage = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt='' />
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.name}
        </h3>
        {product.size && (
          <div className="text-sm">
            Size: <span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className="text-sm text-gray-100">
            {product.extras.map(extra => (
              <div key={extra.name}>{extra.name} ₹{extra.price}</div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold">
        ₹{cartProductPrice(product)}
      </div>
      <div className="ml-2">
        <button
          type="button"
          onClick={handleRemove}
          className="p-2">
          <Trash />
        </button>
      </div>
    </div>
  );
}
