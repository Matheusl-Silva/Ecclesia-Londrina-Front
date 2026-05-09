"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { createChurch } from "@/services/church/api";
import { createSchedule } from "@/services/schedule/api";
import { CreateSchedulePayload, ScheduleTypeEnum } from "@/services/schedule/types";

const DIAS_SEMANA = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado",
];

const DAY_NAME_TO_NUMBER: Record<string, number> = {
  "Domingo": 0, "Segunda-feira": 1, "Terça-feira": 2, "Quarta-feira": 3,
  "Quinta-feira": 4, "Sexta-feira": 5, "Sábado": 6,
};

interface ScheduleEntry {
  id: string;
  dia: string;
  horario: string;
}

const newEntry = (): ScheduleEntry => ({ id: crypto.randomUUID(), dia: "", horario: "" });

const addEntry = (setter: Dispatch<SetStateAction<ScheduleEntry[]>>) =>
  setter((prev) => [...prev, newEntry()]);

const updateEntry = (
  setter: Dispatch<SetStateAction<ScheduleEntry[]>>,
  index: number,
  field: "dia" | "horario",
  value: string
) => setter((prev) => prev.map((e, i) => i === index ? { ...e, [field]: value } : e));

const removeEntry = (setter: Dispatch<SetStateAction<ScheduleEntry[]>>, index: number) =>
  setter((prev) => prev.filter((_, i) => i !== index));

// --- ScheduleSection component (module-level to avoid remount on every render) ---

interface ScheduleSectionProps {
  title: string;
  icon: string;
  colorClass: string;
  borderClass: string;
  entries: ScheduleEntry[];
  onAdd: () => void;
  onUpdate: (i: number, f: "dia" | "horario", v: string) => void;
  onRemove: (i: number) => void;
}

const ScheduleSection = ({ title, icon, colorClass, borderClass, entries, onAdd, onUpdate, onRemove }: ScheduleSectionProps) => (
  <div className={`bg-accent p-6 rounded-xl border-l-4 ${borderClass}`}>
    <div className="flex justify-between items-center mb-6">
      <div className={`flex items-center gap-3 ${colorClass}`}>
        <span className="material-symbols-outlined">{icon}</span>
        <h4 className="text-sm font-bold tracking-widest uppercase">{title}</h4>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className={`flex items-center gap-2 ${colorClass} text-xs font-bold tracking-widest uppercase hover:underline`}
      >
        <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add_circle</span>
        Adicionar Horário
      </button>
    </div>
    <div className="space-y-4">
      {entries.map((entry, idx) => (
        <div key={entry.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded border border-border items-end shadow-sm">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Dia da Semana</label>
            <select
              className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
              value={entry.dia}
              onChange={(e) => onUpdate(idx, "dia", e.target.value)}
            >
              <option value="">Selecione</option>
              {DIAS_SEMANA.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Horário</label>
            <input
              type="time"
              className="border border-border rounded px-3 py-2 text-sm bg-background text-foreground"
              value={entry.horario}
              onChange={(e) => onUpdate(idx, "horario", e.target.value)}
            />
          </div>
          {entries.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors w-fit md:ml-auto"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

// --- Page ---

const SCHEDULE_CONFIG = [
  { key: "massas" as const,     title: "Missa",     type: ScheduleTypeEnum.MASS },
  { key: "confissoes" as const, title: "Confissão", type: ScheduleTypeEnum.CONFESSION },
  { key: "adoracoes" as const,  title: "Adoração",  type: ScheduleTypeEnum.OTHER },
];

const RegisterChurch = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "", cnpj: "", email: "", phone: "", logoUrl: "",
    street: "", number: "", complement: "", neighborhood: "", city: "", postalCode: "",
  });

  const [massas, setMassas] = useState<ScheduleEntry[]>([newEntry()]);
  const [confissoes, setConfissoes] = useState<ScheduleEntry[]>([newEntry()]);
  const [adoracoes, setAdoracoes] = useState<ScheduleEntry[]>([newEntry()]);

  const [loading, setLoading] = useState(false);

  const scheduleState = { massas, confissoes, adoracoes };
  const scheduleSetters = { massas: setMassas, confissoes: setConfissoes, adoracoes: setAdoracoes };

  const setField = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const streetNumber = parseInt(form.number, 10);
    if (!form.name.trim() || !form.street.trim() || isNaN(streetNumber) || !form.neighborhood.trim() || !form.city.trim()) {
      toast({ title: "Campos obrigatórios", description: "Preencha nome, rua, número válido, bairro e cidade.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const churchResponse = await createChurch({
        name: form.name.trim(), cnpj: form.cnpj.trim(), email: form.email.trim(),
        phone: form.phone.trim(), logoUrl: form.logoUrl.trim(), street: form.street.trim(),
        number: streetNumber, complement: form.complement.trim(),
        neighborhood: form.neighborhood.trim(), city: form.city.trim(), postalCode: form.postalCode.trim(),
      });

      if (!churchResponse.ok) {
        const err = await churchResponse.json().catch(() => ({})) as { message?: string };
        throw new Error(err.message || "Erro ao cadastrar paróquia");
      }

      const church = await churchResponse.json();
      const churchId: number = church?.id;

      const schedulePayloads: CreateSchedulePayload[] = SCHEDULE_CONFIG.flatMap(({ key, title, type }) =>
        scheduleState[key]
          .filter((e) => e.dia && e.horario)
          .map((e) => ({
            church_id: churchId, title, dayOfWeek: DAY_NAME_TO_NUMBER[e.dia],
            startsAt: e.horario, endsAt: e.horario, type,
            isRecurring: true, additionalInformation: null,
          }))
      );

      const scheduleResults = await Promise.all(schedulePayloads.map((p) => createSchedule(p)));
      const failed = scheduleResults.find((r) => !r.ok);
      if (failed) throw new Error("Paróquia cadastrada, mas houve erro ao salvar os horários.");

      toast({ title: "Paróquia cadastrada!", description: `"${form.name}" foi registrada com sucesso.` });
      router.push("/");
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro",
        description: err instanceof Error ? err.message : "Não foi possível cadastrar a paróquia.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col h-screen w-64 bg-card fixed left-0 top-0 bottom-0 p-4 gap-2 border-r border-border shadow-sm">
        <div className="mb-8 px-4 py-2">
          <h1 className="font-serif text-2xl font-semibold text-primary leading-tight">Ecclesia Admin</h1>
          <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground opacity-70 mt-1">
            Londrina-PR Diocese
          </p>
        </div>
        <nav className="flex flex-col gap-1">
          <a href="/" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent rounded-full transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-xs font-bold tracking-widest uppercase">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#fed65b] text-[#574500] font-bold rounded-full translate-x-1">
            <span className="material-symbols-outlined">church</span>
            <span className="text-xs font-bold tracking-widest uppercase">Parishes</span>
          </a>
          <a href="/registerUser" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent rounded-full transition-all">
            <span className="material-symbols-outlined">group</span>
            <span className="text-xs font-bold tracking-widest uppercase">Users</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-accent rounded-full transition-all">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-xs font-bold tracking-widest uppercase">Settings</span>
          </a>
        </nav>
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
              AD
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-foreground">Admin Diocesano</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-12 border-b border-border pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <nav className="flex items-center gap-2 text-muted-foreground mb-4">
                <span className="text-xs font-bold tracking-widest uppercase">Parishes</span>
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chevron_right</span>
                <span className="text-xs font-bold tracking-widest uppercase text-primary">New Registration</span>
              </nav>
              <h2 className="font-serif text-5xl font-semibold text-primary leading-tight tracking-tight">
                Cadastro de Nova Paróquia
              </h2>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Insira as informações oficiais e horários litúrgicos para manter a comunidade informada sobre as atividades da diocese.
              </p>
            </div>
            <div className="hidden md:flex gap-4 shrink-0">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="px-6 py-3 text-xs font-bold tracking-widest uppercase border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                form="church-form"
                disabled={loading}
                className="px-6 py-3 text-xs font-bold tracking-widest uppercase bg-primary text-white hover:bg-primary/90 transition-all rounded-lg shadow-sm disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Salvar Cadastro"}
              </button>
            </div>
          </div>
        </header>

        <form id="church-form" onSubmit={handleSubmit} className="space-y-12">
          {/* Dados da Igreja */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="font-serif text-3xl font-medium text-foreground mb-2">Dados da Igreja</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Informações institucionais e de contato direto. Estes dados serão exibidos no perfil público da paróquia.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-xl shadow-sm border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Nome da Paróquia *", field: "name" as const, placeholder: "Ex: Catedral Metropolitana de Londrina", type: "text", maxLength: 100 },
                  { label: "CNPJ", field: "cnpj" as const, placeholder: "00.000.000/0000-00", type: "text", maxLength: 18 },
                  { label: "E-mail para Contato", field: "email" as const, placeholder: "contato@paroquia.org.br", type: "email", maxLength: 100 },
                  { label: "Telefone", field: "phone" as const, placeholder: "(43) 3000-0000", type: "tel", maxLength: 20 },
                ].map(({ label, field, placeholder, type, maxLength }) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{label}</label>
                    <input
                      className="border border-border rounded px-4 py-3 text-base bg-background text-foreground"
                      placeholder={placeholder} type={type} maxLength={maxLength}
                      value={form[field]} onChange={setField(field)}
                    />
                  </div>
                ))}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">URL do Logo (SVG/PNG)</label>
                  <input
                    className="border border-border rounded px-4 py-3 text-base bg-background text-foreground"
                    placeholder="https://ecclesia.com/logos/paroquia-name.png" type="text" maxLength={500}
                    value={form.logoUrl} onChange={setField("logoUrl")}
                  />
                </div>
              </div>

              {/* Endereço */}
              <div className="border-t border-border pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">Rua *</label>
                  <input
                    className="border border-border rounded px-4 py-3 text-base bg-background text-foreground"
                    placeholder="Ex: Rua das Acácias" type="text" maxLength={200}
                    value={form.street} onChange={setField("street")}
                  />
                </div>
                {[
                  { label: "Número *", field: "number" as const, placeholder: "120", type: "number" },
                  { label: "Complemento", field: "complement" as const, placeholder: "Apto, bloco, sala...", type: "text", maxLength: 100 },
                  { label: "Bairro *", field: "neighborhood" as const, placeholder: "Ex: Jardim Califórnia", type: "text", maxLength: 100 },
                  { label: "Cidade *", field: "city" as const, placeholder: "Ex: Londrina", type: "text", maxLength: 100 },
                  { label: "CEP", field: "postalCode" as const, placeholder: "00000-000", type: "text", maxLength: 9 },
                ].map(({ label, field, placeholder, type, maxLength }) => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-muted-foreground">{label}</label>
                    <input
                      className="border border-border rounded px-4 py-3 text-base bg-background text-foreground"
                      placeholder={placeholder} type={type} maxLength={maxLength}
                      value={form[field]} onChange={setField(field)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Horários Litúrgicos */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="font-serif text-3xl font-medium text-foreground mb-2">Horários Litúrgicos</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Organize os horários de missas, confissões e adorações. Adicione múltiplas entradas conforme a necessidade semanal.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <ScheduleSection
                title="Missas" icon="auto_stories" colorClass="text-primary" borderClass="border-primary"
                entries={massas}
                onAdd={() => addEntry(setMassas)}
                onUpdate={(i, f, v) => updateEntry(setMassas, i, f, v)}
                onRemove={(i) => removeEntry(setMassas, i)}
              />
              <ScheduleSection
                title="Confissões" icon="church" colorClass="text-secondary" borderClass="border-secondary"
                entries={confissoes}
                onAdd={() => addEntry(setConfissoes)}
                onUpdate={(i, f, v) => updateEntry(setConfissoes, i, f, v)}
                onRemove={(i) => removeEntry(setConfissoes, i)}
              />
              <ScheduleSection
                title="Adorações" icon="satellite_alt" colorClass="text-muted-foreground" borderClass="border-muted-foreground"
                entries={adoracoes}
                onAdd={() => addEntry(setAdoracoes)}
                onUpdate={(i, f, v) => updateEntry(setAdoracoes, i, f, v)}
                onRemove={(i) => removeEntry(setAdoracoes, i)}
              />
            </div>
          </section>

          {/* Mobile actions */}
          <footer className="flex md:hidden gap-4 pt-8 border-t border-border mt-12">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex-1 px-4 py-3 text-xs font-bold tracking-widest uppercase border-2 border-secondary text-secondary rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 text-xs font-bold tracking-widest uppercase bg-primary text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </footer>
        </form>

        <footer className="w-full py-8 flex flex-col items-center justify-center gap-4 mt-24 border-t border-border">
          <div className="font-serif text-lg font-semibold text-primary">Ecclesia</div>
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Ecclesia Londrina. Sacred Heritage &amp; Digital Clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms of Service", "Contact Diocese", "Liturgical Calendar"].map((link) => (
              <a key={link} href="#" className="text-[11px] font-bold tracking-widest uppercase text-border hover:text-primary underline transition-all">
                {link}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default RegisterChurch;
