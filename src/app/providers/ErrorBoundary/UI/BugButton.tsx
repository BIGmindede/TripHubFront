import { useEffect, useState } from 'react'
import { Button } from 'shared/UI/Button/Button'

export const BugButton = () => {
    const [onError, setOnError] = useState(false)

    const handleErrorSwitch = () => {
        setOnError(true)
    }

    useEffect(() => {
        if (onError) throw new Error()
    }, [onError])

    return (
        <Button onClick={ handleErrorSwitch }>
            ThrowError
        </Button>
    )
}
