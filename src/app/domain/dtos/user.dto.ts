export class CreateUserDto {
  commerceId!:        string;
  services?:          string[];
  firstName!:         string;
  secondName!:        string;
  firstLastname!:     string;
  secondLastname!:    string;
  username!:          string;
  email!:             string;
  password!:          string;
  avatar?: {
    url:              string;
    publicId:         string;
  };
  cellphone!:         number;
  role!:              'ADMIN' | 'COLLABORATOR' | 'CUSTOMER'
}

export class LoginUserDto {
  email!:             string;
  password!:          string;
}
