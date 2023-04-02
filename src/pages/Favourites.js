import { favouritesAtom } from "store";
import { useAtom } from "jotai";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { Card } from "react-bootstrap";

function Favourites ()
{
    const [faves,setFaves] = useAtom(favouritesAtom);
    if(!faves) return null;
    var allCard = null;
    var entireArt = null;
    console.log(faves);
    if(faves.length == 0)
    {
     
allCard =   <Card>   <h4>Nothing Here Try adding some new artwork to the list.</h4> </Card>;
    }
    else{
       const card = faves.map((art) =>
     
        <Col lg={3} key={art}><ArtworkCard objectID={art} /></Col>)
      allCard =card
        
    }
    entireArt =  <Row key="2" className="gy-4">{allCard} </Row> 

 
    return (
        
        <div>{entireArt}</div>);
}

export default Favourites;