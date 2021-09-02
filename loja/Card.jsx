
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import api from '../../api/Funcoes'
//import EditarProdutos from '../components/EditarProdutos';
import { Redirect, Link } from 'react-router-dom';
import { useState } from 'react';
//import modal from '../components/modal'
import axios from 'axios'
import { BsPlusCircleFill } from 'react-icons/bs'
import { useCount } from '../context/Control';
//const { count, setCount, carrinhoAtual, setCarrinhoAtual  , listagemproduto , setListagemProduto} = useCount();
import conexao, { urlfotos } from '../apilaravel/api'



const useStyles = makeStyles({
  root: {
    marginBottom: '15px',
    width: '150px',

  },
});


export default function ImgMediaCard(props) {
  const classes = useStyles();
  const [carrinho, setCarrinho] = useState([]);
  const { count,
    setCount,
    setListagemProduto,
    setLDadosLoja,
    setIduser,
    dadosloja ,
    } = useCount();

  const fotopadrao = '/assets/img/lojinhapadrao.png'




  return (

    <Card className={classes.root} style={{ borderRadius: '18px' }}>{console.log(props.imagem)}
      <CardActionArea>
        <a href={dadosloja.linkpersonalizado + '/produto/' + props.id_produto} ><CardMedia
          component="img"
          alt="Produto"

          src={props.imagem ? urlfotos + props.imagem : fotopadrao} width='150px' height='200px'

        /></a>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <div style={{ width: '100%', fontSize: '17px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'Ellipsis', }}>{props.titulo}</div>

          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
            <div style={{ width: '100%', fontSize: '19px', fontWeight: 'bold', color: count, fontFamily: 'arial', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'Ellipsis' }}> {'R$' + Number(props.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('R$', '')}</div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button style={{ position: 'absolute', outline: 'none' }} onClick={(e) => { props.addcart(props.id_produto, props.imagem, props.valor, props.titulo) }} ><BsPlusCircleFill style={{ fontSize: '35px', color: count }} /> </Button>
      </CardActions>
    </Card>

  );


}

//{props.descricao}   