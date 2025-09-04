import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useCallback, useEffect, useState } from "react";
import { Title } from "src/shared/ui/title";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/shared/lib/store";
import clsx from "clsx";
import { RowDefaultType } from "../lib/types";
import { createColumnHelper } from "@tanstack/react-table";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import copy_icon from "src/shared/assets/icons/copy_icon.png";
import options_icon from "src/shared/assets/icons/options_icon.png";
import trash from "src/shared/assets/icons/trash_icon_orange.png";
import pencil from "src/shared/assets/icons/pencil.png";
import {
  cloneNotification,
  deleteNotification,
  getAllNotifications,
} from "src/entities/notification/model/notification.thunk";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

export const PushNotificationTable: FC = () => {
  const [notifications, setNotifications] = useState<Array<RowDefaultType>>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const dispatch = useAppDispatch();

  const onCopyHandler = (value: string) => navigator.clipboard.writeText(value);

  const fetchData = useCallback(async () => {
    const data = await dispatch(getAllNotifications());

    if (getAllNotifications.fulfilled.match(data)) {
      setNotifications(data.payload);
    }
  }, [dispatch]);

  const handleNotificationDelete = async (id: string) => {
    await dispatch(deleteNotification(id));

    await fetchData();
  };

  const handleNotificationClone = async (id: string) => {
    await dispatch(cloneNotification(id));

    await fetchData();
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columnHelper = createColumnHelper<
    RowDefaultType & { actions?: string }
  >();
  const columns = [
    columnHelper.accessor("appIds", {
      header: "PWA",
      cell: (appIds) => {
        const appIdsArray = appIds.getValue();
        const firstAppId = appIdsArray[0]?.displayId || "";

        return (
          <div className="flex items-center gap-2">
            <span>{firstAppId}</span>
            <button
              onClick={() => onCopyHandler(appIdsArray[0]?._id)}
              className="p-1 "
            >
              <img src={copy_icon} alt="Copy" className="h-3 w-3" />
            </button>

            {appIdsArray.length > 1 && (
              <Menu as="div" className="relative">
                <MenuButton className="p-1 ">
                  <img
                    src="/pwa_icons/vector-19.svg"
                    alt="More options"
                    className="h-3 w-3"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom end"
                  className="absolute z-10 mt-2 origin-top-right rounded-xl border border-gray-7 bg-white py-2.25 px-4.5 shadow-lg"
                >
                  {appIdsArray.map((el, ind) => (
                    <MenuItem key={ind}>
                      {() => (
                        <div
                          className={`flex items-center gap-2 py-1 px-2 rounded`}
                        >
                          <span className="text-sm">{el.displayId}</span>
                          <button
                            onClick={() => onCopyHandler(el._id)}
                            className="p-1"
                          >
                            <img
                              src={copy_icon}
                              alt="Copy"
                              className="h-3 w-3"
                            />
                          </button>
                        </div>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            )}
          </div>
        );
      },
      size: 100,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      size: 100,
    }),
    columnHelper.accessor("defaultLanguage", {
      header: "Default language",
      cell: (lang) => {
        return <>{lang.getValue()}</>;
      },
      size: 100,
    }),
    columnHelper.accessor("title", {
      header: "Name",
      cell: (adminId) => (
        <>
          <span>{adminId.getValue()}</span>
          <button onClick={() => onCopyHandler(adminId.getValue())}>
            <img src={copy_icon} style={{ height: "12px", width: "12px" }} />
          </button>
        </>
      ),
      size: 100,
    }),
    columnHelper.accessor("actions", {
      header: "",
      cell: (cell) => (
        <div className="min-w-23 flex justify-around">
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
                  onClick={() => handleNotificationClone(cell.row.original._id)}
                  className="group flex w-full items-center gap-2 rounded-lg text__default text-view-7 mb-4"
                >
                  <img
                    src={copy_icon}
                    style={{ height: "14px", width: "14px" }}
                  />
                  Клонировать
                </button>
              </MenuItem>

              <MenuItem>
                <button
                  onClick={() =>
                    navigate(`/push_notification/form/${cell.row.original._id}`)
                  }
                  className="group flex w-full items-center gap-2 rounded-lg text__default text-view-7 mb-4"
                >
                  <img src={pencil} style={{ height: "14px", width: "14px" }} />
                  Редактировать
                </button>
              </MenuItem>

              <div className="my-1 h-px bg-white/5" />
              <MenuItem>
                <button
                  onClick={() =>
                    handleNotificationDelete(cell.row.original._id)
                  }
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
      size: 500,
    }),
  ];

  const table = useReactTable({
    data: notifications || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });
  return (
    <>
      <div className="container__view-1 flex-col min-h-[794px] mt-[26px]">
        <div className="ml-[27px]">
          <Title
            title="PUSHs"
            withContainer={false}
            classes="title__view-2 mb-4"
          />
        </div>
        {table && (
          <table className="ml-4">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="h-[55px] rounded-t-[10px]">
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
                    {row.getVisibleCells().map((cell, ind) => {
                      return (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-view-1 text-black-1 border-b border-b-gray-7"
                        >
                          <div
                            className={clsx("flex gap-1.25 items-center", {
                              "justify-end":
                                ind === row.getVisibleCells().length - 1,
                            })}
                          >
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
