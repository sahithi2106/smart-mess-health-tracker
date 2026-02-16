
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface ChartProps {
  data: any[];
  type: 'line' | 'area';
  color?: string;
}

export const CrowdChart: React.FC<ChartProps> = ({ data, type, color = "#10b981" }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="density" 
              stroke={color} 
              strokeWidth={3} 
              dot={{ r: 4, fill: color }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        ) : (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Area type="monotone" dataKey="weight" stroke={color} fillOpacity={1} fill="url(#colorWeight)" strokeWidth={3} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};
