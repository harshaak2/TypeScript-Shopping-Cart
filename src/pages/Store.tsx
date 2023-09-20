import storeItems from "../data/items.json"
import {Row, Col} from "react-bootstrap"
import StoreItem from "../components/StoreItem"

function Store(){
    return <>
        <h1>Store</h1>
        {/* {console.log("StoreItems: " + storeItems)} */}
        {/* //* setting number of components for different sizes, g-3 : set a gap of 3 */}
        <Row md={2} xs={1} lg={3} className="g-3"> 
            {storeItems.map(item=>{
                return <Col key={item.id}><StoreItem {...item} /></Col>
            })}
        </Row>
    </>
}

export default Store;