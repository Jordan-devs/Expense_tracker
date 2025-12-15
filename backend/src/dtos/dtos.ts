export interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateFinance {
  emoji: string;
  amount: number;
  transaction_date: string;
}
