import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap,Marker } from "react-google-maps";
import { compose, withProps } from "recompose";

export const MyMapComponent = compose(
    withProps({
      /**
       * Note: create and replace your own key in the Google console.
       * https://console.developers.google.com/apis/dashboard
       * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
       */
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyARkgFgadUqljLFALLYiydM7MlMAii9rws&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )(props => (
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: 10.7878783, lng: 106.6248723 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: 10.7878783, lng: 106.6248723 }} />
      )}
    </GoogleMap>
  ));
