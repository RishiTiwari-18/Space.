"use client"

import { Tldraw, DefaultColorThemePalette } from 'tldraw'
import 'tldraw/tldraw.css'


export default function DrawPage() {
	console.log(DefaultColorThemePalette)
	return (
		<div className="fixed top-16 bottom-0 right-0 left-0">
			<Tldraw />
		</div>
	)
}