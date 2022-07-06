/* ===========================
        .extrato
=========================== */

var extrato = localStorage.getItem('extrato')    //manda para o localStorage como string
if (extrato != null) {
    var extrato1 = JSON.parse(extrato)              //pega do localStorage e converte em objeto
} else {
    var extrato1 = []                               //Caso não exista nada no localStorage, extrato1 será um array vazio
}

for (imprime in extrato1) {
    document.querySelector('#extrato-itens').innerHTML += `${extrato1[imprime].merca}`
}



function extrato_function(c) {
    c.preventDefault()

    var extrato = localStorage.getItem('extrato')    //manda para o localStorage como string
    if (extrato != null) {
        var extrato1 = JSON.parse(extrato)              //pega do localStorage e converte em objeto
    } else {
        var extrato1 = []                               //Caso não exista nada no localStorage, extrato1 será um array vazio
    }

    extrato1.push({
        p1: "+",  //Acho que não precisa disso, pois já está como string no escopo do 'for'
        name: c.target.elements['merca_name'].value,
        valor: c.target.elements['merca_valor'].value
    })
    
    for (imprime in extrato1) {
        document.querySelector('#extrato-itens').innerHTML += `
        <div id="merca">
            <p>+</p>
            <p>${extrato1[imprime].name}</p> 
            <p >R$${extrato1[imprime].valor}</p>    
        </div>`
    }

    

}

