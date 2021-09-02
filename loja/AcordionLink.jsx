
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, TextField } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { useCount } from '../../context/CarrinhoControl';
//const { count, setCount, carrinhoAtual, setCarrinhoAtual  , listagemproduto , setListagemProduto} = useCount();
import conexao from '../../api/api'

const useStyles = makeStyles((theme) => ({
  root: {
    
    margin: '10px',
    display:'flex'
    

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const initialvalue = {    
  titulo: '',
  link: '',
}

export default function SimpleAccordion(props) {

  const classes = useStyles();
  const { count} = useCount();

  return (
    <div className={classes.root} >
      

      <Button 
      href={props.link} 
      target='_blank'
      variant='contained' 
      textDecoration='none'       
      style={{width:'100%' , 
      margin:'10px' , 
      borderRadius:'25px' , 
      fontWeight:'bold' , 
      fontSize:'15px' , 
      textTransform:'none',
      background:count,
      textDecoration:'none',
      color:'#fff'}}>
        <div style={{maxWidth:'50ch' , whiteSpace:'nowrap' , overflow:'hidden',textOverflow:'Ellipsis'}}>
        
         {props.titulo}</div></Button>

           
        
       

    </div>
  );
}
