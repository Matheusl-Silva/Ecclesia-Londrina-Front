import logo from "@/assets/logo.png";

const Footer = () => {
  return (
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
        <p className="text-xs text-muted-foreground">© 2026 Ecclesia Londrina. Sacred Heritage & Digital Clarity.</p>
      </div>
    </footer>
  );
};

export default Footer;
