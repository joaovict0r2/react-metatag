
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useCount } from '../../context/CarrinhoControl'
import axios from 'axios'
import mais from '../../assets/img/icons/mais.png'
import menos from '../../assets/img/icons/menos.png'
import excluir from '../../assets/img/icons/excluir.png'
import fotopadrao from '../../assets/img/lojinhapadrao.png'

import DialogExcluir from '../Utilitarios/DialogExcluir'
import { useSelector, useDispatch } from 'react-redux'
import { dialog } from '../../store/Utilitarios/Utilitarios.actions'
import { urlfotos } from '../../api/api';




const useStyles = makeStyles({
    root: {

        margin: '10px'
    },
});



export default function ImgMediaCard(props) {





    const classes = useStyles();
    const {  count,
        setCount,
        carrinhoAtual,
        setCarrinhoAtual,
        subtotal,
        setSubtotal,
        qtdcarrinho,
        setQtdcarrinho } = useCount();

    var qtd;
    var img;
    var valor;
    carrinhoAtual.map((item) => {
        if (item.id == props.id) {
            qtd = item.qtd
            img = item.foto
            valor = item.valor
        }

    })
    const [quantidade, setQuantidade] = useState(qtd);//carrinhoAtual[props.index].qtd
    const [open, setOpen] = useState(false)
    const [fotos, setFotos] = useState([])


  //const dialogo = useSelector(state => state.utilitarios)
 // const dispath = useDispatch()



    useEffect(() => {
        console.log(quantidade)
        //carrinhoAtual[props.index].qtd = quantidade
        carrinhoAtual.map((item, index) => {
            if (item.id == props.id) {
                carrinhoAtual[index].qtd = quantidade
            }

        })
        console.log(carrinhoAtual)
    }, [quantidade])

    return (


        <Card style={{ width: '350px', margin: '10px' }} hidden={open}>
            <CardActionArea>

                <CardContent>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <CardMedia
                                component="img"
                                alt="Produto"
                                height="60px"
                                width="60px"
                                style={{  height: '100px', width: '100px', borderRadius: '10px' }}
                                src={img ? urlfotos + img :fotopadrao }
                            />
                        </div>

                        <div style={{  width:'100%'}}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , marginLeft:'10px'  }}>
                                <div style={{ display: 'flex', flexDirection: 'column' ,justifyContent:'flex-start'  }}>

                                    <span style={{ maxWidth:'20ch' , whiteSpace:'nowrap' , overflow:'hidden',textOverflow:'Ellipsis'  }}>{props.titulo}</span>

                                    <span> {props.descricao}</span>
                                </div>

                                <div>
                                

                                    <img src={excluir} style={{ height: '20px', width: '20px' }} variant="contained" color="secondary" onClick={(e) => {
                                        var retirar
                                        setSubtotal(subtotal - valor)
                                       
                                        carrinhoAtual.map((item, index) => {
                                            if (item.id == props.id) {
                                                retirar = index
                                                carrinhoAtual.splice(retirar, 1)
                                            }
                                        })
                                        setQtdcarrinho(carrinhoAtual.length)
                                        console.log(carrinhoAtual)

                                       // dispath(dialog(true, 'Deseja excluir o produto ?', ''))
                                       // if(dialog.msg === 'SIM'){
                                       // setOpen(true)
                                      //  }else{
                                      //      setOpen(false)
                                      //  }
                                      setOpen(true)
                                    }} />
                                </div>
                            </div>
                            <div style={{ width:'100px' ,display:'flex' , width:'100%' ,marginTop:'10px' , flexDirection:'column'}}>

                                <div style={{display:'flex' , alignItems:'center' ,marginLeft:'10px', justifyContent:'start'}}>

                                    <img src={mais} style={{ height: '20px' }} variant="contained" color="primary" onClick={(e) => {


                                        setQuantidade(quantidade + 1)
                                        setSubtotal(subtotal + valor)
                                        console.log('carrinho atual', carrinhoAtual)
                                      

                                    }} />

                                    <label style={{ marginTop: '5px', margin: '10px' }} >Qtd:{quantidade}</label>

                                    <img src={menos} style={{ height: '20px' }} variant="contained" color="secondary" onClick={(e) => {
                                        if (quantidade > 1) {
                                            setQuantidade(quantidade - 1)
                                            setSubtotal(subtotal - valor)

                                            console.log('carrinho atual', carrinhoAtual)
                                        }
                                    }} />

                                </div>
                                <div style={{ fontWeight: 'bold', color: count, fontSize: '20px' , marginLeft:'10px'  }}>

                                    {'R$'+parseFloat( valor*quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}
                                </div>
                            </div>
                        </div>
                    </div>


                </CardContent>
            </CardActionArea>

            {/*dialogo.open ? <DialogExcluir/> : ''*/}
           
        </Card>

    );




}


//<li>ID {props.id}</li> 