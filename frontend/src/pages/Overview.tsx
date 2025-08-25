import React from "react";

const metrics = [
  { label: "Number of Calls", value: 0, percent: "0.0%" },
  { label: "Avg Duration", value: "0:00", percent: "0.0%" },
  { label: "Total Cost", value: "0 credits", percent: "0.0%" },
  { label: "Avg Cost", value: "0 cr/call", percent: "0.0%" },
];

const Overview = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome Clivicy</h1>
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div key={m.label} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 flex flex-col items-center shadow border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
              <div className="text-2xl font-bold mb-2">{m.value}</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{m.label}</div>
              <div className="text-xs text-violet-600 dark:text-violet-400">{m.percent}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-8 flex flex-col items-center border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
        <div className="text-lg font-semibold mb-2">Call Success</div>
        <div className="flex flex-col items-center justify-center h-40">
          <div className="text-4xl mb-2">📞</div>
          <div className="text-zinc-500 dark:text-zinc-400 font-medium">Oops...</div>
          <div className="text-zinc-400 dark:text-zinc-500 text-sm">You don't have any calls yet</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
