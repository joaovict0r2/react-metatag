import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, TextField, Container, Typography } from '@material-ui/core';
import axios from 'axios';
import { useCount } from '../../context/CarrinhoControl'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import conexao from '../../api/api'
import Alerta from '../Utilitarios/Alerta'
import { useSelector, useDispatch } from 'react-redux'
import { alert } from '../../store/Utilitarios/Utilitarios.actions'
import NuberFormat from 'react-number-format'
import CircularProgress from '@material-ui/core/CircularProgress';
import {FcCheckmark} from 'react-icons/fc'






const useStyles = makeStyles((theme) => ({
  root: {

    margin: '10px',
    background: 'red'

  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textfild: {
    margin: '10px',
    fullWidth: 'true',



  }
}));


export default function Compra() {


  const classes = useStyles();
  const { count, carrinhoAtual, setCarrinhoAtual, dadosloja, subtotal } = useCount();
  const [obs, setObs] = useState();
  const [open , setOpen] = useState(false)
  const [msg  , setMsg] = useState()

  console.log('DADOS LOJA COMPRA', dadosloja)


  const resultCompra = useSelector(state => state.utilitarios)//redux
  const dispatch = useDispatch()//redux


  const initialvalue = {
    nome: '',
    telefone: '',
    email: '',

  }


  const [values, setValues] = useState(initialvalue);

  var valor = 0;

  function onchange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }



  console.log(dadosloja)

  function gravar(e) {
    e.preventDefault();

    setOpen(true)
    setMsg('Enviando Pedido')

    document.getElementById('button-enviar').hidden=open





    if (values.nome !== "" && values.telefone !== "" && values.email !== "") {

      console.log('chegou aqui')

      conexao.post('/cliente/create', //cadastra cliente
        { user_id: dadosloja.user_id, nome: values.nome, telefone: values.telefone, email: values.email , endereco: values.endereco }).then((res) => {
          if (res.data) {
            console.log(res.data)
            console.log('gravado com sucesso')

            conexao.post('/pedidos/create',//cria pededidos
              { user_id: dadosloja.user_id, cliente_id: res.data.id, nome: values.nome, telefone: values.telefone, email: values.email, valortotal: subtotal, obs: obs }).then((respedido) => {
                if (respedido) {

                  carrinhoAtual.map((item) => {


                    conexao.post('/pedidosprodutos/create',//grava produtos em determinado pedido
                      {
                        id_produto: item.id,
                        id_pedido: respedido.data.id,
                        descricao: item.titulo, //alterei descricao por titulo
                        valor_unit: item.valor,
                        quantidade: item.qtd,
                        valor_total: item.valor * item.qtd
                      }).then((respedidoprodutos) => {//adicionar obejto certo vai vir do axios get
                        if (respedidoprodutos) {
                          enviarwhatsapp(respedido.data.id, values.telefone)
                          //dispatch(alert(true, 'Enviando', 'success'))

                        }
                      })

                  })
                }


              })
          }
        })
    } else {
      dispatch(alert(true, 'Campos em branco', 'warning'))
    }

  }







  function enviarwhatsapp(id_pedido, celular) {//arrumando url para whats app

    console.log('COMPRA CELULAR', celular)
    console.log('COMPRA CELULAR', celular.replace('(', '').replace(')', '').replace('-', ''))
    //https://wa.me/5515981242367?text=Eu%20tenho%20interesse%20no%20seu%20carro%20%C3%A0%20venda NOVA API TESTAR COM ESSA SE DER CERTO
    //https://api.whatsapp.com/send?phone=55
    //https://web.whatsapp.com/send?phone=55
    //https://wa.me/55?text=

  var url = `https://wa.me/55${dadosloja.whatsapp.replace('(', '').replace(')', '').replace('-', '')}?text=`
    var urlold = 'https://web.whatsapp.com/send?phone=55' + dadosloja.whatsapp.replace('(', '').replace(')', '').replace('-', '') + '&text='

    var cabecalho = `*${dadosloja.nomeloja}*\n -- \n *Meu Nome é  ${values.nome}* \n*Contato ${values.telefone}* \n\n *Email: ${values.email}* \n\n *Endereço: ${values.endereco}*\n\n`

    var w = ''


    console.log(carrinhoAtual)
    carrinhoAtual.map((item) => {

      //console.log(item.descricao + ' ' + item.quantidade + ' ' + item.valor_unit + ' ' + item.valor_total + ' ')
      w += ` *${item.qtd}X* *${item.titulo}*   \n R$ ${(item.valor * item.qtd).toFixed(2)}\n*_____________________________*\n `

    })


    var valorfinal = `*Observações: \n ${obs}\n \n 🤑 Total: R$ ${subtotal.toFixed(2)}\n_____________________________\n   `

    var final = cabecalho + w + valorfinal


    console.log(final)

    final = window.encodeURIComponent(final)

    console.log(final)

    //window.open(final)

    //window.location.href = url + final 
    setMsg('Enviado com sucesso!')

   // window.open(`${url}${final}`, '_blank')
    window.location.href=`${url}${final}`

  }

  return (

    <>

      <div style={{ position: 'absolute', top: '0', zIndex: '1' }}>
        <Link to={'/' + localStorage.getItem('loja')}><IoIosArrowBack style={{ color: '#fff', fontSize: '30px', marginTop: '20px', marginLeft: '10px' }} /></Link>
      </div>
      <div style={{ backgroundColor: count, position: 'absolute', top: '0', height: '100px', width: '100%', zIndex: '0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ color: '#FFF', fontWeight: 'bold', marginTop: '20px', fontSize: '20px' }}>
          Finalizar pedido
           </div>

      </div>

      <Container component="article" maxWidth="sm">

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '150px' }}>





          <Typography style={{ fontWeight: 'bold', color: count }}>
            {

              carrinhoAtual.map((item) => {
                console.log('valor do item', (item.valor * item.qtd).toFixed(2))
                valor = parseFloat(valor) + parseFloat((item.valor * item.qtd).toFixed(2))


              })

            }


              Subtotal do pedido: R${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}

            <hr />
          </Typography>



          <Typography style={{ fontWeight: 'bold', color: count }}>
            Informações de compra
          </Typography>


          <TextField
            id="outlined-basic"
            name="nome"
            value={values.nome}
            onChange={onchange}
            color='primary'
            label='Nome*'
            fullWidth
            margin='normal'
          />




          <NuberFormat customInput={TextField}
            id="outlined-basic2"
            name="telefone"
            value={values.telefone}
            onChange={onchange}
            color='primary'
            label='Telefone | Whatsapp*'
            fullWidth
            margin='normal'
            placeholder='(00)00000-0000'
            format='(##)#####-####'
            InputLabelProps={{ shrink: true }}>

          </NuberFormat>



          <TextField
            id="outlined-basic4"
            name="email"
            value={values.email.toLowerCase()}
            onChange={onchange}
            color='primary'
            label='E-mail*'
            fullWidth
            margin='normal' />


          <TextField
            id="outlined-basic4"
            name="endereco"
            value={values.endereco}
            onChange={onchange}
            color='primary'
            label='Endereço de entrega*'
            fullWidth
            margin='normal' />
          



          <TextField
            style={{ marginTop: '20px' }}
            id="standard-textarea"
            label="Observações*"
            value={obs}
            onChange={(e) => { setObs(e.target.value) }}
            fullWidth
            margin='normal'
            multiline
          />


{open ? <div style={{color:count , fontWeight:'bold' , margin:'20px'}}>{msg === 'Enviando Pedido' ? <div>{msg}<CircularProgress style={{height:'15px' , width:'15px' , marginLeft:'20px'}}/></div> : <div> {msg}<FcCheckmark style={{marginLeft:'20px' }}/></div>}</div> :

          <Button variant="contained" id='button-enviar' hidden={open}  fullWidth style={{ backgroundColor: count, borderRadius: '25px', textTransform: 'none', color: '#FFF', fontWeight: 'bold', margin:'25px' }} onClick={gravar
       
          }>Enviar pedido</Button> }


        </div >
      </Container>

      
      

    </>
  );
}

//<TextField

//id="outlined-basic2"
//name="telefone"
//value={values.telefone}
//onChange={onchange}
//color='primary'
//label='*Telefone | Whatsapp'
//fullWidth 
//margin='normal'/>