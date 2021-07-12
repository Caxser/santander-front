const forms = document.querySelectorAll(".signup-form")
// query selector busca clases, se
//usa el punto ante, como en css 
//const asigna una variable estatica, sin cambiar
//let permite crear variables que se modifican
//let necesita ir antes de ser llamado
//var puede existir como indefinido sin error, estaa es diferencia con let, ya esta en desuso
//el logo de $ contiene datos de la
//interfaz, las variables con _ son privadas
//que no deben usarse en otro archivo
//recuerda, la doble barra es comentario
//no uses /* */

//let y=7
//si solo nombras a la variable, lo crea
//como var "y=6" es lo mismo que "var y=6"

//console.log(forms)

//console log imprime lo que le digo 
//nos va a traer una lista
//por eso es necesario usar for o iterar
const getTemplate = () => {
    return fetch("./template.html")
        .then((response) => response.text())
    //return regresa el valor de fetch "busqueda"
    //.then, convierte la respuestasi la encuentra
    //response.text lo convierte a texto
};

//copia de codigo
const sendEmailToApi = (address, template) => {
    fetch(`https://bedu-email-sender-api.herokuapp.com/send?id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: address,
            template: template,
        }),
    })
        .then((results) => {
            //console.log(results);
            console.log(results.status);
            if (results.status == 200) {
                alert("E-mail send!!!")
            } else {
                alert("Send failed")
            }
            document.getElementById("email").value = ""
            alert("E-mail send!!!")
        })
        .catch((error) => {
            console.error(error);
            document.getElementById("email").value = ""
            alert("Send failed")
        });
};

function sendEmail (event) {
    event.preventDefault()
    //prevent default evita el recargar pagina
    const email = event.target.querySelector("input").value
    // define a email con target, y deja el primer
    //valor obtenido, con .value lo recupera
    getTemplate()
        //llama a la accion creada anteriormente
        .then((template) => {
            sendEmailToApi(email, template)
        })
        .catch((error) => {
            console.log(error, "error al obtener el template")
        })
    //si lo encuentra, devuelve el valor
    //si no,manda el texto de error
    //con catch

}
for (let i = 0; i < forms.length; i++) {
    // i=0 define el inicio, con i<forms.length
    //hace que le de un maximo de vueltas, un tope
    //i++ incrementa en uno    
    //console.log(forms[i]);
    forms[i].addEventListener("submit", sendEmail)
    //primer bloque, cual funcion
    //segundo es qué proceso va a realizar
    //nuestra funcion es send email
}
