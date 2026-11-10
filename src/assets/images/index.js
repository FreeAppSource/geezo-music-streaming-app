// Local image resolver for Geezo Music Streaming App
export const appImages = {
  // Key artwork images from Sketch
  comeToMe: require('./1af231e654deb4a4c7f7720a7e5cdf3ae4b8f69d.png'),
  niceForWhat: require('./38538fe09314ef91b610620b5cdce392525bfa11.png'),
  whereCanIGet: require('./ba972cb0a6d2f9285cf0a820a0771a6fb210159a.png'),
  prayForYou: require('./175549451d9303b9dc7365f50e6ab74e88541f19.png'),
  doIt: require('./6c0b27efe7599034e80fe8de1e830ad8de162560.png'),
  runRunRun: require('./912944e3117f517a821d3c8098225e4ccf480e02.png'),
  fallOutBoy: require('./81d5833ba0881e5492992a2d7111a2bfc3560ef3.png'),
  sujiWong: require('./711c76519dd6fead1dbca6d441718d53b4152270.png'),
  radioStation: require('./927c1a827311ff6f04455c92bca18dd084ee2088.png'),
  radioLive: require('./743b1a0fbf5acd1d286a7492badb63c5d47d3de5.png'),
  profileUser: require('./2c8cff0535c4c6207e24dd6f0ccd676b918a6946.png'),
  walkthrough: require('./650ba025a08955e3a627c51fbfb3770f76a4ab19.png'),
};

export const resolveMusicImage = (imgKey) => {
  if (!imgKey) return appImages.comeToMe;
  if (appImages[imgKey]) return appImages[imgKey];
  return { uri: imgKey };
};
