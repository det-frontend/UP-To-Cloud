import axios from "axios";

const instance = axios.create({
  baseURL:" http://192.168.0.100:9000/api"
});
// 192.168.0.100

// http://192.168.0.100:9000/api
// https://detfsmm.com/api
// https://detfsmm.com/api
//Real Port - https://detmm-fuelstations.com/api
// Singapore Port - http://13.251.206.31:9000/api
// Singapore SSl Port - http://detfsmm.com/api  //now
//raspberrppi - http://192.168.100.62:9000/api
// digitalengineeringtech.frontend@gmail.com
export default instance