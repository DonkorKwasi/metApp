import validObjectIdList from '../../../public/data/validObjectIdList.json'
import ArtworkCard from '@/components/ArtworkCard'
import { useRouter } from "next/router";
import { use, useState } from "react";
import { useEffect } from "react";
import Error from 'next/error';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import useSWR from 'swr'



function Artwork()
{
    const PER_PAGE  = 12;
 const [totalAmount,setAmount] = useState(0);
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    function previousPage()
    {
if(page > 1)
{
SetPage(page -1);
}
    }

    function nextPage()
    {
      console.log(totalAmount)
      let pages = Math.floor(totalAmount/PER_PAGE)
      let remainder = totalAmount % PER_PAGE
      console.log(pages);
      console.log(remainder);
      if(remainder > 0)
      {
pages += 1;
      }
      console.log(pages);
      if( (page + 1) <= pages )
      {
   SetPage(page + 1);
      }
    }
    const [artworkList,setList] = useState();
    const [page,SetPage] = useState(1);
    var dest ='https://collectionapi.metmuseum.org/public/collection/v1/search?'
    dest = dest + finalQuery;
    const {data,error} = useSWR(dest);

    useEffect(()=>
    {
    if(data){
        

      console.log(data)
      setAmount(data.total)
      let filteredResults = validObjectIdList.objectIDs.filter(x => data.objectIDs?.includes(x));


      
        var results = [];
        for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
         const chunk = filteredResults.slice(i, i + PER_PAGE);
         results.push(chunk);
     }
     
          setList(results);
          SetPage(1);
    }
   },[data]);

   var errTag =  null;
   var allObj = null;
   var entireArt = null;
   var paginate = null;
   if(error !=  undefined)
   {
   errTag = <Error key="1" statusCode={404} />
   }
   else{

   if(artworkList != null)
   {
      if(artworkList?.length > 0)
      {
        
     const card = artworkList[page -1].map((art) =>
     
     <Col lg={3} key={art}><ArtworkCard objectID={art} /></Col>

     )
      
     allObj = card;
      }
      else{
      allObj=  <Card>   <h4>Nothing here</h4> </Card>
   

       
      }
   }
entireArt =  <Row key="2" className="gy-4">{allObj} </Row> 

   if(artworkList?.length > 0)
   {
 paginate = <Row key="3" ><Col><Pagination> <Pagination.Prev onClick={previousPage}/><Pagination.Item>{page}</Pagination.Item><Pagination.Next onClick={nextPage}/> </Pagination></Col> </Row>
   }

  
   }
   return(
<div>
{errTag}
{entireArt}
{paginate}
</div>
   );

}

export default Artwork;