import { log } from 'console'
import React, { type ReactNode, type ErrorInfo, Suspense } from 'react'
import { ErrorWidget } from 'widgets/ErrorWidget/UI/ErrorWidget'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError (error: Error) {
        return { hasError: true }
    }

    componentDidCatch (error: Error, info: ErrorInfo) {
        console.error(error, info)
    }

    render () {
        const { hasError } = this.state
        const { children } = this.props
        if (hasError) {
            return (
                <Suspense fallback=''>
                    <ErrorWidget/>
                </Suspense>
            )
        }
        return children
    }
}
