import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Logout = (props: { position: any }) => {
  return (
    <MapContainer
      style={{ height: "50vh", width: "100%" }}
      center={props.position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={props.position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Logout;
