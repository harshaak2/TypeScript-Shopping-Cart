import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();
    const quantity = getItemQuantity(id);
    return (
        //? h-100 is used to fill up the height of 100%.
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={imgUrl}
                height="200px"
                //? The CSS object-fit property is used to specify how an <img> or <video> should be resized to fit its container.
                //? cover - The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit
                style={{ objectFit: "cover" }}
            />
            {/* //? column flex for 3 colums */}
            <Card.Body className="">
                {/* //? flexbox for the title and price for bringing them in one line and space-between for making them align to the ends, align-items-baseline for making the same bottom line for title and price, mb-4 for bottom-margin */}
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4"></Card.Title>
                <div className="d-flex align-items-center justify-content-between">
                    {/* //?fs-2 for bigger fontSize */}
                    <span className="fs-2">{name}</span>
                    {/* //? margin: 2 on left side - ms: margin start(left), text-muted for the grey color of text */}
                    <span className="ms-2 text-muted">
                        {formatCurrency(price)}
                    </span>
                </div>
                {/* //? mt-auto fills up all the space in the flexbox container */}
                <div className="mt-auto">
                    {quantity === 0 ? (
                        //? w-100 is used to fill up the width of 100%
                        <Button
                            className="w-100"
                            onClick={() => increaseCartQuantity(id)}
                        >
                            + Add to Cart
                        </Button>
                    ) : (
                        <div
                            className="d-flex flex-column align-items-center"
                            style={{ gap: "0.5rem" }}
                        >
                            <div
                                className="d-flex align-items center justify-content-center"
                                style={{ gap: "0.5rem" }}
                            >
                                <Button
                                    onClick={() => decreaseCartQuantity(id)}
                                >
                                    -
                                </Button>
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="fs2">
                                        {quantity + " "}
                                    </span>
                                    in cart
                                </div>
                                <Button
                                    onClick={() => increaseCartQuantity(id)}
                                >
                                    +
                                </Button>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => removeFromCart(id)}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default StoreItem;
