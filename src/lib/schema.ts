
import { z } from "zod";

// Validação de CPF
function validaCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  
  if (cpf.length !== 11) return false;
  
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  
  let resto = soma % 11;
  let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
  
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  
  resto = soma % 11;
  let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
  
  return digitoVerificador2 === parseInt(cpf.charAt(10));
}

// Validação de CNPJ
function validaCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, "");
  
  if (cnpj.length !== 14) return false;
  
  if (/^(\d)\1{13}$/.test(cnpj)) return false;
  
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  
  return resultado === parseInt(digitos.charAt(1));
}

export const creditRequestSchema = z.object({
  nome: z.string().min(3, "O nome completo é obrigatório e deve ter pelo menos 3 caracteres"),
  
  cpfCnpj: z.string()
    .min(1, "CPF ou CNPJ é obrigatório")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      if (digits.length === 11) {
        return validaCPF(digits);
      } else if (digits.length === 14) {
        return validaCNPJ(digits);
      }
      return false;
    }, "CPF ou CNPJ inválido"),
  
  email: z.string().email("Formato de e-mail inválido").min(1, "E-mail é obrigatório"),
  
  telefone: z.string()
    .min(10, "Telefone deve ter pelo menos 10 dígitos")
    .max(11, "Telefone não pode ter mais de 11 dígitos"),
  
  endereco: z.object({
    rua: z.string().min(1, "Rua é obrigatória"),
    numero: z.string().min(1, "Número é obrigatório"),
    complemento: z.string().optional(),
    bairro: z.string().min(1, "Bairro é obrigatório"),
    cidade: z.string().min(1, "Cidade é obrigatória"),
    estado: z.string().min(2, "Estado é obrigatório").max(2, "Use a sigla do estado (2 letras)"),
    cep: z.string().min(8, "CEP deve ter 8 dígitos").max(8, "CEP deve ter 8 dígitos"),
  }),
  
  valorSolicitado: z.string()
    .min(1, "Valor solicitado é obrigatório")
    .refine(val => !isNaN(parseFloat(val.replace(/\./g, "").replace(",", "."))), 
      "Valor inválido"),
  
  motivo: z.string().min(10, "Por favor, forneça um motivo com pelo menos 10 caracteres"),
});

export type CreditRequestFormData = z.infer<typeof creditRequestSchema>;
