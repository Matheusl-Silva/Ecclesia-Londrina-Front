import { X, MapPin, Clock, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Church } from "@/data/churches";

interface ChurchDetailModalProps {
  church: Church;
  onClose: () => void;
}

const ScheduleSection = ({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: { dia: string; horarios: string[] }[];
}) => (
  <div className="mb-6 last:mb-0">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-md bg-blue-light flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h3 className="font-serif text-base font-bold text-foreground">{title}</h3>
    </div>
    <div className="space-y-2 pl-10">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-sm font-medium text-foreground min-w-[160px]">
            {item.dia}
          </span>
          <span className="text-sm text-muted-foreground">
            {item.horarios.join(" · ")}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ChurchDetailModal = ({ church, onClose }: ChurchDetailModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        style={{ animationDuration: "200ms" }}
      />
      {/* Modal */}
      <div
        className="relative bg-card w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in"
        style={{ animationDuration: "300ms" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-5 sm:rounded-t-xl rounded-t-2xl z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="font-serif text-xl font-bold pr-8 leading-snug">
            {church.nome}
          </h2>
          <div className="flex items-center gap-1.5 mt-2 opacity-90 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{church.endereco}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <ScheduleSection
            title="Horários de Missa"
            icon={BookOpen}
            items={church.missas}
          />
          <ScheduleSection
            title="Horários de Confissão"
            icon={Heart}
            items={church.confissoes}
          />
          {church.adoracao && church.adoracao.length > 0 && (
            <ScheduleSection
              title="Horários de Adoração"
              icon={Clock}
              items={church.adoracao}
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-5 pt-0">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full h-11 text-base"
          >
            Voltar para lista
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChurchDetailModal;
