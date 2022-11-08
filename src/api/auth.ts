import axios from 'axios';

export interface PostLoginRequestProps {
  id: string;
  password: string;
}

export interface GetUserRequestProps {
  userId: string;
}

export interface LoginSuccessResponse {
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
    };
  };
}

export interface UserResponse {
  data: {
    user: {
      id: string;
      name: string;
    };
  };
}

export const postLogin = ({ id, password }: PostLoginRequestProps) =>
  axios.post<LoginSuccessResponse>('/login', { id, password });

export const getUser = async ({ userId }: GetUserRequestProps) => {
  const data = await axios.get<UserResponse>(`user/${userId}`);

  return data.data.data;
};
