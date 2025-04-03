export interface Address {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    ward: string;
    isPrimary: boolean;
  }
  
  export interface GetAddressesResponse {
    addresses: Address[];
  }
  
  export interface CreateAddressRequest {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    ward: string;
    isPrimary: boolean;
  }
  
  export interface UpdateAddressRequest extends CreateAddressRequest {}
  
  export interface DeleteAddressResponse {
    message: string;
  }
  