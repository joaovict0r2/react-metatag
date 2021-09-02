import React ,{ useEffect, useState }  from 'react'
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import {Button} from '@material-ui/core'
//import ControlaCarrinho from '../../context/CarrinhoControl'
//const {carrinhoAtual , qtdcarrinho ,setQtdcarrinho} = useCount();


import { useCount} from '../context/Control';



export default function CarrinhoIcon(props){
    const {carrinhoAtual , qtdcarrinho ,setQtdcarrinho} = useCount();
    const CarrinhoIconCompres  = 'assets/img/shoppingCart.png'

  

//props.car

    return(
        <div style={{marginTop:'10px' , display:'flex' , flexDirection:'column', justifyContent:'center' ,alignItems:'center'}}>

        <Badge color="secondary" badgeContent={qtdcarrinho} style={{ }}></Badge>
        <Button  onClick={props.carrinho}><img alt='carrinho de compras' src={CarrinhoIconCompres}  
        style={{
            color:'#FFF' ,
            position:'relative' ,
            right:'15px',
            maxWidth:'30px',
            maxHeight:'30px',
            }}/>
            </Button>
        </div>

    )

}