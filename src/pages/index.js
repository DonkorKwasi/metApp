
	/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ________KWASI______________ Student ID: _____103434171_____________ Date: _____4/2/2023_______________
*
**  Vercel App (Deployed) Link: ____https://vercel-app-assignment6.vercel.app/_________________________________________________
*

********************************************************************************/ 


import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Row } from 'react-bootstrap'
import {Col} from 'react-bootstrap'

 function Home() {


  return (

    <div className={styles.container} >

      
 <img className={styles.content} src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="MET"></img>
 <div className={styles.descContain}>
<p className={styles.desc}>This site is based off of information about the Metropolitan Museum of Art. The MET is the largest art museum in the americas and this website allows users to search for various information about the pieces of art that reside there. Users can then make an account and track the history of their searches and add specific pieces of art to their favourites.</p>
</div>
</div>
  )
}
export default Home;
