import { FeatureLike } from 'ol/Feature';
import { StyleFunction } from 'ol/style/Style';

const getStyle = (styleName: string): StyleFunction => (
  (feature: FeatureLike) => {
    const features = feature?.get('features');
    const styleMethod = (features?.[0] || feature).get(styleName);

    return styleMethod ? styleMethod(feature) : null;
  }
);

export default getStyle;
