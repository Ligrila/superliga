import { selector } from "recoil";
import Api from '../api/Api';
import DateTimeHelper from "../helpers/DateTimeHelper";

export const homeBannerSelector = selector({
    key: 'HommeBanner',
    get: async (
        // If need another atom
        // { get }
    ) => {
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