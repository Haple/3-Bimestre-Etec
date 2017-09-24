// Initialize Firebase (ADD YOUR OWN DATA)
/*
var config = {
  apiKey: "AIzaSyCQhHan-7lbmOpMe_KBaGHHeazWOny-AWY",
  authDomain: "pedido-rapido.firebaseapp.com",
  databaseURL: "https://pedido-rapido.firebaseio.com",
  projectId: "pedido-rapido",
  storageBucket: "",
  messagingSenderId: "24193204225"
};
firebase.initializeApp(config);

*/
var selectImageNumber = 0;
var rightImageNumber = 1;

// Listen for form submit
document.getElementById('produtosForm').addEventListener('submit', submitForm);


// Submit form
function submitForm(e){
	
	if(selectImageNumber == rightImageNumber){
		
		document.querySelector('.alert').style.display = 'block';
		document.querySelector('.alert').style.backgroundColor = '#79c879';
		
	}else{
		document.querySelector('.alert').style.display = 'block';
		document.querySelector('.alert').style.backgroundColor = '#ff6d6d';
		
	}
	
  e.preventDefault();


  // Show alert
  scroll(0,0);
  
  

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },30000);

  // Clear form
  document.getElementById('produtosForm').reset();
}

function selectPhoto(number){
	selectImageNumber = number;
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

function somaPrecos(){
  var inputs = document.getElementsByTagName('input');
  var soma = 0;
  for (i = 0; i < inputs.length; i++) { 

    var preco = inputs[i].getAttribute('preço').replace(',', '.');
    var quantidade = (inputs[i].value == "") ? 0 : inputs[i].value;
    soma += (Number(preco)  * Number(quantidade));
  }
  return soma;
} 

// Save message to firebase
function salvarPedido(pedido){
  // Reference messages collection
  var novoPedidoRef = firebase.database().ref("pedidos").push(pedido);
}

//Adiciona um produto ao HTML
function mostraProdutos(categoria, filler){
        // Reference messages collection
        var index = 1;
var query = firebase.database().ref(categoria).orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      
      var nomeProduto = childSnapshot.key;
      var precoProduto = childSnapshot.child("preço").val();

    var novoProduto = document.createElement("p");

    var labelProduto = document.createElement("label");
    var inputProduto = document.createElement("input");

    var textoLabel = document.createTextNode(nomeProduto + " - R$" + precoProduto);

    novoProduto.className += "full";

    labelProduto.appendChild(textoLabel);

    inputProduto.type = "number";

    inputProduto.id = categoria + index;

    inputProduto.name = nomeProduto;

    inputProduto.setAttribute('preço', precoProduto);

    novoProduto.appendChild(labelProduto);

    novoProduto.appendChild(inputProduto);    

    filler.appendChild(novoProduto);
      index++;

  });

});


}