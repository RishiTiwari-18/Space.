"use client"

import { Tldraw, DefaultColorThemePalette } from 'tldraw'
import 'tldraw/tldraw.css'


export default function DrawPage() {
	console.log(DefaultColorThemePalette)
	return (
		<div className="tldraw__editor" style={{ height: "90vh", width: "100vw" }}>
			<Tldraw />
		</div>
	)
}