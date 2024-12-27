// Constants for encryption
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const KEY_LENGTH = 32;
const TAG_LENGTH = 16;
const ITERATIONS = 100000;

export async function generateEncryptionKey(password: string, salt?: Uint8Array): Promise<{ key: CryptoKey; salt: Uint8Array }> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const saltBuffer = salt || crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  return { key, salt: saltBuffer };
}

export async function generateVerificationHash(key: CryptoKey): Promise<string> {
  const testData = new Uint8Array(32);
  const encrypted = await encrypt(testData, key);
  return arrayBufferToBase64(encrypted);
}

export async function encrypt(data: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    data
  );

  const result = new Uint8Array(iv.length + encrypted.byteLength);
  result.set(iv);
  result.set(new Uint8Array(encrypted), iv.length);
  return result;
}

export async function decrypt(data: Uint8Array, key: CryptoKey): Promise<Uint8Array> {
  const iv = data.slice(0, IV_LENGTH);
  const ciphertext = data.slice(IV_LENGTH);

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    ciphertext
  );

  return new Uint8Array(decrypted);
}

export async function encryptText(text: string, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const { key } = await generateEncryptionKey(password);
  const encrypted = await encrypt(data, key);
  return arrayBufferToBase64(encrypted);
}

export async function decryptText(encryptedText: string, password: string): Promise<string> {
  const data = base64ToArrayBuffer(encryptedText);
  const { key } = await generateEncryptionKey(password);
  const decrypted = await decrypt(new Uint8Array(data), key);
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

// Helper functions for base64 encoding/decoding
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}