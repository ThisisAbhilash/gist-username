import axios from 'axios';
import { SearchPayload } from './store/gists/action';

export const fetchGists= async (payload: SearchPayload): Promise<any> => {
  const data = await axios
    .get('/api/v1/gist', { params: payload })
    .catch((error) => {
      return Promise.reject(error);
    });
  return Promise.resolve(data);
};

export const fetchGist= async (gistId: string): Promise<any> => {
  const data = await axios
    .get(`/api/v1/gist/${gistId}`)
    .catch((error) => {
      return Promise.reject(error);
    });
  return Promise.resolve(data);
};
