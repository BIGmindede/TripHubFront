import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { KanbanPage } from 'pages/KanbanPage'
import HomeIcon from 'shared/assets/IonHome.svg'
import ReportsIcon from 'shared/assets/IonReport.svg'
import TripsIcon from 'shared/assets/IonJournal.svg'
import CloudIcon from 'shared/assets/IonCloud.svg'
import { SVGProps } from 'react'
import { CurrentTripPage } from 'pages/CurrentTripPage'
import { UserTripsPage } from 'pages/UserTripsPage'
import { ReportPage } from 'pages/ReportPage'

export enum AppRoutes {
    MAIN = 'main',
    PROFILE = 'profile',
    TRIPS = 'trips',
    CURRENT = 'current',
    KANBAN = 'kanban',
    REPORTS = 'reports',
    REPORT = 'report',
    MEDIA_FOLDERS = 'media_folders',
    MEDIA_FOLDER = 'media_folder',
    NOT_FOUND = 'notfound'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.TRIPS]: '/trips',
    [AppRoutes.CURRENT]: '/current',
    [AppRoutes.KANBAN]: '/kanban',
    [AppRoutes.REPORTS]: '/reports',
    [AppRoutes.REPORT]: '/report',
    [AppRoutes.MEDIA_FOLDERS]: '/media_folders',
    [AppRoutes.MEDIA_FOLDER]: '/media_folder',
    [AppRoutes.NOT_FOUND]: '*'
}

export const navLinks: Record<string, string> = {
    [RoutePath.main]: "Главная страница",
    [RoutePath.trips]: "Журнал путешествий",
    [RoutePath.reports]: "Отчеты пользователей",
    [RoutePath.media_folders]: "Библиотека",
}

export const navIcons: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
    [RoutePath.main]: HomeIcon,
    [RoutePath.trips]: TripsIcon,
    [RoutePath.reports]: ReportsIcon,
    [RoutePath.media_folders]: CloudIcon
}

export interface RouteConfig {
    path: string;
    element: React.ReactNode;
    authOnly?: boolean;
}

export const routeConfig: RouteConfig[] = [
    {
        path: RoutePath.main,
        element: <MainPage/>,
        authOnly: false
    },
    {
        path: RoutePath.reports,
        element: <MainPage/>, // Replace with actual ReportsPage component
        authOnly: false
    },
    {
        path: RoutePath.trips,
        element: <UserTripsPage/>, // Replace with actual TripsPage component
        authOnly: true
    },
    {
        path: RoutePath.current,
        element: <CurrentTripPage/>, // Replace with actual CurrentTripPage component
        authOnly: true
    },
    {
        path: RoutePath.kanban,
        element: <KanbanPage/>,
        authOnly: true
    },
    {
        path: RoutePath.report + "/:tripId",
        element: <ReportPage/>, // Replace with actual ReportPage component
        authOnly: true
    },
    // {
    //     path: RoutePath.media_folders,
    //     element: <MainPage/>, // Replace with actual MediaFoldersPage component
    //     authOnly: true
    // },
    // {
    //     path: RoutePath.media_folder,
    //     element: <MainPage/>, // Replace with actual MediaFolderPage component
    //     authOnly: true
    // },
    {
        path: RoutePath.notfound,
        element: <NotFoundPage/>,
        authOnly: false
    }
]
