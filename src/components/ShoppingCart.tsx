import { Offcanvas, OffcanvasHeader, OffcanvasTitle, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from '../data/items.json'

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({isOpen} : ShoppingCartProps){
    const {closeCart, cartItems} = useShoppingCart()
    //? Offcanvas from bootstrap is the sliding effect that comes when clicked on the cart.
    //? show=true shows the cart and placement=end places it to the end, or comes to the left by default.
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <OffcanvasHeader closeButton>
                <OffcanvasTitle>Cart</OffcanvasTitle>
            </OffcanvasHeader>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => {
                        return <CartItem key={item.id} {...item}></CartItem>;
                    })}
                    {/* //? ms-auto is used to push the div to as right as possible; ms: margin-start*/}
                    <div className="ms-auto fw-bold fs-large">
                        Total:{" "}
                        {formatCurrency(
                            cartItems.reduce((total, currentCartItem) => {
                                const item = storeItems.find(
                                    (item) => item.id === currentCartItem.id
                                );
                                return (
                                    total +
                                    (item?.price || 0) *
                                        currentCartItem.quantity
                                );
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}