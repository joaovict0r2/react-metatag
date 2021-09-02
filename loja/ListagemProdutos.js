import { Container, Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';
//import ControlaCarrinho from '../Carrinho/ControlaCarrinho'
import { useCount} from '../context/Control';
//const {count ,setCount , carrinhoAtual ,setCarrinhoAtual} = useCount();
import CarIcon from './CarrinhoIcon'
import {Link} from 'react-router-dom'


// import {useSelector , useDispatch} from 'react-redux'
// import Alerta from '../Utilitarios/Alerta'
// import {alert} from '../../store/Utilitarios/Utilitarios.actions'


//const { count, setCount, carrinhoAtual, setCarrinhoAtual  , listagemproduto , setListagemProduto} = useCount();

export default function FotosProdutos(props){
    const [teste , setTeste] = useState([]);
    const [data, setData] = useState(props.data);
    const {count ,setCount , carrinhoAtual ,setCarrinhoAtual , listagemproduto , setListagemProduto , qtdcarrinho , setQtdcarrinho} = useCount();
    //const [atual , setAtual] = useState(url)
    //const [cari , setCar] = useState(carrinhoAtual.length)
    //const [url,setUrl] = useState( `http://apilojinhalaravelcompleta.test/api/produtos/where/`+2)
   //ADD USEEFFECT PATA DETERMINAR COR

  // const alertcarrinho = useSelector(state => state.utilitarios)//redux
  // const dispatch = useDispatch()//redux
  

   function addcart(id_produto , imagem , valorunit , titulo) {
        ControlaCarrinho.incrementarcarrinho(id_produto)          

       //if(carrinhoAtual.length < ControlaCarrinho.retornaarrayatual().length)    
       if(carrinhoAtual.length < ControlaCarrinho.retornaarrayatual().length){   
       carrinhoAtual.push({id:id_produto , qtd:1 , obs:'observasao' ,foto: imagem , valor : valorunit , titulo:titulo})    //gerencia array geral add itens nele controle global
       }
       //carrinhoAtual.push({id:id_produto , qtd:1 , obs:'observasao' , array:{id:'tsadas' , is2:'dasdad'}})
       console.log(carrinhoAtual)
       //setCar(carrinhoAtual.length)
       setQtdcarrinho(carrinhoAtual.length)     
       dispatch(alert(true,'Produto adicionado ao carrinho' ,'success'))   
       }           

    return (
           <>    

         <Grid container >
                {listagemproduto.map((item) => {                    
                    return <Grid item xs={6} key={item.id} 
                        style={{display:'flex' ,
                        alignItems:'center' ,
                        justifyContent:'center',
                        // backgroundColor: 'red',
                        // width: '150px',
                        // height: '295px',
                        // marginBottom: '35px'
                            }}>
                                <Card titulo={item.titulo}
                                        descricao={item.descricao}
                                        id_produto={item.id}
                                        id_user={item.user_id}
                                        imagem={item.foto}
                                        valor={item.valor}
                                        quantidade={item.quantidade}
                                        addcart={addcart}
                                        style={{
                                            
                                        }}
                                    ></Card>
                                </Grid>
                            })}
                            </Grid>
                            {/* {alertcarrinho.open ? <Alerta/> : ''}      */}
                    </>

    );
           
}









