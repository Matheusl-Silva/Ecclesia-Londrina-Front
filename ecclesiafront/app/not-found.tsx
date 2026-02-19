"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 text-center">
      <div className="space-y-6">
        <div className="text-9xl mb-8 select-none animate-bounce" role="img" aria-label="Rosto confuso">
          😕
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-2 text-lg text-zinc-600 max-w-md mx-auto">
          Desculpe, não conseguimos encontrar a página que você está procurando. Talvez ela tenha sido movida ou excluída.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
