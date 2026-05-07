"use client";

import { Button } from "@/components/ui/button";
import type { Church } from "@/services/church/types";
import { debounce } from "@nathanmgalante/n-js-utils";
import { Globe, Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import ScheduleTable from "@/components/ScheduleTable";
import * as ScheduleApi from "@/services/schedule/api";
import { ScheduleList } from "@/services/schedule/types";

interface ChurchDetailModalProps {
  church: Church;
  onClose: () => void;
}


const massCache: Record<number, ScheduleList> = {};
const confessionCache: Record<number, ScheduleList> = {};
const adorationCache: Record<number, ScheduleList> = {};

const ChurchDetailModal = ({ church, onClose }: ChurchDetailModalProps) => {
  const [massList, setMassList] = useState<ScheduleList>([]);
  const [confessionList, setConfessionList] = useState<ScheduleList>([]);
  const [adorationList, setAdorationList] = useState<ScheduleList>([]);
  const [isMassLoading, setIsMassLoading] = useState(false);
  const [isConfessionLoading, setIsConfessionLoading] = useState(false);
  const [isAdorationLoading, setIsAdorationLoading] = useState(false);

  useEffect(() => {
    debounce(`loadChurchDetails-${church.id}`, async () => {
      const loadMass = async () => {
        setIsMassLoading(true);
        try {
          if (massCache[church.id]) {
            setMassList(massCache[church.id]);
            return;
          }
          const response = await ScheduleApi.getMassByChurchId(church.id);
          const data = await response.json();
          massCache[church.id] = data
          setMassList(data);
        } catch (error) {
          setMassList([]);
        } finally {
          setIsMassLoading(false);
        }
      }

      const loadConfession = async () => {
        setIsConfessionLoading(true);
        try {
          if (confessionCache[church.id]) {
            setConfessionList(confessionCache[church.id]);
            return;
          }
          const response = await ScheduleApi.getConfessionByChurchId(church.id);
          const data = await response.json();
          confessionCache[church.id] = data
          setConfessionList(data);
        } catch (error) {
          setConfessionList([]);
        } finally {
          setIsConfessionLoading(false);
        }
      }

      const loadAdoration = async () => {
        setIsAdorationLoading(true);
        try {
          if (adorationCache[church.id]) {
            setAdorationList(adorationCache[church.id]);
            return;
          }
          const response = await ScheduleApi.getAdorationByChurchId(church.id);
          const data = await response.json();
          adorationCache[church.id] = data
          setAdorationList(data);
        } catch (error) {
          setAdorationList([]);
        } finally {
          setIsAdorationLoading(false);
        }
      }

      await Promise.all([loadMass(), loadConfession(), loadAdoration()]);
    }, 0)
  }, [church.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
      <div
        className="absolute inset-0 bg-primary/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        style={{ animationDuration: "200ms" }}
      />
      <div
        className="relative bg-background w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl animate-fade-in flex flex-col max-h-[95vh] sm:max-h-[90vh]"
        style={{ animationDuration: "300ms" }}
      >
        <div className="relative h-48 sm:h-56 flex-shrink-0 bg-primary/80 overflow-hidden">
          <img
            src={church.logoUrl}
            alt={church.name}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-md text-white transition-colors z-20 backdrop-blur-sm"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-10 bg-gradient-to-t from-primary/10 via-primary/8 to-transparent">
            <span className="text-secondary font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-1">{church.neighborhood}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
              {church.name}
            </h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f8f9ff]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <ScheduleTable title="Missas" items={massList} isLoading={isMassLoading} />
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <ScheduleTable title="Confissões" items={confessionList} isLoading={isConfessionLoading} />
                </div>
                <div>
                  <ScheduleTable title="Adoração" items={adorationList} isLoading={isAdorationLoading} />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Contato & Localização</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 text-sm">
                    <Phone className="h-4 w-4 text-secondary mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-0.5">Telefone</p>
                      <p className="font-medium text-foreground truncate">{church.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Mail className="h-4 w-4 text-secondary mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-0.5">E-mail</p>
                      <p className="font-medium text-foreground truncate">{church.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Globe className="h-4 w-4 text-secondary mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-0.5">Site</p>
                      <p className="font-medium text-primary truncate">{church.name.toLowerCase().replace(/\s+/g, '')}.com.br</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary text-white hover:bg-primary/90 font-bold tracking-wider text-xs h-11">
                  <MapPin className="h-3.5 w-3.5 mr-2" /> COMO CHEGAR
                </Button>
              </div>

              <div className="bg-[#e6eeff] rounded-xl p-5 border border-primary/10">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest leading-snug">Calendário<br />Litúrgico</h4>
                  <span className="text-[10px] font-bold text-secondary uppercase leading-snug text-right">Agosto<br />2024</span>
                </div>
                <div className="bg-card rounded-lg p-3 shadow-sm">
                  <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-muted-foreground mb-1 text-center">
                    <div>D</div><div>S</div><div>T</div><div>Q</div><div>Q</div><div>S</div><div>S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[11px]">
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div key={i} className={`h-6 w-full flex items-center justify-center rounded-sm border ${i === 4 ? 'bg-secondary text-white font-bold border-secondary' : 'text-foreground border-transparent hover:bg-muted/50 cursor-default'}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground italic mt-3 text-center leading-tight">Solenidade da Transfiguração do Senhor em 06/08.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChurchDetailModal;
