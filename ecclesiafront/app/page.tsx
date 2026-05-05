"use client"

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ChurchCard from "@/components/ChurchCard";
import ChurchDetailModal from "@/components/ChurchDetailModal";
import { churches, type Church } from "@/data/churches";
import logo from "@/assets/logo.png";

const Index = () => {
  const [search, setSearch] = useState("");
  const [bairro, setBairro] = useState("todos");
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return churches.filter((c) => {
      const matchesBairro = bairro === "todos" || c.bairro === bairro;
      const matchesSearch =
        !term ||
        c.nome.toLowerCase().includes(term) ||
        c.bairro.toLowerCase().includes(term);
      return matchesBairro && matchesSearch;
    });
  }, [search, bairro]);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />

      {/* Hero Background */}
      <section className="bg-primary text-primary-foreground pt-10 pb-28 px-4 relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1548625361-ec853713009a?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 mt-2">
          <SearchBar
            search={search}
            onSearchChange={setSearch}
            bairro={bairro}
            onBairroChange={setBairro}
          />
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-4 pb-20 -mt-16 relative z-20 flex-1 w-full">
        <div className="mb-8 text-center sm:text-left pt-2">
          <p className="text-secondary font-bold text-xs tracking-[0.2em] uppercase mb-1">Londrina - PR</p>
          <h2 className="text-primary font-serif text-4xl sm:text-5xl font-medium">Paróquias</h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border/40 shadow-sm mt-6">
            <p className="text-muted-foreground text-lg">
              Nenhuma igreja encontrada para sua busca.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((church, i) => (
              <ChurchCard
                key={church.id}
                church={church}
                onSelect={setSelectedChurch}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-accent py-12 px-4 mt-auto border-t border-primary/5">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={logo.src} alt="Ecclesia" className="h-8 w-8 opacity-70 mix-blend-multiply" />
            <span className="font-serif font-bold text-primary text-xl tracking-tight">Ecclesia Londrina</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-foreground/70 mb-8 tracking-widest uppercase">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Diocese</a>
            <a href="#" className="hover:text-primary transition-colors">Liturgical Calendar</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Ecclesia Londrina. Sacred Heritage & Digital Clarity.</p>
        </div>
      </footer>

      {selectedChurch && (
        <ChurchDetailModal
          church={selectedChurch}
          onClose={() => setSelectedChurch(null)}
        />
      )}
    </div>
  );
};

export default Index;
