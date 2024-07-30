import { Axios } from "../../utils/helper/helper";

export default async function userListApi(limit,Skip) {
    try {
        const response = await Axios.get('/users', {
          params: {
            limit,
            Skip,
          },
        });
        
        return response.data; 
      } catch (error) {
        console.error(error);
        throw error;
      }
  }

  //axios and fetch method