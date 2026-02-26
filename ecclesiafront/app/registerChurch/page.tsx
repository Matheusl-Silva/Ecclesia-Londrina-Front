"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


const DIAS_SEMANA = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
];

const HORARIOS: string[] = [];
for (let h = 0; h < 24; h++) {
  const hora = String(h).padStart(2, '0');
  HORARIOS.push(`${hora}:00`, `${hora}:30`);
}

interface MassEntry {
  dia: string;
  horario: string;
}

const RegisterChurch = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // controlar os estados da missa, começa sempre vazio
  const [massas, setMassas] = useState<MassEntry[]>([{ dia: "", horario: "" }]);

  return (
    <div>Register Church</div>
  );
}

export default RegisterChurch;
