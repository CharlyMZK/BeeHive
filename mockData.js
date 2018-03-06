var getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

var getRandomFloat = (max) => {
    return Math.random() * Math.floor(max);
};

var generateMockData = () => {
    var isHatchOpen = !getRandomInt(2);

    return {
        idHive: 0,
        hatchOpen: isHatchOpen,
        temperature: Math.round(getRandomFloat(40) * 100) / 100,
        vibration: Math.round(getRandomFloat(10) * 100) / 100,
        soundActivity: Math.round(getRandomFloat(10) * 100) / 100,
        dateTime: new Date()
    };
};