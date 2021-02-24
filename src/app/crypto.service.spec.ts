import CryptoJS from 'crypto-js'
import { CryptoService, EncryptionAlgorithms } from './crypto.service';

describe('CryptoService', () => {
  let encryptSpy: {[key: string]: jasmine.SpyObj<any> } = {};
  let cryptoService: CryptoService;
  const testData = {
    content: 'This needs to be secret!',
    secretKey: 'Password!',
    algorithm: EncryptionAlgorithms.AES,
    encryptionRounds: 4,
    iv: CryptoJS.enc.Hex.parse('6673236444466877242372777172656d6e266278753369795e6632333471772c2e')
  }

  beforeEach((() => {
    cryptoService = new CryptoService();
  }));

  it('should create the service', () => {
    expect(cryptoService).toBeTruthy();
  });

  describe('encrypt', () => {
    beforeEach((() => {
      Object
        .keys(EncryptionAlgorithms)
        .map(algorithm => encryptSpy[algorithm] = spyOn(CryptoJS[algorithm], 'encrypt'));

      cryptoService = new CryptoService();
    }));

    it('should call CryptoJS encrypt method with provided algorithm, content and secretKey', () => {
      encryptSpy.AES.and.returnValue(testData.content);

      cryptoService.encrypt(
        testData.content,
        testData.secretKey,
        testData.algorithm,
        testData.encryptionRounds,
        testData.iv,
      );

      expect(encryptSpy.AES).toHaveBeenCalledWith(
        testData.content,
        testData.secretKey,
        { iv: testData.iv }
      );
      expect(encryptSpy.TripleDES).not.toHaveBeenCalled();
      expect(encryptSpy.Rabbit).not.toHaveBeenCalled();
    });
  });
});
