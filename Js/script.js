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

//printa na tela automaticamente
for (imprime in extrato1) {
    if (extrato1[imprime].p1 == "venda"){
        document.querySelector('#extrato-itens').innerHTML += `
        <div id="merca">
            <p>+</p>
            <p>${extrato1[imprime].name}</p> 
            <p >R$${extrato1[imprime].valor}</p>    
        </div>`
    } else{
        document.querySelector('#extrato-itens').innerHTML += `
        <div id="merca">
            <p>-</p>
            <p>${extrato1[imprime].name}</p> 
            <p >R$${extrato1[imprime].valor}</p>    
        </div>`
    }                                     
}

//printa na tela automaticamente o total
document.getElementById('total').remove()               
document.querySelector('.extrato').innerHTML += `
<div id="total">
    <p></p>
    <p id="tot-tablet">Total</p>  
    <p>${total}</p> 
</div>   `


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
            document.querySelector('#extrato-itens').innerHTML += `
            <div id="merca">
                <p>+</p>
                <p>${extrato1[imprime].name}</p> 
                <p >R$${extrato1[imprime].valor}</p>    
            </div>`
        } else{
            document.querySelector('#extrato-itens').innerHTML += `
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
            imprimeMenosUm = imprime - 1                        //para pegar o nº do array anterior (imprime 0). 
            var arrayAnterior = extrato1[imprimeMenosUm].valor    //As variaveis estão em string, é preciso convertê-las
            var arrayAtual = extrato1[imprime].valor 
    
            var array_anterior = parseFloat(arrayAnterior)      //Função parseFLoat: Converte string em number (flutuante); parseInt seria para numero inteiro
            var array_atual = parseFloat(arrayAtual)
    
            var total = array_anterior + array_atual
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
            localStorage.setItem('total', JSON.stringify(total))   //Para pegar mandar o valor subtraído ao localStorage
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
        <p>${total}</p> 
    </div>   `
}


