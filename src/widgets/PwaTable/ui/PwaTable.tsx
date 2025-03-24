import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC } from "react";
import { Title } from "src/shared/ui/title";
import copy_icon from "src/shared/assets/icons/copy_icon.png";
import link_icon from "src/shared/assets/icons/link_icon.png";
import play_icon from "src/shared/assets/icons/play_icon.png";
import pause_icon from "src/shared/assets/icons/pause_icon.png";
import options_icon from "src/shared/assets/icons/options_icon.png";
import trash from "src/shared/assets/icons/trash_icon_orange.png";
import pencil from "src/shared/assets/icons/pencil.png";
import { data, columns } from "../lib";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const PwaTable: FC = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onCopyHandler = (value: string) => navigator.clipboard.writeText(value);

  return (
    <div className="container__view-1 flex-col min-h-[794px] mt-[26px]">
      <Title
        title="PWAs"
        withContainer={false}
        classes="title__view-2 ml-[24px]"
      />
      <table>
        <thead className="bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-[53px]">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="pl-6 text-left text-sm font-medium text-gray-700 border-b border-b-gray-7"
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
            <tr key={row.id} className="bg-white">
              {row.getVisibleCells().map((cell) => {
                const isIdOrTag = ["id", "tag"].includes(cell.column.id);

                return (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-view-1 text-black-1 border-b border-b-gray-7"
                  >
                    <div className="flex gap-1.25 items-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {isIdOrTag && (
                        <button onClick={() => onCopyHandler(cell.getValue())}>
                          <img
                            src={copy_icon}
                            style={{ height: "12px", width: "12px" }}
                          />
                        </button>
                      )}
                      {cell.column.id === "domain" && (
                        <button onClick={() => onCopyHandler(row.id)}>
                          <img
                            src={link_icon}
                            style={{ height: "12px", width: "12px" }}
                          />
                        </button>
                      )}

                      {cell.column.id === "actions" && (
                        <div className="min-w-23 flex justify-around">
                          <button onClick={() => onCopyHandler(row.id)}>
                            <img
                              src={play_icon}
                              style={{ height: "16px", width: "16px" }}
                            />
                          </button>
                          <button onClick={() => onCopyHandler(row.id)}>
                            <img
                              src={pause_icon}
                              style={{ height: "16px", width: "16px" }}
                            />
                          </button>
                          <Menu>
                            <MenuButton>
                              <img
                                src={options_icon}
                                style={{ height: "4px", width: "16px" }}
                              />
                            </MenuButton>
                            <MenuItems
                              transition
                              anchor="bottom end"
                              className="origin-top-right rounded-xl border border-none bg-white pb-3.25 pt-2.25 pl-4.5 pr-5  transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                            >
                              <MenuItem>
                                <button className="group flex w-full items-center gap-2 rounded-lg text__default text-view-7 mb-4">
                                  <img
                                    src={pencil}
                                    style={{ height: "14px", width: "14px" }}
                                  />
                                  Редактировать
                                </button>
                              </MenuItem>
                              <div className="my-1 h-px bg-white/5" />
                              <MenuItem>
                                <button className="group flex w-full items-center gap-2 rounded-lg text__default text-view-7">
                                  <img
                                    src={trash}
                                    style={{ height: "16px", width: "14px" }}
                                  />
                                  Удалить
                                </button>
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
