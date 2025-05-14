import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import { App } from './app/App'
import { ThemeProvider } from './app/providers/themeProvider/UI/ThemeProvider'
import { StoreProvider } from 'app/providers/storeProvider/ui/StoreProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        {/* <ErrorBoundary> */}
            <StoreProvider>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </StoreProvider>
        {/* </ErrorBoundary> */}
    </BrowserRouter>
)
