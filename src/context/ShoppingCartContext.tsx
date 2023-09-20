import React, { ReactNode, createContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void; //? similar to add to cart(increasing from 0 to 1)
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext); //? this provides 2 components - provider and consumer
//? provider works as a distributor and ShoppingCartContext.Provider should wrap the entire component tree

export function useShoppingCart() {
    return React.useContext(ShoppingCartContext);
}

type ShoppingCartProviderProps = {
    children: ReactNode //? type for children property inside react
}

//? function for implementing the provider
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])

    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity, item)=>{return item.quantity + quantity},0)
    
    function openCart(){
        setIsOpen(true)
    }

    function closeCart(){
        setIsOpen(false)
    }

    function getItemQuantity(id: number){
        //? return quantity if exists or return 0
        return cartItems.find(item => item.id===id)?.quantity || 0 
    }

    function increaseCartQuantity(id: number){
        setCartItems(currentItems=>{
            if(currentItems.find(item=>item.id === id) == null){ //? the case where the quantity is 0, and is not present in the cart
                return [...currentItems, {id, quantity: 1}]
            } else{ //? the case where the item is already in the cart, so increasing the quantity by 1.
                return (currentItems.map(item=>{ //? iterating the cartItems and finding it by id
                    if(item.id === id){ //? if id is found in the cart
                        return {...item, quantity: item.quantity+1} //? incrementing by 1.
                    } else{
                        return item
                    }
                }))
            }
        })
    }

    function decreaseCartQuantity(id: number){
        setCartItems(currentItems=>{
            if(currentItems.find(item=>item.id===id)?. quantity === 1){ //? the case where the quantity=1
                return currentItems.filter(item=>item.id !== id) //? filtering by adding all other items whose item.id!==id or simply removing the only desired item from the currentItems array.
            } else{
                return (currentItems.map(item=>{
                    if(item.id === id){
                        return {...item, quantity: item.quantity-1}
                    } else{
                        return item
                    }
                }))
            }
        })
    }

    function removeFromCart(id: number){
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
                openCart,
                closeCart,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    );
}
