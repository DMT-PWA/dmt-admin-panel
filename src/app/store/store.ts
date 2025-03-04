import { configureStore } from "@reduxjs/toolkit";
import { pwaDescriptionReducer } from "src/entities/pwa_description";
import { pwaDesignReducer } from "src/entities/pwa_design";
import { sidebarModule } from "src/widgets/sidebar";

export const store = configureStore({
  reducer: {
    sidebar: sidebarModule.reducer,
    pwa_description: pwaDescriptionReducer,
    pwa_design: pwaDesignReducer,
  },
});
