import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto py-6 md:py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <img src={logo.src} alt="Ecclesia Londrina" className="h-10 w-10 md:h-14 md:w-14 rounded-full" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Ecclesia Londrina
          </h1>
        </div>
        <p className="text-sm md:text-base opacity-90 max-w-lg mx-auto leading-relaxed">
          Horários de missas, confissões e adorações das igrejas católicas de Londrina
        </p>
      </div>
    </header>
  );
};

export default Header;