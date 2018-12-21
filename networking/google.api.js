const API_KEY = 'AIzaSyAr96gSEiE_BEdP63teHGxX3Iysm_U_Qpg'

export class GoogleApi {

	static getPlace(request) {
		let url = `https://maps.googleapis.com/maps/api/geocode/json?
		latlng=${encodeURIComponent(request.latitude)},${encodeURIComponent(request.longitude)}
		&key=${encodeURIComponent(API_KEY)}`;
		return fetch(url).then(res => res.json()).then(res => res.results)
	}
	static autoComplate(request) {
		let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?location=${encodeURIComponent(request.location)}&radius=${encodeURIComponent(request.radius)}&input=${request.name}&key=${encodeURIComponent(API_KEY)}`;
		return fetch(url).then(res => res.json()).then(res => res.status == "OK" ? res.predictions : [])
	}
	static getLocationFromID(request) {
		let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${encodeURIComponent(request)}&key=${encodeURIComponent(API_KEY)}`;
		return fetch(url).then(res => res.json()).then(res => res.result)
	}
	static getCityLocation(request) {
		let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request}&key=${encodeURIComponent(API_KEY)}`;
		return fetch(url).then(res => res.json()).then(res => {
			return res.results[0]})
	}
	static getDistance(request) {
		let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${request.location_from_lat},${request.location_from_lng}&destinations=${request.location_to_lat}%2C${request.location_to_lng}&key=${encodeURIComponent(API_KEY)}`;
		return fetch(url).then(res => res.json()).then(res => {
			return res})
	}
}