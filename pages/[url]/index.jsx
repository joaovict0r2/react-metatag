import React, { useLayoutEffect, useState, useEffect } from 'react'
import axios from 'axios'
import LojaPage from '../../loja/Loja_page'
import { useCount } from '../../context/Control';
//const { count, setCount, carrinhoAtual, setCarrinhoAtual  , listagemproduto , setListagemProduto} = useCount();
import conexao from '../../apilaravel/api'
import { Link, Redirect } from 'react-router-dom'
//import Login from '../../components/Login/Login'
import { DesktopWindows } from '@material-ui/icons';
import { useRouter } from 'next/router';

export default function Principal(props) {
  const { count,
    setCount,   
    setListagemProduto,    
    setLDadosLoja, 
    setIduser } = useCount();

    const router = useRouter();
    


 useEffect(() => {


    //const { match: { params } } = props;
    //localStorage.setItem('loja', params.url)
    //console.log('loja', localStorage.getItem('loja'))

    //const { url } = router.query;
    //console.log('URL', url)
    console.log('props', props.url)


    conexao.get('lojinha/url/' + props.url).then((res) => {
      //setLDadosLoja(res.data)
      console.log('dados loja', res.data)
      setCount(res.data.tema)
      document.title = res.data.nomeloja

      setLDadosLoja(res.data)
      setIduser(res.data.user_id)    //add id ao context  mini redux 

      conexao.get('produtos/where/' + res.data.user_id).then((res) => {
        setListagemProduto(res.data)
        console.log('lista de produtos',res.data)
      }).catch((error)=>{
        console.log('nao existe produtos')

      })
    }).catch((erro) => {
      console.log('nao existe loja',erro)
    })
  }, [props])



  return (
    <div >
     <LojaPage/>  
    </div>

  )

}

export async function getServerSideProps(context) {
 console.log('CONTEXT',context.query.url)  
  return {
    props: {url : context.query.url}, 
  }
}