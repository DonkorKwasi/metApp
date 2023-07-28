import { Card, Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { authenticateUser } from "lib/authenticate";
import { useRouter } from 'next/router';
import {   Alert, Button } from 'react-bootstrap';
import { favouritesAtom } from "store";
import { searchHistoryAtom } from "store";
import { useAtom } from "jotai";
import { getFavourites } from "lib/userData";
import { getHistory } from "lib/userData";
import { readToken } from "lib/authenticate";
import { PrismaClient } from '@prisma/client'
import { userNameAtom } from "store";




export default function Login(props){
    const [warning, setWarning] = useState('');
    const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
const [userStore, setUserStore] = useAtom(userNameAtom);
let token = readToken();


 async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      var favs =  await getFavourites()
      var hist =  await getHistory()
      console.log(favs)
      console.log(hist)
   setFavouritesList(favs)
   setSearchHistory(hist)

      router.push('/');
    } catch (err) {
      console.log(err);
   setWarning("Incorrect login information");
    }
  }


  useEffect(()=>{
setUserStore(user)
console.log(userStore);
  },[user])
  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control type="text"  id="userName" name="userName" onChange={e => setUser(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control type="password"  id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
      { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
    </>
  );
  }