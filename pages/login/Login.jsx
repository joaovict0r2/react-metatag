import { TextField, Typography, Button, Container } from '@material-ui/core';
import React, { useState } from "react";
import api from "../../apilaravel/Funcoes"
//import SnackBar from '../SnakBar'
//import logo from '../../assets/img/Logo.png'
//import './login.css'
import axios from 'axios'
//import { useSelector, useDispatch } from 'react-redux'
//import Alerta from '../Utilitarios/Alerta'
////import { alert } from '../../store/Utilitarios/Utilitarios.actions'
//import { useForm } from 'react-hook-form'
import conexao from '../../apilaravel/api'
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {useCount} from '../../context/Control'


//textfild NOVO
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
   // const result = useSelector(state => state.utilitarios)//redux
    //const dispatch = useDispatch()//redux
    //const { resgister, handleSubmit, errors } = useForm();


    const {logado ,setLogado } = useCount();

    //TextField NEW
    const classes = useStyles()




    function envio() {


        if (email === "" || senha === "") {
            console.log('campos em branco')
            //dispatch(alert(true, 'Email Invalido ou Campos em branco', 'warning'))
        } else {

            conexao.post('/login', { email: email, password: senha }).then((res) => {
                
                localStorage.setItem('token', 'Bearer ' + res.data['data'].token)
                localStorage.setItem('id', res.data['data'].id)
                localStorage.setItem('plano', res.data['data'].active_plan)

                const login = { token : 'Bearer ' + res.data['data'].token,
                id_user:  res.data['data'].id,
                plano : res.data['data'].active_plan
            }

                setLogado(login)
                




                    setTimeout(() => {
                       api.verificasejatemloja()
                    }, 1000);

                
                    


            }).catch((error) => {
                console.log(error)
                console.log('erro ao logar')
                
              //  dispatch(alert(true, 'Email ou senha invalidos', 'warning'))
            })

           // conexao.get('/usuario/where/' + email).then((res) => {
             //   const data = res.data[0]
               // console.log('usuario where', res.data)
                //if (data.email === email && login === 'logado') {
                  //  console.log('logado com sucesso')
                   // localStorage.setItem('id', data.id)//armazena id local storage
                   // localStorage.setItem('plano', data.active_plan)
                   // dispatch(alert(true, 'Logando ...', 'success'))





                   // setTimeout(() => {
                    //    api.verificasejatemloja()
                    //}, 1000);
                //} else {
                 //   console.log('email ou senha invalidos')
                  //  dispatch(alert(true, 'Email ou senha invalidos', 'warning'))
               // }

            ///}).catch((erro) => {
               // console.log('erro aqui retornando', erro)
               /// dispatch(alert(true, 'E-mail não cadastrado, crie sua conta grátis', 'warning'))
            //})
        }

    }





    return (
        <Container component="article" maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <img src={''} style={{ width: '250px', marginTop: '80px', alignItems: 'center' }} />


            {/* ////
                        NEW TEXTFIELD
            /// */}

            <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <EmailIcon fontSize='small' style={{ color: '#b0b0b0',marginBottom:'7px' }} />
                    </Grid>
                    <Grid item>
                        <TextField
                         value={email}
                         onChange={(e) => { setEmail(e.target.value) }}
                         id="email"
                         label="Email"
                        //  margin="normal"
                         type='email'
                         required
                         color='secondary'
                         style={{ width: '260px',  }} />
                    </Grid>
                    </Grid>
                </div>

        {/* <div >
        /////
            TextField OLD
        ////
            <TextField
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                id="email"
                label="Email"
                margin="normal"
                type='email'
                required
                color='secondary'
                style={{ width: '260px',  }} />
        </div> */}
            

            {/* ////
                NEW TEXTFIELD
            /// */}

            <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                            <LockIcon fontSize='small'  style={{ color: '#b0b0b0',marginBottom:'7px' }}/> 
                    </Grid>
                        <Grid item>
                            <TextField
                                value={senha}
                                onChange={(e) => { setSenha(e.target.value) }}
                                id="senha"
                                label="Senha"
                                // margin="normal"
                                type="password"
                                required
                                color='secondary'
                                style={{ width: '260px' }} />
                            </Grid>
                        </Grid>
                </div>


    {/* 
    ////
    TextField OLD
    ///
        <TextField
        value={senha}
        onChange={(e) => { setSenha(e.target.value) }}
        id="senha"
        label="Senha"
        margin="normal"
        type="password"
        required
        color='secondary'
        style={{ width: '260px' }} /> */}



            <Button onClick={(e) => { envio() }}
                variant="contained"
                color="secondary"
                style={{
                    width: '260px',
                    marginTop: '30px',
                    borderRadius: '30px',
                    fontWeight: 'bold'
                }}>
                Entrar
                        </Button>

            <div style={{ marginTop: '10px' }}>
                <label className='texto' style={{
                    textDecoration: 'none',
                    color: '#A9A1A0'
                }}
                >Esqueceu a Senha?
                          <a href='/RestauraSenha'
                        style={{
                            color: '#ff0054',
                            textDecoration: 'none',
                            fontFamily: 'arial'
                        }}> Clique Aqui
                               </a> </label>
            </div>

            <div style={{ marginTop: '20px' }}>
                <label className='texto'
                    style={{
                        textDecoration: 'none',
                        color: '#A9A1A0'
                    }}>
                    Ainda não tem uma Conta?</label>

            </div>

            <Button href='/cadastro/site'
                variant="outlined"
                color="secondary"
                className='texto'
                style={{
                    marginTop: '10px',
                    width: '260px',
                    borderRadius: '30px ',
                    border: '3px solid',
                    fontWeight: 'bold'
                }}>
                Cadastre-se Grátis
                    </Button>




            {/* {result.open ? <Alerta /> : ''} */}








        </Container>

    );
}


