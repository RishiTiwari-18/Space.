"use client"

import { Tldraw, DefaultColorThemePalette } from 'tldraw'
import 'tldraw/tldraw.css'


export default function DrawPage() {
	console.log(DefaultColorThemePalette)
	return (
		<div className="tldraw__editor" style={{ position: 'fixed', bottom:0, right:0, top:60, left:0, zIndex:0 }}>
			<Tldraw />
		</div>
	)
}