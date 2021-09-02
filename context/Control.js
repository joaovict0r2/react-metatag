import React, { createContext, useState, useContext } from "react";



const arraycheckout = {
  user_id: '',
  zipcode: '',
  number: '',
  neighborhood: '',
  address: '',
  card_number: '',
  card_expiration_date: '',
  card_cvv: '',
  card_holder_name: '',
  document_number: '',

}


const CountContext = createContext();

export default function CountProvider({ children }) {
  const [count, setCount] = useState('teste');
  const [carrinhoAtual, setCarrinhoAtual] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [qtdcarrinho, setQtdcarrinho] = useState(0);
  const [listagemproduto, setListagemProduto] = useState([]);
  const [dadosloja, setLDadosLoja] = useState([]);
  const [openAlert, setOpenalert] = useState(false);
  const [foto, setFoto] = useState([]);
  const [logado, setLogado] = useState(false);
  const [iduser, setIduser] = useState(false);
  const [arrayfotos, setArrayfotos] = useState();
  const [fotolojinha, setFotolojinha] = useState();
  const [checkout, setCheckout] = useState(arraycheckout);






  return (
    <CountContext.Provider
      value={{
        count,//usando para cor
        setCount, //usando para cor
        carrinhoAtual,
        setCarrinhoAtual,
        subtotal,
        setSubtotal,
        qtdcarrinho,
        setQtdcarrinho,
        listagemproduto,
        setListagemProduto,
        dadosloja,
        setLDadosLoja,
        openAlert,
        setOpenalert,
        foto,
        setFoto,
        logado,
        setLogado,
        iduser,
        setIduser,
        arrayfotos,
        setArrayfotos,
        fotolojinha,
        setFotolojinha,
        checkout,
        setCheckout,
      
      }}
    >
      {children}
    </CountContext.Provider>
  );
}

export function useCount() {
  const context = useContext(CountContext);
  //if (!context) throw new Error("useCount must be used within a CountProvider");
  const { count,
    setCount,
    carrinhoAtual,
    setCarrinhoAtual,
    subtotal,
    setSubtotal,
    qtdcarrinho,
    setQtdcarrinho,
    listagemproduto,
    setListagemProduto,
    dadosloja,
    setLDadosLoja,
    openAlert,
    setOpenalert,
    foto,
    setFoto,
    logado,
    setLogado,
    iduser,
    setIduser,
    arrayfotos,
    setArrayfotos,
    fotolojinha,
    setFotolojinha,
    checkout,
    setCheckout,
   
  } = context;

  return {
    count,
    setCount,
    carrinhoAtual,
    setCarrinhoAtual,
    subtotal,
    setSubtotal,
    qtdcarrinho,
    setQtdcarrinho,
    listagemproduto,
    setListagemProduto,
    dadosloja,
    setLDadosLoja,
    openAlert,
    setOpenalert,
    foto,
    setFoto,
    logado,
    setLogado,
    iduser,
    setIduser,
    arrayfotos,
    setArrayfotos,
    fotolojinha,
    setFotolojinha,
    checkout,
    setCheckout,
   
  };
}
