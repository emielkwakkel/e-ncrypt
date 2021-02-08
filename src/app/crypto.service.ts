import CryptoJS from 'crypto-js'

export type EncryptionAlgorithmOptions = 'AES' | 'TripleDES' | 'Rabbit';
export enum EncryptionAlgorithms {
  AES = 'AES',
  TripleDES = 'TripleDES',
  Rabbit = 'Rabbit'
}

export type HashingAlgorithmOptions = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512' | 'SHA3' | 'RIPEMD160';
export enum HashingAlgorithms {
  MD5 = 'MD5',
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA512 = 'SHA512',
  SHA3 = 'SHA3',
  RIPEMD160 = 'RIPEMD160',
}

const iv = CryptoJS.enc.Hex.parse('6673236444466877242372777172656d6e266278753369795e6632333471772c2e');
export class CryptoService {
  encrypt(
    content: string,
    secretKey: string,
    algorithm: EncryptionAlgorithmOptions = EncryptionAlgorithms.AES,
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
    algorithm: EncryptionAlgorithmOptions = EncryptionAlgorithms.AES,
    rounds: number,
  ) {
    Array.from(Array(rounds)).forEach(() => {
      content = CryptoJS[algorithm]
        .decrypt(content, secretKey, { iv })
        .toString(CryptoJS.enc.Utf8);
    });
    return content;
  }

  hash(
    content: string,
    algorithm: HashingAlgorithmOptions = HashingAlgorithms.SHA512,
    rounds: number,
  ) {
    Array.from(Array(rounds)).forEach(() => {
      content = CryptoJS[algorithm](content)
        .toString();
    });
    return content;
  }
}
