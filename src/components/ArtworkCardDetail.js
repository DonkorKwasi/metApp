import useSWR from 'swr'
import Error from 'next/error';
import { Button, Card } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from 'store';
import { useState } from 'react';
import Link from 'next/link';
import { removeFromFavourites } from 'lib/userData';
import { addToFavourites } from 'lib/userData';
import { useEffect } from 'react';
import styles from '../styles/card.module.css'
const fetcher = (url) => fetch(url).then((res) => res.json()); 

function ArtworkCardDetail(props)
{

   
const [faves,setFaves] = useAtom(favouritesAtom);
const [showAdded,setShow] = useState(false);

useEffect(()=>{
    setShow(faves?.includes(props.objectID))
}, [faves])


console.log(showAdded);



async function favouritesClicked ()
{
    if(showAdded == true)
    {
        await  setFaves(await removeFromFavourites(props.objectID));
        setShow(false);
        console.log('its in')


    }
    else {
       await setFaves(await addToFavourites(props.objectID));
        setShow(true);
        console.log('its not in')
    }

    console.log(faves);
}

 var dest = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" 
 dest = dest + props?.objectID;
const {data,error} = useSWR(props?.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null,fetcher);
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
          var name; 
          var credit;
          var dimension;
            var Date;
            var classi;
            var med;
            var wiki;
            if(data?.artistDisplayName == "")
            {
       name = 'N/A'
       wiki = null;
            }
            else
            {
           name = data?.artistDisplayName
           wiki =  	<a href={data?.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>

            }


            if(data?.creditLine == "")
            {
       credit = 'N/A'
            }
            else
            {
           credit = data?.creditLine
            }

            if(data?.dimensions   == "")
            {
        dimension = 'N/A'
            }
            else
            {
           dimension = data?.dimensions 
            }




            if(data?.primaryImage == "")
            {
                img = null
            }
            else
            {
                img =  <Card.Img className={styles.image} variant="top" src= {data?.primaryImage} />
            }

            
            if(data?.title == "")
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


           if(data?.medium == "" )
           {
    med = 'N/A'
           }
           else{
        med = data?.medium;
           }

           var button = null;

           if(showAdded == true)
           {
  button =  <Button variant='primary' onClick={favouritesClicked}>+ Favourite (added)</Button>
           }
           else{
 button =   <Button variant='outline-primary' onClick={favouritesClicked}>+ Favourite</Button>
           }

            
           console.log(button);
dest = "/Artwork/";
dest = dest + props?.objectID;

card =<Card >
{img}
 <Card.Title>{title}</Card.Title>
 <Link href={dest}>
 <Card.Text> {Date}/{classi}/{med}</Card.Text>
 </Link>
 <br /> 
 <br /> 
<p>{name}  Wiki: {wiki} page &nbsp; &nbsp;  &nbsp; &nbsp; Credit: {credit} &nbsp; &nbsp; dimensions: {dimension}</p>
{button}
</Card>
        }
    }
        
return (
    <div>
{element}
{card}
</div>
);
}

export default ArtworkCardDetail;