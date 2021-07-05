import axios from "axios";

export async function validarCnpj(cnpj) {


    if(cnpj == undefined) return false;
   
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

      
    const options = {
        method: 'GET',
        url: `https://consulta-empresa-cnpj-e-socios.p.rapidapi.com/cnpj/${cnpj}`,
        headers: {
        'x-rapidapi-key': '061975b7b3msh236a2d4ffea119dp1d75e1jsnef3ac0fb775d',
        'x-rapidapi-host': 'consulta-empresa-cnpj-e-socios.p.rapidapi.com'
        }
    };

    let retorno;

    await axios.request(options).then((response) =>  {
        retorno = response;
        console.log(retorno)
    }).catch((error) => {
        return false;
    });

    return retorno.data;
        
    
}

export function isValidCPF(number) {

    var number = number.replace(/[^\d]+/g,'');
    
    var sum;
    var rest;
    sum = 0;
    
    if (number == "00000000000" || 
        number == "11111111111" || 
        number == "22222222222" || 
        number == "33333333333" || 
        number == "44444444444" || 
        number == "55555555555" || 
        number == "66666666666" || 
        number == "77777777777" || 
        number == "88888888888" || 
        number == "99999999999")
        return false;

    for (var i=1; i<=9; i++) sum = sum + parseInt(number.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(number.substring(9, 10)) ) return false;

    sum = 0;
    for (var i = 1; i <= 10; i++) sum = sum + parseInt(number.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(number.substring(10, 11) ) ) return false;
    return true;
}
