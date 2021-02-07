import CryptoJS from 'crypto-js'

export class CryptoService {
  encrypt(
    content: string,
    secretKey: string,
    algorithm: 'AES' | 'TripleDES' | 'Rabbit' = 'AES'
  ) {
    return CryptoJS[algorithm]
      .encrypt(content, secretKey)
      .toString();
  }
  
  decrypt(
    content: string,
    secretKey: string,
    algorithm: 'AES' | 'TripleDES' | 'Rabbit' = 'AES'
  ) {
    return CryptoJS[algorithm]
      .decrypt(content, secretKey)
      .toString(CryptoJS.enc.Utf8);
  }
}
