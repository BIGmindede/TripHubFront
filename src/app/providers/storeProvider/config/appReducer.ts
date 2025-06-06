import { combineReducers } from "@reduxjs/toolkit"
import { authReducer } from "shared/config/store/reducers/authSlice"
import { currentProfileReducer } from "shared/config/store/reducers/currentProfileSlice"
import { currentTripReducer } from "shared/config/store/reducers/currentTripSlice"
import { kanbanReducer } from "shared/config/store/reducers/kanbanSlice"
import { mediaReducer } from "shared/config/store/reducers/mediaSlice"
import { notificationsReducer } from "shared/config/store/reducers/notificationsSlice"
import { profileDetailsReducer } from "shared/config/store/reducers/profileDetailsSlice"
import { profilesReducer } from "shared/config/store/reducers/profilesSlice"
import { reportDetailsReducer } from "shared/config/store/reducers/reportDetailsSlice"
import { reportsReducer } from "shared/config/store/reducers/reportsSlice"
import { searchProfilesReducer } from "shared/config/store/reducers/searchProfilesSlice"
import { tripDetailsReducer } from "shared/config/store/reducers/tripDetailsSlice"
import { tripsReducer } from "shared/config/store/reducers/tripsSlice"
import { tripStatisticsReducer } from "shared/config/store/reducers/tripStatisticsSlice"

export const appReducer = combineReducers({
    authReducer,
    currentProfileReducer,
    currentTripReducer,
    kanbanReducer,
    notificationsReducer,
    mediaReducer,
    profilesReducer,
    searchProfilesReducer,
    profileDetailsReducer,
    tripsReducer,
    tripDetailsReducer,
    reportsReducer,
    reportDetailsReducer,
    tripStatisticsReducer
})

export type AppState = ReturnType<typeof appReducer>