"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import 'tldraw/tldraw.css'

const Tldraw = dynamic(
	() => import('tldraw').then(mod => ({ default: mod.Tldraw })),
	{ 
		ssr: false,
		loading: () => <div className="w-full h-full bg-slate-900" />
	}
)

export default function DrawPage() {
	return (
		<Suspense fallback={<div className="fixed top-16 bottom-0 right-0 left-0 bg-slate-900" />}>
			<div className="fixed top-16 bottom-0 right-0 left-0">
				<Tldraw persistenceKey="my-unique-project-id" />
			</div>
		</Suspense>
	)
}