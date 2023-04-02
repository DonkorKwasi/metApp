import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from 'store';
import { addToHistory} from 'lib/userData';

function Search()
{

  const [history,setHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  const {register,handleSubmit,setValue} = useForm ({
    defaultValues: {
      q: "",
      searchBy: "",
      geoLocation: "",
 medium: "",
 isHighlight: false,
 isOnView: false


    },
  })
  useEffect (() => {
let data =  {
  q: "",
  searchBy: "",
  geoLocation: "",
medium: "",
isHighlight: false,
isOnView: false
}
for(const prop in data)
{
  setValue(prop,data[prop]);
}
  },[])
  async  function sub (data)
    {
console.log(data);
var final ="";
var string1 = '/Artwork?'
var string2 = data.searchBy;
string2 += '=true';
string2 += '&geoLocation=';
string2 += data.geoLocation;
string2 += '&medium=';
string2 += data.medium;
string2 +=  '&isOnView=' 
string2 += data.isOnView
string2 += '&isHighlight='
string2 += data.isHighlight;
string2 +=  '&q=';
string2 += data.q;
final = string1 + string2;
console.log(final)
router.push(final);
setHistory(await addToHistory(string2));
    }
return(
  <div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
<Form onSubmit={handleSubmit(sub)} >
  <Row>
    <Col>
      <Form.Group className="mb-3">
        <Form.Label>Search Query</Form.Label>
        <Form.Control {...register("q")} type="text" placeholder="" name="q" />
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col md={4}>
      <Form.Label>Search By</Form.Label>
      <Form.Select {...register("searchBy")} name="searchBy" className="mb-3">
        <option value="title">Title</option>
        <option value="tags">Tags</option>
        <option value="artistOrCulture">Artist or Culture</option>
      </Form.Select>
    </Col>
    <Col md={4}>
      <Form.Group className="mb-3">
        <Form.Label>Geo Location</Form.Label>
        <Form.Control {...register("geoLocation")}type="text" placeholder="" name="geoLocation" />
        <Form.Text className="text-muted">
        Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
      </Form.Text>
      </Form.Group>
    </Col>
    <Col md={4}>
      <Form.Group className="mb-3">
        <Form.Label>Medium</Form.Label>
        <Form.Control {...register("medium")} type="text" placeholder="" name="medium"/>
        <Form.Text className="text-muted">
        Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
      </Form.Text>
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
      <Form.Check {...register("isHighlight")}
        type="checkbox"
        label="Highlighted"
        name="isHighlight"
      />
      <Form.Check {...register("isOnView")}
        type="checkbox"
        label="Currently on View"
        name="isOnView"
      />
    </Col>
  </Row>
  <Row>
    <Col>
      <br />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Col>
  </Row>
</Form>
</div>)
}

export default Search;