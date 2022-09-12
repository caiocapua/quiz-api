export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  acceptTerms: boolean;
}

export const id = '86a5b68d-2eb0-4421-8531-4a3b98b9841d';

export const invalidId = '16a5b68d-2eb0-4421-8531-4a3b98b9841d';

export const user: IUserResponse = {
  id: '86a5b68d-2eb0-4421-8531-4a3b98b9841d',
  name: 'Caio',
  email: 'caiocapua@hotmail.com',
  acceptTerms: true,
};

export const newUser = {
  name: 'Caio',
  email: 'caiocapua@shotmails.com',
  password: '123',
  acceptTerms: true,
};
