
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creditRequestSchema, type CreditRequestFormData } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField, 
  FormItem, 
  FormLabel
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import FormFieldError from "@/components/FormFieldError";
import MaskedInput from "@/components/MaskedInput";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const CreditRequestForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreditRequestFormData>({
    resolver: zodResolver(creditRequestSchema),
    defaultValues: {
      nome: "",
      cpfCnpj: "",
      email: "",
      telefone: "",
      endereco: {
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
      valorSolicitado: "",
      motivo: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: CreditRequestFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("Dados do formulário:", data);
      
      // Simulação de envio para API (poderia ser substituído por uma chamada real)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Em breve entraremos em contato.",
        duration: 5000,
      });
      
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar solicitação",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue === "") return "";
    
    const intValue = parseInt(numericValue, 10) / 100;
    return intValue.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-credit-purple/20 shadow-md">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-credit-darkPurple border-b pb-2">
                Dados Pessoais
              </h2>
              
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Nome completo *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Digite seu nome completo"
                        className={form.formState.errors.nome ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""} 
                      />
                    </FormControl>
                    <FormFieldError error={form.formState.errors.nome?.message} />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cpfCnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">CPF ou CNPJ *</FormLabel>
                      <FormControl>
                        <MaskedInput
                          mask="cpfCnpj"
                          placeholder="Digite seu CPF ou CNPJ"
                          value={field.value}
                          onChange={field.onChange}
                          error={!!form.formState.errors.cpfCnpj}
                        />
                      </FormControl>
                      <FormFieldError error={form.formState.errors.cpfCnpj?.message} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Telefone *</FormLabel>
                      <FormControl>
                        <MaskedInput
                          mask="phone"
                          placeholder="(00) 00000-0000"
                          value={field.value}
                          onChange={field.onChange}
                          error={!!form.formState.errors.telefone}
                        />
                      </FormControl>
                      <FormFieldError error={form.formState.errors.telefone?.message} />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">E-mail *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email" 
                        placeholder="seu.email@exemplo.com"
                        className={form.formState.errors.email ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""} 
                      />
                    </FormControl>
                    <FormFieldError error={form.formState.errors.email?.message} />
                  </FormItem>
                )}
              />
            </div>

            {/* Endereço */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-credit-darkPurple border-b pb-2">
                Endereço
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="endereco.rua"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Rua *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Nome da rua"
                            className={form.formState.errors.endereco?.rua ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""} 
                          />
                        </FormControl>
                        <FormFieldError error={form.formState.errors.endereco?.rua?.message} />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="endereco.numero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Número *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Número"
                          className={form.formState.errors.endereco?.numero ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""} 
                        />
                      </FormControl>
                      <FormFieldError error={form.formState.errors.endereco?.numero?.message} />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="endereco.complemento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Complemento</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Apartamento, bloco, etc. (opcional)" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endereco.bairro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Bairro *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Bairro"
                          className={form.formState.errors.endereco?.bairro ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""} 
                        />
                      </FormControl>
                      <FormFieldError error={form.formState.errors.endereco?.bairro?.message} />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="endereco.cidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Cidade *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Cidade"
                          className={form.formState.errors.endereco?.cidade ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""} 
                        />
                      </FormControl>
                      <FormFieldError error={form.formState.errors.endereco?.cidade?.message} />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endereco.estado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Estado *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="UF"
                          maxLength={2}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                          className={form.formState.errors.endereco?.estado ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""} 
                        />
                      </FormControl>
                      <FormFieldError error={form.formState.errors.endereco?.estado?.message} />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endereco.cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">CEP *</FormLabel>
                      <FormControl>
                        <MaskedInput
                          mask="cep"
                          placeholder="00000-000"
                          value={field.value}
                          onChange={field.onChange}
                          error={!!form.formState.errors.endereco?.cep}
                        />
                      </FormControl>
                      <FormFieldError error={form.formState.errors.endereco?.cep?.message} />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Informações do Crédito */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-credit-darkPurple border-b pb-2">
                Informações do Crédito
              </h2>
              
              <FormField
                control={form.control}
                name="valorSolicitado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Valor solicitado (R$) *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">R$</span>
                        <Input 
                          value={formatCurrency(field.value)}
                          onChange={(e) => {
                            const formattedValue = e.target.value.replace(/\D/g, "");
                            field.onChange(formattedValue);
                          }}
                          placeholder="0,00"
                          className={`pl-10 ${form.formState.errors.valorSolicitado ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""}`}
                        />
                      </div>
                    </FormControl>
                    <FormFieldError error={form.formState.errors.valorSolicitado?.message} />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="motivo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Motivo da solicitação *</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Descreva o motivo para a sua solicitação de crédito"
                        className={`min-h-[100px] ${form.formState.errors.motivo ? "border-credit-red ring-credit-red focus-visible:ring-credit-red" : ""}`}
                      />
                    </FormControl>
                    <FormFieldError error={form.formState.errors.motivo?.message} />
                  </FormItem>
                )}
              />
            </div>

            {/* Formulário inválido alert */}
            {form.formState.isSubmitted && !form.formState.isValid && (
              <div className="bg-red-50 border border-credit-red/30 rounded-md p-4 flex items-start gap-2 fadeIn">
                <AlertTriangle className="h-5 w-5 text-credit-red flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">Existem campos com erro no formulário</p>
                  <p>Por favor, revise os campos marcados e tente novamente.</p>
                </div>
              </div>
            )}
            
            {/* Submit */}
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-credit-purple hover:bg-credit-darkPurple"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar solicitação"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreditRequestForm;
