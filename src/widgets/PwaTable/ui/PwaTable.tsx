import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { FC, useCallback, useEffect, useState } from "react";
import { Title } from "src/shared/ui/title";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/shared/lib/store";
import { setAppId, createRenderService } from "src/entities/pwa_create";
import clsx from "clsx";
import { RowDefaultType } from "../lib/types";
import { deletePwa, getAllPwa } from "../lib/table.thunk";
import { createColumnHelper } from "@tanstack/react-table";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import copy_icon from "src/shared/assets/icons/copy_icon.png";
import link_icon from "src/shared/assets/icons/link_icon.png";
import play_icon from "src/shared/assets/icons/play_icon.png";
import pause_icon from "src/shared/assets/icons/pause_icon.png";
import options_icon from "src/shared/assets/icons/options_icon.png";
import trash from "src/shared/assets/icons/trash_icon_orange.png";
import pencil from "src/shared/assets/icons/pencil.png";

export const PwaTable: FC = () => {
  const [pwas, setPwas] = useState<Array<RowDefaultType>>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const formatTableData = useCallback((data: RowDefaultType[]) => {
    return data.map((obj) => ({
      _id: obj._id,
      displayId: obj.displayId,
      adminId: obj.adminId,
      marketerTag: obj.marketerTag,
      displayName: obj.displayName,
      defaultNaming: "Rqd - NL OLZ learning",
      domain: obj.domain,
      tag: obj.marketerTag,
      createdAt: format(obj.createdAt, "dd.MM.yyyy | hh:mm"),
      landingStatus: obj.landingStatus,
    }));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(getAllPwa());

      if (getAllPwa.fulfilled.match(data)) {
        const formattedData = formatTableData(data.payload);
        setPwas(formattedData);
      }
    };

    fetchData();
  }, [formatTableData, dispatch]);

  const onCopyHandler = (value: string) => navigator.clipboard.writeText(value);

  const columnHelper = createColumnHelper<
    RowDefaultType & { actions?: string }
  >();
  const columns = [
    columnHelper.accessor("displayId", {
      header: "ID",
      cell: (displayId) => (
        <>
          <span>{displayId.getValue()}</span>
          <button onClick={() => onCopyHandler(displayId.getValue())}>
            <img src={copy_icon} style={{ height: "12px", width: "12px" }} />
          </button>
        </>
      ),
    }),
    columnHelper.accessor("displayName", {
      header: "Название",
    }),
    columnHelper.accessor("domain", {
      header: "Домен",

      cell: (domain) => {
        return (
          <>
            <span>{domain.getValue()}</span>
            <button onClick={() => onCopyHandler(domain.getValue() || "")}>
              <img src={link_icon} style={{ height: "12px", width: "12px" }} />
            </button>
          </>
        );
      },
    }),
    columnHelper.accessor("marketerTag", {
      header: "Тег",
      cell: (marketerTag) => (
        <>
          <span>{marketerTag.getValue()}</span>
          <button onClick={() => onCopyHandler(marketerTag.getValue() || "")}>
            <img src={copy_icon} style={{ height: "12px", width: "12px" }} />
          </button>
        </>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Создано",
      cell: (created) => <span>{created.getValue()}</span>,
    }),
    columnHelper.accessor("defaultNaming", {
      header: "Нейминг по умолчанию",
    }),
    columnHelper.accessor("actions", {
      header: () => (
        <div className="flex items-center gap-2 min-w-23">
          <button>
            <img
              src="/pwa_icons/refresh.png"
              alt="refresh"
              width={20}
              height={20}
            />
          </button>
          <button>
            <img
              src="/pwa_icons/switch_vertical.png"
              alt="sort"
              width={20}
              height={20}
            />
          </button>
          <button>
            <img
              src="/pwa_icons/cog.png"
              alt="settings"
              width={20}
              height={20}
            />
          </button>
        </div>
      ),
      cell: (cell) => (
        <div className="min-w-23 flex justify-around">
          {cell.row.original.landingStatus === "live" ? (
            <button onClick={() => onCopyHandler(cell.cell.id)}>
              <img src={pause_icon} style={{ height: "16px", width: "16px" }} />
            </button>
          ) : (
            <button
              onClick={() => handleCreateRenderService(cell.row.original)}
            >
              <img src={play_icon} style={{ height: "16px", width: "16px" }} />
            </button>
          )}
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
                  onClick={() => {
                    if (!cell.row.original._id) return;
                    onUpdateHandler(cell.row.original._id);
                  }}
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
                  onClick={() => deletePwaHandler(cell.row.original)}
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
      ),
    }),
  ];

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

  const deletePwaHandler = async (row: Partial<RowDefaultType>) => {
    if (!row._id) return;
    dispatch(deletePwa(row._id));
    setPwas((prev) => prev.filter((item) => item._id !== row._id));
  };

  const onUpdateHandler = (value: string) => {
    dispatch(setAppId(value));
    navigate(`/pwa_edit/${value}/design`);
  };

  const handleCreateRenderService = (payload: Partial<RowDefaultType>) => {
    if (!payload._id || !payload.adminId) return;

    dispatch(
      createRenderService({
        appId: payload._id,
        adminId: payload.adminId,
        domain: payload.domain,
      })
    );
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
        {table.getCanPreviousPage() && (
          <button
            className={clsx(
              "flex items-center text-view-11 p-2",
              !table.getCanPreviousPage() ? "text-[#717171]" : "text-[#FF5532]"
            )}
            onClick={() => table.previousPage()}
          >
            <ChevronLeftIcon
              className={clsx(
                "size-6",
                !table.getCanPreviousPage()
                  ? "text-[#717171]"
                  : "text-[#FF5532]"
              )}
            />
            Предыдущая
          </button>
        )}
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
                    onClick={() => table.setPageIndex((page as number) - 1)}
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
