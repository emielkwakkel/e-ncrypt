import CryptoJS from 'crypto-js'

export type AlgorithmOptions = 'AES' | 'TripleDES' | 'Rabbit';
export enum Algorithms {
  AES = 'AES',
  TripleDES = 'TripleDES',
  Rabbit = 'Rabbit'
}

const iv = CryptoJS.enc.Hex.parse('6673236444466877242372777172656d6e266278753369795e6632333471772c2e');
export class CryptoService {
  encrypt(
    content: string,
    secretKey: string,
    algorithm: AlgorithmOptions = Algorithms.AES,
    rounds: number,
  ): string {
    Array.from(Array(rounds)).forEach(() => {
      content = CryptoJS[algorithm]
        .encrypt(content, secretKey, { iv })
        .toString();
    });

    return content;
  }
  
  decrypt(
    content: string,
    secretKey: string,
    algorithm: AlgorithmOptions = Algorithms.AES,
    rounds: number,
  ) {
    Array.from(Array(rounds)).forEach(() => {
      content = CryptoJS[algorithm]
        .decrypt(content, secretKey, { iv })
        .toString(CryptoJS.enc.Utf8);
    });
    return content;
  }
}
