import axios from '@/plugins/axios';

export default async (id, jwt) => {
    try{
        const { data } = await axios({
            url: `/user/${id}`,
            method: 'GET',
            headers: {
                'Authorizaion': `Bearer ${jwt}`
            }
        });

        return data;
    }catch(e){
        throw e;
    }
}