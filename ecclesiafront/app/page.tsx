"use client"

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ChurchCard from "@/components/ChurchCard";
import ChurchDetailModal from "@/components/ChurchDetailModal";
import { churches, type Church } from "@/data/churches";

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
    <div className="min-h-screen bg-background">
      <Header />
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        bairro={bairro}
        onBairroChange={setBairro}
      />

      <main className="container mx-auto pb-12">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Nenhuma igreja encontrada para sua busca.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Gold accent divider */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gold/40" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">
            Ecclesia Londrina
          </span>
          <div className="h-px w-12 bg-gold/40" />
        </div>
      </main>

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
