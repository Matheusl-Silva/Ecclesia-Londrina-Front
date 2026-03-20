"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, Church, Clock, MapPin, Phone, Mail, FileText, Image, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const HORARIOS: string[] = [];
for (let h = 0; h < 24; h++) {
  const hora = String(h).padStart(2, '0');
  HORARIOS.push(`${hora}:00`, `${hora}:30`);
}

interface MassEntry {
  dia: string;
  horario: string;
}

const RegisterChurch = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // controlar os estados da missa, começa sempre vazio
  const [massas, setMassas] = useState<MassEntry[]>([{ dia: "", horario: "" }]);
  const [confissoes, setConfissoes] = useState<MassEntry[]>([{ dia: "", horario: "" }]);

  const addMass = () => {
    setMassas([...massas, { dia: "", horario: "" }]);
  };

  const updateMass = (index: number, field: keyof MassEntry, value: string) => {
    const newMassas = [...massas];
    newMassas[index][field] = value;
    setMassas(newMassas);
  };

  const removeMass = (index: number) => {
    const newMassas = [...massas];
    newMassas.splice(index, 1);
    setMassas(newMassas);
  };

  const addConfissao = () => {
    setConfissoes([...confissoes, { dia: "", horario: "" }]);
  };

  const updateConfissao = (index: number, field: keyof MassEntry, value: string) => {
    const newConfissoes = [...confissoes];
    newConfissoes[index][field] = value;
    setConfissoes(newConfissoes);
  };

  const removeConfissao = (index: number) => {
    const newConfissoes = [...confissoes];
    newConfissoes.splice(index, 1);
    setConfissoes(newConfissoes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !address.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos o nome e o endereço da paróquia.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Paróquia cadastrada!",
      description: `"${name}" foi registrada com sucesso. (Apenas UI – dados não persistidos)`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto py-6 md:py-8 max-w-4xl">
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
                Cadastrar Paróquia
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Adicione uma nova igreja ao site
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="container mx-auto py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados da Igreja */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Church className="h-5 w-5 text-primary" />
                Dados da Igreja
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Paróquia São José"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="cnpj">
                  <FileText className="inline h-3.5 w-3.5 mr-1" />
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  maxLength={18}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">
                    <Mail className="inline h-3.5 w-3.5 mr-1" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="paroquia@email.com"
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
              </div>

              <div>
                <Label htmlFor="logoUrl">
                  <Image className="inline h-3.5 w-3.5 mr-1" />
                  URL do Logo
                </Label>
                <Input
                  id="logoUrl"
                  placeholder="https://exemplo.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  maxLength={500}
                />
              </div>

              <div>
                <Label htmlFor="address">
                  <MapPin className="inline h-3.5 w-3.5 mr-1" />
                  Endereço completo *
                </Label>
                <Input
                  id="address"
                  placeholder="Rua das Acácias, 120 – Jardim Califórnia, Londrina – PR"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  maxLength={200}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Horários de Missa */}
            <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Horários de Missa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {massas.map((entry, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 bg-muted/30 flex flex-col sm:flex-row items-start sm:items-end gap-3"
                >
                  <div className="flex-1 w-full">
                    <Label className="text-sm">Dia da semana</Label>
                    <Select
                      value={entry.dia}
                      onValueChange={(v) => updateMass(idx, "dia", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIAS_SEMANA.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 w-full">
                    <Label className="text-sm">Horário</Label>
                    <Select
                      value={entry.horario}
                      onValueChange={(v) => updateMass(idx, "horario", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {HORARIOS.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {massas.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMass(idx)}
                      className="text-destructive hover:text-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button type="button" variant="secondary" size="sm" onClick={addMass}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar horário
              </Button>
            </CardContent>
          </Card>

          {/* Horários de Confissão */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Horários de Confissão
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {confissoes.map((entry, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 bg-muted/30 flex flex-col sm:flex-row items-start sm:items-end gap-3"
                >
                  <div className="flex-1 w-full">
                    <Label className="text-sm">Dia da semana</Label>
                    <Select
                      value={entry.dia}
                      onValueChange={(v) => updateConfissao(idx, "dia", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o dia" />
                      </SelectTrigger>
                      <SelectContent>
                        {DIAS_SEMANA.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 w-full">
                    <Label className="text-sm">Horário</Label>
                    <Select
                      value={entry.horario}
                      onValueChange={(v) => updateConfissao(idx, "horario", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        {HORARIOS.map((h) => (
                          <SelectItem key={h} value={h}>
                            {h}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {confissoes.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeConfissao(idx)}
                      className="text-destructive hover:text-destructive shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button type="button" variant="secondary" size="sm" onClick={addConfissao}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar horário
              </Button>
            </CardContent>
            </Card>
          </div>

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
              Cadastrar Paróquia
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterChurch;
