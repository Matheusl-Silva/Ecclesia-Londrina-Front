// Remova o "use server" do topo, pois por padrão no diretório app os arquivos são Server Components.
// Se você mantiver, ele pode ser interpretado como uma Server Action.

import ChurchCard from "@/app/_components/ChurchCard";
import ChurchFilters from "@/app/_components/ChurchFilters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import * as ChurtApi from "@/services/church/api";
import { type ChurchList } from "@/services/church/types";

interface HomePageProps {
  // searchParams agora é uma Promise de um objeto
  searchParams: Promise<{
    search?: string;
    neighborhood?: string;
  }>;
}

const Index = async ({ searchParams }: HomePageProps) => {
  // É obrigatório dar await antes de acessar as propriedades
  const filters = await searchParams;

  const search = filters.search;
  const neighborhood = filters.neighborhood;

  // Agora você segue com a lógica normal...
  const apiParams = {
    name: search,
    neighborhood: neighborhood === 'all' ? undefined : neighborhood
  };

  let churches: ChurchList | null = null;
  let neighborhoods: string[] = [];

  const loadChurches = async () => {
    try {
      const response = await ChurtApi.searchChurches(apiParams);
      churches = await response.json() as ChurchList;
    } catch (error) {
      churches = null;
    }
  };

  const loadNeighborhoods = async () => {
    try {
      const response = await ChurtApi.getAllNeighborhoods();
      neighborhoods = await response.json() as string[];
    } catch (error) {
      neighborhoods = [];
    }
  };

  // 2. Chamadas de API em paralelo
  // Usamos Promise.all para performance, disparando ambas ao mesmo tempo
  await Promise.all([loadChurches(), loadNeighborhoods()]);

  // 3. Extração dos dados
  // Tratamos o erro caso a resposta seja nula ou o .json() falhe

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />

      <section className="bg-primary text-primary-foreground pt-10 pb-28 px-4 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1548625361-ec853713009a?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 mt-2">
          <ChurchFilters neighborhoodList={neighborhoods} />
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-4 pb-20 -mt-16 relative z-20 flex-1 w-full">
        <div className="mb-8 text-center sm:text-left pt-2">
          <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-1">Londrina - PR</p>
          <h2 className="text-primary font-serif text-4xl sm:text-5xl font-medium">Paróquias</h2>
        </div>

        {!churches ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border/40 shadow-sm mt-6">
            <p className="text-muted-foreground text-lg">Erro ao carregar igrejas.</p>
          </div>
        ) : !(churches as ChurchList).length ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border/40 shadow-sm mt-6">
            <p className="text-muted-foreground text-lg">Nenhuma igreja encontrada.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(churches as ChurchList).map((church, i) => (
              <ChurchCard key={i} church={church} index={i} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;