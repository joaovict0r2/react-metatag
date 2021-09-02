    import React, { Component, useEffect, useState, useLayoutEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import axios from 'axios';
//import LinksLoja from './loja/LinksLoja'
import ListagemProduto from './ListagemProdutos'
import { useParams, Link } from 'react-router-dom'
//import Compra from '../Carrinho/Compra'
import CarrinhoIcon from './CarrinhoIcon'
import { useCount } from '../context/Control';
import { DesktopWindows } from '@material-ui/icons';
// import padrao from '../../assets/img/Default.png'
//import Login from '../../components/Login/Login'
import conexao, { urlfotos } from '../apilaravel/api'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    divgrid: {
    }
})


export default function Loja_Page() {

    const [tela, setTela] = useState(0)
    const [loja, setLoja] = useState()

    const padrao =  '/assets/img/Default.png'

    const { count,
        setCount,
        carrinhoAtual,
        setCarrinhoAtual,
        dadosloja,
        setLDadosLoja ,iduser } = useCount();

    const [data, setData] = useState();

    const [menu, setMenu] = useState(true);


 

    function links() {//examinar aqui
        setTela(1)
        setMenu(false)
    }

    function produtos () {//examinar aqui
        setTela(0)
        setMenu(true)
    }

    function compra() {
        setTela(3)
    }


    const telas = [
        <ListagemProduto />,
        // <LinksLoja />,
        // <Compra />
    ]

    //if(dadosloja.id){//usa a cor verificada pelo useeffect da pagina principal , se a cor existir a loja tambem existe e pode ser exibida
//console.log(document.title)
// if(document.title !== 'undefined'){
    return (
        <>
            <div style={{ backgroundColor: count  , height: '140px', position: 'absolute', top: '0', width: '100%', zIndex: '0' }}>

            </div>

            <Container 
             component="article"
                maxWidth="sm" style={{paddingBottom: "100px"}}
                
              >

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    marginTop: '10px'
                }} >
             

                    <a to='/carrinho'> {true ? <CarrinhoIcon></CarrinhoIcon> : ''}</a>

                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: '2',
                    position: 'relative'
                }}>

                    <img src={dadosloja.foto ? urlfotos + dadosloja.foto : padrao} height='150px' width='150px' style={{ borderRadius: '50%', border: 'solid 5px', borderColor: '#FFF' }} />

                    <div style={{ marginTop: '40px', color: count }}><h1>{dadosloja.nomeloja}</h1></div>

                    <div style={{ margin: '20px' }} >{dadosloja.descricaoloja}</div>
                </div>



                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '30px',
                    }}>
                    <Button style={{
                        textTransform: 'none',
                        color: menu ? count : '#545C52',
                        fontWeight: 'bold',
                        fontSize: '17px',
                        textDecorationLine: menu ? 'underline' :'none' }}
                        onClick={produtos}>
                            Nossos Produtos
                        </Button>
                    <Button onClick={links}
                        style={{ textTransform: 'none',
                        color: menu ? '#545C52' : count,
                        fontWeight: 'bold', fontSize: '17px',
                        textDecorationLine: menu ? 'none' :'underline'}}>
                        Conheça Também
                    </Button>
                </div>

                {telas[tela]}


            </Container>
        </>
    );
    







}



//}else{
  //  return(
    //    <div>
     // {  <Login/>}
      //  </div>
    //)
//}