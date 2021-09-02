import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DashboardSharp, Height } from '@material-ui/icons';
//import { Link } from 'react-router-dom';
import menu from  './index.module.css'
import MenuTopo from './menutopo'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios'
//import fotopadrao from '../../assets/img/Default.png'
//import '../../global.css'
import { HiPlus } from 'react-icons/hi'//adicionar produtos
//import {ImSearch} from 'react-icons/im'//consultar pedidos    BiSearchAlt
import { BiSearchAlt } from 'react-icons/bi'
import { BiLink } from 'react-icons/bi'//adicionar links
//import {ImPencil} from 'react-icons/im'//Editar lojinha BiEditAlt
import { BiEditAlt } from 'react-icons/bi'
import { HiCog } from 'react-icons/hi'//Editar lojinha
import { useCount } from '../../context/Control';
//const { count, setCount, carrinhoAtual, setCarrinhoAtual } = useCount();
//import plano from '../../assets/img/icons/plano.png'
import conexao, { urlfotos } from '../../apilaravel/api'
//import labelPremium from '../../assets/img/tag_premium.png'
import Link from 'next/link'
import zIndex from '@material-ui/core/styles/zIndex';



//import { useSelector, useDispatch } from 'react-redux'
//import Alerta from '../Utilitarios/Alerta'
//import { alert } from '../../store/Utilitarios/Utilitarios.actions'



export default function Menu() {


    const useStyles = makeStyles((theme) => ({
        button: {
            margin: '10px',
            width: '200px'
        },
        fundoicon: {
            backgroundColor: '#FFFF',
            height: '70px',
            width: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            // borderColor:'#FE1260',
            borderRadius: '50%'


        },
        iconsm: {
            fontSize: '16px',
            color: '#FFF',
            //backgroundColor :'#FE1260' ,
            borderRadius: '50%',
            height: '60px',
            width: '60px',
            padding: '10px'
        },
        qtdPedidosProdutos: {

            fontSize: '25px',
            paddingTop: '20px',
            color: count,
            fontWeight:'bold'

        },
        menutopo : {
            
              height: '50px',
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',    
              justifyContent: 'center',
             
          },
          logo:{    
              width: '150px'    
          },
          iconmenu:{
              position: 'absolute' ,
              zIndex: 1,
              left: '10px',
              
          },
          
          cabecalho : {
          
              height: '170px', 
              zIndex: 0,
              display: 'flex',
              flexDirection : 'row',
              justifyContent: 'space-beetwen'
          
          },
          
          textogrande :{
              paddingTop: '2px',
             marginLeft: '30px',              
              fontSize:'22px',
              color: '#fff',   
          
          },
          
          textopequeno :{
              paddingTop: '5px',
              marginLeft: '30px',              
              fontSize:'10px',
              color: '#fff',
               paddingBotton  : '5px'
          },
          
          pedidosprodutos :{
              display: 'flex',
            flexDirection: 'row' ,  
              justifyContent: 'space-between',
              width: '280px',
              marginTop: '30px',    
             height: '100px',
             color: '#545c52',
             fontSize: '15px',
             
          
          },
          
          iconsmenu :{
              display: 'flex',
              flexDirection: 'column',
            paddingTop: '40px',    
          
          },
          
          titulomenu :{
              
        
              
          },
        
          
          linklojinha : {
              textTransform: 'none',
              backgroundColor: '#FFF',
             borderRadius: '35px',
               marginLeft: '25px',
              fontSize: '10px',                        
              fontWeight: 'bold',
               height: '50px',
               marginBottom: '10px',
               boxShadow: '1.5px 1px 2px #0000002e'
          }


    }));

    const { count, setCount, carrinhoAtual, setCarrinhoAtual ,logado} = useCount();

    const [dados, setDados] = useState([]);
    const [nome, setNome] = useState();
    const fotopadrao = '/assets/img/Default.png'
    const labelPremium = '/assets/img/tag_premium.png'
    const plano = '/assets/img/icons/plano.png'

    // // const resultMenu = useSelector(state => state.utilitarios)//redux
    // // const dispatch = useDispatch()//redux

    const classes = useStyles();

    useEffect(async () => {

        console.log('id localstorage',localStorage.getItem('id'))

        await conexao.get('/lojinha/menu/' + localStorage.getItem('id')).then((res) => {
            console.log('dados que preciso', res.data[0])
            setDados(res.data[0])
            localStorage.setItem('nomedaloja', res.data[0].nome_loja)

        }).catch((err) => {
            console.log('erro')
        })


    }, [])


    function lojinha() {
        window.location.href = "localhost:3000/" + dados.link;
    }


    return (

        <>

            <MenuTopo />

                      
            <div className={classes.cabecalho} style={{ backgroundColor: count }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className={menu.textogrande} style={{ maxWidth: '210px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'Ellipsis' }}>
                        Olá, {dados.nome}
                    </div>
                    <div className={classes.textopequeno}>
                        Seja bem-vindo à sua lojinha.<br />
                    Confira o resumo da sua conta e aproveite <br />
                    os atalhos para configurar o seu perfil.
                    </div>
                    <Button href={"/"+dados.link} target="_blank" 
                    style={{
                        outline: 'none',
                        textTransform: 'none',
                        backgroundColor: '#FFF',
                        borderRadius: '35px',
                        marginLeft: '25px',
                        fontSize: '10px',
                        color: count,
                        fontWeight: 'bold',
                        heigth: '50px',
                        boxShadow: '1.5px 1px 2px #0000002e',
                        marginBottom:'10px'}} >
              
                            
                     Ir para minha Lojinha
                        
                    </Button>
                    <Button onClick={() => {

                        navigator.clipboard.writeText("https://lojinha.bio/" + dados.link);
                        // dispatch(alert(true, 'Copiado!', 'success'))

                        setTimeout(() => {
                            // dispatch(alert(false, '', ''))
                        }, 1000);


                    }} target="_blank" 
                    style={{
                        outline: 'none',
                        textTransform: 'none',
                        backgroundColor: '#FFF',
                        borderRadius: '35px',
                        marginLeft: '25px',
                        fontSize: '10px',
                        color: count,
                        fontWeight: 'bold',
                        heigth: '50px',
                        boxShadow: '1.5px 1px 2px #0000002e'}}
                        >
                        
                        Copiar link da sua lojinha.bio

                    </Button>
                </div>
                <div style={{display:'flex' , flexDirection:"column" , alignItems:'center' , justifyContent:'center' }}>
                    <Link href='/edicao-da-loja'><img height='110' width='110' src={dados.foto ? urlfotos + dados.foto : fotopadrao} style={{  borderRadius: '50%',  border: 'solid 4px #fff' , margin:'10px'}} /></Link>
                    {logado.plano  ===  '1'?
                    <img style={{
                        heigth:'10px',
                        width:'70px',
                        marginTop:'-20px'
                    }} src={labelPremium}/>
                :''}
                </div>

            </div>
            <Container maxWidth="sm" align='center' className='box'>

               <div className={classes.pedidosprodutos}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: 'bold' }}> Meus Pedidos</div>
                        <div className={classes.qtdPedidosProdutos}>{dados.qtd_pedidos}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontWeight: 'bold' }}>  Meus Produtos</div>
                        <div className={classes.qtdPedidosProdutos}>{dados.qtd_produtos}</div>
                        <div></div>
                    </div>

                </div>
             
                <hr />
                <div >ACESSO RÁPIDO</div>
                <Grid container>


                <Grid item xs={4} className={classes.iconsmenu}>
                        <a to='/listagem-produtos' className='titulomenu' >
                            <div className={classes.fundoicon} style={{ borderColor: count }}><HiPlus className={classes.iconsm} style={{ background: count }} /></div>
                            <div style={{ color: '#545c52', fontSize: '12px' }} >Adicionar <br />Produto</div></a>
                    </Grid>

                <Grid item xs={4} className={classes.iconsmenu}>
                        <a href='menu' className='titulomenu' >
                            <div className={classes.fundoicon} style={{ borderColor: count }}><BiSearchAlt className={classes.iconsm} style={{ background: count }} /></div>
                            <div style={{ color: '#545c52', fontSize: '12px' }} >Consultar <br />Pedidos</div></a>
                    </Grid>

                    <Grid item xs={4} className={classes.iconsmenu}>
                        <a href={'menu'} className='titulomenu' >
                            <div className={classes.fundoicon} style={{ borderColor: count }}><BiLink className={classes.iconsm} style={{ background: count }} /></div>
                            <div style={{ color: '#545c52', fontSize: '12px' }} >Links <br />Lojinha</div></a>
                    </Grid>

                    <Grid item xs={4} className={classes.iconsmenu}>
                        <a href='menu' className='titulomenu' >
                            <div className={classes.fundoicon} style={{ borderColor: count }}><BiEditAlt className={classes.iconsm} style={{ background: count }} /></div>
                            <div style={{ color: '#545c52', fontSize: '12px' }} >Editar <br />Lojinha</div></a>
                    </Grid>

                    <Grid item xs={4} className={classes.iconsmenu}>
                        <a href='menu' className='titulomenu' >
                            <div className={classes.fundoicon} style={{ borderColor: count }}><HiCog className={classes.iconsm} style={{ background: count }} /></div>
                            <div style={{ color: '#545c52', fontSize: '12px' }} >Configurações</div></a>
                    </Grid>

                    <Grid item xs={4} className={classes.iconsmenu}>
                        <a href='menu' className='titulomenu' >

                            <img src={plano} style={{ height: '70px', width: '70px' }} />

                            <div style={{ color: '#545c52', fontSize: '12px', fontWeight: 'bold' }} >Assinar <br /> PREMIUM</div></a>
                    </Grid>
                   


                </Grid>

                 
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',marginTop: "30px" }}>
                    <a href='/login' className='titulomenu' onClick={() => { localStorage.clear() }}>
                        <div className={classes.fundoicon}
                            style={{ borderColor: count }}>
                            <ExitToAppIcon style={{ padding: '10px', backgroundColor: count }} className={classes.iconsm} />

                        </div>
                        <div style={{ color: '#545c52', fontSize: '12px'}} >Sair</div></a>                
                    </div>
                <div style={{ marginBottom: "40px"}}></div> 
            </Container>

            {/* {resultMenu.open ? <Alerta /> : ''} */}

        </>








    )


}