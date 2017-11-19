import React from 'react';
import{withScriptjs, withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

const MapPlace = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    center={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
  >
    {props.isMarkerShown && <Marker position={{lat: parseFloat(props.lat), lng: parseFloat(props.lng) }} />}
  </GoogleMap>
))

const Place = ({city, state, longitude, latitude}) => 
		<li className = 'row'>
			<div className="col">
				<h2 className='text-center'>{city}</h2>
				<h2 className='text-center'>{state}</h2>
				<h2 className="text-center">longitude: {longitude}</h2>
				<h2 className="text-center">latitude: {latitude}</h2>
			</div>
			<div className='col'>
				<MapPlace
				  isMarkerShown
				  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDzScoYl-nUscxMtUBkY8c4AF_hU7SlZbU&v=3.exp&libraries=geometry,drawing,places"
				  loadingElement={<div style={{ height: `100%` }} />}
				  containerElement={<div style={{ height: `400px` }} />}
				  mapElement={<div style={{ height: `100%` }} />}
				  lat={latitude}
				  lng={longitude}
				/>
			</div>
		</li>

export default Place;
