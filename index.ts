const promesaRickyMorty = fetch ("https://rickandmortyapi.com/api/character/1");
promesaRickyMorty.then((response)=>{
 const data = response.json();
 data.then((character)=>{
     console.log(data);

 });

})
.catch((error)=>{
    console.log("error de peticion",error);
})
.finally(()=>{
    console.log("felicidades has conseguido un personaje o no");
});