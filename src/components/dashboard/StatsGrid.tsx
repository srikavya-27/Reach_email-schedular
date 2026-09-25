import { TrendingUp, TrendingDown } from 'lucide-react';
import type { StatCard } from '@/types';
import { Skeleton } from '@/components/Skeleton';

interface StatsGridProps {
  stats: StatCard[];
  loading: boolean;
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass p-5">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-3 h-8 w-24" />
              <Skeleton className="mt-3 h-3 w-16" />
            </div>
          ))
        : stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass glass-hover p-5 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white">{stat.value}</p>
              <div className="mt-2 flex items-center gap-1.5">
                {stat.trendUp ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
                )}
                <span className={`text-xs font-medium ${stat.trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {stat.trendUp ? '+' : '-'}{stat.trend}%
                </span>
                <span className="text-xs text-slate-600">vs last week</span>
              </div>
            </div>
          ))}
    </div>
  );
}
