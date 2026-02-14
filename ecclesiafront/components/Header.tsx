import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container py-8 md:py-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <img src={logo.src} alt="Ecclesia Londrina" className="h-14 w-14 md:h-18 md:w-18 rounded-full" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ecclesia Londrina
          </h1>
        </div>
        <p className="text-base md:text-lg opacity-90 max-w-xl mx-auto leading-relaxed">
          Horários de missas, confissões e adorações das igrejas católicas de Londrina
        </p>
      </div>
    </header>
  );
};

export default Header;