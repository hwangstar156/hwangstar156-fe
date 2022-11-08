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
  axios.post<LoginSuccessResponse>('/login', { id, password });

export const getUser = async ({ userId }: GetUserRequestProps) => {
  const data = await axios.get<UserResponse>(`user/${userId}`);

  return data.data.data;
};
