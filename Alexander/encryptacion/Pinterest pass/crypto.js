import crypto from "crypto";

// Constantes
const algoritmo = 'aes-192-cfb';
const key = crypto.randomBytes(24); // Clave fija para que funcione la desencriptación
const iv = crypto.randomBytes(16);

// Texto original
const password = "pilinga";

// Función para encriptar
const encriptar = (texto) => {
    const cipher = crypto.createCipheriv(algoritmo, key, iv);
    const encriptado = Buffer.concat([
        cipher.update(texto, 'utf8'),
        cipher.final()
    ]);

    return {
        iv: iv.toString("hex"),
        encripted: encriptado.toString("hex")
    };
};

// Función para desencriptar
const desencriptar = ({ iv, encripted }) => {
    const decipher = crypto.createDecipheriv(
        algoritmo,
        key,
        Buffer.from(iv, "hex")
    );

    const desencriptado = Buffer.concat([
        decipher.update(Buffer.from(encripted, "hex")),
        decipher.final()
    ]);

    return desencriptado.toString("utf8");
};

// Prueba
const resultado = encriptar(password);
console.log("Encriptado:", resultado);

const desencriptado = desencriptar(resultado);
console.log("Desencriptado:", desencriptado);
