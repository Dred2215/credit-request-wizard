
import React from "react";

const CreditRequestHeader = () => {
  return (
    <div className="text-center mb-6 fadeIn">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-credit-deepPurple">
        Solicitação de Crédito
      </h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        Preencha o formulário abaixo para solicitar crédito. Todos os campos marcados com * são obrigatórios.
      </p>
    </div>
  );
};

export default CreditRequestHeader;
