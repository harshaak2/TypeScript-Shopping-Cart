import {
    Container,
    Button as ButtonBS,
    Nav,
    Navbar as NavbarBS,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

function NavBar() {

    const{openCart, closeCart, cartQuantity} = useShoppingCart()

    return (
        <NavbarBS className="bg-white shadow-sm mb-3" sticky="top">
            <Container>
                <Nav>
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/store">
                        Store
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/about">
                        About
                    </Nav.Link>
                </Nav>
            </Container>
            {cartQuantity > 0 && <ButtonBS
                style={{ width: "3rem", height: "3rem", position: "relative" }}
                variant="outline-primary" //? this is an attribute from react-bootstrap
                className="rounded-circle"
                onClick={openCart}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cart"
                    viewBox="0 0 16 16"
                >
                    {" "}
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                </svg>
                <div
                    style={{
                        color: "white",
                        width: "1.5rem",
                        height: "1.5rem",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        //? The transform property applies a 2D or 3D transformation to an element. This property allows you to rotate, scale, move, skew, etc., elements.
                        transform: "translate(25%, 25%)",
                    }}
                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                >
                    {cartQuantity}
                </div>
            </ButtonBS>}
        </NavbarBS>
    );
}

export default NavBar;
