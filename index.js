//FUNÇÕES
function formarSequencia(a, b){
    array = [];
    array.push(a);
    while(a != b){
        array.push(++a);
    }
    return array;
}

const conta = (item1, item2) => [item1.length, item2.length];

const parEImpar = itens => {
    //Filtra entre as listas
    let l1 = itens.filter((item, indice) => indice == 0 || indice % 2 == 0);
    let l2 = itens.filter((item, indice) => indice % 2 != 0)
    return [l1, l2];
}

const separar = (itens, maximo) => {
    return itens.reduce((acumulador, item, indice) => {
      const condicao = Math.floor(indice / maximo);
      acumulador[condicao] = [...(acumulador[condicao] || []), item];
      return acumulador;
    }, []);
  };
    

const subParaArray = (array1) => {
    //Passa os objetos de uma array interna para uma array externa
    array2 = [];
    array1.map(e => e.map(a => array2.push(a)))
    return array2;
};
  
const geraLista = array => {
    let str = '';
    array.map(e => str = `${str}, ${String(e)}`);
    let a = str.slice(1);
    return a;
}

function sequencia(numeros, n){
    const seq = numeros.split(',');

    novaArray = seq.map(a => a.split('-').map(n => Number(n)));
    ArraySequencias = novaArray.map(n => {
        if(n.length == 2){
            return formarSequencia(n[0], n[1])
        }
        else{
            return n;
        }
    });

    //Pega uma array que tenha uma array interna e retorna
    //os itens da array interna na array primária
    b = subParaArray(ArraySequencias);

    //Divide os itens da array de n em n entre as duas arrays
    let k = separar(b, n);
    
    let [lista1, lista2] = parEImpar(k);
    
    let numeroAgrupamentos = conta(lista1, lista2)

    novaLista1 = subParaArray(lista1);
    novaLista2 = subParaArray(lista2);

    let elementos = conta(novaLista1, novaLista2);

    let u1 = geraLista(novaLista1);
    let u2 = geraLista(novaLista2);

    document.getElementById('lista1').innerHTML = `<span class="lista">Primeira lista:</span> ${u1} - (${numeroAgrupamentos[0]} grupos e ${elementos[0]} itens)`;
    document.getElementById('lista2').innerHTML = `<span class="lista">Segunda lista:</span> ${u2} - (${numeroAgrupamentos[1]} grupos e ${elementos[1]} itens)`;
}

function receberDados(e){
    e.preventDefault();
    const lista = document.getElementById('sequencia').value;
    const numero = document.getElementById('numero').value;
    if(lista == ''){
        alert('A sequencia está vazia')
    }
    else if(numero == '' || numero < 0){
        alert('Numero inválido!');
    }
    else sequencia(lista, numero)
}

//INTERAÇÃO COM A DOM
const botao = document.getElementById('botao');
botao.addEventListener('click', receberDados);
