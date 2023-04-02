import { Row } from "react-bootstrap";
import { Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail'
import { useRouter } from "next/router";

function ArtworkById ()
{
    const router = useRouter()
    const {objectID} = router.query;

console.log(objectID);
    return(	<Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
      )
}

export default ArtworkById