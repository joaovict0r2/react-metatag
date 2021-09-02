import Head from 'next/head'
// import Image from 'next/image'


// export default function Home() {


//   return (
//     <div >
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       produto
//     </div>
//   )
// }


import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Typography, Button, TextField } from '@material-ui/core';
//import ControlaCarrinho from '../../../loja/ca'
import { useCount } from '../../../context/Control';
import conexao, { urlfotos } from '../../../apilaravel/api'
import { resolveHref } from 'next/dist/next-server/lib/router/router';
//import fotopadrao from '../../assets/img/lojinhapadrao.png'
//import ModalImage from '../Utilitarios/ModalImage'

export default function DescricaoProduto(props) {



    const [data, setData] = useState();
    const { count, setCount, carrinhoAtual, setCarrinhoAtual, qtdcarrinho, setQtdcarrinho, dadosloja } = useCount();
    const [lojaCompartilhada, setLojacompartilhada] = useState()
    const [open, setOpen] = useState();
    const fotopadrao = '/assets/img/lojinhapadrao.png'


    useEffect(() => {
        console.log('meta',props.meta)




        conexao.get('/produtos/produtos_newcarrinho/' + props.idprod).then((res) => {

            setData(res.data[0])
            conexao.get('/lojinha/where/' + res.data[0].id_usuario).then((res) => {


                setLojacompartilhada(res.data.linkpersonalizado)


                conexao.get('lojinha/url/' + res.data.linkpersonalizado).then((res) => {

                    document.title = res.data.nomeloja
                    setCount(res.data.tema)

                }).catch((erro) => {
                    console.log('caiu aqui', erro)
                })

            }).catch((error) => {
                console.log(error)
            })
        })


    }, [])





    const voltacarrinho = <div></div>

    function setfalse(e) {
        setOpen(e)
    }


    function addcart(id_produto, imagem, valorunit, titulo) {
        ControlaCarrinho.incrementarcarrinho(id_produto)

        if (carrinhoAtual.length < ControlaCarrinho.retornaarrayatual().length) {
            carrinhoAtual.push({ id: id_produto, qtd: 1, obs: 'observasao', foto: imagem, valor: valorunit, titulo: titulo })
        }
        console.log(carrinhoAtual)
        //adiciona unidade no icone do carrinho
        setQtdcarrinho(qtdcarrinho + 1)


    }



    return (
        <>

            <Head>
                <title>Create Next App</title>               
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:title" content={props.meta[0].titulo} />
                <meta property="og:description" content={props.meta[0].descricao} />
                <meta property="og:image" content={'https://api.lojinha.bio/storage/'+props.meta[0].foto} />
            </Head>
       

            <div>
                <div style={{ position: 'absolute', top: '0', zIndex: '1' }}>
                    <a href={'/' + lojaCompartilhada}><IoIosArrowBack style={{ color: '#fff', fontSize: '30px', marginTop: '20px', marginLeft: '10px' }} /></a>{/*mudei aqui params loja*/}
                </div>
                <div style={{ backgroundColor: count, position: 'absolute', top: '0', height: '100px', width: '100%', zIndex: '0', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ color: '#FFF', fontWeight: 'bold', marginTop: '20px', fontSize: '20px' }}>
                        Descrição

          
                </div>

                </div>
            </div>

            <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: '1' }}>

                    <div >
                        {data && <img onClick={() => { setOpen(true) }} src={data.foto ? urlfotos + data.foto : fotopadrao}
                            style={{ height: '250px', width: '250x', borderRadius: '10px', marginTop: '80px' }} />}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >


                {data && <div style={{
                    color: '#545c52',
                    fontSize: '25px',
                    fontWeight: 'bold',
                    // whiteSpace: 'nowrap',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'Ellipsis'
                }}>{data.titulo}</div>}

                {data && <div style={{
                    fontWeight: 'bold',
                    fontSize: '25px', color: count
                }}>
                    R$
                {Number(data.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}</div>}

                {/*data && <text  style={{maxWidth:'25ch' , overflow:'hidden',textOverflow:'Ellipsis'}}>{data.descricao}</text>*/}
                {data ?
                    <textarea readOnly

                        value={data.descricao}
                        id="descricao"
                        contentEditable={false}
                        color='secondary'
                        margin="normal"
                        type="text"
                        multiline
                        justify
                        fullWidth
                        outline='none'

                        style={{ textAlign: 'justify', cursor: 'none', minWidth: '300px', minHeight: '300px', border: ' 0 ', outline: '0', MozWindowShadow: '0 0 0 0' }}
                    /> : ''}


                <a href={'/' + lojaCompartilhada}>
                    {/* <Link to={'/carrinho'}>*/}
                    <Button variant='contained'
                        style={{

                            backgroundColor: count,
                            borderRadius: '25px',
                            textTransform: 'none',
                            color: "#fff",
                            fontWeight: 'bold',
                            marginTop: '30px',
                            marginBottom: '50px',
                            width: '300px',
                            height: '50px',
                            fontSize: '20px'
                        }} onClick={() => {
                            addcart(data.id_produto, data.foto, data.valor, data.titulo)


                        }} >Adicionar ao Carrinho</Button>{/*</Link>*/}</a>
                {/* <div>
                        <Button 
                        > teste</Button>
                        </div> */}
            </div>

            {/* {open ? <ModalImage open={open} setfalse={setfalse} id_produto={data.id_produto} /> : ''} */}

        </>
    )

}


export async function getServerSideProps(context) {
    console.log('CONTEXT', context.query.idprod)
    const res = await fetch('https://api.lojinha.bio/api/produtos/produtos_newcarrinho/' + context.query.idprod)
    const json = await res.json();

    console.log('teste', json)
    return {
        props: {
            idprod: context.query.idprod,
            meta: json
        },
    }
}
