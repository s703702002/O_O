import React from 'react';
import { connect } from 'react-redux';
import LightBox from '../components/LightBox';
import { removeLightBoxMessage } from '../action';

const LightBoxWithConnect = ({ lightBoxMessage, removeLightBoxMessage: removeLightBox }) => {
  if (lightBoxMessage.length > 0) {
    return <LightBox message={lightBoxMessage} removeLightBox={removeLightBox} />;
  }
  return null;
};

const mapStateToProps = (state) => {
  const { lightBoxMessage } = state;
  return {
    lightBoxMessage,
  };
};

export default connect(
  mapStateToProps,
  { removeLightBoxMessage },
)(LightBoxWithConnect);
