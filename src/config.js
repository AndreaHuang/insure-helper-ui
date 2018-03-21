const URL_DEV={
	irr:"http://localhost:8080/irr"
}
const URL_PROD={
	irr:"https://warm-mesa-75510.herokuapp.com/irr"
}
console.log(process.env);


export const URL = "development" !== process.env.NODE_ENV?URL_PROD:URL_DEV;