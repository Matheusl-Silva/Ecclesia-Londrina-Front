import { Church, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Church as ChurchType } from "@/data/churches";


interface ChurchCardProps {
  church: ChurchType;
  onSelect: (church: ChurchType) => void;
  index: number;
}


const ChurchCard = ({ church, onSelect, index }: ChurchCardProps) => {
  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 animate-fade-in border-border/60"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <CardContent className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-blue-light flex items-center justify-center">
            <Church className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-lg font-bold text-foreground leading-snug mb-1">
              {church.nome}
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-1">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="font-medium text-primary/80">{church.bairro}</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{church.endereco}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => onSelect(church)}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Ver horários
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurchCard;