import axios from 'axios';

type City = {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
};

export async function copyCities() {
  const res = await axios.get<{ rajaongkir: { results: City[] } }>('https://api.rajaongkir.com/starter/city', {
    headers: {
      key: process.env.RAJAONGKIR_API_KEY,
    },
  });
  const {
    data: {
      rajaongkir: { results },
    },
  } = res;
  return results;
}
