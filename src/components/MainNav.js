import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap"; 
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";
import {useRouter} from 'next/router';
import { Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "store";
import Link from "next/link";
import { removeToken } from "lib/authenticate";
import { readToken } from "lib/authenticate";

import { addToHistory } from "lib/userData";

function MainNav()
{
  const[history,setHistory] = useAtom(searchHistoryAtom)
const[searchField, setSearchField] = useState('');
const [isExpanded,setExpanded] = useState(true);
const router = useRouter()
let token = readToken();
function logout() {
  setExpanded(false);
  removeToken();
  router.push('/login')
}


function tog()
{
  setExpanded(!isExpanded)
}
async function Direct(e)
{ console.log('called')
setExpanded(false);
    e.preventDefault(); 
   
    var string1 = '/Artwork?'
    var string2= 'title=true&q='
    var historyString = string2 + searchField;
    var searchString = string1+ string2;
    searchString += searchField;
    setHistory(await addToHistory(`title=true&q=${historyString}`)) 

    router.push(searchString);
}

function makeFalse()
{
setExpanded(false)
}

function makeTrue()
{
setExpanded(true);
}

var topPart = null
var usersName = null;
var notLogged = null;
console.log(token)
if(token)
{ 
  topPart = <div>
    <Link href="/search">
                <Nav.Link href="#link" onClick={makeFalse}color="white"  active={router.pathname === "/search"} > <h4 className="linkText">Advanced Search</h4></Nav.Link>
                </Link>

                
                <Form className="d-flex" onSubmit = {Direct}>
                Search: <Form.Control
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                         type="search"
                         placeholder="Search"
                         className="me-2"
                         aria-label="Search"
                       />
           <Button type="submit">Submit</Button>
                 </Form>
                
        
                 </div>
                     

usersName =  <Nav>  <NavDropdown title={token.userName} id="basic-nav-dropdown">
             <p>{token.userName}</p>
<Link href="/Favourites">
 <NavDropdown.Item  href="#Favourites" onClick={makeFalse} color="white" active={router.pathname === "/Favourites"}>
 <h4>Favourites</h4>
 </NavDropdown.Item>
 </Link>
 <Link href="/history">
 <NavDropdown.Item  href="#history" onClick={makeFalse} color="white" active={router.pathname === "/history"} >
 <h4 >History</h4>
 </NavDropdown.Item>
 </Link>
</NavDropdown>
<Link href = '/login'>
<NavDropdown.Item href="#login"  onClick={logout}  color="white" >
 <h4>Logout</h4>
 </NavDropdown.Item>

 </Link>
 
</Nav>




}
else{
notLogged = <Nav>
<Link href='/register' passHref>
                <Nav.Link href="#register" onClick={makeFalse} color="white" active={router.pathname === "/register"}> <h4 className="linkText">Register</h4></Nav.Link>
                </Link>

                <Link href='/login' passHref>
                <Nav.Link href="#login" onClick={makeFalse} color="white" active={router.pathname === "/Login"}> <h4 className="linkText">Login</h4></Nav.Link>
                </Link>

</Nav>
}
    return (
        <div>
        <Navbar bg="dark" expand="lg" className="fixed-top"  expanded={isExpanded}>
          <Container>
            <Navbar.Brand >Kwasi Donkor</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link href='/' passHref>
                <Nav.Link href="#home" onClick={makeFalse} color="white" active={router.pathname === "/"}> <h4 className="linkText">Home</h4></Nav.Link>
                </Link>

                {topPart}
                </Nav>
                {notLogged}
        
             
              &nbsp;
      {usersName}
      
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
        <br />
        </div>
      );
}

export default MainNav;