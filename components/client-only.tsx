import { useEffect, useState } from 'react'

// TODO: handle types
const ClientOnly = ({ children, ...delegated }: any) => {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null
	}

	return <div {...delegated}>{children}</div>
}

export default ClientOnly
