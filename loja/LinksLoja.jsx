import { Container, Grid} from '@material-ui/core';
import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import Accordion from './AcordionLink';
import { useEffect , useState } from 'react';
import { useCount } from '../../context/CarrinhoControl';
//const { count, setCount, carrinhoAtual, setCarrinhoAtual  , listagemproduto , setListagemProduto} = useCount();
import conexao from '../../api/api'


export default function LinksLoja(){

const [link , setLink] = useState();
const [titulo , setTitulo] = useState();
const [data , setData] = useState([]);
const { count ,iduser} = useCount();



useEffect(()=>{

    console.log('ID USUARIO ID USER LINKS',iduser)

       conexao.get('/link/where/'+iduser).then((res) => {
        setData(res.data)
        console.log(res.data)

        console.log('exibindo estado', data)
    }).catch((erro) => {
        console.log(erro)
    });    

},[])



    
        return (

            <Container component="article" style={{display:'flex' ,alignItems:'center' , justifyContent:'center' , flexDirection:'column'}}>

<div style={{fontWeight:'bold' , color:'B0B0B0', marginTop:'10px' , fontSize:'16px', textAlign:'center' }}>
        Confira nossos outros links e acompanhe nosso trabalho!
      </div>

                <Grid container>
                    {data && ( data.map((item) => {
                       return <Grid item xs={12} key={item.id} >
                            <Accordion titulo={item.titulo} link={item.link} user_id={item.user_id} id_link={item.id} cor={count} >acrodion</Accordion>
                        </Grid>
                    }))}
                </Grid>


            </Container>

        );
    }







