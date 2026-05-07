'use client'

import { MassList } from "@/services/mass/types";

const convertNumberToWeekDay = (day: number) => {
    const date = new Date(2024, 0, day + 7);
    return date.toLocaleDateString('pt-BR', { weekday: 'long' });
}

const ScheduleTable = ({ title, items }: { title: string; items: MassList }) => {
    const week: Record<number, string[]> = {};
    items.forEach(({ day_of_week, time }) => {
        week[day_of_week] ??= [];
        week[day_of_week].push(time);
    });

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
                        {Object.entries(week).map(([weekDay, times], i) => (
                            <tr key={i} className="hover:bg-muted/30 transition-colors">
                                <td className="px-4 py-3 font-medium text-foreground w-1/2">{convertNumberToWeekDay(Number(weekDay))}</td>
                                <td className="px-4 py-3 text-primary font-semibold w-1/2">
                                    {times.join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleTable;
