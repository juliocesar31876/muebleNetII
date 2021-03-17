import ImagePicker from 'react-native-image-picker';
import myProps from '../../nativeSocket/myPropsServer.json'
// More info on all the options is below in the API Reference... just some common use cases shown here
/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const ShowImagePicker = (props) => {
  const handleChange = (data) => {
    var body = new FormData();
    body.append("archibo", { uri: data.uri, name: 'image.png', type: 'image/jpeg' })
    body.append('type', "subirFoto");
    body.append('nombre', props.key);
    body.append('tipo', props.tipo);
    var myInit = {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      mode: 'cors',
      cache: 'default'
    };
    props.respose(data);
    var myRequest = new Request(myProps.images.url, myInit);

    fetch(myRequest)
      .then(function (response) {
        
      }).catch(error => console.error('Error:', error))
      .then(response => {
        console.log('Success:', response)
        props.dispath()
      });
  }
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.uri };
      handleChange(source)
    }
  });
}




export default ShowImagePicker;