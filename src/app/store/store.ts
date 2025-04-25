import { configureStore } from "@reduxjs/toolkit";
import { pwaCreateReducer } from "src/entities/pwa_create";
import { pwaDescriptionReducer } from "src/entities/pwa_description";
import { pwaDesignReducer } from "src/entities/pwa_design";
import { sidebarModule } from "src/widgets/sidebar";
import { collectionSliceReducer } from "src/entities/collection";
import { commentsReducer } from "src/entities/comments";
import { metricsReducer } from "src/entities/metrics";
import { settingsReducer } from "src/entities/settings";
import { collectionsReducer } from "src/features/collections_list";
import appDataReducer from "src/features/appData/appDataSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarModule.reducer,
    pwa_description: pwaDescriptionReducer,
    pwa_design: pwaDesignReducer,
    pwa_create: pwaCreateReducer,
    collection: collectionSliceReducer,
    collections: collectionsReducer,
    comments: commentsReducer,
    metrics: metricsReducer,
    settings: settingsReducer,
    appData: appDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
