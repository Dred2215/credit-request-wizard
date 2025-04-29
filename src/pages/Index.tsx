
import React from "react";
import CreditRequestHeader from "@/components/CreditRequestHeader";
import CreditRequestForm from "@/components/CreditRequestForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-credit-softGray py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <CreditRequestHeader />
        <CreditRequestForm />
      </div>
    </div>
  );
};

export default Index;
