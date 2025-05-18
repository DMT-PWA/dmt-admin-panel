const data = [
  {
    id: 1,
    name: "Проект 1",
    domain: "example.com",
    tag: "Тег 1",
    created: "2023-10-01",
    defaultNaming: "Да",
  },
  {
    id: 2,
    name: "Проект 2",
    domain: "example.org",
    tag: "Тег 2",
    created: "2023-10-02",
    defaultNaming: "Нет",
  },
];

const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "domain",
    header: "Домен",
  },
  {
    accessorKey: "tag",
    header: "Тег",
  },
  {
    accessorKey: "created",
    header: "Создано",
    cell: ({ getValue }) => (
      <span className="text-[#000000E0] font-inter text-sm">{getValue()}</span>
    ),
  },
  {
    accessorKey: "defaultNaming",
    header: "Нейминг по умолчанию",
  },
  {
    id: "actions",
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
          <img src="/pwa_icons/cog.png" alt="settings" width={20} height={20} />
        </button>
      </div>
    ),
    cell: () => null,
  },
];
export { columns, data };
