//import myPropsJulio from '../../nativeSocket/myPropsJulio.json';
import myPropsJulio from '../../nativeSocket/myPropsServer.json';
const EnviarFoto = (data) => {
        var body = new FormData();
        body.append("archibo", data.archivo)
        body.append('type', "subirFoto");
        body.append('nombre', data.nombre);
        body.append('tipo', data.type);
        var myInit = {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        var myRequest = new Request(myPropsJulio.images.url, myInit);
        fetch(myRequest)
            .then(function (response) {
                console.log("ENTGROooooooooooooooo", response);
                return true;
            }).catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
}

export default EnviarFoto;
