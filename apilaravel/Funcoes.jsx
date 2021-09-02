import api from './api';
//import NomeLoja from "../components/NomeLoja";


export class apif {



   //VERIFICA LOGIN
    async verificalogin(email, senha) {
        localStorage.clear()

        try {
            const response = await api.get('/usuario/where/' + email + '');
            if (response.data.length > 0) {

                let dbid = response.data[0].id
                let dbemail = response.data[0].email
                let dbsenha = response.data[0].senha
                if (dbemail === email && dbsenha === senha) {
                   

                    localStorage.setItem('id', dbid)  //armazena id usuario local storage sempre no comeco do login

                    this.verificasejatemloja();
                    return 'logado'

                } else (
                   console.log('senha ou email invalidos')
                )                
            } else {
                console.log('email nao encontrado')
            }
        } catch (e) {
           console.log('URL VAZIA ', e)
        }

    }


    //CADASTRA LOJINHA REFENRENTE AO ID DO USUARIO
    async cadastrolojinha(linklojinha,nomeloja) {
       
            let id = localStorage.getItem('id')
            if (id !== "" && linklojinha !== "") {       
             

              api.post('/lojinha/create',{user_id : id , linkpersonalizado : linklojinha.toLowerCase() , nomeloja : nomeloja}).then((res)=>{
                  console.log('cadastrado com sucesso')
                  console.log(res)
                    window.location.href = "/menu";
              }).catch((error)=>{

                console.log(error)

              })
     


    }}
    //VERIFICA DE O USUARIO JA TEM UMA LOJA CADASTRADA
    async verificasejatemloja() {
        console.log('cheogu verificaloja')
        let id = localStorage.getItem('id')
        console.log('verfica se tem loja',id)
        const response = await api.get('/lojinha/where/' + id + '');
        console.log(response.data.nomeloja);
        if (response.data.nomeloja !== undefined) {
            console.log('tem loja')
          window.location.href = "/menu";

     
        } else {
            console.log('nao tem loja')
           window.location.href = "/nome-da-loja"; 
           
           

           
        }
     
      
    }


    //CADASTRO  DE PRODUTOS
    async cadastrodeproduto(titulo, descricao, valor, gerestoque, quantidade) {
        let id = localStorage.getItem('id')//id usuario
        const response = await api.post('/produtos/create?user_id=' + id + '&titulo=' + titulo + '&descricao=' + descricao + '&valor=' + valor.replace(',', '.') + '&gerestoque=' + gerestoque + '&quantidade' + quantidade + '');
        const id_prod = response.data.id
        console.log(response.data.id);
        return id_prod;//pedir ajudar


    }

    //CADASTRO DE FOTOS DE PRODUTOS
    async cadastrofotoproduto(data) {
        //let id = localStorage.getItem('id')
        //console.log('id user',id ,'id produto :',id_produto , 'url :',foto)                                                    
        const response = await api.post('/foto/store/', data);
        //console.log(response)

    }



    async deletaproduto(id) {
        const response = await api.delete('/produtos/delete/' + id);
        console.log(response)
        window.location.href = '/listagem-produtos'
    }

}
export default new apif();


//?id_user='+id+'&id_produto='+id_produto+'&foto_produto='+foto+''