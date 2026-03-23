"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Shield, Church, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const ROLES = [
  { value: "membro", label: "Membro" },
  { value: "coordenador", label: "Coordenador" },
  { value: "padre", label: "Padre" },
  { value: "admin", label: "Administrador" },
];

const MOCK_CHURCHES = [
  { id: 1, name: "Catedral Metropolitana de Londrina" },
  { id: 2, name: "Paróquia São José" },
  { id: 3, name: "Paróquia Nossa Senhora de Fátima" },
  { id: 4, name: "Paróquia Santa Cruz" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const CadastroPessoa = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [churchId, setChurchId] = useState("");

  const [churches, setChurches] = useState<{ id: number; name: string }[]>(MOCK_CHURCHES);

  useEffect(() => {
    fetch(`${API_URL}/church`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setChurches(data); // Usa os dados do banco só se tiver paróquias cadastradas
        }
      })
      .catch((err) => console.error("Failed to fetch churches:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !role || !churchId) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos corretamente.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          passwordHash: password,
          role,
          churchId: parseInt(churchId, 10),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      toast({
        title: "Pessoa cadastrada!",
        description: `"${name}" foi registrada com sucesso.`,
      });

      alert(`O usuário(a) ${name} foi cadastrado com sucesso!`);

      // Limpa formulário
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setChurchId("");

    } catch (err) {
      console.error(err);
      toast({
        title: "Erro",
        description: "Não foi possível cadastrar a pessoa. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto py-6 md:py-8 max-w-2xl">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <img src={logo.src} alt="Ecclesia Londrina" className="h-10 w-10 rounded-full" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                Cadastrar Pessoa
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Adicione um novo usuario ao sistema
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  placeholder="Ex: João da Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">
                    <Mail className="inline h-3.5 w-3.5 mr-1" />
                    E-mail *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="joao@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">
                    <Phone className="inline h-3.5 w-3.5 mr-1" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(43) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    <Lock className="inline h-3.5 w-3.5 mr-1" />
                    Senha *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vínculo e Função */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Vínculo e Função
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  <Church className="inline h-3.5 w-3.5 mr-1" />
                  Paróquia
                </Label>
                <Select value={churchId} onValueChange={setChurchId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a paróquia" />
                  </SelectTrigger>
                  <SelectContent>
                    {churches.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  <Shield className="inline h-3.5 w-3.5 mr-1" />
                  Função / Papel
                </Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Cadastrar Pessoa
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CadastroPessoa;
