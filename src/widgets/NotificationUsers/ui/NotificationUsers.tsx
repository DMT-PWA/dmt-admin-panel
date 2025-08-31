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
import { clonePwa, deletePwa, getAllUsers } from "../lib/table.thunk";
import { createColumnHelper } from "@tanstack/react-table";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import copy_icon from "src/shared/assets/icons/copy_icon.png";
import link_icon from "src/shared/assets/icons/link_icon.png";
import options_icon from "src/shared/assets/icons/options_icon.png";
import trash from "src/shared/assets/icons/trash_icon_orange.png";
import pencil from "src/shared/assets/icons/pencil.png";

export const NotificationUsers: FC = () => {
  const [pwas, setPwas] = useState<Array<RowDefaultType>>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  /*  const formatTableData = useCallback<
    (data: RowDefaultType[]) => RowDefaultType[]
  >((data) => data.map((obj) => ({})), []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(getAllUsers());

      if (getAllUsers.fulfilled.match(data)) {
        const formattedData = formatTableData(data.payload);
        setPwas(formattedData);
      }
    };

    fetchData();
  }, [formatTableData, dispatch]); */

  const onCopyHandler = (value: string) => navigator.clipboard.writeText(value);
  const handleClonePwa = async ({ appId, newAdminId }: ClonePwaPayload) => {
    /* await dispatch(clonePwa({ appId, newAdminId }));

    const data = await dispatch(getAllPwa());

    if (getAllPwa.fulfilled.match(data)) {
      const formattedData = formatTableData(data.payload);
      setPwas(formattedData);
    } */
  };

  const columnHelper = createColumnHelper<
    RowDefaultType & { actions?: string }
  >();
  const columns = [
    columnHelper.accessor("userLink", {
      header: "User",
    }),
    columnHelper.accessor("role", {
      header: "Roles",
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
  return (
    <>
      <div className="container__view-3 flex-col min-h-[794px] mt-[26px]">
        <Title
          title="Users"
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
    </>
  );
};
