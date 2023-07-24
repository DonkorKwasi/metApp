import useSWR from 'swr'
import Error from 'next/error';
import { Card } from 'react-bootstrap';
import Link from 'next/link';


function ArtworkCard(props)
{

 
 var dest = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" 
 dest = dest + props.objectID;
 
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

card =<Card>
 <Card.Img variant="top" src= {img} />
 <Card.Title>{title}</Card.Title>
 <Link href={dest}>
 <Card.Text> Date: {Date} &nbsp; &nbsp;/classification: {classi} &nbsp; &nbsp;/Medium: {med} &nbsp; &nbsp;</Card.Text>
 </Link>
</Card>
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