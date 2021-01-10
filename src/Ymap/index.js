import React, { Component } from "react";
import {
  YMaps,
  Map,
  Placemark,
  RouteButton,
  TrafficControl,
  GeolocationControl
} from "react-yandex-maps";
import BoyarImg from "../img/logomap.png";
import { Modal, Button } from "antd";
import style from "./Ymap.module.css";
import "antd/dist/antd.css";
import shId from "shortid";

class Ymap extends Component {
  state = {
    defaultMapState: {
      center: [61.26, 73.4],
      zoom: 11,
    },
    selectedMapState: {},
    isModalVisible: false,
    modalValues: {
      adress: "",
      latitude: "",
      longtitude: "",
      comment: "",
    },
  };

  dotSelect(dot) {
    this.setState({
      selectedMapState: { center: [+dot.latitude, +dot.longtitude], zoom: 14 },
    });
  }

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    const { modalValues } = this.state;
    const { createDot } = this.props;
    const latitudeRegexp = /([-+]?(([1-8]?\d(\.\d+))+|90))/g;
    const longtitudeRegexp = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/g;
    const latitude = modalValues.latitude.replace(",", ".");
    const longtitude = modalValues.longtitude.replace(",", ".");
    if (!latitude.match(latitudeRegexp)) {
      return alert("неправильная широта");
    } else if (!longtitude.match(longtitudeRegexp)) {
      return alert("неправильная долгота");
    }
    const newDot = {
      latitude: latitude,
      longtitude: longtitude,
      name: modalValues.adress,
      description: modalValues.comment,
      id: shId.generate(),
    };
    createDot(newDot);
    this.handleCancel();
  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      modalValues: {
        adress: "",
        latitude: "",
        longtitude: "",
        comment: "",
      },
    });
  };
  inputHandler = ({ target }) => {
    this.setState((prevState) => ({
      modalValues: { ...prevState.modalValues, [target.id]: target.value },
    }));
  };

  render() {
    const { dots, deleteDot } = this.props;
    const {
      defaultMapState,
      selectedMapState,
      isModalVisible,
      modalValues,
    } = this.state;

    return (
      <>
        <YMaps>
          <Map
            width={`80%`}
            height={"400px"}
            defaultState={defaultMapState}
            state={selectedMapState.center ? selectedMapState : defaultMapState}
          >
            <TrafficControl />
            <RouteButton options={{ float: "right" }} />
            <GeolocationControl options={{ float: 'left' }} />
            {dots.length > 0
              ? dots.map((dot) => {
                  return (
                    <Placemark
                      geometry={[+dot.latitude, +dot.longtitude]}
                      properties={{
                        hintContent: dot.name,

                        balloonContent: ` <span>График работы:</span> <br/> <span>${
                          dot.description
                        }</span> ${
                          dot.comment ? (
                            <>
                              <br />
                              <span>{dot.comment}</span>
                            </>
                          ) : (
                            ""
                          )
                        }`,
                      }}
                      options={{
                        hideIconOnBalloonOpen: false,
                        iconLayout: "default#image",
                        iconImageHref: BoyarImg,
                        iconImageSize: [42, 42],
                        iconImageOffset: [-21, -42],
                        iconContentOffset: [-42, -42],
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
        {dots.length > 0 ? (
          <ul className={style.list}>
            {dots.map((dot) => {
              return (
                <li value={dot.description}>
                  <a href="#" onClick={() => this.dotSelect(dot)}>
                    {dot.description}
                  </a>
                  <button
                    className={style.deleteBtn}
                    onClick={() => deleteDot(dot.id)}
                  >
                    Х
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}

        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Добавить новую точку"
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <form>
            <input
              className={style.modalInput}
              placeholder="Адрес"
              id="adress"
              value={modalValues.adress}
              onChange={this.inputHandler}
            ></input>
            <input
              className={style.modalInput}
              placeholder="Широта"
              id="latitude"
              value={modalValues.latitude}
              onChange={this.inputHandler}
            ></input>
            <input
              className={style.modalInput}
              placeholder="Долгота"
              id="longtitude"
              value={modalValues.longtitude}
              onChange={this.inputHandler}
            ></input>
            <input
              className={style.modalInput}
              placeholder="Описание"
              id="comment"
              value={modalValues.comment}
              onChange={this.inputHandler}
            ></input>
          </form>
        </Modal>
      </>
    );
  }
}

export default Ymap;
