'use client'

import { ScheduleList } from "@/services/schedule/types";
import { convertNumberToWeekDay } from "@/lib/dateUtils";

interface ScheduleTableProps {
    title: string;
    items: ScheduleList;
    isLoading?: boolean;
}

const ScheduleTable = ({ title, items, isLoading = false }: ScheduleTableProps) => {
    const week: Record<number, string[]> = {};
    if (items && items.length > 0) {
        items.forEach(({ dayOfWeek, startsAt }) => {
            week[dayOfWeek] ??= [];
            week[dayOfWeek].push(startsAt);
        });
    }

    return (
        <div className="mb-6">
            <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-widest mb-3">
                {/* Fake icon for illustration based on design */}
                <span className="text-secondary text-lg">♱</span> {title}
            </h3>
            <div className="rounded-lg border border-border/60 overflow-hidden bg-accent/30">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-wider border-b border-border/60">
                        <tr>
                            <th className="px-4 py-2 text-left font-bold">Dia</th>
                            <th className="px-4 py-2 text-left font-bold">Horário</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 bg-card">
                        {isLoading ? (
                            <tr>
                                <td colSpan={2} className="px-4 py-3 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                                        <p className="text-sm text-muted-foreground">Carregando horários...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : !items || items.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="px-4 py-3 text-center">
                                    <p className="text-sm text-muted-foreground">Nenhum horário cadastrado</p>
                                </td>
                            </tr>
                        ) : (
                            Object.entries(week).map(([weekDay, times], i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium text-foreground w-1/2">{convertNumberToWeekDay(Number(weekDay))}</td>
                                    <td className="px-4 py-3 text-primary font-semibold w-1/2">{times.join(", ")}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleTable;
