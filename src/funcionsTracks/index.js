/* Calcula la distancia entre dos punts */
export function calcularDistanciaEntreCoordenades(lat1, lon1,lat2, lon2){
    var rad = function (x) {
        return x * Math.PI / 180;
    }        
    var R = 6378.137;//Radi de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(6)*1;//Retorna tres decimals
}