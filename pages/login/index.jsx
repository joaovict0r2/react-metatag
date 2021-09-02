import React, { Component, useEffect } from "react";
import { Container, Typography, Avatar } from "@material-ui/core";
import Login from './Login';
//import logo from '../../assets/img/Logo.png'


export default function Login_Page() {

  // useEffect(() => {

  //   var link = document.createElement('meta');
  //   link.setAttribute('property', 'og:description');
  //   link.content = 'HDJKDHSHDJKASSKAKJDKjakdjl';
  //   document.getElementsByTagName('head')[0].appendChild(link);

  // }, [])


  // var link = document.createElement('meta');
  // link.setAttribute('property', 'og:description');
  // link.content = 'HDJKDHSHDJKASSKAKJDKjakdjl';
  // document.getElementsByTagName('head')[0].appendChild(link);




  return (
    <Container component="article" maxWidth="sm" >
      {/* <Meta/>  */}



      <Login logo={''} />
    </Container>
  );

}



