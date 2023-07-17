export class CreateCommerceDto {
  name!:        string;
  type!:        string;
  schedule!:    string[];
  address!: {
    country:    string;
    city:       string;
    street:     string;
    zipCode:    number;
  };
}
