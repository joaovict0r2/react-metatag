import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { Typography, Button, TextField } from '@material-ui/core';
import ControlaCarrinho from '../Carrinho/ControlaCarrinho'
import { useCount } from '../../context/CarrinhoControl';
import conexao, { urlfotos } from '../../api/api'
import fotopadrao from '../../assets/img/lojinhapadrao.png'
import ModalImage from '../Utilitarios/ModalImage'

export default function DescricaoProduto(props) {



    const [data, setData] = useState();
    const { count, setCount, carrinhoAtual, setCarrinhoAtual, qtdcarrinho, setQtdcarrinho } = useCount();
    const [lojaCompartilhada, setLojacompartilhada] = useState()
    const [open, setOpen] = useState();


    useEffect(() => {

        const { match: { params } } = props;
        console.log('importante', params.objeto)


        conexao.get('/produtos/produtos_newcarrinho/' + params.objeto).then((res) => {
            console.log('data ', res.data)
            setData(res.data[0])
        })

    }, [])


    useEffect(() => {

        const { match: { params } } = props;

        conexao.get('lojinha/url/' + params.loja).then((res) => {
            //setLDadosLoja(res.data)
            console.log('principal', res.data)
            document.title = res.data.nomeloja
            setLojacompartilhada(res.data.linkpersonalizado)
            setCount(res.data.tema)

        }).catch((erro) => {
            console.log('caiu aqui', erro)
        })

    }, [])


    // useLayoutEffect(()=>{
    // conexao.get('/usuario/'+47).then((res) => {
    //  console.log('cor', res.data.tema)
    //  setCount(res.data.tema)
    //  })
    // },[])
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

            <div>
                <div style={{ position: 'absolute', top: '0', zIndex: '1' }}>
                    <Link to={'/' + lojaCompartilhada}><IoIosArrowBack style={{ color: '#fff', fontSize: '30px', marginTop: '20px', marginLeft: '10px' }} /></Link>{/*mudei aqui params loja*/}
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
                    textAlign:'center',
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
                        
                        style={{ textAlign:'justify',cursor:'none',minWidth: '300px',minHeight:'300px' ,  border: ' 0 ', outline: '0', MozWindowShadow: '0 0 0 0' }}
                    /> : ''}


                <Link to={'/' + lojaCompartilhada}>
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


                        }} >Adicionar ao Carrinho</Button>{/*</Link>*/}</Link>
                        {/* <div>
                        <Button 
                        > teste</Button>
                        </div> */}
            </div>

            {open ? <ModalImage open={open} setfalse={setfalse} id_produto={data.id_produto} /> : ''}

        </>
    )






}