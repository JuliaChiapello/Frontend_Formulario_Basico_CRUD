document.addEventListener("DOMContentLoaded", function(){
    //Cargo el formulario para trabajar con él y creo el array que va a almacenar los objetos "registro"
    const form = document.getElementById("registration-form");
    const registros = []

    //Listener para el boton "submit" que ejecuta una funcion anonima
    form.addEventListener("submit", function(event){
        event.preventDefault() //Previene que se envie el formulario al ejecutarser el evento "event"
      
        //Carga de variables con los datos del formulario
        const nombre = document.getElementById("first-name").value;
        const apellido = document.getElementById("last-name").value;
        const mail = document.getElementById("email").value;
        const clave = document.getElementById("new-password").value;
        //Se almacena en accountType, inicialmente, elementos de HTML que verifiquen que su name == "account-type".
        //Luego se almacena en la misma variable, la string de "cuenta personal" o la string 
        //de "cuenta comercial"
        let accountType = document.getElementsByName("account-type");
        if (accountType[0].checked){ //Alcanza con analizar solo el elemento de la posicion 0 del array.
                                    //Si la propiedad checked de este elemento es "true", que la misma propiedad en el elemento
                                    //que esta en la posicion 2 del array es false. Esto ocurre porque estoy trabajando con inputs "radio".
            accountType = accountType[0].value
        }else{
            accountType = accountType[1].value
        }
        const termsAccepted = document.getElementById("terms-and-conditions").checked;
        const imagen = document.getElementById("profile-picture").value;
        const edad = document.getElementById("age").value;
        const referencia = document.getElementById("referrer").value;
        const bio = document.getElementById("bio").value;

        //Creacion del objeto "registro" con los valores de las variables cargadas anteriormente
        const registro = {
            nombre: nombre,
            apellido: apellido,
            mail: mail,
            clave: clave,
            accountType: accountType,
            termsAccepted: termsAccepted,
            imagen: imagen,
            edad: edad,
            referencia: referencia,
            bio: bio
        };

        //Inserto el objeto al array. El metodo push inserta elementos al array por atras.
        registros.push(registro);

        //Limpio los campos del formulario para una proxima carga.
        form.reset();

        actualizarTabla();

    });

    //Metodo que crea el cuerpo de la tabla en el HTML insertando una fila por cada registro del array y una celda por cada
    //valor de cada propiedad o key del objeto. En cada fila tambien se crean dos celdas donde se incrustan dos botones, "Eliminar"
    //y "Editar" correspondientes a cada uno de los registros del array. Tambien se crean los eventos correspondientes
    //a cada boton.
    function actualizarTabla(){
        const tbody = document.querySelector('#registros-table tbody');
        tbody.innerHTML = '';
        //Ciclo que recorre cada elemento del array "registros"
        registros.forEach(function(registro, index){
            const row = tbody.insertRow();
            //Ciclo que recorre cada key de un objeto.
            for (const key in registro){   
                const cell = row.insertCell();
                cell.textContent = registro[key];
            }
            
            //Creacion de boton eliminar con su Listener para eliminar un registro
            const deleteButton = document.createElement("button"); //Creo un boton
            deleteButton.textContent = "Eliminar" //Le doy un nombre al boton
            const deleteCell = row.insertCell(); // inserto una celda en la misma fila para alojar el boton
            deleteCell.appendChild(deleteButton); //inserto el boton en la celda agregada
            deleteButton.addEventListener("click", function(){
                eliminarRegistro(index);
            });

            //Creacion de boton editar con su Listener para editar un registro
            const editButton = document.createElement("button")
            editButton.textContent = "Editar"
            const editCell = row.insertCell(); 
            editCell.appendChild(editButton);
            editButton.addEventListener("click", function(){
                editarRegistro(index)
            });
        });    
    }

    //Metodo que elimina un determinado registro al presionar el boton "Eliminar"
    function eliminarRegistro(index){
        if (index > -1){
            registros.splice(index, 1);// Elimina 1 elemento desde index.
            actualizarTabla();
        }
    }

    //Metodo que edita un determinado registro al presionar el boton "Editar". Se cargan en la pagina los valores del
    //registro a editar, se crea un nuevo boton "Guardar Cambios" y se deshabilita el boton "Submit". Al efectuar los 
    //cambios en los inputs y opciones de la pagina, procedemos a guardar los cambios con lo cual se ejecuta el evento
    //del boton "Guardar Cambios". Este evento, nuevamente carga en variables los valores de cada unos de los inputs y opciones
    //en la pagina, guarda esos nuevos valores en el objeto "registro", dicho registro se inserta en el array "registros" en 
    //la posicion "index", elimino el boton "Guardar Como", habilito el boton "submit", limpio los campos del formulario
    //y vuelvo a actualizar la tabla del HTML.
    function editarRegistro(index){
        if (index > -1){
            document.getElementById("first-name").value = registros[index].nombre;
            document.getElementById("last-name").value = registros[index].apellido;
            document.getElementById("email").value = registros[index].mail;
            document.getElementById("new-password").value = registros[index].clave;
            if (registros[index].accountType == "personal-account"){
                document.querySelector("input[value='personal-account']").checked = "checked" //activo la opcion "personal-account".
            }else{
                document.querySelector("input[value='business-account']").checked = "checked" //activo la opcion "business-account".
            }    
            document.getElementById("terms-and-conditions").checked = registros[index].termsAccepted;

            //No se puede cargar la path del archivo que se selecciono en el input de tipo "file". Por eso le asignamos "".
            document.getElementById("profile-picture").value = "";
            
            document.getElementById("age").value = registros[index].edad;
            document.getElementById("referrer").value = registros[index].referencia;
            document.getElementById("bio").value = registros[index].bio;
            
            //Creacion del boton "Guardar Cambios"
            const botonGuardar = document.createElement("button");
            botonGuardar.innerText = "Guardar Cambios";
            //Devuelve el primer form de los forms que tenga un HTML.
            document.forms[0].appendChild(botonGuardar);
            botonGuardar.style = "display: block; width: 60%;margin: 1em auto;height: 2em;font-size: 1.1rem;background-color: #3b3b4f;border-color: white;min-width: 300px;color: #ffffff;";
            document.querySelector('input[type="submit"]').disabled = true;
            
            //Listener del boton "Guardar Cambios"
            botonGuardar.addEventListener("click", function(){
                const nombre = document.getElementById("first-name").value;
                const apellido = document.getElementById("last-name").value;
                const mail = document.getElementById("email").value;
                const clave = document.getElementById("new-password").value;
                let accountType = document.getElementsByName("account-type");
                if (accountType[0].checked){
                    accountType = accountType[0].value
                }else{
                    accountType = accountType[1].value
                }
                const termsAccepted = document.getElementById("terms-and-conditions").checked;
                const imagen = document.getElementById("profile-picture").value;
                const edad = document.getElementById("age").value;
                const referencia = document.getElementById("referrer").value;
                const bio = document.getElementById("bio").value;

                registros[index] = {
                    nombre: nombre,
                    apellido: apellido,
                    mail: mail,
                    clave: clave,
                    accountType: accountType,
                    termsAccepted: termsAccepted,
                    imagen: imagen,
                    edad: edad,
                    referencia: referencia,
                    bio: bio
                }

                //Elimino el boton "Guardar Cambios"
                document.forms[0].removeChild(botonGuardar);
                //Habilito el boton "Submit"
                document.querySelector('input[type="submit"]').disabled = false;
                //Limpio los campos
                form.reset()
                //Actualizo la tabla del HTML
                actualizarTabla();
            });
        }           
    }            
});    
    
    



