"use client"

import { Tldraw } from 'tldraw'
// import { useSyncDemo } from '@tldraw/sync'
import 'tldraw/tldraw.css'


export default function DrawPage() {
	// const store = useSyncDemo({ roomId: '#kdsfbkjbkjsfjbdkjskjbd' })
	return (
		<div className="fixed top-16 bottom-0 right-0 left-0">
			<Tldraw licenseKey={process.env.VITE_TLDRAW_LICENSE_KEY} persistenceKey="#sdfgkhndskfbnkdsb" />
		</div>
	)
}