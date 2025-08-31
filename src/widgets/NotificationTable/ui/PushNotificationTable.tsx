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
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/shared/lib/store";
import { setAppId, createRenderService } from "src/entities/pwa_create";
import clsx from "clsx";
import { ClonePwaPayload, RowDefaultType } from "../lib/types";
import { createColumnHelper } from "@tanstack/react-table";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import copy_icon from "src/shared/assets/icons/copy_icon.png";
import link_icon from "src/shared/assets/icons/link_icon.png";
import options_icon from "src/shared/assets/icons/options_icon.png";
import trash from "src/shared/assets/icons/trash_icon_orange.png";
import pencil from "src/shared/assets/icons/pencil.png";
import { ButtonDefault } from "src/shared/ui/button";
import { getAllNotifications } from "src/entities/notification/model/notification.thunk";

export const PushNotificationTable: FC = () => {
  const [notifications, setNotifications] = useState<Array<RowDefaultType>>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(getAllNotifications());

      if (getAllNotifications.fulfilled.match(data)) {
        setNotifications(data.payload);
      }
    };

    fetchData();
  }, [dispatch]);

  const columnHelper = createColumnHelper<RowDefaultType>();
  const columns = [
    columnHelper.accessor("adminId", {
      header: "PWA",
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("language", {
      header: "Default language",
    }),
    columnHelper.accessor("title", {
      header: "Name",
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
    </>
  );
};
