import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card text-foreground shadow-sm relative z-40">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo.src} alt="Ecclesia" className="h-8 w-8 rounded-full" />
          <h1 className="text-2xl font-bold font-serif text-primary">
            Ecclesia
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">Home</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Churches</a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Admin</a>
        </nav>

        <div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 font-semibold">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;