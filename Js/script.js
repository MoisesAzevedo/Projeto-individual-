/* ===========================
        .extrato
=========================== */

var extrato = localStorage.getItem('extrato')    //pega do localStorage como string
if (extrato != null) {
    var extrato1 = JSON.parse(extrato)              //pega a variavel extrato e converte em objeto
} else {
    var extrato1 = []                               //Caso não exista nada no localStorage, extrato1 será um array vazio
}

//pegar o total do local storage
var total0 =  localStorage.getItem('total')
var total =  JSON.parse(total0)
if (total == null) {
    var total = 0
}

/* =========================================================== */
function desenhaTabela(){
    var extrato = localStorage.getItem('extrato')    //pega do localStorage como string
    if (extrato != null) {
        var extrato1 = JSON.parse(extrato)              //pega a variavel extrato e converte em objeto
    } else {
        var extrato1 = []                               //Caso não exista nada no localStorage, extrato1 será um array vazio
    }
    
    //pegar o total do local storage
    var total0 =  localStorage.getItem('total')
    var total =  JSON.parse(total0)
    if (total == null) {
        var total = 0
    }

    //printa na tela
    for (imprime in extrato1) {
        if (extrato1[imprime].p1 == "venda"){
            document.querySelector('#ext-itens').innerHTML += `
            <div id="merca">
                <p>+</p>
                <p>${extrato1[imprime].name}</p> 
                <p >R$${extrato1[imprime].valor}</p>    
            </div>`
        } else{
            
            document.querySelector('#ext-itens').innerHTML += `
            <div id="merca">
                <p>-</p>
                <p>${extrato1[imprime].name}</p> 
                <p >R$${extrato1[imprime].valor}</p>    
            </div>`
        };                                     
    };

    //printa na tela o total
    document.getElementById('total').remove()               
    document.querySelector('.extrato').innerHTML += `
    <div id="total">
        <p></p>
        <p id="tot-tablet">Total</p>  
        <p>${formater.format(total)}</p> 
    </div>`   
    
    if (extrato1 == []){
        document.getElementById('merca').remove
    }
}
/* =========================================================== */


   /*   =========================================================
                   FUNÇÃO EXTRATO
     ========================================================= */
function extrato_function(c) {
    c.preventDefault()

    var extrato = localStorage.getItem('extrato')    //manda para o localStorage como string
    if (extrato != null) {
        var extrato1 = JSON.parse(extrato)              //pega do localStorage e converte em objeto
    } else {
        var extrato1 = []                               //Caso não exista nada no localStorage, extrato1 será um array vazio
    }

    extrato1.push({
        name: c.target.elements['merca_name'].value,
        valor: c.target.elements['merca_valor'].value,
        p1: c.target.elements['select'].value,
    })
    
    localStorage.setItem('extrato', JSON.stringify(extrato1))

    for (remove in extrato1) {
        if (document.getElementById('merca') != null) {
            document.getElementById('merca').remove()
        }
    }

    for (imprime in extrato1) {
        if (extrato1[imprime].p1 == "venda"){
            document.querySelector('#ext-itens').innerHTML += `
            <div id="merca">
                <p>+</p>
                <p>${extrato1[imprime].name}</p> 
                <p >R$${extrato1[imprime].valor}</p>    
            </div>`
        } else{
            document.querySelector('#ext-itens').innerHTML += `
            <div id="merca">
                <p>-</p>
                <p>${extrato1[imprime].name}</p> 
                <p >R$${extrato1[imprime].valor}</p>    
            </div>`
        }                                     
    }
    
   /*   =========================================================
                    Para somar/subtrair o valor total
     ========================================================= */
    if (document.getElementById('select').value == 'venda') {
        if (imprime == 0){
            var total = extrato1[imprime].valor //valor escrito agora
        }
       
         if (imprime == 1) {             
            var total0 = localStorage.getItem('total')
            var total = JSON.parse(total0)

            var arrayAtual = extrato1[imprime].valor        //As variaveis estão em string, é preciso convertê-las
            var array_atual = parseFloat(arrayAtual)             //Função parseFLoat: Converte string em number (flutuante); parseInt seria para numero inteiro
    
            var total = total + array_atual
         }
    
        //Para somar as próximas variáveis com o valor da soma das anteriores (em total)
        if(imprime > 1){    
            var total0 =  localStorage.getItem('total')
            var total =  JSON.parse(total0) 

            var arrayAtual = extrato1[imprime].valor  
            var array_atual = parseFloat(arrayAtual)

            total = total + array_atual
        }
    } else {
        if (imprime == 0){
            var total = extrato1[imprime].valor //valor escrito agora (string)
            var totalNumber = parseFloat(total)
            total = 0 - totalNumber
        }

        if (imprime == 1) {             
      
            var total0 = localStorage.getItem('total')
            var total = JSON.parse(total0)
            
            var arrayAtual = extrato1[imprime].valor        //As variaveis estão em string, é preciso convertê-las
            var array_atual = parseFloat(arrayAtual)        //Função parseFLoat: Converte string em number (flutuante); parseInt seria para numero inteiro

            var total = total - array_atual
         }

          //Para somar as próximas variáveis com o valor da soma das anteriores (em total)
        if(imprime > 1){    
            var total0 =  localStorage.getItem('total')
            var total =  JSON.parse(total0) 
    
            var arrayAtual = extrato1[imprime].valor  
            var array_atual = parseFloat(arrayAtual)
            
            total = total - array_atual
        }      
    }

    localStorage.setItem('total', JSON.stringify(total))

   /*   =========================================================
                   LINHA DO TOTAL
     ========================================================= */

    document.getElementById('total').remove()             
    document.querySelector('.extrato').innerHTML += `
    <div id="total">
        <p></p>
        <p id="tot-tablet">Total</p>  
        <p>${formater.format(total)}</p> 
    </div>`
}
/*=========================================================
                Victor
========================================================= */

//Formata o total para tipo de moeda
var formater = new Intl.NumberFormat('pt-BR' , {
    style: 'currency',
    currency: 'BRL' , 
    maximumFractionDigits: 2,
})

function MascaraMoeda(objTextBox, SeparadorMilesimo, SeparadorDecimal, e) {
    var sep = 0;
    var key = "";
    var i = (j = 0);
    var len = (len2 = 0);
    var strCheck = "0123456789";
    var aux = (aux2 = "");
    var whichCode = window.Event ? e.which : e.keyCode;
    if (whichCode == 13 || whichCode == 8) return true;
    key = String.fromCharCode(whichCode); // Valor para o código da Chave
    if (strCheck.indexOf(key) == -1) return false; // Chave inválida
    len = objTextBox.value.length;
    for (i = 0; i < len; i++)
      if (
        objTextBox.value.charAt(i) != "0" &&
        objTextBox.value.charAt(i) != SeparadorDecimal
      )
        break;
    aux = "";
    for (; i < len; i++)
      if (strCheck.indexOf(objTextBox.value.charAt(i)) != -1)
        aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) objTextBox.value = "";
    if (len == 1) objTextBox.value = "0" + SeparadorDecimal + "0" + aux;
    if (len == 2) objTextBox.value = "0" + SeparadorDecimal + aux;
    if (len > 2) {
      aux2 = "";
      for (j = 0, i = len - 3; i >= 0; i--) {
        if (j == 3) {
          aux2 += SeparadorMilesimo;
          j = 0;
        }
        aux2 += aux.charAt(i);
        j++;
      }
      objTextBox.value = "";
      len2 = aux2.length;
      for (i = len2 - 1; i >= 0; i--) objTextBox.value += aux2.charAt(i);
      objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
    }
    return false;
  }



/*=========================================================
                
========================================================= */
/*=========================================================
                Testar Campo valor
========================================================= */

/* function testaCampoValor(e){
    if (e.target.value.length == 0){
        e.target.value = 'R'
    }

    if (e.target.value.length == 1){
        e.target.value = '$'
    }

    if ((/[0-9 -R$]/g).test(e.key)){
        e.target.value += e.key
    }
} */


/* =============================================================================
            Function limpa dados
==============================================================================*/

function limpaDados(p){
    var limpaOk = confirm('Tem certeza que vai excluir todas as transações?');

    if (limpaOk == true) {
        extrato1.splice(p);
        localStorage.setItem('extrato', JSON.stringify(extrato1));

        var total = 0
        localStorage.setItem('total', JSON.stringify(total))
       
        document.getElementById('ext-itens').remove();
        document.getElementById('extrato-itens').innerHTML += `
        <div id="ext-itens">
        </div>`    
    } else {
        alert('Suas transações estão intáctas!')
    }
};

desenhaTabela()


/*=========================================================
                menuDelete (responsividade)
========================================================= */

function menuDelete(){
    document.querySelector('body').innerHTML += 
    `<div class='menuLimpa'>
        <h3 onclick='end_menuDelete()'>✖</h3>
        <p onclick="limpaDados(0)" >Limpar dados</p>
        <p>Cadastro de transações</p>
    </div>`
}

function end_menuDelete() {
    document.querySelector('.menuLimpa').remove()
}