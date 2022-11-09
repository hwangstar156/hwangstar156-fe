import axios from 'axios';
import { HOME_URL } from '../constants/url';

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
      ID: string;
      NAME: string;
    };
  };
}

export interface UserResponse {
  data: {
    user: {
      ID: string;
      NAME: string;
    };
  };
}

export const postLogin = ({ id, password }: PostLoginRequestProps) =>
  axios.post<LoginSuccessResponse>(`${HOME_URL}/login`, { id, password });

export const getUser = async ({ userId }: GetUserRequestProps) => {
  const data = await axios.get<UserResponse>(`${HOME_URL}/users/${userId}`);

  return data.data;
};
