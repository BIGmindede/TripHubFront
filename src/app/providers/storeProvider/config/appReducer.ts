import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "shared/config/store/reducers/authSlice";
import { kanbanReducer } from "shared/config/store/reducers/kanbanSlice";
import { profilesReducer } from "shared/config/store/reducers/profilesSlice";
import { searchProfilesReducer } from "shared/config/store/reducers/searchProfilesSlice";
import { notificationsReducer } from "shared/config/store/reducers/notificationsSlice";
import { profileReducer } from "shared/config/store/reducers/profileSlice";
import { currentTripReducer } from "shared/config/store/reducers/currentTripSlice";
import { tripsListReducer } from "shared/config/store/reducers/tripsListSlice";
import { tripDetailsReducer } from "shared/config/store/reducers/tripDetailsSlice";
import { tripStatisticsReducer } from "shared/config/store/reducers/tripStatisticsSlice";
import { reportReducer } from "shared/config/store/reducers/reportSlice";
import { mediaReducer } from "shared/config/store/reducers/mediaSlice";

export const appReducer = combineReducers({
    authReducer,
    kanbanReducer,
    profilesReducer,
    searchProfilesReducer,
    notificationsReducer,
    profileReducer,
    currentTripReducer,
    tripsListReducer,
    tripDetailsReducer,
    tripStatisticsReducer,
    reportReducer,
    mediaReducer
})

export type AppState = ReturnType<typeof appReducer>