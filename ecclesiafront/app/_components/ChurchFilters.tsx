'use client';

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from '@nathanmgalante/n-js-utils';
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

interface ChurchFilterProps {
  neighborhoodList: string[];
}

const ChurchFilters = ({ neighborhoodList }: ChurchFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || "");

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleSearchChange = (value: string) => {
    console.log('handleSearchChange: ', value)
    setSearchValue(value);
    debounce('church-search', () => updateUrl('search', value), 600);
  };

  return (
    <div className={`container py-6 ${isPending ? 'opacity-70' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome da igreja..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-11 h-12 text-base bg-card text-foreground"
          />
        </div>

        <Select
          value={searchParams.get('neighborhood') || "all"}
          onValueChange={(val) => updateUrl('neighborhood', val)}
        >
          <SelectTrigger className="h-12 w-full sm:w-52 bg-card text-base text-foreground">
            <SelectValue placeholder="Todos os bairros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os bairros</SelectItem>
            {neighborhoodList.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ChurchFilters;