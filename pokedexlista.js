
//Aqui es el buscador de pokemon por nombre o numero
let buton=document.getElementById('button')

buton.addEventListener('click',()=>{
    let caja=document.getElementById('caja').value
    
    let xhttp=new XMLHttpRequest()
    xhttp.open("GET",`https://pokeapi.co/api/v2/pokemon/${caja}`)
    xhttp.send()


    let pokemonsList = document.getElementById("pokemons-list"); 
    xhttp.onreadystatechange=function () {
        if(this.readyState==4 && this.status==200)
        {
            pokemonsList.innerHTML = "";
           

        let datoPokemon=JSON.parse( this.responseText)
        console.log(datoPokemon)
      
        pokemonsList.innerHTML += `<div class="card">
                    <img src="${datoPokemon.sprites.front_default}" alt="">
                                                <p>Nombre: ${datoPokemon.name}</p>
                                                <p>N°: ${datoPokemon.id}</p>
                                                <p>Experiencia base: ${datoPokemon.base_experience}</p>
                                                <p>Altura: ${datoPokemon.height}</p>
                                                
                                                <p>Orden: ${datoPokemon.order}</p>
                                                <p>Peso: ${datoPokemon.weight}</p>

                                            </div>`; 
        }
    }
})

    // Este es la segunda parte que muestra todas las tarjetas pokedex de 20 en 20 pokemones
let pokemonsList = document.getElementById("pokemons-list"); 
let links = document.getElementById("links"); 

function descargarPokemones(url){ 
    if(url){ 
      
        pokemonsList.innerHTML = "";

fetch(url)
    .then(res=>res.json())
    .then(res=>{
        
        for(let i of res.results){ 

            fetch(i.url)
                .then(x=>x.json())
                .then(x=>{
                    // Vamos ingresando la imagen y nombre del pokemon actual que se esta evaluando y mas datos
                    pokemonsList.innerHTML += `<div class="card">
                    <img src="${x.sprites.front_default}" alt="">
                   
                                                <p>Nombre: ${x.name}</p>
                                                <p>N°: ${x.id}</p>
                                                <p>Experiencia base: ${x.base_experience}</p>
                                                <p>Altura: ${x.height}</p>
                                                
                                                <p>Orden: ${x.order}</p>
                                                <p>Peso: ${x.weight}</p>

                                            </div>`; 
            }); 
        }; 

         // Pintamos los enlaces de siguiente o anterior de la paginacion de los pokemones 
    
         
        links.innerHTML = (res.previous) ? `<br><button onclick="descargarPokemones('${res.previous}')">☚ Atrás</button>` : "";
        //Botón hacia adelante
        links.innerHTML += (res.next) ? `<button onclick="descargarPokemones('${res.next}')">Siguiente ☛</button>` : "";

      });
  }
}

descargarPokemones("https://pokeapi.co/api/v2/pokemon");