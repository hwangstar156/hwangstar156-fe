import axios from 'axios';

interface PostLoginRequestProps {
  id: string;
  password: string;
}

interface GetUserRequestProps {
  userId: string;
}

interface LoginSuccessResponse {
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
    };
  };
}

interface UserResponse {
  data: {
    user: {
      id: string;
      name: string;
    };
  };
}

export const postLogin = ({ id, password }: PostLoginRequestProps) => {
  return axios.post<LoginSuccessResponse, PostLoginRequestProps>('/login', { id, password });
};

export const getUser = async ({ userId }: GetUserRequestProps) => {
  const data = await axios.get<UserResponse>(`user/${userId}`);

  return data.data.data;
};
