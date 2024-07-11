import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { options } from "../../utils/constants";


export const getFlights = createAsyncThunk("flight/getFlights", async () => {

    const response = await axios.request(options);
    // gelen veriden ihtiyacımızı alıp, objeler haline getirip listeye ekliyoruz
    const formatted = response.data.aircraft.map(item => ({
        id: item[0],
        code: item[1],
        lat: item[2],
        lng: item[3]
    }))

    // payload return edilir
    return formatted


})