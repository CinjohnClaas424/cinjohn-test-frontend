import React from "react";
import clsx from "clsx";

export default function Table({
  columns,
  rows,
  highlightTotalsRow,
  noDataMessage,
}: {
  columns?: {
    name: string;
  }[];
  rows: React.ReactNode[][];
  highlightTotalsRow?: boolean;
  noDataMessage?: string;
  loading?: boolean;
}) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-black text-white">
          {columns?.map((c, i) => (
            <th
              key={i}
              className={clsx(
                "py-3",
                i >= 5 ? "hideCols-med " : "",
                i >= 3 ? "hideCols-sm " : ""
              )}
            >
              {c.name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="">
        {rows?.length > 0 ? (
          rows?.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={clsx(
                    "p-0",
                    ci >= 5 ? "hideCols-med " : "",
                    ci >= 3 ? "hideCols-sm " : ""
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            {
              <td className="pt-2 p-0 w-full" colSpan={columns?.length}>
                <div
                  className={clsx(
                    "bg-background px-3 py-2 text-body-text rounded-l-lg rounded-r-lg w-full text-center"
                  )}
                >
                  {noDataMessage}
                </div>
              </td>
            }
          </tr>
        )}
      </tbody>
    </table>
  );
}
