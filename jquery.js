var dicatext = document.querySelector("#dicatext");
var palavratext = document.querySelector("#palavratext");
var vidas = document.querySelector("#vidas");
var palavrarandom = document.querySelector("#palavrarandom");
var letratext = document.querySelector("#letratext");
var verificaresult = document.querySelector("#verificaresult");

var palavras = 
[
    ["abacaxi","Descascar"],
	["Espinho","Torna-se dificil..."],
	["fruta","Descascar, espinhos..."],
	["Goiaba","é feio igual o bichinho..."],
	["ganso","Feliz, açude..."],
];

var sortp;
var lbloq = [];
var letratot; 
var pusa;  
var dicapusa;
var contaerr = 0;
var phide = [[],[]];

comeca();

function comeca()
{
	letratext.addEventListener("input",function(){letratextverifica();});
	verificaresult.addEventListener("click",function(){letratextverificaenv(letratext.value);});
	palavrarandom.addEventListener("click",comecajogo);
	comecajogo();
}

function comecajogo()
{
	lbloq = [];
	contaerr = 0;    

	tipomuda(letratext,false);
	letratextverifica();
	tipomuda(palavrarandom,true);

	escp();
	prrhtml(dicatext,dicapusa);

	prrvetphide();

	prrhtml(palavratext,phide[1].join("  "));
	prrhtml(vidas,contaerr);
}

function prrvetphide()
{
	phide[0] = [];
	phide[1] = [];

	for(var x = 0; x < pusa.length; x++)
	{
		if(!(pusa[x].localeCompare(" ")))
		{
			phide[0].push(true);
			phide[1].push("<div class = 'letra desabilitado'></div>");
		}
		else
		{
			phide[0].push(false);
			phide[1].push("<div class = 'letra'></div>");
		}
	}
}

function attvethide(i,l)
{
	phide[0][i] = true;
	phide[1][i] = "<div class = 'letra'>" + l + "</div>"; 
}

function prrhtml(ele,txt)
{
	ele.innerHTML = txt;
}

function letratextverifica()
{
	if(letratext.value == " " || letratext.value == "" || letratext.value == null || letratext.value == undefined ||lbloq.indexOf(letratext.value) != -1)
	{
		tipomuda(verificaresult,true);
	}
	else
	{
		tipomuda(verificaresult,false);
	}
}

function escp()
{
	sortp = Math.round((Math.random() * (palavras.length - 1)));
	letratot = (palavras[sortp][0].length) - (contaespaco(palavras[sortp][0]));
	
	pusa = palavras[sortp][0];
	dicapusa = palavras[sortp][1] + " com " + letratot + " letras.";
}

function testeuser()
{
	var jogada = confirm("Deseja adivinhar a palavra?");
	
	if(jogada)
	{
		verificapenv(prompt("Digite a palavra e clique em ok","Digite a palavra aqui"));
	}
}

function contaespaco(d)
{
	var res = d.match(/ /g);
	
	if(res == null)
	{
		return 0;
	}
	else
	{
	return res.length;
	}
}

function letratextverificaenv(l)
{
	var letra = (l).toLocaleLowerCase();
	
	lbloq.push(letra);
	letratextverifica();
	
	var acerto = false;
	
	while(pusa.indexOf(letra) != -1)
	{
		acerto = true;
		var i = pusa.indexOf(letra);
		attvethide(i,letra);    
		pusa = pusa.replace(letra," ");
	}
	
	if(acerto)
	{
		prrhtml(palavratext,phide[1].join("  "));
		message("Você acertou a letra!");
		
		if(phide[0].indexOf(false) == -1)
		{	
			acabajogo(true);
		}
		else
		{
		testeuser();   
		}
	}
	else
	{
		contaerr++;
		prrhtml(vidas,contaerr);
		message("Você errou a letra!");
			
		if(contaerr == 6)
		{	
			acabajogo(false);
		}
	}
}

function verificapenv(pl)
{
	var palavra = (pl).toLocaleLowerCase();
	
	if(!((palavra).localeCompare(palavras[sortp][0])))
	{
		for(var x = 0; x < palavra.length; x++)
		{
			if(!(phide[0][x]))
			{
				attvethide(x,palavra[x]);    
			}    
		}
		prrhtml(palavratext,phide[1].join("  "));
		message("Você acertou a palavra!");
		acabajogo(true);
	}
	else
	{
		message("Você errou a palavra!");
		acabajogo(false);   
	}
}

function message(msg)
{
	alert(msg); 
}

function tipomuda(tag,valor)
{
	tag.disabled = valor; 
}

function acabajogo(v)
{
	if(v)
	{
		message("Você Acertou!!!");
	}
	else
	{
		message("Suas Vidas Acabaram!!!");
	}
	
	if(v)
	{	
		palavras.splice(sortp,1);
	}
	
	tipomuda(letratext,true);
	tipomuda(verificaresult,true);
	tipomuda(palavrarandom,!(palavras.length));
	
	if(palavras.length)
	{
		message("Sorteie Uma Nova Palavra");
	}
}