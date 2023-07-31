import useSWR from 'swr'
import Error from 'next/error';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from "framer-motion"
function ArtworkCard(props)
{

 const router = useRouter();
let dest = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" 
 dest = dest + props.objectID;
 
 function clicked()
 {
console.log('was clicked')
    let details = "/Artwork/";
details = details + props.objectID;
router.push(details)
 }
const {data,error} = useSWR(dest);


var element = null;
var none = null;
var card  = null;


     if(error != undefined)
        {
            element= <Error statusCode={404}/>
            none = <Error statusCode={404}/>
        }
        else{

            if(data != undefined)
            {
            var img;
            var title;
            var totalText;
            var Date;
            var classi;
            var med;

            if(data?.primaryImageSmall == "")
            {
              
                img = "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
            else
            { 
                img = data?.primaryImageSmall;
            }

            
            if(data?.title == undefined)
            {
                title  = 'N/A'
            }
            else{
                title = data?.title;
            }

            if(data?.objectDate == "")
            {
Date = 'N/A'
            }
            else{
Date = data?.objectDate
            }


           if(data?.classification == "")
           {
              classi = 'N/A'
           }
           else{
            classi = data?.classification;
           }


           if(data?.medium == "")
           {
    med = 'N/A'
           }
           else{
        med = data?.medium;
           }

            
dest = "/Artwork/";
dest = dest + props.objectID;

card =

<motion.div whileHover={{scale: 1.05}}><Card onClick={clicked} >
 <Card.Img variant="top" src= {img} />
 <Card.Title>{title}</Card.Title>

 <Card.Text > Date Of Creation: {Date} &nbsp;|&nbsp; classification: {classi} &nbsp; | &nbsp;Medium Of Art: {med} &nbsp; &nbsp;</Card.Text>
 
</Card></motion.div>
        }
    }
        
return (
    <div>
          <br />
  <br />
{element}
{card}
</div>
);
}

export default ArtworkCard;