import React , {useEffect, useState , useLayoutEffect}from 'react'
import Link from 'next/link'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
//import logobranco from '../../assets/img/LogoBranco.png'
import {Button , Container} from '@material-ui/core'
//import './menu.css'
//import logo from '../../assets/img/LogoBranco.png'
import axios from 'axios';
import { useCount } from '../../context/Control';
//const { count, setCount, carrinhoAtual, setCarrinhoAtual } = useCount();
import conexao from '../../apilaravel/api'
import {HiOutlineHome} from 'react-icons/hi'






export default function MenuTopo(){

    const [data , setData] = useState();
    const { count, setCount, carrinhoAtual, setCarrinhoAtual } = useCount();
    const logo = '/assets/img/LogoBranco.png'



    useLayoutEffect(()=>{
        conexao.get('/usuario/'+localStorage.getItem('id')).then((res) => {
          console.log(localStorage.getItem('id'))
           console.log('cor', res.data.theme)
          setCount(res.data.theme)
         })
       },[])

    



    return(
        <div className='menutopo' style={{backgroundColor:"#FF0054"}}>
           
        
        <Link href='menu' className='iconmenu'><Button><HiOutlineHome style={{ color:'white' ,fontSize:'30px' }} /></Button></Link>
        <img className='logo' src={logo}/> 
          
        
        </div>
    )



}