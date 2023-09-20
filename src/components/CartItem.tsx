import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({id, quantity}: CartItemProps){
    const {removeFromCart} = useShoppingCart()
    const item = storeItems.find(item => item.id === id)
    if(item == null ) return null

    return(
        // ? placing all the items of the Stack in flexbox and aligning the center
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{width: '125px', height: '75px', objectFit: 'cover'}} />
            {/* //? push everything to the far right side */}
            {/* //? me: margin-end */}
            <div className="me-auto">
                {/* {item.name}{" "} {quantity > 1 && <span className="text-muted" style={{fontSize: '0.65rem'}}>x{quantity}</span>}*/}
                {item.name}{" "}<span className="text-muted" style={{fontSize: '0.75rem'}}>x{quantity}</span>
                <div className="text-muted" style={{fontSize: '0.75rem'}}>{formatCurrency(item.price)}</div>
            </div>
            <div>{formatCurrency(item.price*quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={()=>removeFromCart(item.id)}>&times;</Button>
        </Stack>
    )
}