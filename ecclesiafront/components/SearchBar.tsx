import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bairros } from "../data/churches";

interface SearchBarProps {

  search: string;
  onSearchChange: (value: string) => void;
  bairro: string;
  onBairroChange: (value: string) => void;
}

const SearchBar = ({ search, onSearchChange, bairro, onBairroChange }: SearchBarProps) => {
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome da igreja ou bairro..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-11 h-12 text-base bg-card"
          />
        </div>
        <Select value={bairro} onValueChange={onBairroChange}>
          <SelectTrigger className="h-12 w-full sm:w-52 bg-card text-base">
            <SelectValue placeholder="Todos os bairros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os bairros</SelectItem>
            {bairros.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default SearchBar;