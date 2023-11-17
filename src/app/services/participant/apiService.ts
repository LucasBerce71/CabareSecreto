import { AxiosPromise, AxiosRequestConfig } from 'axios';

import { IParticipant } from '@/app/models/participant';
import { EMethodsTypes } from '@/app/enums/methodsTypes';

import { api } from '@/configs/axios.config';

export default class ParticipantApiService {
    getAll = (): AxiosPromise<IParticipant[]> => {
        const configuration: AxiosRequestConfig = {
            method: EMethodsTypes.get,
            url: '/users',
        };

        return api(configuration);
    };

    updateParticipant = (participantId: string, updatedData?: IParticipant): any => {
        const configuration: AxiosRequestConfig = {
            method: EMethodsTypes.put,
            url: `/users/${participantId}`,
            data: updatedData,
        };

        return api(configuration);
    };
};