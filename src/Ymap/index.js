import React, { Component } from "react";
import { YMaps, Map, Placemark, GeoObject } from "react-yandex-maps";
import BoyarImg from "../img/logomap.png";

class index extends Component {
  render() {
    const { dots } = this.props;
    // console.dir(GeoObject  )
    return (
      <>
        <YMaps>
          <Map
            width={`80%`}
            height={"400px"}
            defaultState={{ center: [61.26, 73.4], zoom: 11 }}
          >
            {dots.length > 0
              ? dots.map((dot) => {
                
                  return (
                    <Placemark
                      geometry={[+dot.latitude, +dot.longtitude]}
                      properties={{
                        hintContent: dot.name,

                        balloonContent: dot.description,
                      }}
                      options={{
                        hideIconOnBalloonOpen:false,
                        iconLayout: "default#image",
                        iconImageHref: BoyarImg,
                        iconImageSize: [42, 42],
                        iconImageOffset: [-21, -42],
                      }}
                      modules={[
                        "geoObject.addon.balloon",
                        "geoObject.addon.hint",
                      ]}
                    />
                  );
                })
              : null}
          </Map>
        </YMaps>
      </>
    );
  }
}

export default index;
