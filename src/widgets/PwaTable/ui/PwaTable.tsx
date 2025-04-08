import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/16/solid";
import { FC, useCallback, useEffect, useState } from "react";
import { Title } from "src/shared/ui/title";
import copy_icon from "src/shared/assets/icons/copy_icon.png";
import link_icon from "src/shared/assets/icons/link_icon.png";
import play_icon from "src/shared/assets/icons/play_icon.png";
import pause_icon from "src/shared/assets/icons/pause_icon.png";
import options_icon from "src/shared/assets/icons/options_icon.png";
import trash from "src/shared/assets/icons/trash_icon_orange.png";
import pencil from "src/shared/assets/icons/pencil.png";
import { columns } from "../lib";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { getAllPwa } from "src/features/appData/appDataAPI";
import { format } from "date-fns";
import { deletePwa } from "src/features/appData/appDataAPI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/shared/lib/store";
import { setAppId } from "src/entities/pwa_create";
import clsx from "clsx";

export const PwaTable: FC = () => {
  const [pwas, setPwas] = useState(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const formatTableData = useCallback((data) => {
    return data.map((obj) => ({
      _id: obj._id,
      id: obj.displayId,
      marketerTag: obj.marketerTag,
      name: obj.appTitle,
      defaultNaming: "Rqd - NL OLZ learning",
      domain: "bestplinkonl.play-plinki.com",
      tag: "OLZ",
      created: format(obj.createdAt, "dd.MM.yyyy | hh:mm"),
    }));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPwa();
      const formattedData = formatTableData(data);
      setPwas(formattedData);
    };

    fetchData();
  }, [formatTableData]);

  const table = useReactTable({
    data: pwas || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  const onCopyHandler = (value: string) => navigator.clipboard.writeText(value);

  const deletePwaHandler = async (row) => {
    await deletePwa(row.getValue("id"));
    setPwas((prev) => prev.filter((item) => item.id !== row.getValue("id")));
  };

  const onUpdateHandler = (value: string) => {
    dispatch(setAppId(value));
    navigate(`/pwa_edit/${value}/design`);
  };

  return (
    <>
      <div className="container__view-1 flex-col min-h-[794px] mt-[26px]">
        <Title
          title="PWAs"
          withContainer={false}
          classes="title__view-2 ml-[24px]"
        />
        {table && (
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
              {table.getRowModel().rows.map((row) => {
                return (
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
                              <button
                                onClick={() => onCopyHandler(cell.getValue())}
                              >
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
                                {/* <button onClick={() => onCopyHandler(row.id)}>
                                  <img
                                    src={pause_icon}
                                    style={{ height: "16px", width: "16px" }}
                                  />
                                </button> */}
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
                                      <button
                                        onClick={() =>
                                          onUpdateHandler(row.original._id)
                                        }
                                        className="group flex w-full items-center gap-2 rounded-lg text__default text-view-7 mb-4"
                                      >
                                        <img
                                          src={pencil}
                                          style={{
                                            height: "14px",
                                            width: "14px",
                                          }}
                                        />
                                        Редактировать
                                      </button>
                                    </MenuItem>
                                    <div className="my-1 h-px bg-white/5" />
                                    <MenuItem>
                                      <button
                                        onClick={() => deletePwaHandler(row)}
                                        className="group flex w-full items-center gap-2 rounded-lg text__default text-view-7"
                                      >
                                        <img
                                          src={trash}
                                          style={{
                                            height: "16px",
                                            width: "14px",
                                          }}
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
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-6.5 flex justify-center items-center">
        <button
          className={clsx(
            "flex items-center text-view-11 p-2",
            !table.getCanPreviousPage() ? "text-[#717171]" : "text-[#FF5532]"
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon
            className={clsx(
              "size-6",
              !table.getCanPreviousPage() ? "text-[#717171]" : "text-[#FF5532]"
            )}
          />
          Предыдущая
        </button>
        {(() => {
          const pageCount = table.getPageCount();
          const currentPage = table.getState().pagination.pageIndex;
          const visiblePages = [];

          visiblePages.push(1);

          const rangeStart = Math.max(2, currentPage - 1);
          const rangeEnd = Math.min(pageCount - 1, currentPage + 3);

          if (rangeStart > 2) visiblePages.push("...");
          for (let i = rangeStart; i <= rangeEnd; i++) {
            visiblePages.push(i);
          }
          if (rangeEnd < pageCount - 1) visiblePages.push("...");

          if (pageCount > 1) visiblePages.push(pageCount);

          return (
            <div className="flex items-center gap-1">
              {visiblePages.map((page, index) =>
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded-md ${
                      currentPage + 1 === page ? "bg-[#FF9079] text-white" : ""
                    }`}
                    onClick={() => table.setPageIndex(page - 1)}
                    disabled={currentPage + 1 === page}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          );
        })()}
        <button
          className={clsx(
            "flex items-center text-view-11 p-2",
            !table.getCanNextPage() ? "text-[#717171]" : "text-[#FF5532]"
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Следующая
          <ChevronRightIcon
            className={clsx(
              "size-6",
              !table.getCanNextPage() ? "text-[#717171]" : "text-[#FF5532]"
            )}
          />
        </button>
      </div>
    </>
  );
};
