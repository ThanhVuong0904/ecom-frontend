import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Helmet from '../components/Helmet'
export default function Contact() {
    // 10.784218025216267, 106.64282784181466
    return (
        <Helmet title="Liên hệ">
            <MapContainer center={[10.784218025216267, 106.64282784181466]} zoom={17} scrollWheelZoom={false} id="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[10.784218025216267, 106.64282784181466]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </Helmet>
    )
}
