function Success(res,req,data){
	res.set('Cache-Control', 'public, max-age=0');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Content-Type", "text/json");
	res.status(200).json({
		status: "SUCCESS",
		statusCode: 200,
		data
	});
}
function Denied(res,req,data,code){
	res.set('Cache-Control', 'public, max-age=0');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Content-Type", "text/json");
	res.status(code).json({
		status: "DENIED",
		statusCode: code,
		data
	});
}



module.exports = {
	Success,
	Denied
}