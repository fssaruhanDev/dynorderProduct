//const dates = require('date-and-time');



function AutoID(name){
	let date_ob = new Date()
	const month = date_ob.getMonth()
	const day = date_ob.getDay()
	const year = date_ob.getFullYear()
	const hour = date_ob.getHours()
	const minutes = date_ob.getMinutes()
	const seconds = date_ob.getSeconds()
	const milliseconds = date_ob.getMilliseconds()

	if (name == "carousel"){
		return "CRS200"+year+month+day+hour+minutes+seconds+milliseconds
	}else{
		return "PRD100"+year+month+day+hour+minutes+seconds+milliseconds
	}
	

}

module.exports = {
	AutoID
}