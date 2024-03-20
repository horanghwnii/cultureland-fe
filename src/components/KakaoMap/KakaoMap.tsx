'use client';

import useQueryGetEventsOnMap from '@/react-query/reviews/useQueryGetEventsOnMap';
import { KakaoMapEvent } from '@/types/Event.type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import MapItemList from '../MapItemList';
import StarRating from '../ReviewCard/_components/StarRating';

function KakaoMap() {
  const [center, setCenter] = useState({ lat: 37.568683, lng: 126.980279 });
  const [isOpen, setIsOpen] = useState<{ [key: number]: boolean }>({});
  const { isLoading, data } = useQueryGetEventsOnMap(center, '연극');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleMouseOver = (id: number) => {
    setIsOpen((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseOut = (id: number) => {
    setIsOpen((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className='flex border rounded overflow-hidden border-user-theme-40'>
      <div className='w-[70%] h-[550px] rounded overflow-hidden m-3'>
        <Map
          center={center}
          level={6}
          style={{ width: '100%', height: '100%' }}
          onIdle={(map) => {
            setCenter({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            });
          }}
        >
          {data?.map((event) => (
            <>
              <MapMarker
                key={event.id}
                zIndex={5}
                position={{
                  lat: event.venue?.latitude as number,
                  lng: event.venue?.longitude as number,
                }}
                infoWindowOptions={{
                  disableAutoPan: true,
                  removable: false,
                  zIndex: 20,
                }}
                onMouseOver={() => handleMouseOver(event.id)}
                onMouseOut={() => handleMouseOut(event.id)}
              />
              <Link href={`/events/${event.id}`}>
                <CustomOverlayMap
                  position={{
                    lat: event.venue?.latitude as number,
                    lng: event.venue?.longitude as number,
                  }}
                  zIndex={100}
                >
                  {isOpen[event.id] && (
                    <div className='bg-opacity-25 shadow-lg backdrop-blur-lg webkit-backdrop-blur-15 rounded-lg border border-opacity-25 text-center min-w-56 -translate-x-[50%] -translate-y-[170px] px-5 py-3'>
                      <span className='text-xl font-bold'>{event.title}</span>
                      <div className='my-3 flex justify-center'>
                        <StarRating rate={Number(event.averagerating)} />
                      </div>
                      <span className='text-sm block'>{event.venue.name}</span>
                    </div>
                  )}
                </CustomOverlayMap>
              </Link>
            </>
          ))}
        </Map>
      </div>

      <div className='w-[30%] h-[550px] overflow-x-scroll scrollbar-hide m-3'>
        <MapItemList events={data as KakaoMapEvent[]} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}

export default KakaoMap;
