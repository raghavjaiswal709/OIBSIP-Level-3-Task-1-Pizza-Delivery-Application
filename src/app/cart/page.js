'use client'

import { useContext, useEffect, useState } from "react";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useProfile } from "@/components/UseProfile";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed 😔');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  const removeProductFromLocalStorage = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveProduct = (productId) => {
    removeCartProduct(productId);
    removeProductFromLocalStorage(productId);
  };

  function handleAddressChange(propName, value) {
    setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong... Please try again later',
    })
  }

  let subtotal = 0;
  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <CartProduct
              key={index}
              product={product}
              onRemove={() => handleRemoveProduct(product.id)} // Pass product ID to remove
            />
          ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-100">
              Subtotal:<br />
              Delivery:<br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ₹{subtotal}<br />
              ₹5<br />
              ₹{subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ₹{subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
