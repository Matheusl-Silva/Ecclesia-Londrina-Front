const Footer = () => {
  return (
    <footer className="bg-zinc-100 text-zinc-600 py-8 mt-auto border-t border-zinc-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium">
          &copy; {new Date().getFullYear()} Ecclesia Londrina. Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Unindo a comunidade católica de Londrina
        </p>
      </div>
    </footer>
  );
};

export default Footer;
