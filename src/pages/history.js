import { useAtom } from "jotai";
import { searchHistoryAtom } from "store";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useRouter } from "next/router";
import { Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import {Button} from "react-bootstrap";
import styles from '../styles/History.module.css';
import { removeFromHistory } from "lib/userData";
import { favouritesAtom } from "store";
import { getHistory } from "lib/userData";
import { useEffect } from "react";

export default function History()
{
    const [faves,setFaves] = useAtom(favouritesAtom);
    const [history,setHistory] = useAtom(searchHistoryAtom);
    const router = useRouter()
  

let parsedHistory = [];


console.log( Object.keys(history))
if( Object.keys(history).length !== 0 )
{
    console.log('how are u reaching this point fuck off')
history.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
});
}

function historyClicked(e,index)
{
   var string = '/Artwork?';
    string += history[index];
router.push(string);
}

async function removeHistoryClicked (e,index)
{
    e.stopPropagation(); 
    setHistory(await removeFromHistory(history[index]));
    
   
}
var historyList = null;
var allHistory = null;
if(parsedHistory.length == 0 )
{
    console.log('here')
   historyList =  <Card>   <h4>Nothing here</h4> </Card>
}
else{
const list = parsedHistory.map((hist,index)=>
    
    <ListGroup.Item key={hist} onClick={e =>historyClicked(e,index)} className={styles.historyListItem}>{Object.keys(hist).map(key => (<>{key}: <strong>{hist[key]}</strong>&nbsp;</>))}    <Button className="float-end" variant="danger" size="sm" 
    onClick={e => removeHistoryClicked(e, index)}>&times;</Button> </ListGroup.Item>
 



)
historyList = list;

}
useEffect(()=>
{
setHistory(getHistory());
},[])

allHistory = <ListGroup>{historyList}</ListGroup>
return(<div>
    
    <br />
    <br />
    <br />
    <br />
    {allHistory}</div>)
}