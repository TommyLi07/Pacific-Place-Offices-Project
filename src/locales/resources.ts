import customizationZhTC from './zh_tc/customization.json';
import customizationEn from './en/customization.json';
import landingEn from './en/landing.json';
import landingZhTC from './zh_tc/landing.json';

export const resources = {
	en: {
		landing: landingEn,
		customization: customizationEn,
	},
	zh_tc: {
		landing: landingZhTC,
		customization: customizationZhTC,
	},
};

export const namespaces = Object.keys(resources.en);
