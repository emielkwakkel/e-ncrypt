import CryptoJS from 'crypto-js'

export type AlgorithmOptions = 'AES' | 'TrippleDES' | 'Rabbit';
export enum Algoritms {
  AES = 'AES',
  TrippleDES = 'TrippleDES',
  Rabbit = 'Rabbit'
}
export class CryptoService {
  encrypt(
    content: string,
    secretKey: string,
    algorithm: AlgorithmOptions = Algoritms.AES
  ) {
    return CryptoJS[algorithm]
      .encrypt(content, secretKey)
      .toString();
  }
  
  decrypt(
    content: string,
    secretKey: string,
    algorithm: AlgorithmOptions = Algoritms.AES
  ) {
    return CryptoJS[algorithm]
      .decrypt(content, secretKey)
      .toString(CryptoJS.enc.Utf8);
  }
}
