export const options = {
    method: 'GET',
    url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
    params: {
        bl_lat: '34.654293',
        bl_lng: '25.514642',
        tr_lat: '42.793449',
        tr_lng: '43.185981'
    },
    headers: {
        'x-rapidapi-key': '5a0d6cda68msh0c88a68f0e5e0bcp108355jsn1db8195d2169',
        'x-rapidapi-host': 'flight-radar1.p.rapidapi.com'
    }
};


export const headers = {
    'x-rapidapi-key': '5a0d6cda68msh0c88a68f0e5e0bcp108355jsn1db8195d2169',
    'x-rapidapi-host': 'flight-radar1.p.rapidapi.com'
}
