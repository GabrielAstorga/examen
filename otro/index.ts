import express from 'express';
import cors from "cors";
import axios from "axios";

type Team={
    id:number
    name:String
    city: string
    titles: number
}

const app = express();
const port = 3000;
let teams:Team[]=[ { id: 1, name: "Lakers", city: "Los Angeles", titles: 17 },
 { id: 2, name: "Celtics", city: "Boston", titles: 17 },

];

app.use(cors())
app.use(express.json());

app.get("/teams",(req,res)=>(
    res.json(teams)
))
app.get("/teams/:id",(req,res)=>{
    const {id} = req.params;
    const mostrarporID = teams.find((p)=>p.id=== Number(id))
    return mostrarporID
    ? res.json(mostrarporID) : res.status(404).json({ error: "Persona no encontrada" });
})

app.post("/teams", (req, res)=>{
    const { name,city,titles}=req.body
    if (typeof name !== "string" || typeof city !== "string" || typeof titles !== "number") {
    return res.status(400).json({ error: "Bad request: fields missing or invalid types" });
  }
    const newUser: Team = { id: Date.now(), name, city, titles };
    teams.push(newUser);
    res.status(201).json(newUser);
});

app.delete("/teams/:id",(req,res)=>{
    try{
    const {id} = req.params;
    const existe= teams.some((p)=> p.id===Number(id))
     teams= teams.filter((n)=>n.id !==Number(id))
     if(!existe){
        return res.status(404).json({error: "no existe esta ciudad"})
     }
     //return existe ? res.json({menssage:"se ha eliminado la ciudad"}): res.status(404).json({error: "no existe esta ciudad"})
     
     res.json({menssage:"se ha eliminado la ciudad indicada"})
     
      

    }catch(err){
        console.log("error al eliminar"+err);
        

    }
   

    
})


app.listen(port, ()=>{
    console.log("server started at:"+port )
})

const testApi= async (id:number)=>{
 /*const mostrarequipos= await axios.get("http://localhost:3000/teams")
 
 

 const mostratporID = await axios.get("http://localhost:3000/teams/"+id)
 
 
 const crearequipo=await axios.post("http://localhost:3000/teams",{id:12, name:"pimpolll",city:"san francismo", titles:7});

 const mostrartrascrear= await axios.get("http://localhost:3000/teams")
   
 const eliminar= axios.delete("http://localhost:3000/teams/"+id);
  const mostrartraseliminar= await axios.get("http://localhost:3000/teams")

return {todos:mostrarequipos.data, uno: mostratporID.data, creado:mostrartrascrear.data, eliminado: mostrartraseliminar.data}  ;
*/
const resultados = await Promise.allSettled([
  axios.get("http://localhost:3000/teams"),                   
  axios.get("http://localhost:3000/teams/" + id),             
  axios.post("http://localhost:3000/teams", {                 
    id: 12,
    name: "pimpolll",
    city: "san francismo",
    titles: 7
  }),
  axios.get("http://localhost:3000/teams"),                   
  axios.delete("http://localhost:3000/teams/" + id),          
  axios.get("http://localhost:3000/teams")                    
]);

return resultados;


}
setTimeout(async () => {
  const resultado = await testApi(1);
  resultado.forEach((n)=>{
    if(n.status === "fulfilled"){
    console.log(n.value.data);
    }else{
        console.log("error"+ n.reason);
    }
  })
  
}, 1000);





