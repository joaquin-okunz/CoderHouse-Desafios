   const Socket = io();

    Socket.on('connect', () => {
        console.log('conectados al servidor');
    })

    Socket.on("inicio", (data) => {
        console.log(data);
    }) 
