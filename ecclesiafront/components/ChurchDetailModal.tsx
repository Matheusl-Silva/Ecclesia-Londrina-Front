import { X, MapPin, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Church } from "@/data/churches";

interface ChurchDetailModalProps {
  church: Church;
  onClose: () => void;
}

const ScheduleTable = ({ title, items }: { title: string; items: { dia: string; horarios: string[] }[] }) => (
  <div className="mb-6">
    <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-widest mb-3">
      {/* Fake icon for illustration based on design */}
      <span className="text-secondary text-lg">♱</span> {title}
    </h3>
    <div className="rounded-lg border border-border/60 overflow-hidden bg-accent/30">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-wider border-b border-border/60">
          <tr>
            <th className="px-4 py-2 text-left font-bold">Dia</th>
            <th className="px-4 py-2 text-left font-bold">Horário</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60 bg-card">
          {items.map((item, i) => (
            <tr key={i} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-medium text-foreground w-1/2">{item.dia}</td>
              <td className="px-4 py-3 text-primary font-semibold w-1/2">
                {item.horarios.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ChurchDetailModal = ({ church, onClose }: ChurchDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-primary/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        style={{ animationDuration: "200ms" }}
      />
      {/* Modal Container */}
      <div
        className="relative bg-background w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl animate-fade-in flex flex-col max-h-[95vh] sm:max-h-[90vh]"
        style={{ animationDuration: "300ms" }}
      >
        {/* Header (Hero Image) */}
        <div className="relative h-48 sm:h-56 flex-shrink-0 bg-primary overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1548625361-ec853713009a?q=80&w=1200&auto=format&fit=crop" 
            alt={church.nome}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-md text-white transition-colors z-20 backdrop-blur-sm"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-10 bg-gradient-to-t from-primary via-primary/80 to-transparent">
            <span className="text-secondary font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1">Catedral Metropolitana</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
              {church.nome}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f8f9ff]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column: Schedules */}
            <div className="lg:col-span-2">
              <ScheduleTable title="Missas" items={church.missas} />
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <ScheduleTable title="Confissões" items={church.confissoes} />
                </div>
                {church.adoracao && church.adoracao.length > 0 && (
                  <div>
                    <ScheduleTable title="Adoração" items={church.adoracao} />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Contato & Localização</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 text-sm">
                    <Phone className="h-4 w-4 text-secondary mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-0.5">Telefone</p>
                      <p className="font-medium text-foreground">(43) 3324-5131</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Mail className="h-4 w-4 text-secondary mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-0.5">E-mail</p>
                      <p className="font-medium text-foreground">contato@catedral.org</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Globe className="h-4 w-4 text-secondary mt-0.5" />
                    <div>
                      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-0.5">Site</p>
                      <p className="font-medium text-primary">catedraldelondrina.org.br</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold tracking-wider text-xs h-11">
                  <MapPin className="h-3.5 w-3.5 mr-2" /> COMO CHEGAR
                </Button>
              </div>

              {/* Liturgical Calendar Placeholder */}
              <div className="bg-[#e6eeff] rounded-xl p-5 border border-primary/10">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest leading-snug">Calendário<br/>Litúrgico</h4>
                  <span className="text-[10px] font-bold text-secondary uppercase leading-snug text-right">Agosto<br/>2024</span>
                </div>
                {/* Fake Calendar Grid */}
                <div className="bg-card rounded-lg p-3 shadow-sm">
                  <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-muted-foreground mb-1 text-center">
                    <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[11px]">
                    {/* Placeholder days */}
                    {Array.from({length: 31}).map((_, i) => (
                      <div key={i} className={`h-6 w-full flex items-center justify-center rounded-sm border ${i === 4 ? 'bg-secondary text-white font-bold border-secondary' : 'text-foreground border-transparent hover:bg-muted/50 cursor-default'}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground italic mt-3 text-center leading-tight">Solenidade da Transfiguração do Senhor em 06/08.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChurchDetailModal;
