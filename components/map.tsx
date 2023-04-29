import { FC, useMemo } from "react";

import {
	GoogleMap,
	useLoadScript,
} from "@react-google-maps/api";

type Coordinates = {
	lat: number;
	lng: number;
};

type IProps = {
	zoom?: number;
	coordinates: Coordinates;
	mapContainerClassName?: string;
};

type MapProps = {
	googleMapApiKey: string;
};

const Map: FC<IProps> = ({
	coordinates: { lat, lng },
	zoom = 10,
	mapContainerClassName,
}) => {
	const center = useMemo(() => ({ lat: lat, lng: lng }), []);

	const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: googleMapsApiKey!,
	});

	if (!isLoaded) return <h2>Loading ...</h2>;
	if (!googleMapsApiKey) {
		return <h2>Error</h2>;
	}
	return (
		<GoogleMap
			zoom={zoom}
			center={center}
			mapContainerClassName={mapContainerClassName}
		></GoogleMap>
	);
};

export default Map;
