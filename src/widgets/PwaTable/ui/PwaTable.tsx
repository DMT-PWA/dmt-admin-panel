import { FC } from "react";
import { Title } from "src/shared/ui/title";

export const PwaTable: FC = () => {
  return (
    <div className="container__view-1 flex-col min-h-[794px] mt-[26px]">
      <Title
        title="PWAs"
        withContainer={false}
        classes="title__view-2 ml-[24px]"
      />

      <table>
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
      </table>
    </div>
  );
};
