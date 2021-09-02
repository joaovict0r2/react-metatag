
import React, { useEffect, useState } from 'react'
import { useCount } from '../../context/CarrinhoControl';
import axios from 'axios'
import CardCarrinho from './CardCarrinho'
import { Container, Button } from '@material-ui/core'
import { ImportExport } from '@material-ui/icons';
import { Link } from 'react-router-dom'
//const {count ,setCount , carrinhoAtual ,setCarrinhoAtual} = useCount();
import { IoIosArrowBack } from 'react-icons/io'
import conexao from '../../api/api'

export default function NewCarrinho(props) {
    const {  count,
        setCount,
        carrinhoAtual,
        setCarrinhoAtual,
        subtotal,
        setSubtotal,
        qtdcarrinho,
        setQtdcarrinho} = useCount();


    const [cardcarrinho, setCardcarrinho] = useState([]);
  
    var valor = 0;

    var pegaprodutos = []

    useEffect(() => {

        console.log('dentro do effect', carrinhoAtual)

        carrinhoAtual.map((item) => {
            conexao.get('/produtos/' + item.id).then((res) => {

                pegaprodutos.push(res.data)
                console.log('pega produtos', pegaprodutos)
                const temp = pegaprodutos.slice();
                setCardcarrinho(temp)
                console.log('cardcarrinho', cardcarrinho)//estudar

            })
        })

    }, [])


    const produtoscarrinho = cardcarrinho.map((item, index) => {
        return <div key={index}><CardCarrinho titulo={item.titulo} id={item.id} index={index} ></CardCarrinho></div>
    })

    if(carrinhoAtual.length > 0 ){

    return (
        <>
            <div style={{ position: 'absolute', top: '0', zIndex: '1' }}>
                <Link to={'/'+localStorage.getItem('loja')}><IoIosArrowBack style={{ color: '#fff', fontSize: '30px', marginTop: '10px', marginLeft: '10px' }} /></Link>
            </div>
            <div style={{ backgroundColor: count, position: 'absolute', top: '0', height: '100px', width: '100%', zIndex: '0', display: 'flex', justifyContent: 'center' }}>
                <div style={{ color: '#FFF', fontWeight: 'bold', marginTop: '20px', fontSize: '20px' }}>
                    Meu carrinho
           </div>


            </div>

            <Container component="article" maxWidth='sm' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >

                <div style={{ marginTop: '60px', zIndex: '2' }}>
                    {cardcarrinho && produtoscarrinho}
                </div>


            </Container>
            <div style={{ marginTop: '100px' }}>

                <div style={{ display: 'flex', fontSize: '20px', flexDirection: 'row', justifyContent: 'center', margin: '10px', fontWeight: 'bold', color: count , marginTop: '20px' }}>

                    <div >

                    {

                        carrinhoAtual.map((item) => {
                            console.log('valor do item', (item.valor * item.qtd).toFixed(2))
                            valor = parseFloat(valor) + parseFloat((item.valor * item.qtd).toFixed(2))


                        })

                        }

                        {setSubtotal(valor)}

                    

                         Subtotal: R${Number(valor.toFixed(2)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')} 
                    </div>
                    <div>

                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link to={'/compra'}>
                        <Button style={{ borderRadius: '35px', textTransform: 'none', fontSize: '25px', width: '300px', backgroundColor: count, fontWeight: 'bold', margin: '20px' }} variant='contained' color='primary' >Finalizar Pedido</Button>
                    </Link>
                </div>
            </div>
        </>


    );}else{
        return(
            <div>
                <div style={{ position: 'absolute', top: '0', zIndex: '1' }}>
                <Link to={'/' + localStorage.getItem('loja')}><IoIosArrowBack style={{ color: '#fff', fontSize: '30px', marginTop: '10px', marginLeft: '10px' }} /></Link>
            </div>
            <div style={{ backgroundColor: count, position: 'absolute', top: '0', height: '100px', width: '100%', zIndex: '0', display: 'flex', justifyContent: 'center' }}>
                <div style={{ color: '#FFF', fontWeight: 'bold', marginTop: '20px', fontSize: '20px' }}>
                    Meu carrinho
                </div>
            </div>


            <div style={{marginTop:'200px' ,display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                <div style={{fontWeight:'bold' , color:"#545c52"}}> Carrinho vazio </div>
                 </div>
                

        

            </div>


           
        )
    }

}