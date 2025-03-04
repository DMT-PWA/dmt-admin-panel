import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC } from "react";
import { Title } from "src/shared/ui/title";

import { data, columns } from "../lib";

export const PwaTable: FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container__view-1 flex-col min-h-[794px] mt-[26px]">
      <Title
        title="PWAs"
        withContainer={false}
        classes="title__view-2 ml-[24px]"
      />

      {/* <table>
        <thead className="bg-white">
          <tr className="h-[53px]">
            <th className="pl-6">ID</th>
            <th>Название</th>
            <th>Домен</th>
            <th>Тег</th>
            <th>Создано</th>
            <th>Нейминг по умолчанию</th>
            <th>
              <button>
                <img
                  src="src/shared/assets/icons/refresh.png"
                  alt="refresh"
                  width={20}
                  height={20}
                />
              </button>
              <button>
                <img
                  src="src/shared/assets/icons/switch_vertical.png"
                  alt="refresh"
                  width={20}
                  height={20}
                />
              </button>
              <button>
                <img
                  src="src/shared/assets/icons/cog.png"
                  alt="refresh"
                  width={20}
                  height={20}
                />
              </button>
            </th>
          </tr>
        </thead>
      </table> */}
      <table>
        <thead className="bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-[53px]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="pl-6 text-left text-sm font-medium text-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm text-gray-700 border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
