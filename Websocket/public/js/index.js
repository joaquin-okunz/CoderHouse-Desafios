    const Socket = io();

    let listProd = document.getElementById(listaProductos)

    Socket.on('connect', () => {
        console.log('conectados al servidor');
    })

    Socket.on("inicio", (data) => {
        console.log(data);
        render(data);
    }) 

    function render (data) { 
         const li = document.createElement('li');
        li.innerHTML = `<p> Nombre:${data.nombre} Precio:${data.precio} Stock disponible:${data.stock} Id:${data.id}</p>`;
         listProd.appendChild(li);  
    }

