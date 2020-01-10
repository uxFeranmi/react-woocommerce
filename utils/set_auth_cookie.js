import axios from 'axios';

const setAuthCookie = async (token = '')=> {
  const response = await axios.get('/api/auth/set-cookie', {
    headers: {'Authorization': `Bearer ${token}`},
  });

  console.log(response);
}

export default setAuthCookie;