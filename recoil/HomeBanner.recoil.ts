import { atom, selector } from "recoil";
import Api from '../api/Api';
import DateTimeHelper from "../helpers/DateTimeHelper";


const defaultValue = {
    hasData: false,
    data: undefined
}

export const homeBannerSelector = selector({
    key: 'HommeBannerSelector',
    get: async (
        // If need another atom
        { get }
    ) => {
        get(homeBannerAtom)
        const api = new Api()
        const homeBannersResponse = await api.homeBanners();
        const homeBanners = {
            hasData: false,
            data: [] as any
        }
        if (homeBannersResponse.success) {
            for (var index = 0; index < homeBannersResponse.data.length; index++) {
                let data = homeBannersResponse.data[index];
                if (data.type != 'banner') {
                    data.start_datetime_local = await DateTimeHelper.datetime(data.start_datetime);
                    data.start_datetime_local_string = await DateTimeHelper.format(data.start_datetime);
                }
                homeBanners.data.push(data);
            }
            homeBanners.hasData = true;

        }
        return homeBanners;
    },
});

export const homeBannerAtom = atom<any>({
    key: 'HommeBannerAtom',
    default: defaultValue
});