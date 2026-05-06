import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Church as ChurchType } from "@/app/page.models";

interface ChurchCardProps {
  church: ChurchType;
  onSelect: (church: ChurchType) => void;
  index: number;
}

const ChurchCard = ({ church, onSelect, index }: ChurchCardProps) => {
  return (
    <Card
      className="group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 animate-fade-in border-border/60 overflow-hidden flex flex-col bg-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
        {/* Placeholder image that looks like a church */}
        <img 
          src="https://images.unsplash.com/photo-1548625361-ec853713009a?q=80&w=600&auto=format&fit=crop" 
          alt={church.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardContent className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="mb-auto text-center sm:text-left">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Catedral</p>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-primary leading-snug mb-3">
            {church.name}
          </h3>
          <div className="flex items-start sm:items-center justify-center sm:justify-start gap-1.5 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 sm:mt-0" />
            <span className="text-left">{church.street}</span>
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-border/40">
          <Button
            onClick={() => onSelect(church)}
            variant="outline"
            className="w-full h-11 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-colors uppercase tracking-widest text-xs font-bold"
          >
            Ver horários
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurchCard;