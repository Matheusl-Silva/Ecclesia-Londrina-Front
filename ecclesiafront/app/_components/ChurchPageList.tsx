import ChurchCard from "@/app/_components/ChurchCard";
import { ChurchList } from "@/services/church/types";

import * as ChurtApi from "@/services/church/api";

interface HomePageProps {
  searchParams: Promise<{
    search?: string;
    neighborhood?: string;
  }>;
}

const ChurchPageList = async ({ searchParams }: HomePageProps) => {
  const { search, neighborhood } = await searchParams;

  const apiParams: Record<string, string | undefined> = {
    name: search,
    neighborhood: neighborhood === 'all' ? undefined : neighborhood
  };

  const response = await ChurtApi.searchChurches(apiParams).catch(() => null)
  const churches: ChurchList | null = response ? await response.json() : null;

  return (
    <main className="max-w-[1200px] mx-auto px-4 pb-20 -mt-16 relative z-20 flex-1 w-full">
      <div className="mb-8 text-center sm:text-left pt-2">
        <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-1">Londrina - PR</p>
        <h2 className="text-primary font-serif text-4xl sm:text-5xl font-medium">Paróquias</h2>
      </div>

      {!churches ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border/40 shadow-sm mt-6">
          <p className="text-muted-foreground text-lg">Erro ao carregar igrejas.</p>
        </div>
      ) : !churches.length ? (
        <div className="text-center py-16 bg-card rounded-xl border border-border/40 shadow-sm mt-6">
          <p className="text-muted-foreground text-lg">Nenhuma igreja encontrada para sua busca.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {churches.map((church, i) => (
            <ChurchCard key={i} church={church} index={i} />
          ))}
        </div>
      )}
    </main>
  );
};

export default ChurchPageList;